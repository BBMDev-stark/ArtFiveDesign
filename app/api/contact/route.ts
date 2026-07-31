import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_RECIPIENT = "hello@art5design.com";
const DEFAULT_SENDER = "ARTFIVE Website <website@contact.art5design.com>";
const MAX_REQUEST_SIZE = 20_000;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const allowedSectors = new Set([
  "Y tế",
  "Khách sạn & Nhà hàng",
  "Văn phòng & Doanh nghiệp",
  "Công nghiệp",
  "Căn hộ & Biệt thự",
  "Quốc tế",
]);

type RateLimitEntry = { count: number; resetAt: number };
const rateLimitStore = new Map<string, RateLimitEntry>();

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  sector?: unknown;
  message?: unknown;
  website?: unknown;
  submissionId?: unknown;
};

function asText(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.normalize("NFC").trim().slice(0, maxLength)
    : "";
}

function asSingleLine(value: unknown, maxLength: number) {
  return asText(value, maxLength).replace(/[\r\n\t]+/g, " ");
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  const normalized = value.replace(/[\s().-]/g, "");
  return /^\+?\d{8,15}$/.test(normalized);
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(clientIp: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(clientIp);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(clientIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });
    return false;
  }

  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX;
}

function createEmailHtml({
  name,
  company,
  email,
  phone,
  sector,
  message,
}: {
  name: string;
  company: string;
  email: string;
  phone: string;
  sector: string;
  message: string;
}) {
  const rows = [
    ["Họ và tên", name],
    ["Công ty", company || "Không cung cấp"],
    ["Email", email],
    ["Số điện thoại", phone],
    ["Lĩnh vực dự án", sector],
  ];

  return `
    <!doctype html>
    <html lang="vi">
      <body style="margin:0;background:#f4f1ec;color:#25211d;font-family:Arial,sans-serif;">
        <div style="padding:32px 16px;">
          <div style="max-width:640px;margin:0 auto;background:#fffdf9;border:1px solid #d9d0c4;">
            <div style="padding:28px 32px;background:#11100e;color:#f5f1eb;">
              <div style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#c8b08a;">ARTFIVE DESIGN</div>
              <h1 style="margin:12px 0 0;font-family:Georgia,serif;font-size:26px;font-weight:400;">Liên hệ mới từ website</h1>
            </div>
            <div style="padding:30px 32px;">
              <table role="presentation" style="width:100%;border-collapse:collapse;">
                ${rows
                  .map(
                    ([label, value]) => `
                      <tr>
                        <td style="width:150px;padding:11px 14px 11px 0;border-bottom:1px solid #e7e0d7;color:#806b50;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;">${escapeHtml(label)}</td>
                        <td style="padding:11px 0;border-bottom:1px solid #e7e0d7;font-size:15px;line-height:1.6;vertical-align:top;">${escapeHtml(value)}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </table>
              <div style="margin-top:28px;">
                <div style="margin-bottom:10px;color:#806b50;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;">Nội dung dự án</div>
                <div style="padding:18px 20px;background:#f6f2ec;font-size:15px;line-height:1.8;white-space:pre-wrap;">${escapeHtml(message)}</div>
              </div>
              <p style="margin:26px 0 0;color:#706960;font-size:13px;line-height:1.6;">Bạn có thể nhấn “Trả lời” trong Gmail để phản hồi trực tiếp tới ${escapeHtml(email)}.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { message: "Yêu cầu không hợp lệ." },
      { status: 403 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_SIZE) {
    return NextResponse.json(
      { message: "Nội dung liên hệ quá lớn." },
      { status: 413 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Dữ liệu liên hệ không hợp lệ." },
      { status: 400 },
    );
  }

  if (asText(payload.website, 200)) {
    return NextResponse.json({
      message:
        "Thông tin đã được gửi. ARTFIVE sẽ phản hồi bạn trong thời gian sớm nhất.",
    });
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      {
        message:
          "Bạn đã gửi quá nhiều yêu cầu. Vui lòng đợi ít phút rồi thử lại.",
      },
      { status: 429 },
    );
  }

  const name = asSingleLine(payload.name, 100);
  const company = asSingleLine(payload.company, 150);
  const email = asSingleLine(payload.email, 254).toLowerCase();
  const phone = asSingleLine(payload.phone, 20);
  const sector = asSingleLine(payload.sector, 100);
  const message = asText(payload.message, 3000);
  const submissionId = asSingleLine(payload.submissionId, 80);

  if (
    name.length < 2 ||
    !isValidEmail(email) ||
    !isValidPhone(phone) ||
    !allowedSectors.has(sector) ||
    message.length < 10
  ) {
    return NextResponse.json(
      {
        message:
          "Vui lòng kiểm tra và điền đầy đủ các thông tin bắt buộc.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        message:
          "Hệ thống nhận liên hệ đang được cấu hình. Vui lòng thử lại sau.",
      },
      { status: 503 },
    );
  }

  const recipient = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_RECIPIENT;
  const sender = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_SENDER;
  const plainText = [
    "LIÊN HỆ MỚI TỪ WEBSITE ARTFIVE",
    "",
    `Họ và tên: ${name}`,
    `Công ty: ${company || "Không cung cấp"}`,
    `Email: ${email}`,
    `Số điện thoại: ${phone}`,
    `Lĩnh vực dự án: ${sector}`,
    "",
    "Nội dung dự án:",
    message,
  ].join("\n");

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "ARTFIVE-Website/1.0",
        ...(submissionId
          ? { "Idempotency-Key": `contact-${submissionId}` }
          : {}),
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Liên hệ mới từ website ARTFIVE — ${name}`,
        html: createEmailHtml({
          name,
          company,
          email,
          phone,
          sector,
          message,
        }),
        text: plainText,
      }),
      cache: "no-store",
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error(
        "Resend contact email failed",
        resendResponse.status,
        errorBody.slice(0, 500),
      );

      const configurationMessage =
        resendResponse.status === 401 || resendResponse.status === 403
          ? "Hệ thống gửi email chưa được xác thực. Vui lòng liên hệ trực tiếp qua hello@art5design.com."
          : "Không thể gửi liên hệ lúc này. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email.";

      return NextResponse.json(
        { message: configurationMessage },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message:
        "Thông tin đã được gửi. ARTFIVE sẽ phản hồi bạn trong thời gian sớm nhất.",
    });
  } catch (error) {
    console.error("Contact email request failed", error);
    return NextResponse.json(
      {
        message:
          "Không thể gửi liên hệ lúc này. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email.",
      },
      { status: 502 },
    );
  }
}
