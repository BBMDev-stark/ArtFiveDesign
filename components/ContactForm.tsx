"use client";

import { type FormEvent, useRef, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClassName =
  "w-full border-b border-line bg-transparent py-3 text-charcoal outline-none transition-colors focus:border-bronze disabled:cursor-not-allowed disabled:opacity-60";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitState === "submitting") return;

    setSubmitState("submitting");
    setStatusMessage("Đang gửi thông tin liên hệ…");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      sector: String(formData.get("sector") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
      submissionId: crypto.randomUUID(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          result?.message ??
            "Không thể gửi liên hệ lúc này. Vui lòng thử lại sau.",
        );
      }

      formRef.current?.reset();
      setSubmitState("success");
      setStatusMessage(
        result?.message ??
          "Thông tin đã được gửi. ARTFIVE sẽ phản hồi bạn trong thời gian sớm nhất.",
      );
    } catch (error) {
      setSubmitState("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Không thể gửi liên hệ lúc này. Vui lòng thử lại sau.",
      );
    }
  }

  const isSubmitting = submitState === "submitting";

  return (
    <form
      ref={formRef}
      className="space-y-8"
      aria-label="Form liên hệ dự án"
      onSubmit={handleSubmit}
    >
      <div
        className="pointer-events-none absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow mb-3 block text-charcoal/50">
            Họ và Tên
          </label>
          <input
            id="name"
            name="name"
            type="text"
            minLength={2}
            maxLength={100}
            autoComplete="name"
            required
            disabled={isSubmitting}
            className={fieldClassName}
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="eyebrow mb-3 block text-charcoal/50"
          >
            Công ty
          </label>
          <input
            id="company"
            name="company"
            type="text"
            maxLength={150}
            autoComplete="organization"
            disabled={isSubmitting}
            className={fieldClassName}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="eyebrow mb-3 block text-charcoal/50">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            maxLength={254}
            autoComplete="email"
            required
            disabled={isSubmitting}
            className={fieldClassName}
          />
        </div>
        <div>
          <label htmlFor="phone" className="eyebrow mb-3 block text-charcoal/50">
            Số điện thoại
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            minLength={8}
            maxLength={20}
            pattern="[0-9+\s().-]{8,20}"
            title="Vui lòng nhập số điện thoại hợp lệ"
            inputMode="tel"
            autoComplete="tel"
            required
            disabled={isSubmitting}
            className={fieldClassName}
          />
        </div>
      </div>

      <div>
          <label
            htmlFor="sector"
            className="eyebrow mb-3 block text-charcoal/50"
          >
            Lĩnh vực Dự án
          </label>
          <select
            id="sector"
            name="sector"
            className={fieldClassName}
            defaultValue=""
            required
            disabled={isSubmitting}
          >
            <option value="" disabled>
              Chọn một
            </option>
            <option>Y tế</option>
            <option>Khách sạn &amp; Nhà hàng</option>
            <option>Văn phòng &amp; Doanh nghiệp</option>
            <option>Công nghiệp</option>
            <option>Căn hộ &amp; Biệt thự</option>
            <option>Quốc tế</option>
          </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="eyebrow mb-3 block text-charcoal/50"
        >
          Cho chúng tôi biết về dự án
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          minLength={10}
          maxLength={3000}
          required
          disabled={isSubmitting}
          className={`${fieldClassName} resize-none`}
        />
      </div>

      <div className="flex flex-col items-start gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="eyebrow inline-flex min-w-[170px] items-center justify-center border border-charcoal px-10 py-4 text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-ivory disabled:cursor-wait disabled:bg-charcoal disabled:text-ivory"
        >
          {isSubmitting ? "Đang gửi…" : "Gửi Liên hệ"}
        </button>

        {statusMessage ? (
          <p
            className={`max-w-xl text-sm leading-relaxed ${
              submitState === "error" ? "text-red-700" : "text-charcoal/65"
            }`}
            role={submitState === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {statusMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
