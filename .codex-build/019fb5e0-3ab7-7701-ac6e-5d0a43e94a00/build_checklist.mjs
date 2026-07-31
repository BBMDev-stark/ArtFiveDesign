import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const ROOT = "C:\\Users\\binhb\\Downloads\\artfive-design-website\\artfive-design";
const OUT_DIR = path.join(ROOT, "outputs", "019fb5e0-3ab7-7701-ac6e-5d0a43e94a00");
const OUT_FILE = path.join(OUT_DIR, "ARTFIVE_Website_Content_Checklist.xlsx");
const PREVIEW_DIR = path.join(OUT_DIR, "previews");

const C = {
  ink: "#1D1D1B",
  charcoal: "#30302D",
  bronze: "#A97745",
  champagne: "#D7B98C",
  ivory: "#F7F3EC",
  sand: "#EAE0D2",
  line: "#D7D0C7",
  green: "#DCEBDD",
  greenText: "#245B32",
  amber: "#FCE8C3",
  amberText: "#8A5314",
  red: "#F7D9D7",
  redText: "#8A2D2A",
  blue: "#DDEAF6",
  blueText: "#24547A",
  gray: "#ECECE9",
  grayText: "#555550",
  white: "#FFFFFF",
};

const addresses = [
  ["sih-hospital", "Bệnh viện Phụ sản Quốc tế Sài Gòn", "Quận 1, Thành phố Hồ Chí Minh", "63 Bùi Thị Xuân, Phường Bến Thành, Thành phố Hồ Chí Minh", "Đã xác minh", "Cao", "P0", "Cập nhật số nhà; xác nhận cách ghi phường theo địa giới hiện hành trước khi xuất bản.", "https://hochiminhcity.mfa.gov.sg/consular-services/list-of-hospitals/", "Nguồn chính thức ngoại giao ghi 63 Bùi Thị Xuân, Quận 1; tên phường mới cần kiểm tra lần cuối."],
  ["singapore-general-hospital", "Bệnh viện Đa khoa Singapore", "Singapore", "Singapore General Hospital, Outram Road, Singapore 169608", "Đã xác minh", "Cao", "P0", "Cập nhật đầy đủ đường và mã bưu chính.", "https://www.sgh.com.sg/about-sgh/who-we-are/medical-humanities/contact-us", "Địa chỉ trên website chính thức của SGH."],
  ["cpv-food-head-office", "Trụ sở CPV Food", "Bình Phước, Việt Nam", "Khu công nghiệp Becamex Bình Phước, phường Minh Thành, Chơn Thành, Bình Phước", "Đề xuất – cần xác nhận", "Trung bình", "P0", "Xin hồ sơ dự án/biên bản bàn giao để xác nhận lô đất hoặc số đường cụ thể.", "https://www.dnb.com/business-directory/company-profiles.cpv_food_coltd.35175b1db64a130d64c095ddd2452a33.html", "Nguồn công khai chỉ xác định đến KCN; URL D&B có thể đổi. Không tự điền số lô."],
  ["qualgo-technologies-office", "Văn phòng Qualgo Technologies Việt Nam", "An Phú, Quận 2, Thành phố Hồ Chí Minh", "Tầng 24, Tòa nhà Hallmark, 15 Trần Bạch Đằng, Phường Thủ Thiêm, Thành phố Hồ Chí Minh", "Đã xác minh", "Cao", "P0", "Chuẩn hóa tên tòa nhà, tầng và địa giới hiện hành.", "https://fiingate.vn/BusinessDirectory/CompanyDetail/2465075", "Mã nguồn đã có số 15 trong phần mô tả nhưng chưa đưa vào trường location."],
  ["pullman-hai-phong", "Pullman Hải Phòng — Khu vực sau", "Thành phố Hải Phòng", "Pullman Hai Phong Grand Hotel, số 12 Trần Phú, Phường Gia Viên, Hải Phòng 180000, Việt Nam", "Đã xác minh", "Cao", "P0", "Cập nhật theo trang liên hệ chính thức của khách sạn.", "https://www.pullman-haiphong-grand.com/custom-links/contact-us/", "Nguồn chính thức Pullman/Accor."],
  ["an-phu-gia-office", "Văn phòng An Phú Gia", "Quận Bình Thạnh, Thành phố Hồ Chí Minh", "Tòa nhà An Phú Gia, 178/11 Nguyễn Văn Thương, Phường Thạnh Mỹ Tây, Thành phố Hồ Chí Minh", "Đã xác minh", "Cao", "P0", "Cập nhật số nhà và tên tòa nhà.", "https://anphugia.com.vn/vi-VN/lien-he-1", "Website chính thức An Phú Gia dùng địa giới mới."],
  ["iris-partners-law-firm", "Văn phòng Luật Iris Partners", "Quận 1, Thành phố Hồ Chí Minh", "Unit A4-4.04, Tầng 5, Tòa A4, Vinhomes Golden River, 02 Tôn Đức Thắng, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh", "Đã xác minh", "Cao", "P0", "Dùng địa chỉ trên website chính thức; xác nhận đây đúng văn phòng do ARTFIVE thực hiện.", "https://www.irispartnersgroup.com/", "Địa chỉ tổ chức đã xác minh; mối liên hệ với dự án vẫn cần hồ sơ nội bộ."],
  ["cp-lab-thailand-office", "Văn phòng C.P. Lab Thái Lan", "Bình Phước, Việt Nam", "Khu công nghiệp Becamex Bình Phước, phường Minh Thành, Chơn Thành, Bình Phước — cần xác nhận số lô", "Đề xuất – cần xác nhận", "Trung bình", "P0", "Đối chiếu bản vẽ/hợp đồng C.P. Lab để lấy số lô và tên pháp nhân.", "https://www.dnb.com/business-directory/company-profiles.cpv_food_coltd.35175b1db64a130d64c095ddd2452a33.html", "Không có nguồn công khai định danh riêng C.P. Lab; không nên suy diễn từ CPV Food."],
  ["himlam-tan-hung-villa", "Biệt thự Him Lam Tân Hưng", "Quận 7, Thành phố Hồ Chí Minh", "Khu dân cư Him Lam Tân Hưng, 01 Nguyễn Thị Thập, Phường Tân Hưng, Quận 7, Thành phố Hồ Chí Minh (không công bố số căn nếu chưa có đồng ý)", "Đề xuất – cần xác nhận", "Trung bình", "P0", "Xác nhận địa chỉ khu; áp dụng nguyên tắc bảo mật cho số căn biệt thự riêng.", "https://greenhouseagency.vn/en/nha-pho/cho-thue-nha-khu-dan-cu-him-lam-tan-hung-quan-7-nha-rong-co-thang-may.html", "Nguồn thứ cấp cho địa chỉ khu; số căn phải do khách hàng cung cấp và cho phép công bố."],
  ["unilever-office", "Văn phòng Unilever", "Bắc Ninh, Việt Nam", "Số 1, Đường 12, Khu công nghiệp, đô thị và dịch vụ VSIP Bắc Ninh, xã Đại Đồng, Bắc Ninh, Việt Nam — cần xác nhận đúng hạng mục văn phòng", "Đề xuất – cần xác nhận", "Trung bình", "P0", "Xin hồ sơ dự án vì nguồn công khai có địa chỉ khác nhau trong VSIP.", "https://www.dnb.com/business-directory/company-profiles.unilever_vietnam_international_company_limited-_branch.c77bd3a15c0747da726a30c72021b733.html", "Có nguồn khác ghi số 19 Đường 07; chưa đủ cơ sở chọn một địa chỉ để xuất bản."],
  ["eco-green-view-apartment", "Căn hộ Eco Green View", "Quận 7, Thành phố Hồ Chí Minh", "Eco Green Sài Gòn, 107 Nguyễn Văn Linh, Phường Tân Thuận, Quận 7, Thành phố Hồ Chí Minh — cần xác nhận lại tên dự án/căn hộ", "Đề xuất – cần xác nhận", "Trung bình", "P0", "Xác nhận dự án có phải Eco Green Sài Gòn; nếu đúng, sửa tên 'Eco Green View'.", "https://ecogreensaigon.com.vn/", "Tên hiện tại có khả năng nhầm; ảnh và vị trí cần đối chiếu hồ sơ thiết kế."],
  ["maple-land", "Maple Land", "Quận 2, Thành phố Hồ Chí Minh", "Chưa đủ dữ liệu để xác định địa chỉ công khai", "Chưa đủ dữ liệu", "Thấp", "P0", "Yêu cầu hợp đồng/bản vẽ/title block hoặc pin Google Maps từ quản lý dự án.", "", "Tên dự án quá chung; không nên gán địa chỉ của doanh nghiệp trùng tên."],
  ["my-mother-restaurant", "Nhà hàng Mẹ Tôi", "Quận 1, Thành phố Hồ Chí Minh", "Chưa đủ dữ liệu để xác định đúng cơ sở nhà hàng", "Chưa đủ dữ liệu", "Thấp", "P0", "Yêu cầu địa chỉ trên hợp đồng, hóa đơn hoặc hồ sơ bàn giao.", "", "Có nhiều địa điểm trùng/tương tự tên; cần bằng chứng nội bộ."],
  ["shrimp-hatchery-kien-giang", "SHRIMP HATCHERY C.P. GROUP - THAILAND", "Kiên Giang, Việt Nam", "Chưa đủ dữ liệu; nguồn pháp nhân liên quan ghi Lô C7-53 Lê Vĩnh Hòa, Rạch Giá nhưng chưa chứng minh là trại giống", "Chưa đủ dữ liệu", "Thấp", "P0", "Xin hồ sơ dự án để xác định đúng trại giống, xã/huyện và số lô.", "https://crm.vinacert.vn/vi/home/product/VietGAP-CN-12-01-91-0001-32/027d94be-a0cb-4316-bb92-df7b2673bde9", "Không dùng địa chỉ chi nhánh thay cho địa điểm công trình nếu chưa có chứng cứ."],
  ["park-legend-apartment", "Căn hộ Park Legend", "Quận Tân Bình, Thành phố Hồ Chí Minh", "Park Legend, 251 Hoàng Văn Thụ, Phường 2, Quận Tân Bình, Thành phố Hồ Chí Minh", "Đã xác minh", "Cao", "P0", "Cập nhật số nhà; cân nhắc chuẩn hóa tên phường theo địa giới mới.", "https://parklegend.vn/", "Website dự án công bố trực tiếp địa chỉ."],
  ["cp-dormitory-bien-hoa", "DORMITORY C.P. BIÊN HÒA C.P. GROUP - THAILAND", "Biên Hòa, Việt Nam", "Khuôn viên C.P. Việt Nam, số 2 Đường 2A, KCN Biên Hòa II, Đồng Nai — cần xác nhận khu ký túc xá", "Đề xuất – cần xác nhận", "Trung bình", "P0", "Đối chiếu bản vẽ/hợp đồng để xác nhận ký túc xá nằm tại trụ sở này.", "https://www.cp.com.vn/Data/Sites/1/media/PDF/An%20pham%20ben%20vung%20cuon%202.pdf", "Nguồn chính thức C.P. xác nhận trụ sở; chưa xác nhận chính xác hạng mục dormitory."],
  ["cp-hanoi-office", "Văn phòng C.P. Hà Nội", "Hà Nội, Việt Nam", "Chưa đủ dữ liệu để phân biệt văn phòng với các nhà máy/chi nhánh C.P. tại Chương Mỹ", "Chưa đủ dữ liệu", "Thấp", "P0", "Yêu cầu mã dự án hoặc hồ sơ bàn giao; C.P. có nhiều cơ sở tại Hà Nội.", "https://datafiles.hanoi.gov.vn/gov-hni/6249/VanBan/2026/5/25/KH-201-2026.pdf", "Không chọn một cơ sở C.P. ngẫu nhiên chỉ dựa trên thành phố."],
  ["concept-ho2-cp-group", "Concept H.O. 2", "Biên Hòa, Việt Nam", "Khả năng thuộc khuôn viên C.P. Việt Nam, số 2 Đường 2A, KCN Biên Hòa II, Đồng Nai — cần xác nhận", "Đề xuất – cần xác nhận", "Trung bình", "P0", "Xin title block/bản vẽ và ảnh hiện trạng để xác nhận địa điểm.", "https://www.cp.com.vn/Data/Sites/1/media/PDF/An%20pham%20ben%20vung%20cuon%202.pdf", "Ba ảnh hiện có là phối cảnh 3D, không phải ảnh công trình hoàn thành."],
  ["art-five-furniture-workshop", "Xưởng Nội thất ARTFIVE", "Phường Long Bình, Thành phố Thủ Đức", "313 Phước Thiện, Phường Long Bình, Thành phố Hồ Chí Minh", "Đã xác minh nội bộ", "Cao", "P0", "Xác nhận lại giấy tờ cơ sở/xưởng trước khi công bố là địa điểm dự án.", "", "Địa chỉ lấy từ dữ liệu công ty trong mã nguồn và ảnh tham chiếu; chưa tìm thấy nguồn độc lập công khai."],
];

const contacts = [
  ["Trụ sở chính", "Footer + Trang Liên hệ", "143 Hồ Văn Huê, Phường 9, Quận Phú Nhuận, Thành phố Hồ Chí Minh", "Tạm giữ 143 Hồ Văn Huê; nếu dùng địa giới mới: 143 Hồ Văn Huê, Phường Đức Nhuận, Thành phố Hồ Chí Minh", "Cần xác nhận pháp lý", "P0", "Yêu cầu GCN ĐKDN/Thông báo thuế mới nhất. Chỉ sửa sau khi giải quyết mâu thuẫn 143 Hồ Văn Huê ↔ 778/2 Nguyễn Kiệm.", "https://nangluchdxd.xaydung.gov.vn/Tochuc/chitiet/280175", "Nguồn Bộ Xây dựng ghi 143 Hồ Văn Huê; một nguồn thuế tổng hợp cập nhật 2026 lại ghi 778/2 Nguyễn Kiệm."],
  ["Văn phòng chi nhánh", "Footer + Trang Liên hệ", "Tầng 4, Tòa C, Căn 26–27, Charmington La Pointe, 181 Cao Thắng, Phường 12, Quận 10, TP.HCM", "Giữ nguyên cấu trúc; xác nhận tên phường mới và tình trạng hoạt động của văn phòng", "Cần xác nhận pháp lý", "P0", "Đối chiếu giấy phép văn phòng đại diện/chi nhánh; kiểm tra số căn 26–27 và Block/Tòa C.", "https://art5ai.edu.vn/", "Website Art Five AI xác nhận Unit 26–27, Block C, 4/F, 181 Cao Thắng nhưng không thay thế hồ sơ pháp lý."],
  ["Xưởng nội thất", "Trang Liên hệ", "313 Phước Thiện, Phường Long Bình, Thành phố Thủ Đức", "313 Phước Thiện, Phường Long Bình, Thành phố Hồ Chí Minh", "Cần xác nhận", "P0", "Xác nhận cách ghi địa giới mới và quyền công bố địa chỉ xưởng.", "", "Footer hiện không hiển thị xưởng; ảnh 2 yêu cầu trang Liên hệ phải có."],
  ["Email", "Footer + Trang Liên hệ", "hello@art5design.com", "hello@art5design.com", "Kiểm tra kỹ thuật", "P1", "Gửi email thử; kiểm tra SPF/DKIM/DMARC và mailto.", "mailto:hello@art5design.com", "Giữ thống nhất toàn site."],
  ["Website", "Footer + Trang Liên hệ", "art5corp.com", "https://art5corp.com", "Kiểm tra kỹ thuật", "P1", "Kiểm tra HTTPS, redirect www/non-www và link mở đúng.", "https://art5corp.com", "Nên lưu URL đầy đủ trong href nhưng hiển thị ngắn gọn."],
  ["Nhãn khu vực", "Trang Liên hệ", "TRỤ SỞ CHÍNH / VĂN PHÒNG CHI NHÁNH / XƯỞNG NỘI THẤT / LIÊN HỆ TRỰC TIẾP", "Giữ đúng 4 nhóm như ảnh tham chiếu", "Đạt cấu trúc", "P1", "Kiểm tra responsive và thứ tự trên mobile.", "", "Mã nguồn hiện đã có đủ 4 nhóm."],
  ["Nội dung Footer", "Footer", "Trụ sở + chi nhánh + email + website", "Tối thiểu phải có trụ sở và chi nhánh như Hình 1; email/website có thể giữ để tăng khả năng liên hệ", "Đạt cấu trúc", "P1", "Đảm bảo dữ liệu dùng chung từ một nguồn; không hard-code lặp.", "", "Mã nguồn đang dùng company.* nên tính nhất quán tốt."],
  ["Số điện thoại", "Footer + Trang Liên hệ", "Không hiển thị", "Cần quyết định có công bố hotline hay không", "Cần quyết định", "P2", "Nếu thêm, xác nhận số thuộc doanh nghiệp và giờ tiếp nhận.", "", "Ảnh tham chiếu không yêu cầu số điện thoại."],
];

const imageChecklist = [
  ["Biệt thự Tân Hưng", "V-01", "Toàn cảnh chính diện — thấy rõ toàn nhà", "Bắt buộc; tương đương vai trò Hình 3", "/images/villatanhung.webp", "3D render ghép ngày/đêm", "Có render – cần duyệt", "Tối thiểu 2400 px; không crop mái/cổng; không watermark giữa ảnh; xác nhận đây đúng thiết kế.", "Đây là ảnh hiện tại phù hợp nhất về bố cục toàn nhà."],
  ["Biệt thự Tân Hưng", "V-02", "Góc 3/4 toàn khối công trình", "Bắt buộc", "", "", "Thiếu", "Thấy mặt tiền + chiều sâu; 4:3 hoặc 3:2; ánh sáng tự nhiên.", "Không dùng villa-hero-ai.jpg hoặc villa-hero-isolated.webp vì khác công trình."],
  ["Biệt thự Tân Hưng", "V-03", "Mặt tiền/cổng và tầng dưới", "Bắt buộc", "/images/villatanhung5.webp", "3D render ghép ngày/đêm", "Có render – cần duyệt", "Khung ngang; chi tiết cổng rõ; màu nhất quán.", ""],
  ["Biệt thự Tân Hưng", "V-04", "Trục vào/cổng phụ", "Nên có", "/images/villatanhung2.webp", "3D render ghép ngày/đêm", "Có render – cần duyệt", "Không trùng góc; thể hiện trải nghiệm tiếp cận.", ""],
  ["Biệt thự Tân Hưng", "V-05", "Sân trong/cảnh quan", "Bắt buộc", "/images/villatanhung1.webp", "3D render ghép ngày/đêm", "Có render – cần duyệt", "Cân bằng kiến trúc và cảnh quan; tránh logo lớn.", ""],
  ["Biệt thự Tân Hưng", "V-06", "Tiểu cảnh nước/giếng trời", "Nên có", "/images/villatanhung3.webp", "3D render ghép ngày/đêm", "Có render – cần duyệt", "Thấy rõ vật liệu, ánh sáng và điểm nhấn nước.", ""],
  ["Biệt thự Tân Hưng", "V-07", "Cửa chính/cầu thang/chi tiết lối vào", "Nên có", "/images/villatanhung4.webp", "3D render ghép ngày/đêm", "Có render – cần duyệt", "Không quá cận; phải có ngữ cảnh kiến trúc.", ""],
  ["Biệt thự Tân Hưng", "V-08", "Công trình trong bối cảnh đường/khu dân cư", "Bắt buộc nếu có ảnh thực tế", "", "", "Thiếu", "Thấy ranh khuôn viên và tỷ lệ công trình; loại biển số/chi tiết riêng tư.", ""],
  ["Biệt thự Tân Hưng", "V-09", "Blue-hour/ban đêm toàn nhà", "Nên có", "", "", "Thiếu", "Đủ sáng, giữ chi tiết vùng tối; không dùng ảnh AI.", ""],
  ["Biệt thự Tân Hưng", "V-10", "Vật liệu/chiếu sáng kiến trúc", "Nên có", "", "", "Thiếu", "Một khung chi tiết có giá trị thiết kế, không lặp V-06/V-07.", ""],
  ["Concept H.O. 2", "H-01", "Ảnh thực tế toàn mặt đứng", "Bắt buộc", "/images/h2o1.webp", "3D render tham chiếu", "Có render – thiếu ảnh thực tế", "Ảnh chụp công trình hoàn thành; ngang ≥2400 px; thấy đầy đủ mặt đứng.", "Render không được ghi là ảnh thực tế."],
  ["Concept H.O. 2", "H-02", "Ảnh thực tế góc 3/4", "Bắt buộc", "/images/h2o2.webp", "3D render tham chiếu", "Có render – thiếu ảnh thực tế", "Thể hiện khối tích, lối vào và bối cảnh.", ""],
  ["Concept H.O. 2", "H-03", "Ảnh thực tế mặt đứng còn lại", "Nên có", "/images/h2o3.webp", "3D render tham chiếu", "Có render – thiếu ảnh thực tế", "Đối chiếu được thiết kế và hiện trạng thi công.", ""],
  ["Concept H.O. 2", "H-04", "Sảnh/lễ tân", "Bắt buộc", "", "", "Thiếu", "Không gian hoàn thiện, ánh sáng cân bằng, không có thông tin nhạy cảm.", ""],
  ["Concept H.O. 2", "H-05", "Không gian làm việc mở", "Bắt buộc", "", "", "Thiếu", "Thể hiện layout, vật liệu và ánh sáng; xin phép người xuất hiện.", ""],
  ["Concept H.O. 2", "H-06", "Phòng họp/khu cộng tác", "Nên có", "", "", "Thiếu", "Thể hiện công năng và nhận diện thương hiệu.", ""],
  ["Concept H.O. 2", "H-07", "Chi tiết vật liệu/đồ nội thất", "Nên có", "", "", "Thiếu", "Ảnh cận có chủ đích; màu trung thực.", ""],
  ["Concept H.O. 2", "H-08", "Không gian có người sử dụng", "Tùy chọn", "", "", "Thiếu", "Có release/đồng ý sử dụng hình ảnh; không lộ dữ liệu màn hình.", ""],
];

const tasks = [
  ["T01", "Pháp lý & liên hệ", "Chốt địa chỉ trụ sở ARTFIVE đang mâu thuẫn giữa các nguồn công khai", "P0", "Khách hàng", "Chưa bắt đầu", "GCN ĐKDN/Thông báo thuế mới nhất", "Một địa chỉ pháp lý duy nhất được phê duyệt bằng văn bản.", "lib/data.ts; nguồn Bộ Xây dựng; nguồn thuế", "Không tự chọn theo nguồn tổng hợp."],
  ["T02", "Dữ liệu dự án", "Xác minh và cập nhật địa chỉ của đủ 19 dự án theo sheet 01", "P0", "Content", "Đang rà soát", "Hồ sơ dự án + phê duyệt khách hàng", "19/19 dòng có trạng thái Đã xác minh hoặc quyết định ẩn chi tiết.", "01_Địa chỉ dự án", "Ưu tiên các dự án đang ghi chỉ đến quận/tỉnh."],
  ["T03", "Footer", "Cập nhật phần Liên hệ theo Hình 1 và dữ liệu đã duyệt", "P0", "Dev", "Chờ dữ liệu", "T01 + xác nhận chi nhánh", "Desktop/mobile hiển thị đủ trụ sở + chi nhánh; không sai dòng, không link hỏng.", "components/Footer.tsx", "Dữ liệu đang dùng company.* nên chỉ cần sửa nguồn chung."],
  ["T04", "Trang Liên hệ", "Hiển thị đủ 4 nhóm thông tin như Hình 2", "P0", "Dev", "Chờ dữ liệu", "T01 + xác nhận xưởng", "Đủ trụ sở, chi nhánh, xưởng, email, website; đúng thứ tự; responsive đạt.", "app/contact/page.tsx", "Cấu trúc hiện đã đủ, trọng tâm là độ chính xác dữ liệu."],
  ["T05", "Ảnh Biệt thự Tân Hưng", "Hoàn thiện bộ khoảng 10 ảnh, có ít nhất 1 ảnh thấy rõ toàn nhà", "P0", "Photo/3D", "Thiếu tài sản", "Phê duyệt art direction + quyền sử dụng", "10 ảnh không trùng lặp; V-01 đạt; không dùng ảnh AI sai công trình.", "public/images/villatanhung*.webp", "Hiện có 6 render; thiếu ít nhất 4 góc."],
  ["T06", "Ảnh Concept H.O. 2", "Thu thập ảnh chụp thực tế thay cho 3 phối cảnh hiện có", "P0", "Photo", "Thiếu tài sản", "Xác nhận công trình đã hoàn thành + quyền chụp", "Tối thiểu 6–8 ảnh thực tế; hero + ngoại thất + nội thất; metadata bản quyền rõ.", "public/images/h2o1.webp…h2o3.webp", "Ba file hiện có đều là render."],
  ["T07", "Tên dự án", "Xác nhận 'Eco Green View' có phải 'Eco Green Sài Gòn'", "P0", "Content", "Chưa bắt đầu", "Hợp đồng/bản vẽ/title block", "Tên dự án, địa chỉ và ảnh khớp cùng một công trình.", "lib/data.ts", "Rủi ro sai tên thương mại."],
  ["T08", "Kiểm soát hình ảnh", "Loại khỏi luồng xuất bản hai ảnh villa AI không khớp công trình", "P0", "Dev", "Chưa bắt đầu", "Không", "villa-hero-ai.jpg và villa-hero-isolated.webp không được dùng cho Tân Hưng.", "public/images/villa-hero-ai.jpg; villa-hero-isolated.webp", "Có thể lưu nội bộ nhưng phải ghi nhãn rõ AI/không thuộc dự án."],
  ["T09", "Bảo mật", "Định nghĩa mức chi tiết địa chỉ cho biệt thự/căn hộ tư nhân", "P0", "Khách hàng", "Chưa bắt đầu", "Phê duyệt chủ nhà/chủ đầu tư", "Không công bố số căn/số nhà riêng nếu chưa có đồng ý bằng văn bản.", "Sheet 01", "Nên công bố địa chỉ dự án/khu dân cư thay vì địa chỉ căn cụ thể."],
  ["T10", "QA nội dung", "Kiểm tra chính tả, dấu tiếng Việt, link và alt text sau cập nhật", "P1", "QA", "Chưa bắt đầu", "T02–T08 hoàn tất", "Không lỗi chính tả; mọi link 200/redirect hợp lệ; alt text mô tả đúng ảnh.", "Toàn website", "Đặc biệt kiểm tra tên C.P., Pullman, Qualgo và địa giới."],
];

const sources = [
  ["S01", "Mã nguồn website", "Dữ liệu công ty, 19 dự án, footer, trang liên hệ, gallery", "Nội bộ", "Cao cho hiện trạng; không phải bằng chứng pháp lý", "lib/data.ts; components/Footer.tsx; app/contact/page.tsx", "2026-07-31"],
  ["S02", "Singapore MFA HCMC", "Địa chỉ SIH", "Chính thức", "Cao", "https://hochiminhcity.mfa.gov.sg/consular-services/list-of-hospitals/", "2026-07-31"],
  ["S03", "Singapore General Hospital", "Địa chỉ SGH", "Chính thức", "Cao", "https://www.sgh.com.sg/about-sgh/who-we-are/medical-humanities/contact-us", "2026-07-31"],
  ["S04", "Pullman Hai Phong", "Địa chỉ khách sạn", "Chính thức", "Cao", "https://www.pullman-haiphong-grand.com/custom-links/contact-us/", "2026-07-31"],
  ["S05", "An Phú Gia", "Địa chỉ tòa nhà/văn phòng", "Chính thức", "Cao", "https://anphugia.com.vn/vi-VN/lien-he-1", "2026-07-31"],
  ["S06", "Iris Partners", "Địa chỉ văn phòng", "Chính thức", "Cao", "https://www.irispartnersgroup.com/", "2026-07-31"],
  ["S07", "Park Legend", "Địa chỉ dự án", "Website dự án", "Cao", "https://parklegend.vn/", "2026-07-31"],
  ["S08", "C.P. Việt Nam", "Địa chỉ trụ sở Biên Hòa", "Chính thức", "Cao cho trụ sở; trung bình cho hạng mục dự án", "https://www.cp.com.vn/Data/Sites/1/media/PDF/An%20pham%20ben%20vung%20cuon%202.pdf", "2026-07-31"],
  ["S09", "Cục quản lý HĐXD — Bộ Xây dựng", "Địa chỉ trụ sở ARTFIVE/chứng chỉ", "Chính thức", "Cao", "https://nangluchdxd.xaydung.gov.vn/Tochuc/chitiet/280175", "2026-07-31"],
  ["S10", "Thư viện Pháp luật — MST 0309190959", "Địa chỉ ARTFIVE theo địa giới mới", "Tổng hợp dữ liệu công", "Trung bình", "https://thuvienphapluat.vn/ma-so-thue/cong-ty-co-phan-thiet-ke-nghe-thuat-so-nam-mst-0309190959.html", "2026-07-31"],
  ["S11", "Mã số thuế — MST 0309190959", "Nguồn mâu thuẫn ghi 778/2 Nguyễn Kiệm", "Tổng hợp dữ liệu công", "Trung bình", "https://masothue.com/0309190959-cong-ty-co-phan-thiet-ke-nghe-thuat-so-nam", "2026-07-31"],
  ["S12", "Qualgo — FiinGate", "Địa chỉ doanh nghiệp", "Cơ sở dữ liệu doanh nghiệp", "Trung bình–cao", "https://fiingate.vn/BusinessDirectory/CompanyDetail/2465075", "2026-07-31"],
  ["S13", "Eco Green Sài Gòn", "Địa chỉ và tên dự án", "Website dự án/đơn vị phân phối", "Trung bình", "https://ecogreensaigon.com.vn/", "2026-07-31"],
  ["S14", "D&B", "Địa chỉ CPV Food và Unilever Bắc Ninh", "Cơ sở dữ liệu doanh nghiệp", "Trung bình", "https://www.dnb.com/", "2026-07-31"],
  ["S15", "Ảnh tham chiếu người dùng", "Yêu cầu footer, trang liên hệ và hero toàn công trình", "Nội bộ", "Cao cho yêu cầu thiết kế", "codex-clipboard-878a…png; 4767…png; 77f4…png", "2026-07-31"],
];

const wb = Workbook.create();
const overview = wb.worksheets.add("Tổng quan");
const addr = wb.worksheets.add("01_Địa chỉ dự án");
const contact = wb.worksheets.add("02_Liên hệ");
const images = wb.worksheets.add("03_Tài sản ảnh");
const deploy = wb.worksheets.add("04_Checklist triển khai");
const source = wb.worksheets.add("05_Nguồn & quy ước");

for (const s of [overview, addr, contact, images, deploy, source]) {
  s.showGridLines = false;
}

function titleBand(sheet, title, subtitle, endCol) {
  sheet.getRange(`A1:${endCol}1`).merge();
  sheet.getRange("A1").values = [[title]];
  sheet.getRange(`A1:${endCol}1`).format = {
    fill: C.ink,
    font: { name: "Aptos Display", size: 20, bold: true, color: C.ivory },
    rowHeight: 34,
    verticalAlignment: "center",
  };
  sheet.getRange(`A2:${endCol}2`).merge();
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange(`A2:${endCol}2`).format = {
    fill: C.ivory,
    font: { name: "Aptos", size: 10, italic: true, color: C.grayText },
    rowHeight: 28,
    verticalAlignment: "center",
    wrapText: true,
    borders: { bottom: { style: "thin", color: C.champagne } },
  };
}

function header(range) {
  range.format = {
    fill: C.charcoal,
    font: { name: "Aptos", size: 10, bold: true, color: C.white },
    verticalAlignment: "center",
    wrapText: true,
    rowHeight: 31,
    borders: { bottom: { style: "medium", color: C.bronze } },
  };
}

function body(range) {
  range.format = {
    font: { name: "Aptos", size: 9, color: C.ink },
    verticalAlignment: "top",
    wrapText: true,
    borders: { insideHorizontal: { style: "thin", color: C.line } },
  };
}

function statusFormatting(range) {
  range.conditionalFormats.add("containsText", { text: "Đã xác minh", format: { fill: C.green, font: { color: C.greenText, bold: true } } });
  range.conditionalFormats.add("containsText", { text: "Đạt", format: { fill: C.green, font: { color: C.greenText, bold: true } } });
  range.conditionalFormats.add("containsText", { text: "Có render", format: { fill: C.amber, font: { color: C.amberText, bold: true } } });
  range.conditionalFormats.add("containsText", { text: "Đề xuất", format: { fill: C.amber, font: { color: C.amberText, bold: true } } });
  range.conditionalFormats.add("containsText", { text: "Cần", format: { fill: C.amber, font: { color: C.amberText, bold: true } } });
  range.conditionalFormats.add("containsText", { text: "Thiếu", format: { fill: C.red, font: { color: C.redText, bold: true } } });
  range.conditionalFormats.add("containsText", { text: "Chưa", format: { fill: C.red, font: { color: C.redText, bold: true } } });
}

// Overview
titleBand(overview, "ARTFIVE — WEBSITE CONTENT CHECKLIST", "Bản kiểm kê và kế hoạch xác minh nội dung · Lập ngày 31/07/2026 · Google Sheets-ready", "J");
overview.getRange("A4:B4").merge(); overview.getRange("A4").values = [["TỔNG DỰ ÁN"]];
overview.getRange("C4:D4").merge(); overview.getRange("C4").values = [["ĐÃ XÁC MINH"]];
overview.getRange("E4:F4").merge(); overview.getRange("E4").values = [["CẦN XÁC NHẬN / THIẾU"]];
overview.getRange("G4:H4").merge(); overview.getRange("G4").values = [["ẢNH CÒN THIẾU"]];
overview.getRange("I4:J4").merge(); overview.getRange("I4").values = [["TASK P0 CHƯA XONG"]];
overview.getRange("A5:B6").merge(); overview.getRange("A5").formulas = [["=COUNTA('01_Địa chỉ dự án'!$C$5:$C$23)"]];
overview.getRange("C5:D6").merge(); overview.getRange("C5").formulas = [["=COUNTIF('01_Địa chỉ dự án'!$G$5:$G$23,\"Đã xác minh\")+COUNTIF('01_Địa chỉ dự án'!$G$5:$G$23,\"Đã xác minh nội bộ\")"]];
overview.getRange("E5:F6").merge(); overview.getRange("E5").formulas = [["=A5-C5"]];
overview.getRange("G5:H6").merge(); overview.getRange("G5").formulas = [["=COUNTIF('03_Tài sản ảnh'!$G$5:$G$22,\"Thiếu\")+COUNTIF('03_Tài sản ảnh'!$G$5:$G$22,\"Có render – thiếu ảnh thực tế\")"]];
overview.getRange("I5:J6").merge(); overview.getRange("I5").formulas = [["=COUNTIFS('04_Checklist triển khai'!$D$5:$D$14,\"P0\",'04_Checklist triển khai'!$F$5:$F$14,\"<>Hoàn tất\")"]];
overview.getRange("A4:J4").format = { fill: C.sand, font: { bold: true, color: C.charcoal, size: 9 }, horizontalAlignment: "center", verticalAlignment: "center", rowHeight: 24 };
overview.getRange("A5:J6").format = { fill: C.white, font: { bold: true, color: C.bronze, size: 22 }, horizontalAlignment: "center", verticalAlignment: "center", borders: { preset: "outside", style: "thin", color: C.line } };
overview.getRange("A8:J8").merge(); overview.getRange("A8").values = [["KẾT LUẬN CHUYÊN GIA"]];
overview.getRange("A8:J8").format = { fill: C.charcoal, font: { bold: true, color: C.white, size: 11 }, rowHeight: 25, verticalAlignment: "center" };
overview.getRange("A9:J13").values = [
  ["Ưu tiên 1", "Khóa dữ liệu pháp lý", "Trụ sở ARTFIVE có nguồn công khai mâu thuẫn 143 Hồ Văn Huê ↔ 778/2 Nguyễn Kiệm. Phải lấy giấy tờ mới nhất trước khi sửa footer/contact.", "", "", "", "", "", "", ""],
  ["Ưu tiên 2", "Địa chỉ 19 dự án", "Chỉ 8 mục có thể xác minh ở mức cao từ nguồn công khai/nội bộ. Các dự án riêng tư hoặc tên quá chung phải xin hồ sơ dự án.", "", "", "", "", "", "", ""],
  ["Ưu tiên 3", "Biệt thự Tân Hưng", "Kho hiện có 6 phối cảnh render; cần thêm tối thiểu 4 góc để đủ bộ khoảng 10 ảnh. Ảnh toàn nhà đã có nhưng là ảnh ghép ngày/đêm.", "", "", "", "", "", "", ""],
  ["Ưu tiên 4", "Concept H.O. 2", "Ba ảnh hiện tại đều là phối cảnh 3D. Cần bộ ảnh chụp thực tế tối thiểu 6–8 tấm trước khi gọi là công trình hoàn thành.", "", "", "", "", "", "", ""],
  ["Cảnh báo", "Ảnh AI sai công trình", "villa-hero-ai.jpg và villa-hero-isolated.webp không khớp Biệt thự Tân Hưng; không dùng để thay ảnh hero dự án.", "", "", "", "", "", "", ""],
];
for (let r = 9; r <= 13; r++) {
  overview.getRange(`A${r}:B${r}`).format = { fill: r === 13 ? C.red : C.ivory, font: { bold: true, color: r === 13 ? C.redText : C.bronze }, verticalAlignment: "top", wrapText: true };
  overview.getRange(`C${r}:J${r}`).merge();
}
overview.getRange("A9:J13").format.wrapText = true;
overview.getRange("A9:J13").format.rowHeight = 42;
overview.getRange("A9:J13").format.borders = { insideHorizontal: { style: "thin", color: C.line } };
overview.getRange("A15:J15").merge(); overview.getRange("A15").values = [["QUY TRÌNH DUYỆT ĐỀ XUẤT"]];
overview.getRange("A15:J15").format = { fill: C.charcoal, font: { bold: true, color: C.white, size: 11 }, rowHeight: 25, verticalAlignment: "center" };
overview.getRange("A16:J19").values = [
  ["1", "Content điền bằng chứng/hồ sơ", "", "2", "Khách hàng xác nhận dữ liệu & quyền công bố", "", "3", "Dev cập nhật nguồn dữ liệu chung", "", ""],
  ["4", "QA đối chiếu desktop/mobile", "", "5", "Kiểm tra link, alt text, chính tả", "", "6", "Duyệt cuối và phát hành", "", ""],
  ["Nguyên tắc", "Không biến suy đoán thành địa chỉ chính thức; mỗi địa chỉ phải có nguồn hoặc phê duyệt.", "", "", "", "", "", "", "", ""],
  ["Bảo mật", "Với biệt thự/căn hộ riêng: ưu tiên địa chỉ khu/dự án, không công bố số căn nếu chưa có đồng ý.", "", "", "", "", "", "", "", ""],
];
overview.getRange("A16:J17").format = { fill: C.ivory, font: { color: C.ink, size: 10 }, wrapText: true, verticalAlignment: "center", rowHeight: 36, borders: { insideHorizontal: { style: "thin", color: C.line } } };
overview.getRange("A18:J19").format = { fill: C.blue, font: { color: C.blueText, bold: true, size: 10 }, wrapText: true, verticalAlignment: "center", rowHeight: 34 };
overview.getRange("B18:J18").merge(); overview.getRange("B19:J19").merge();
overview.freezePanes.freezeRows(2);
overview.getRange("A1:J19").format.columnWidth = 14;
overview.getRange("A:A").format.columnWidth = 11;
overview.getRange("B:B").format.columnWidth = 22;
overview.getRange("C:J").format.columnWidth = 14;

// Project address sheet
titleBand(addr, "01 — ĐỊA CHỈ 19 DỰ ÁN", "Cột F thể hiện đúng yêu cầu “thông tin hiện tại → thông tin chính xác/đề xuất”. Không xuất bản dòng chưa xác minh.", "L");
addr.getRange("A4:L4").values = [[
  "STT", "Slug", "Dự án", "Thông tin hiện tại", "Thông tin chính xác / đề xuất", "Hiện tại → đề xuất",
  "Trạng thái", "Độ tin cậy", "Ưu tiên", "Hành động cần làm", "Nguồn URL", "Ghi chú"
]];
header(addr.getRange("A4:L4"));
addr.getRange(`A5:L${4 + addresses.length}`).values = addresses.map((x, i) => [i + 1, x[0], x[1], x[2], x[3], "", x[4], x[5], x[6], x[7], x[8], x[9]]);
addr.getRange("F5").formulas = [["=D5&\" → \"&E5"]];
addr.getRange(`F5:F${4 + addresses.length}`).fillDown();
body(addr.getRange(`A5:L${4 + addresses.length}`));
addr.getRange(`A5:A${4 + addresses.length}`).format.horizontalAlignment = "center";
addr.getRange(`G5:I${4 + addresses.length}`).format.horizontalAlignment = "center";
addr.getRange(`G5:G${4 + addresses.length}`).dataValidation = { rule: { type: "list", values: ["Đã xác minh", "Đã xác minh nội bộ", "Đề xuất – cần xác nhận", "Chưa đủ dữ liệu"] } };
addr.getRange(`H5:H${4 + addresses.length}`).dataValidation = { rule: { type: "list", values: ["Cao", "Trung bình", "Thấp"] } };
addr.getRange(`I5:I${4 + addresses.length}`).dataValidation = { rule: { type: "list", values: ["P0", "P1", "P2"] } };
statusFormatting(addr.getRange(`G5:G${4 + addresses.length}`));
addr.getRange(`I5:I${4 + addresses.length}`).conditionalFormats.add("containsText", { text: "P0", format: { fill: C.red, font: { color: C.redText, bold: true } } });
const addrTable = addr.tables.add(`A4:L${4 + addresses.length}`, true, "ProjectAddressChecklist");
addrTable.style = "TableStyleMedium2";
addr.freezePanes.freezeRows(4); addr.freezePanes.freezeColumns(3);
const addrWidths = [7, 25, 29, 28, 43, 55, 22, 14, 9, 42, 38, 40];
addrWidths.forEach((w, i) => addr.getRangeByIndexes(0, i, 1, 1).format.columnWidth = w);
addr.getRange(`A5:L${4 + addresses.length}`).format.rowHeight = 76;

// Contact sheet
titleBand(contact, "02 — LIÊN HỆ: FOOTER & TRANG CONTACT", "Đối chiếu Hình 1 và Hình 2. Trọng tâm: dữ liệu pháp lý, tính nhất quán và khả năng liên hệ.", "I");
contact.getRange("A4:I4").values = [["Hạng mục", "Vị trí hiển thị", "Hiện tại", "Đề xuất / quyết định", "Trạng thái", "Ưu tiên", "Hành động", "Nguồn URL", "Ghi chú"]];
header(contact.getRange("A4:I4"));
contact.getRange(`A5:I${4 + contacts.length}`).values = contacts;
body(contact.getRange(`A5:I${4 + contacts.length}`));
contact.getRange(`E5:E${4 + contacts.length}`).dataValidation = { rule: { type: "list", values: ["Cần xác nhận pháp lý", "Cần xác nhận", "Kiểm tra kỹ thuật", "Đạt cấu trúc", "Cần quyết định", "Hoàn tất"] } };
contact.getRange(`F5:F${4 + contacts.length}`).dataValidation = { rule: { type: "list", values: ["P0", "P1", "P2"] } };
statusFormatting(contact.getRange(`E5:E${4 + contacts.length}`));
contact.getRange(`F5:F${4 + contacts.length}`).conditionalFormats.add("containsText", { text: "P0", format: { fill: C.red, font: { color: C.redText, bold: true } } });
const contactTable = contact.tables.add(`A4:I${4 + contacts.length}`, true, "ContactChecklist");
contactTable.style = "TableStyleMedium2";
contact.freezePanes.freezeRows(4); contact.freezePanes.freezeColumns(2);
[22, 24, 42, 48, 22, 10, 46, 40, 42].forEach((w, i) => contact.getRangeByIndexes(0, i, 1, 1).format.columnWidth = w);
contact.getRange(`A5:I${4 + contacts.length}`).format.rowHeight = 78;
contact.getRange("A14:I14").merge(); contact.getRange("A14").values = [["Ghi chú pháp lý: Không cập nhật địa chỉ trụ sở theo nguồn tổng hợp cho đến khi có GCN ĐKDN/Thông báo thuế mới nhất từ ARTFIVE."]];
contact.getRange("A14:I14").format = { fill: C.red, font: { bold: true, color: C.redText }, wrapText: true, rowHeight: 34, verticalAlignment: "center" };

// Image sheet
titleBand(images, "03 — CHECKLIST TÀI SẢN ẢNH", "Biệt thự Tân Hưng: mục tiêu khoảng 10 ảnh. Concept H.O. 2: yêu cầu ảnh thực tế, không gắn nhãn ảnh thật cho phối cảnh 3D.", "I");
images.getRange("A4:I4").values = [["Dự án", "ID", "Loại góc chụp", "Mức yêu cầu", "Tài sản hiện có", "Loại hiện có", "Trạng thái", "Tiêu chí nghiệm thu", "Ghi chú"]];
header(images.getRange("A4:I4"));
images.getRange(`A5:I${4 + imageChecklist.length}`).values = imageChecklist;
body(images.getRange(`A5:I${4 + imageChecklist.length}`));
images.getRange(`G5:G${4 + imageChecklist.length}`).dataValidation = { rule: { type: "list", values: ["Đạt", "Có render – cần duyệt", "Có render – thiếu ảnh thực tế", "Thiếu", "Không dùng"] } };
statusFormatting(images.getRange(`G5:G${4 + imageChecklist.length}`));
const imageTable = images.tables.add(`A4:I${4 + imageChecklist.length}`, true, "ImageAssetChecklist");
imageTable.style = "TableStyleMedium2";
images.freezePanes.freezeRows(4); images.freezePanes.freezeColumns(2);
[24, 9, 36, 22, 34, 24, 26, 49, 44].forEach((w, i) => images.getRangeByIndexes(0, i, 1, 1).format.columnWidth = w);
images.getRange(`A5:I${4 + imageChecklist.length}`).format.rowHeight = 66;

// Deployment checklist
titleBand(deploy, "04 — CHECKLIST TRIỂN KHAI", "Danh sách có thể giao việc trực tiếp. Cột Owner/Status/Priority có danh sách chọn để dùng trong Google Sheets.", "J");
deploy.getRange("A4:J4").values = [["ID", "Workstream", "Công việc", "Ưu tiên", "Owner", "Trạng thái", "Phụ thuộc", "Tiêu chí nghiệm thu", "Bằng chứng / đường dẫn", "Ghi chú"]];
header(deploy.getRange("A4:J4"));
deploy.getRange(`A5:J${4 + tasks.length}`).values = tasks;
body(deploy.getRange(`A5:J${4 + tasks.length}`));
deploy.getRange(`D5:D${4 + tasks.length}`).dataValidation = { rule: { type: "list", values: ["P0", "P1", "P2"] } };
deploy.getRange(`E5:E${4 + tasks.length}`).dataValidation = { rule: { type: "list", values: ["Khách hàng", "Content", "Dev", "Photo", "Photo/3D", "QA"] } };
deploy.getRange(`F5:F${4 + tasks.length}`).dataValidation = { rule: { type: "list", values: ["Chưa bắt đầu", "Đang rà soát", "Chờ dữ liệu", "Thiếu tài sản", "Đang làm", "Chờ duyệt", "Hoàn tất"] } };
statusFormatting(deploy.getRange(`F5:F${4 + tasks.length}`));
deploy.getRange(`D5:D${4 + tasks.length}`).conditionalFormats.add("containsText", { text: "P0", format: { fill: C.red, font: { color: C.redText, bold: true } } });
const taskTable = deploy.tables.add(`A4:J${4 + tasks.length}`, true, "ImplementationChecklist");
taskTable.style = "TableStyleMedium2";
deploy.freezePanes.freezeRows(4); deploy.freezePanes.freezeColumns(2);
[9, 24, 50, 10, 16, 20, 34, 50, 40, 42].forEach((w, i) => deploy.getRangeByIndexes(0, i, 1, 1).format.columnWidth = w);
deploy.getRange(`A5:J${4 + tasks.length}`).format.rowHeight = 74;

// Sources and conventions
titleBand(source, "05 — NGUỒN & QUY ƯỚC", "Mọi URL là điểm kiểm chứng, không tự động thay thế phê duyệt của chủ dự án. Ngày truy cập: 31/07/2026.", "G");
source.getRange("A4:G4").values = [["ID", "Nguồn", "Phạm vi sử dụng", "Loại nguồn", "Độ tin cậy", "URL / đường dẫn", "Ngày truy cập"]];
header(source.getRange("A4:G4"));
source.getRange(`A5:G${4 + sources.length}`).values = sources;
body(source.getRange(`A5:G${4 + sources.length}`));
const sourceTable = source.tables.add(`A4:G${4 + sources.length}`, true, "SourceRegister");
sourceTable.style = "TableStyleMedium2";
source.freezePanes.freezeRows(4);
[18, 28, 42, 24, 34, 66, 14].forEach((w, i) => source.getRangeByIndexes(0, i, 1, 1).format.columnWidth = w);
source.getRange(`A5:G${4 + sources.length}`).format.rowHeight = 56;
const rulesStart = 22;
source.getRange(`A${rulesStart}:G${rulesStart}`).merge(); source.getRange(`A${rulesStart}`).values = [["QUY ƯỚC TRẠNG THÁI & XUẤT BẢN"]];
source.getRange(`A${rulesStart}:G${rulesStart}`).format = { fill: C.charcoal, font: { bold: true, color: C.white, size: 11 }, rowHeight: 26, verticalAlignment: "center" };
source.getRange(`A${rulesStart + 1}:G${rulesStart + 5}`).values = [
  ["Đã xác minh", "Có nguồn chính thức hoặc bằng chứng nội bộ đủ mạnh", "", "Có thể xuất bản sau QA", "", "", ""],
  ["Đề xuất – cần xác nhận", "Có căn cứ hợp lý nhưng chưa chứng minh đúng hạng mục ARTFIVE", "", "Không xuất bản như dữ kiện cuối cùng", "", "", ""],
  ["Chưa đủ dữ liệu", "Tên chung, dự án riêng tư hoặc không có bằng chứng công khai", "", "Yêu cầu hồ sơ/pin/biên bản bàn giao", "", "", ""],
  ["Bảo mật", "Địa chỉ biệt thự/căn hộ riêng chỉ ghi đến khu/dự án nếu chưa có đồng ý", "", "Không công bố số căn/số nhà", "", "", ""],
  ["Ảnh thực tế", "Chỉ dùng cho ảnh chụp hiện trạng/công trình hoàn thành", "", "Phối cảnh 3D và ảnh AI phải ghi nhãn riêng", "", "", ""],
];
for (let r = rulesStart + 1; r <= rulesStart + 5; r++) {
  source.getRange(`A${r}`).format = { fill: r === rulesStart + 1 ? C.green : r === rulesStart + 2 ? C.amber : r === rulesStart + 3 ? C.red : C.blue, font: { bold: true, color: C.ink }, wrapText: true };
  source.getRange(`B${r}:G${r}`).merge();
  source.getRange(`A${r}:G${r}`).format.rowHeight = 42;
  source.getRange(`A${r}:G${r}`).format.wrapText = true;
  source.getRange(`A${r}:G${r}`).format.borders = { bottom: { style: "thin", color: C.line } };
}

await fs.mkdir(PREVIEW_DIR, { recursive: true });
for (const [sheetName, range] of [
  ["Tổng quan", "A1:J19"],
  ["01_Địa chỉ dự án", "A1:L12"],
  ["02_Liên hệ", "A1:I14"],
  ["03_Tài sản ảnh", "A1:I14"],
  ["04_Checklist triển khai", "A1:J14"],
  ["05_Nguồn & quy ước", "A1:G27"],
]) {
  const preview = await wb.render({ sheetName, range, scale: 1, format: "png" });
  const safe = sheetName.replace(/[^\p{L}\p{N}]+/gu, "_");
  await fs.writeFile(path.join(PREVIEW_DIR, `${safe}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const inspectOverview = await wb.inspect({ kind: "table", range: "Tổng quan!A1:J19", include: "values,formulas", tableMaxRows: 20, tableMaxCols: 10 });
const inspectAddresses = await wb.inspect({ kind: "table", range: "01_Địa chỉ dự án!A4:L23", include: "values,formulas", tableMaxRows: 22, tableMaxCols: 12 });
const errorScan = await wb.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 100 }, summary: "final formula error scan" });

await fs.mkdir(OUT_DIR, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(wb);
await output.save(OUT_FILE);

console.log(JSON.stringify({
  output: OUT_FILE,
  previews: PREVIEW_DIR,
  overview: inspectOverview.ndjson,
  addressRows: inspectAddresses.ndjson,
  errors: errorScan.ndjson,
}, null, 2));
