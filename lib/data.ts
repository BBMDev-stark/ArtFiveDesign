// All content in this file is sourced directly from the ARTFIVE DESIGN
// company profile (Profile_Art_Five_Design_Corp__V070925_VN.pdf).
// No project names, clients, statistics, or biographical facts have been invented.

export const company = {
  legalNameVi: "Công Ty Cổ Phần Thiết Kế Nghệ Thuật Số Năm",
  legalNameEn: "Art Five Design Corporation",
  founded: 2009,
  founder: "Nguyễn Dương Huy",
  hq: "143 Hồ Văn Huê, Phường 9, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
  branch:
    "Tầng 4, Tòa C, Căn 26–27, Tòa nhà Charmington La Pointe, 181 Cao Thắng, Phường 12, Quận 10, Thành phố Hồ Chí Minh",
  workshop: "313 Phước Thiện, Phường Long Bình, Thành phố Thủ Đức",
  email: "hello@art5design.com",
  website: "art5corp.com",
  taxCode: "0309190959",
  businessLines: [
    "Tư vấn thiết kế kiến trúc",
    "Tư vấn thiết kế nội thất và thi công trọn gói",
    "Sản xuất nội thất",
    "Cung cấp vật dụng trang trí nội thất",
    "Gia công cơ khí và kim loại",
    "Thi công xây dựng dân dụng và thương mại",
    "Quản lý và giám sát dự án",
  ],
};

export const stats = [
  { value: "2009", label: "Thành lập studio tại Thành phố Hồ Chí Minh" },
  { value: "17+", label: "Năm kinh nghiệm thiết kế và thi công liên tục" },
  { value: "2", label: "Quốc gia hoàn thành công trình — Việt Nam & Singapore" },
  { value: "2013", label: "Năm bắt đầu hợp tác với Tập đoàn C.P. Thái Lan" },
];

export const sectors = [
  {
    slug: "healthcare",
    name: "Y tế",
    description:
      "Môi trường lâm sàng được thiết kế để tạo sự bình yên — các phòng bệnh nhân, tầng khám bệnh và sảnh bệnh viện được thiết kế xoay quanh sự tôn trọng, dẫn đường rõ ràng và vận hành chính xác.",
    image: "/images/3.svg",
  },
  {
    slug: "hospitality",
    name: "Khách sạn & Nhà hàng",
    description:
      "Nội thất khách sạn 5 sao cả phía sau và phía trước, không gian ẩm thực cao cấp được xây dựng cho bầu không khí và sự bền vững.",
    image: "/images/DORMITORY3.svg",
  },
  {
    slug: "office",
    name: "Văn phòng & Doanh nghiệp",
    description:
      "Trụ sở và nội thất văn phòng cho các doanh nghiệp đa quốc gia — nơi thương hiệu, văn hóa và hiệu quả vận hành hội tụ trên cùng một mặt bằng.",
    image: "/images/OFFICE4.svg",
  },
  {
    slug: "industrial",
    name: "Công nghiệp",
    description:
      "Văn phòng nhà máy, phòng thí nghiệm, ký túc xá và cơ sở sản xuất được hoàn thành với cùng tiêu chuẩn như các công trình đối ngoại.",
    image: "/images/SHRIMP3.svg",
  },
  {
    slug: "residential",
    name: "Căn hộ & Biệt thự",
    description:
      "Biệt thự và căn hộ riêng tại Thành phố Hồ Chí Minh, được thiết kế theo cách sống thực sự của mỗi gia đình.",
    image: "/images/PARKLEGEND4.svg",
  },
  {
    slug: "international",
    name: "Quốc tế",
    description:
      "Thi công xuyên biên giới cho khách hàng tổ chức và doanh nghiệp, bao gồm các tổ chức có trụ sở tại Singapore và Thái Lan hoạt động tại Việt Nam.",
    image: "/images/cp-lab-thailand-office.svg",
  },
];

export type Project = {
  slug: string;
  name: string;
  client?: string;
  location: string;
  sector: string[];
  year?: string;
  image: string;
  excerpt: string;
  detail: string;
  gallery?: string[];
};

export const projects: Project[] = [
  {
  slug: "sih-hospital",
  name: "Bệnh viện SIH",
  client: "Bệnh viện Quốc tế Sài Gòn (Sản Nhi)",
  location: "Quận 1, Thành phố Hồ Chí Minh",
  sector: ["healthcare"],
  image: "/images/sih-lobby.jpg",
   excerpt:
      "Sảnh chính tầng trệt, tầng khám bệnh 1, khoa nội trú tầng 6 và các phòng bệnh VIP cho một trong những bệnh viện sản nhi quốc tế hàng đầu Sài Gòn.",
    detail:
      "ARTFIVE DESIGN đã thực hiện thiết kế nội thất và thi công trọn gói cho nhiều khoa của Bệnh viện SIH, bao gồm sảnh chính tầng trệt, khoa khám bệnh tầng 1, khoa nội trú tầng 6, và các phòng bệnh Tiêu chuẩn, VIP và S.VIP. Yêu cầu là tạo ra môi trường lâm sàng mang cảm giác bình yên và đáng trọng thay vì mang tính bệnh viện — bề mặt bền vững và dẫn đường rõ ràng kết hợp với bảng màu vật liệu ấm áp phù hợp cho bệnh nhân và gia đình họ.",
  gallery: [
    "/images/1.svg",
    "/images/2.svg",
    "/images/6.svg",
    "/images/4.svg",
    "/images/5.svg",
    "/images/6.svg",
    "/images/BenhVienSIH1.svg",
    "/images/BenhVienSIH2.svg",
    "/images/BenhVienSIH3.svg",
  ],
},
  {
    slug: "singapore-general-hospital",
    name: "Bệnh viện Đa khoa Singapore",
    location: "Singapore",
    sector: ["healthcare", "international"],
    image: "/images/sgh-singapore.jpg",
    excerpt:
      "Thi công nội thất y tế quốc tế — công việc nội thất cho Bệnh viện Đa khoa Singapore, mở rộng dịch vụ thiết kế lâm sàng của chúng tôi ra ngoài Việt Nam.",
    detail:
      "Bệnh viện Đa khoa Singapore đánh dấu việc dịch vụ chăm sóc sức khỏe của ARTFIVE DESIGN hoạt động bên ngoài Việt Nam, áp dụng các tiêu chuẩn nội thất lâm sàng cùng cấp đã phát triển tại các dự án bệnh viện trong nước cho một khách hàng tổ chức quốc tế.",
  },
  {
    slug: "cpv-food-head-office",
    name: "Trụ sở CPV Food",
    client: "Tập đoàn C.P. Thái Lan",
    location: "Bình Phước, Việt Nam",
    sector: ["office", "industrial", "international"],
    image: "/images/qualgo-office.jpg",
    excerpt:
      "Nội thất văn phòng cho Trụ sở CPV Food, một phần trong quan hệ hợp tác lâu dài của chúng tôi với Tập đoàn C.P. Thái Lan tại Việt Nam.",
    detail:
      "Trong mối quan hệ đang tiếp diễn với Tập đoàn C.P. Thái Lan — đối tác thiết kế, xây dựng và nội thất trọn gói của chúng tôi tại Việt Nam từ năm 2013 — ARTFIVE DESIGN đã thực hiện nội thất văn phòng cho Trụ sở CPV Food tại Bình Phước, kết hợp không gian trình diễn doanh nghiệp với nhu cầu vận hành của trụ sở tập đoàn nông nghiệp.",
  },
  {
    slug: "qualgo-technologies-office",
    name: "Văn phòng Qualgo Technologies Việt Nam",
    client: "Qualgo Technologies",
    location: "An Phú, Quận 2, Thành phố Hồ Chí Minh",
    sector: ["office"],
    image: "/images/QUALGO.svg",
    excerpt:
      "Không gian văn phòng công nghệ tại Trần Bạch Đằng, An Phú — được xây dựng cho đội ngũ phần mềm năng động.",
    detail:
      "Văn phòng Qualgo Technologies Việt Nam tại 15 Trần Bạch Đằng, An Phú được thiết kế như một không gian làm việc hiện đại cho đội ngũ công nghệ — mặt bằng cộng tác mở cân bằng với các khu vực tập trung yên tĩnh hơn, hoàn thiện bằng bảng màu vật liệu hiện đại, tối giản.",
  },
  {
    slug: "pullman-hai-phong",
    name: "Pullman Hải Phòng — Khu vực sau",
    client: "Pullman",
    location: "Thành phố Hải Phòng",
    sector: ["hospitality"],
    image: "/images/pullman-hai-phong.jpg",
    excerpt:
      "Nội thất văn phòng khu vực sau cho Pullman Hải Phòng 5 sao, hỗ trợ khách sạn quốc tế dịch vụ đầy đủ.",
    detail:
      "Cho Pullman Hải Phòng 5 sao, ARTFIVE DESIGN đã thực hiện các khu vực văn phòng phía sau — lõi vận hành giữ cho khách sạn quốc tế dịch vụ đầy đủ hoạt động, được hoàn thiện theo tiêu chuẩn nhất quán với thương hiệu mặt tiền khách sạn.",
  },
  {
    slug: "an-phu-gia-office",
    name: "Văn phòng An Phú Gia",
    location: "Quận Bình Thạnh, Thành phố Hồ Chí Minh",
    sector: ["office"],
    image: "/images/ANPHUGIA.svg",
    excerpt:
      "Nội thất văn phòng doanh nghiệp tại Quận Bình Thạnh, cân bằng quy hoạch không gian hiệu quả với bảng màu vật liệu cao cấp.",
    detail:
      "Dự án nội thất văn phòng An Phú Gia tại Quận Bình Thạnh phản ánh cách tiếp cận của ARTFIVE DESIGN đối với nội thất văn phòng quy mô trung bình — quy hoạch không gian hiệu quả mà không hy sinh chất lượng hay hoàn thiện vật liệu.",
  },
  {
    slug: "iris-partners-law-firm",
    name: "Văn phòng Luật Iris Partners",
    client: "Iris Partners",
    location: "Quận 1, Thành phố Hồ Chí Minh",
    sector: ["office"],
    image: "/images/OFFICEIRISPARTNERS.svg",
    excerpt:
      "Văn phòng luật tại Quận 1 được thiết kế để thể hiện sự kín đáo, bền vững và quyền uy yên tĩnh.",
    detail:
      "Cho Văn phòng Luật Iris Partners tại Quận 1, ARTFIVE DESIGN đã thiết kế môi trường văn phòng phù hợp với công ty dịch vụ chuyên nghiệp — các phòng họp riêng, quầy lễ tân và văn phòng đối tác được hoàn thiện bằng bảng màu cố tình tối giản, xây dựng niềm tin.",
  },
  {
    slug: "cp-lab-thailand-office",
    name: "Văn phòng C.P. Lab Thái Lan",
    client: "Tập đoàn C.P. Thái Lan",
    location: "Bình Phước, Việt Nam",
    sector: ["industrial", "office", "international"],
    image: "/images/cp-lab-thailand-office.svg",
    excerpt:
      "Nội thất văn phòng phòng thí nghiệm cho cơ sở C.P. Group Thái Lan tại Bình Phước, một phần trong quan hệ hợp tác trọn gói lâu dài.",
    detail:
      "Văn phòng C.P. Lab tại Bình Phước hỗ trợ hoạt động phòng thí nghiệm của Tập đoàn C.P. Thái Lan tại Việt Nam, được thực hiện như một phần trong quan hệ hợp tác nội thất trọn gói mà ARTFIVE DESIGN đã duy trì với tập đoàn từ năm 2013.",
  },
  {
    slug: "himlam-tan-hung-villa",
    name: "Biệt thự Himlam Tân Hưng",
    client: "Cộng đồng cư dân Him Lam",
    location: "Quận 7, Thành phố Hồ Chí Minh",
    sector: ["residential"],
    image: "/images/villatanhung1.svg",
    excerpt:
      "Nội thất biệt thự riêng trong cộng đồng cư dân Himlam Tân Hưng tại Quận 7.",
    detail:
      "Biệt thự riêng này trong cộng đồng Himlam Tân Hưng, Quận 7 được thiết kế cho một gia đình cư dân — nội thất nhà ở được xây dựng xoay quanh cách thực sế của hộ gia đình sống, thay vì một bố trí theo tiêu chuẩn trưng bày.",
  gallery: [
    "/images/villatanhung.svg",
    "/images/villatanhung2.svg",
    "/images/villatanhung3.svg",
    "/images/villatanhung4.svg",
    "/images/villatanhung5.svg",
    "/images/villatanhung1.svg",
  ],
    },
  {
    slug: "unilever-office",
    name: "Văn phòng Unilever",
    client: "Unilever",
    location: "Bắc Ninh, Việt Nam",
    sector: ["office", "industrial", "international"],
    image: "/images/OFFICE1.svg",
    excerpt:
      "Nội thất văn phòng cho hoạt động Unilever tại Bắc Ninh — không gian làm việc cho nhà sản xuất hàng tiêu dùng toàn cầu.",
    detail:
      "Văn phòng Unilever tại Bắc Ninh được thực hiện cho một trong những nhà sản xuất hàng tiêu dùng lớn nhất thế giới, đòi hỏi nội thất văn phòng đáp ứng tiêu chuẩn doanh nghiệp quốc tế đồng thời hỗ trợ hoạt động hàng ngày của nhà máy.",
  gallery: [
    "/images/OFFICE1.svg",
    "/images/OFFICE2.svg",
    "/images/OFFICE3.svg",
    "/images/OFFICE4.svg",
    "/images/OFFICE5.svg",
  ],
    },
  {
    slug: "eco-green-view-apartment",
    name: "Căn hộ Eco Green View",
    location: "Quận 7, Thành phố Hồ Chí Minh",
    sector: ["residential"],
    image: "/images/ECOGREEN1.svg",
    excerpt:
      "Nội thất căn hộ tại dự án Eco Green View, Quận 7.",
    detail:
      "Căn hộ Eco Green View được thiết kế cho mục đích ở riêng tư tại Quận 7 — nội thất trọn gói từ quy hoạch không gian đến trang trí.",
   gallery: [
    "/images/ECOGREEN1.svg",
    "/images/ECOGREEN2.svg",
    "/images/ECOGREEN3.svg",
    "/images/ECOGREEN4.svg",
    "/images/ECOGREEN5.svg",
    "/images/ECOGREEN6.svg",
    "/images/ECOGREEN7.svg",
    "/images/ECOGREEN8.svg",
    "/images/ECOGREEN9.svg",
  ],
    },
  {
    slug: "maple-land",
    name: "Maple Land",
    location: "Quận 2, Thành phố Hồ Chí Minh",
    sector: ["residential"],
    image: "/images/MAPLELAND1.svg",
    excerpt:
      "Dự án nội thất nhà ở tại Quận 2, một phần trong danh mục nhà ở riêng của ARTFIVE DESIGN.",
    detail:
      "Maple Land tại Quận 2 là dự án nội thất nhà ở riêng do ARTFIVE DESIGN thực hiện, kết hợp dịch vụ thiết kế và trang trí trọn gói trong một phạm vi công việc.",
  gallery: [
    "/images/MAPLELAND1.svg",
    "/images/MAPLELAND2.svg",
    "/images/MAPLELAND3.svg",
    "/images/MAPLELAND4.svg",
    "/images/MAPLELAND5.svg",
  ],
    },
  {
    slug: "my-mother-restaurant",
    name: "Nhà hàng Mẹ Tôi",
    location: "Quận 1, Thành phố Hồ Chí Minh",
    sector: ["hospitality"],
    image: "/images/MOTHER1.svg",
    excerpt:
      "Không gian ẩm thực tại Quận 1 — thiết kế nội thất khách sạn tạo bầu không khí và khách quen.",
    detail:
      "Nhà hàng Mẹ Tôi tại Quận 1 đòi hỏi một phòng ăn mang cảm giác được cân nhắc kỹ lưỡng và bền vững thay vì theo xu hướng — nội thất khách sạn được thiết kế để hỗ trợ cả dịch vụ hàng ngày lẫn bản sắc dài hạn của nhà hàng.",
  gallery: [
    "/images/MOTHER1.svg",
    "/images/MOTHER2.svg",
    "/images/MOTHER3.svg",
  ],
    },
  {
    slug: "shrimp-hatchery-kien-giang",
    name: "SHRIMP HATCHERY C.P. GROUP - THAILAND",
    client: "Tập đoàn C.P. Thái Lan",
    location: "Kiên Giang, Việt Nam",
    sector: ["industrial", "international"],
    image: "/images/SHRIMP1.svg",
    excerpt:
      "Nội thất và công trình cơ sở cho Tập đoàn C.P. Thái Lan tại Kiên Giang.",
    detail:
      "Được thực hiện cho Tập đoàn C.P. Thái Lan tại Kiên Giang, công trình này phản ánh năng lực công nghiệp của ARTFIVE DESIGN — nội thất thực dụng, bền vững được kỹ thuật cho môi trường doanh nghiệp.",
  gallery: [
    "/images/SHRIMP1.svg",
    "/images/SHRIMP2.svg",
    "/images/SHRIMP3.svg",
    "/images/SHRIMP4.svg",
    "/images/SHRIMP5.svg",
    "/images/SHRIMP6.svg",
    "/images/SHRIMP7.svg",
    "/images/SHRIMP8.svg",
    "/images/SHRIMP9.svg",
  ],
    },
  {
    slug: "park-legend-apartment",
    name: "Căn hộ Park Legend",
    location: "Quận Tân Bình, Thành phố Hồ Chí Minh",
    sector: ["residential"],
    image: "/images/PARKLEGEND.svg",
    excerpt:
      "Nội thất căn hộ tại Quận Tân Bình, Thành phố Hồ Chí Minh.",
    detail:
      "Căn hộ Park Legend tại Quận Tân Bình là dự án nội thất nhà ở riêng được ARTFIVE DESIGN thực hiện từ đầu đến cuối, từ phát triển thiết kế đến nội thất và trang trí.",
  gallery: [
    "/images/PARKLEGEND.svg",
    "/images/PARKLEGEND1.svg",
    "/images/PARKLEGEND2.svg",
    "/images/PARKLEGEND3.svg",
    "/images/PARKLEGEND4.svg",
  ],
    },
  {
    slug: "cp-dormitory-bien-hoa",
    name: "DORMITORY C.P. BIÊN HÒA C.P. GROUP - THAILAND",
    client: "Tập đoàn C.P. Thái Lan",
    location: "Biên Hòa, Việt Nam",
    sector: ["industrial", "residential", "international"],
    image: "/images/DORMITORY1.svg",
    excerpt:
      "Nội thất của Tập đoàn C.P. Thái Lan tại Biên Hòa.",
    detail:
      "Nội thật được thực hiện cho Tập đoàn C.P. Thái Lan như một phần trong khuôn viên vận hành rộng hơn của tập đoàn — nội thất chỗ ở chức năng, được xây dựng tốt nhất.",
  gallery: [
    "/images/DORMITORY1.svg",
    "/images/DORMITORY2.svg",
    "/images/DORMITORY3.svg",
  ],
    },
  {
    slug: "cp-hanoi-office",
    name: "Văn phòng C.P. Hà Nội",
    client: "Tập đoàn C.P. Thái Lan",
    location: "Hà Nội, Việt Nam",
    sector: ["office", "international"],
    image: "/images/Hanoi1.svg",
    excerpt:
      "Nội thất văn phòng doanh nghiệp cho hoạt động của Tập đoàn C.P. Thái Lan tại Hà Nội, mở rộng quan hệ đối tác của chúng tôi ra miền Bắc Việt Nam.",
    detail:
      "Văn phòng C.P. Hà Nội mở rộng quan hệ hợp tác trọn gói của ARTFIVE DESIGN với Tập đoàn C.P. Thái Lan vào miền Bắc Việt Nam, mang theo cùng tiêu chuẩn thiết kế và xây dựng đã thiết lập trên các dự án của tập đoàn ở phía Nam.",
  gallery: [
    "/images/Hanoi1.svg",
    "/images/Hanoi2.svg",
    "/images/Hanoi3.svg",
    "/images/Hanoi4.svg",
    "/images/Hanoi5.svg",
  ],
    },
  {
    slug: "concept-ho2-cp-group",
    name: "Concept H.O. 2",
    client: "Tập đoàn C.P. Thái Lan",
    location: "Biên Hòa, Việt Nam",
    sector: ["office", "international"],
    image: "/images/h2o1.svg",
    excerpt:
      "Khái niệm thiết kế văn phòng thứ hai được phát triển cho Tập đoàn C.P. Thái Lan tại Biên Hòa.",
    detail:
      "Concept H.O. 2 là khái niệm thiết kế văn phòng được phát triển cho Tập đoàn C.P. Thái Lan tại Biên Hòa, tiếp nối ngôn ngữ thiết kế đã thiết lập qua các dự án ARTFIVE DESIGN trước đó của tập đoàn tại Việt Nam.",
  gallery: [
    "/images/h2o1.svg",
    "/images/h2o2.svg",
    "/images/h2o3.svg",
  ],
    },
  {
    slug: "art-five-furniture-workshop",
    name: "Xưởng Nội thất ARTFIVE",
    location: "Phường Long Bình, Thành phố Thủ Đức",
    sector: ["industrial"],
    image: "/images/ARTFIVE1.svg",
    excerpt:
      "Cơ sở sản xuất nội thất của chúng tôi — xưởng tích hợp đứng sau mỗi nội thất trọn gói mà chúng tôi thực hiện.",
    detail:
      "Xưởng sản xuất nội thất và gia công của riêng chúng tôi tại Phường Long Bình, Thành phố Thủ Đức là điều làm cho mô hình trọn gói của ARTFIVE DESIGN có thể thực hiện được — thiết kế, gia công và lắp đặt nằm dưới một mái nhà, để chất lượng được kiểm soát từ bản vẽ đến bàn giao.",
  gallery: [
    "/images/ARTFIVE1.svg",
    "/images/ARTFIVE2.svg",
    "/images/ARTFIVE3.svg",
    "/images/ARTFIVE4.svg",
    "/images/ARTFIVE5.svg",
    "/images/ARTFIVE6.svg",
  ],
    },
];

export const team = [
  {
    name: "Nguyễn Dương Huy",
    role: "Người sáng lập & Giám đốc điều hành",
    bio: "Sáng lập ARTFIVE DESIGN năm 2009 và lãnh đạo studio phát triển từ một công ty thiết kế nội thất thành một tập đoàn thiết kế và xây dựng đầy đủ.",
    image: "/images/leader/NguyenDuongHuy.svg",
  },
  {
    name: "TS. Kiến trúc sư Cao Anh Tuấn",
    role: "Kiến trúc sư trưởng · Tiến sĩ, Kiến trúc & Quy hoạch Đô thị",
    bio: "Có bằng Tiến sĩ về Kiến trúc và Quy hoạch Đô thị. Từng là chuyên gia kiến trúc cho các nhà phát triển lớn của Việt Nam, và giảng dạy tại trường đại học kiến trúc. Đã lãnh đạo hoặc đóng góp vào công tác quy hoạch tại Khu đô thị Thủ Thiêm, Quận dân cư PMLA, Khu nghỉ dưỡng Thịnh Phát Charm và Diamond Lotus Riverside.",
    image: "/images/leader/CaoAnhTuan.svg",
  },
  {
    name: "Sơn Nguyễn",
    role: "Giám đốc Thiết kế",
    bio: "Lãnh đạo hướng thiết kế trên các dự án nội thất của ARTFIVE DESIGN.",
    image: "/images/leader/SonNguyen.svg",
  },
  {
    name: "Hòa Âu",
    role: "Giám đốc Dự án",
    bio: "Điều phối việc bàn giao dự án, từ ý đồ thiết kế đến xây dựng và bàn giao trọn gói.",
    image: "/images/leader/HoaAu.svg",
  },
];

export const process = [
  {
    step: "01",
    title: "Lắng nghe",
    description:
      "Mỗi dự án bắt đầu bằng việc lắng nghe — yêu cầu của khách hàng, địa điểm và những người sẽ sử dụng không gian hoàn thiện. Chúng tôi luôn lắng nghe trước khi thiết kế.",
    image: "/images/langnghe.jpg",
  },
  {
    step: "02",
    title: "Diễn giải",
    description:
      "Chúng tôi diễn giải yêu cầu đó thông qua nghiên cứu về các xu hướng hiện tại và tương lai trong lĩnh vực liên quan, chuyển đổi yêu cầu thành hướng thiết kế rõ ràng.",
    image: "/images/diengiai.jpg",
  },
  {
    step: "03",
    title: "Thiết kế",
    description:
      "Ý đồ thiết kế được truyền đạt và phát triển trong sự hợp tác chặt chẽ với khách hàng — đối với chúng tôi, tiếng nói của khách hàng quan trọng nhất, không phải cái tôi của chúng tôi.",
    image: "/images/thietke.jpg",
  },
  {
    step: "04",
    title: "Thi công",
    description:
      "Với xưởng nội thất và đội ngũ xây dựng riêng, chúng tôi thi công thiết kế thông qua bàn giao trọn gói — một điểm trách nhiệm duy nhất từ bản vẽ đến bàn giao.",
    image: "/images/thicong.jpg",
  },
];

export const clients = [
  {
    name: "Tập đoàn C.P. Thái Lan",
    note: "Đối tác thiết kế, xây dựng & nội thất trọn gói tại Việt Nam từ năm 2013",
    logo: "/images/logo/CP.svg",
  },
  {
    name: "Unilever",
    note: "Văn phòng doanh nghiệp, Bắc Ninh",
    logo: "/images/logo/Uni.svg",
  },
  {
    name: "Pullman",
    note: "Khách sạn 5 sao, Hải Phòng",
    logo: "/images/logo/pullman.svg",
  },
  {
    name: "Bệnh viện Đa khoa Singapore",
    note: "Y tế quốc tế",
    logo: "/images/logo/bvSingapore.svg",
  },
  {
    name: "Bệnh viện Quốc tế Sài Gòn",
    note: "Y tế, Quận 1, TP.HCM",
    logo: "/images/logo/bvsaigon.svg",
  },
  {
    name: "Qualgo Technologies",
    note: "Văn phòng doanh nghiệp, TP.HCM",
    logo: "/images/logo/Qualgo.svg",
  },
  {
    name: "Iris Partners",
    note: "Văn phòng luật, Quận 1, TP.HCM",
    logo: "/images/logo/partners.svg",
  },
  {
    name: "Him Lam",
    note: "Cộng đồng cư dân, Quận 7, TP.HCM",
    logo: "/images/logo/himlam.svg",
  },
];

export const certifications = [
  "Giấy chứng nhận đăng ký doanh nghiệp",
  "Giấy chứng nhận năng lực thiết kế & thi công — Thiết kế & Thi công công trình xây dựng",
];

export const philosophy = {
  overview:
    "Chúng tôi kết hợp cách tiếp cận thiết kế độc đáo với đội ngũ chuyên gia để tạo ra không gian nội thất đặc biệt — mang lại giá trị khác biệt, độc đáo xứng đáng với thương hiệu của bạn.",
  clientExperience:
    "Chúng tôi hoàn toàn tập trung vào trải nghiệm khách hàng, hiện tại và tương lai. Chúng tôi luôn lắng nghe trước khi thiết kế. Đối với chúng tôi, tiếng nói của khách hàng quan trọng nhất, không phải cái tôi của chúng tôi. Thiết kế tốt nhất sinh ra từ việc kết hợp tầm nhìn của nhà đầu tư với chuyên môn của ARTFIVE DESIGN. Hợp tác là nguyên tắc nền tảng trong quy trình thiết kế của chúng tôi.",
  globalLocal: "Tầm nhìn toàn cầu. Sứ mệnh địa phương.",
  history:
    "Được sáng lập và lãnh đạo từ năm 2009 bởi Ông Nguyễn Dương Huy, ARTFIVE DESIGN CORPORATION là một công ty chuyên về thiết kế nội thất và xây dựng chuyên nghiệp. Đội ngũ các nhà thiết kế trẻ, sáng tạo của chúng tôi mang đến cảm nhận thẩm mỹ đặc biệt, kết hợp với phong cách tinh tế, thanh lịch, đương đại — tiên phong trong việc áp dụng công nghệ và vật liệu mới, theo dõi các xu hướng nội thất toàn cầu, để tạo ra không gian sống có tính cách thực sự cho khách hàng.",
  product:
    "Công việc của chúng tôi kết hợp nền tảng kiến trúc vững chắc với thiết kế chuyên sâu, nhằm tạo ra các công trình đáp ứng yêu cầu thẩm mỹ và chức năng cao nhất — linh hoạt, bền vững, hiện đại và khiêm tốn, nhưng tinh tế và sang trọng.",
  turnkey:
    "Để đảm bảo chất lượng và tính nhất quán từ thiết kế đến sản phẩm cuối cùng, ARTFIVE DESIGN vận hành dịch vụ xây dựng, sản xuất và trang trí trọn gói — được xử lý cẩn thận từ ý tưởng đến bàn giao.",
};

export const nav = [
  { href: "/about", label: "Giới thiệu" },
  { href: "/expertise", label: "Chuyên môn" },
  { href: "/portfolio", label: "Dự án" },
  { href: "/clients", label: "Khách hàng" },
  { href: "/insights", label: "Bài viết" },
  { href: "/careers", label: "Tuyển dụng" },
  { href: "/contact", label: "Liên hệ" },
];
