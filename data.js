// File: data.js
const ALL_EXPERIMENTS = [
    // ==========================================
    //                 LỚP 10
    // ==========================================
    {
        title: "Phương pháp kết tinh muối hạt",
        keywords: "phuong phap ket tinh muoi hat",
        ytLink: "https://www.youtube.com/watch?v=Wuo8SachZYE",
        thumbnail: "https://img.youtube.com/vi/Wuo8SachZYE/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 10"
    },
    {
        title: "Mô phỏng thí nghiệm của Ernest Rutherford. Bắn tia alpha vào lá vàng mỏng",
        keywords: "mo phong thi nghiem ernest rutherford ban tia alpha vao la vang mong",
        ytLink: "https://www.youtube.com/watch?v=JSt808aOVRM",
        thumbnail: "https://img.youtube.com/vi/JSt808aOVRM/hqdefault.jpg",
        channel: "Kênh: ABC Chemistry",
        badge: "Lớp 10"
    },
    {
        title: "So Sánh Tính Kim Loại Của Sodium Na Và Magnesium Mg",
        keywords: "so sanh tinh kim loai cua sodium na va magnesium mg",
        ytLink: "https://www.youtube.com/watch?v=yvqW3pa8-Jw",
        thumbnail: "https://img.youtube.com/vi/yvqW3pa8-Jw/hqdefault.jpg",
        channel: "Kênh: Vũ Thị Lê",
        badge: "Lớp 10"
    },
    {
        title: "SO SÁNH TÍNH PHI KIM CỦA CHLORINE VÀ IODINE",
        keywords: "so sanh tinh phi kim cua chlorine va iodine",
        ytLink: "https://www.youtube.com/watch?v=IsoLGZXwV9A",
        thumbnail: "https://img.youtube.com/vi/IsoLGZXwV9A/hqdefault.jpg",
        channel: "Kênh: Học văn cùng cô Thu",
        badge: "Lớp 10"
    },
    {
        title: "TO SHOW THAT METALLIC OXIDES ARE BASIC IN NATURE",
        keywords: "to show that metallic oxides are basic in nature",
        ytLink: "https://www.youtube.com/watch?v=qJH3nfVLypU",
        thumbnail: "https://img.youtube.com/vi/qJH3nfVLypU/hqdefault.jpg",
        channel: "Kênh: amritacreate",
        badge: "Lớp 10"
    },
    {
        title: "THÍ NGHIỆM PHẢN ỨNG CỦA DUNG DỊCH MUỐI NA<sub>2</sub>CO<sub>3</sub> VỚI DUNG DỊCH AXIT HNO<sub>3</sub>",
        keywords: "thi nghiem phan ung cua dung dich muoi na2co3 voi dung dich axit hno3",
        ytLink: "https://www.youtube.com/watch?v=P7bI_ZoN9Kw",
        thumbnail: "https://img.youtube.com/vi/P7bI_ZoN9Kw/hqdefault.jpg",
        channel: "Kênh: Học văn cùng cô Thu",
        badge: "Lớp 10"
    },
    {
        title: "Structure of Sodium Chloride (NaCl)",
        keywords: "structure of sodium chloride nacl",
        ytLink: "https://www.youtube.com/watch?v=v8g3CK5kke0",
        thumbnail: "https://img.youtube.com/vi/v8g3CK5kke0/hqdefault.jpg",
        channel: "Kênh: Scholarswing",
        badge: "Lớp 10"
    },
    {
        title: "THÍ NGHIỆM THỬ TÍNH DẪN ĐIỆN CỦA HỢP CHẤT",
        keywords: "thi nghiem thu tinh dan dien cua hop chat",
        ytLink: "https://www.youtube.com/watch?v=cRMZ0HH6R0Q",
        thumbnail: "https://img.youtube.com/vi/cRMZ0HH6R0Q/hqdefault.jpg",
        channel: "Kênh: Học văn cùng cô Thu",
        badge: "Lớp 10"
    },
    {
        title: "Mô phỏng lắp ráp mô hình phân tử Methane CH<sub>4</sub>",
        keywords: "mo phong lap rap mo hinh phan tu methane ch4",
        ytLink: "https://www.youtube.com/watch?v=mJqObq4xIDs",
        thumbnail: "https://img.youtube.com/vi/mJqObq4xIDs/hqdefault.jpg",
        channel: "Kênh: EMILYCHEMIST",
        badge: "Lớp 10"
    },
    {
        title: "Thí Nghiệm Đinh Sắt (Iron) Tác Dụng Với Dung Dịch CuSO<sub>4</sub>",
        keywords: "thi nghiem dinh sat iron tac dung voi dung dich cuso4",
        ytLink: "https://www.youtube.com/watch?v=bV9ntYqngfg",
        thumbnail: "https://img.youtube.com/vi/bV9ntYqngfg/hqdefault.jpg",
        channel: "Kênh: Vũ Thị Lê",
        badge: "Lớp 10"
    },
    {
        title: "Thí nghiệm đinh Sắt (Iron) tác dụng với dung dịch Sulfuric Acid loãng (H<sub>2</sub>SO<sub>4</sub>)",
        keywords: "thi nghiem dinh sat iron tac dung voi dung dich sulfuric acid loang h2so4",
        ytLink: "https://www.youtube.com/watch?v=RYhLr6ZD3lg",
        thumbnail: "https://img.youtube.com/vi/RYhLr6ZD3lg/hqdefault.jpg",
        channel: "Kênh: bang nhat",
        badge: "Lớp 10"
    },
    {
        title: "THÍ NGHIỆM THEO DÕI SỰ THAY ĐỔI NHIỆT ĐỘ CỦA PHẢN ỨNG TRUNG HÒA",
        keywords: "thi nghiem theo doi su thay doi nhiet do cua phan ung trung hoa",
        ytLink: "https://www.youtube.com/watch?v=a21Bby96Vgc",
        thumbnail: "https://img.youtube.com/vi/a21Bby96Vgc/hqdefault.jpg",
        channel: "Kênh: Học văn cùng cô Thu",
        badge: "Lớp 10"
    },
    {
        title: "Calorimetry: Calculate Enthalpy",
        keywords: "calorimetry calculate enthalpy",
        ytLink: "https://www.youtube.com/watch?v=EWb5q8Bl39A",
        thumbnail: "https://img.youtube.com/vi/EWb5q8Bl39A/hqdefault.jpg",
        channel: "Kênh: Anne Schmidt",
        badge: "Lớp 10"
    },
    {
        title: "Phản ứng Na<sub>2</sub>S<sub>2</sub>O<sub>3</sub> + H<sub>2</sub>SO<sub>4</sub>. Thí nghiệm ảnh hưởng của nồng độ",
        keywords: "phan ung na2s2o3 h2so4 thi nghiem anh huong cua nong do",
        ytLink: "https://www.youtube.com/watch?v=lQpC_z11_4Y",
        thumbnail: "https://img.youtube.com/vi/lQpC_z11_4Y/hqdefault.jpg",
        channel: "Kênh: WAYS OUT",
        badge: "Lớp 10"
    },
    {
        title: "Ảnh Hưởng Của Nhiệt Độ Đến Tốc Độ Phản Ứng | Mg Phản Ứng Với Nước",
        keywords: "anh huong cua nhiet do den toc do phan ung mg phan ung voi nuoc",
        ytLink: "https://www.youtube.com/watch?v=SITu7XjGkAE",
        thumbnail: "https://img.youtube.com/vi/SITu7XjGkAE/hqdefault.jpg",
        channel: "Kênh: Vũ Thị Lê",
        badge: "Lớp 10"
    },
    {
        title: "ẢNH HƯỞNG CỦA DIỆN TÍCH BỀ MẶT ĐẾN TỐC ĐỘ PHẢN ỨNG | CaCO<sub>3</sub> Tác Dụng Với HCl",
        keywords: "anh huong cua dien tich be mat den toc do phan ung caco3 tac dung voi hcl",
        ytLink: "https://www.youtube.com/watch?v=hf9eyJgqilA",
        thumbnail: "https://img.youtube.com/vi/hf9eyJgqilA/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 10"
    },
    {
        title: "Ảnh Hưởng Của Chất Xúc Tác Đến Tốc Độ Phản Ứng | Phản Ứng Của H<sub>2</sub>O<sub>2</sub> Khi Có MnO<sub>2</sub>",
        keywords: "anh huong cua chat xuc tac den toc do phan ung h2o2 mno2",
        ytLink: "https://www.youtube.com/watch?v=LJXTOaeljeI",
        thumbnail: "https://img.youtube.com/vi/LJXTOaeljeI/hqdefault.jpg",
        channel: "Kênh: Vũ Thị Lê",
        badge: "Lớp 10"
    },
    {
        title: "CHLORINE (Cl<sub>2</sub>) TÁC DỤNG VỚI DÂY SẮT (IRON)",
        keywords: "chlorine cl2 tac dung voi day sat iron",
        ytLink: "https://www.youtube.com/watch?v=3xV_mYC5oFQ",
        thumbnail: "https://img.youtube.com/vi/3xV_mYC5oFQ/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 10"
    },
    {
        title: "Thí Nghiệm Tính Tẩy Màu của Khí Chlorine Cl<sub>2</sub> | KMnO<sub>4</sub> Tác Dụng Với HCl",
        keywords: "thi nghiem tinh tay mau cua khi chlorine cl2 kmno4 tac dung voi hcl",
        ytLink: "https://www.youtube.com/watch?v=qpL4KsnbAQ4",
        thumbnail: "https://img.youtube.com/vi/qpL4KsnbAQ4/hqdefault.jpg",
        channel: "Kênh: Vũ Thị Lê",
        badge: "Lớp 10"
    },
    {
        title: "Cl<sub>2</sub> + KBr, Cl<sub>2</sub> + NaI, Br<sub>2</sub> + NaI. Comparing oxidizing properties",
        keywords: "cl2 kbr nai br2 comparing oxidizing properties",
        ytLink: "https://www.youtube.com/watch?v=kksVWwZ3Y14",
        thumbnail: "https://img.youtube.com/vi/kksVWwZ3Y14/hqdefault.jpg",
        channel: "Kênh: ABC Chemistry",
        badge: "Lớp 10"
    },
    {
        title: "Dung Dịch HCl Tác Dụng Zn, Cu",
        keywords: "dung dich hcl tac dung zn cu",
        ytLink: "https://www.youtube.com/watch?v=_XENzHwsaww",
        thumbnail: "https://img.youtube.com/vi/_XENzHwsaww/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 10"
    },
    {
        title: "DUNG DỊCH HCl TÁC DỤNG MUỐI NaHCO<sub>3</sub> rắn",
        keywords: "dung dich hcl tac dung muoi nahco3 ran",
        ytLink: "https://www.youtube.com/watch?v=XYXcd3UMNIU",
        thumbnail: "https://img.youtube.com/vi/XYXcd3UMNIU/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 10"
    },
    {
        title: "NHẬN BIẾT MUỐI HALIDE",
        keywords: "nhan biet muoi halide",
        ytLink: "https://www.youtube.com/watch?v=GDuG2OaW0oM",
        thumbnail: "https://img.youtube.com/vi/GDuG2OaW0oM/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 10"
    },

    // ==========================================
    //                 LỚP 11
    // ==========================================
    {
        title: "Ảnh hưởng của nhiệt độ đến chuyển dịch cân bằng 2NO<sub>2</sub> ⇄ N<sub>2</sub>O<sub>4</sub>",
        keywords: "anh huong cua nhiet do den chuyen dich can bang 2no2 n2o4",
        ytLink: "https://www.youtube.com/watch?v=mfO5ocybEj4",
        thumbnail: "https://img.youtube.com/vi/mfO5ocybEj4/hqdefault.jpg",
        channel: "Kênh: ABC Chemistry",
        badge: "Lớp 11"
    },
    {
        title: "Ảnh hưởng của nhiệt độ đến chuyển dịch cân bằng thủy phân Sodium Acetate",
        keywords: "anh huong cua nhiet do den chuyen dich can bang thuy phan sodium acetate ch3coona",
        ytLink: "https://www.youtube.com/watch?v=JSt808aOVRM",
        thumbnail: "https://img.youtube.com/vi/JSt808aOVRM/hqdefault.jpg",
        channel: "Kênh: Edusmart",
        badge: "Lớp 11"
    },
    {
        title: "Nghiên cứu ảnh hưởng của nồng độ đến sự chuyển dịch cân bằng (hệ CH<sub>3</sub>COONa)",
        keywords: "nghien cuu anh huong cua nong do den su chuyen dich can bang he ch3coona",
        ytLink: "https://www.youtube.com/watch?v=AhIUrh4vEnU",
        thumbnail: "https://img.youtube.com/vi/AhIUrh4vEnU/hqdefault.jpg",
        channel: "Kênh: Edusmart",
        badge: "Lớp 11"
    },
    {
        title: "Thí nghiệm tính dẫn điện của nước, dung dịch đường và dung dịch muối ăn",
        keywords: "thi nghiem tinh dan dien cua nuoc dung dich duong va dung dich muoi an",
        ytLink: "https://www.youtube.com/watch?v=cRMZ0HH6R0Q",
        thumbnail: "https://img.youtube.com/vi/cRMZ0HH6R0Q/hqdefault.jpg",
        channel: "Kênh: Học văn cùng cô Thu",
        badge: "Lớp 11"
    },
    {
        title: "Tìm hiểu về chất điện li và chất không điện li",
        keywords: "tim hieu ve chat dien li va chat khong dien li",
        ytLink: "https://www.youtube.com/watch?v=nYGuUQS1NF8",
        thumbnail: "https://img.youtube.com/vi/nYGuUQS1NF8/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Cách làm chất chỉ thị màu từ hoa đậu biếc/bắp cải tím",
        keywords: "cach lam chat chi thi mau tu hoa dau biec bap cai tim",
        ytLink: "https://www.youtube.com/watch?v=P7bI_ZoN9Kw",
        thumbnail: "https://img.youtube.com/vi/P7bI_ZoN9Kw/hqdefault.jpg",
        channel: "Kênh: Edusmart",
        badge: "Lớp 11"
    },
    {
        title: "Chuẩn độ acid - base (Dùng dung dịch NaOH chuẩn độ dung dịch HCl)",
        keywords: "chuan do acid base dung dung dich naoh chuan do dung dich hcl",
        ytLink: "https://www.youtube.com/watch?v=34fd06rhrRo",
        thumbnail: "https://img.youtube.com/vi/34fd06rhrRo/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Nhận biết ion ammonium trong phân đạm",
        keywords: "nhan biet ion ammonium trong phan dam",
        ytLink: "https://www.youtube.com/watch?v=DKYWj4QrXtc",
        thumbnail: "https://img.youtube.com/vi/DKYWj4QrXtc/hqdefault.jpg",
        channel: "Kênh: Edusmart",
        badge: "Lớp 11"
    },
    {
        title: "Sulfur tác dụng với Sắt (Iron)",
        keywords: "sulfur tac dung voi sat iron",
        ytLink: "https://www.youtube.com/watch?v=0_gNRxKi-kE",
        thumbnail: "https://img.youtube.com/vi/0_gNRxKi-kE/hqdefault.jpg",
        channel: "Kênh: Học Hóa Cùng Cô Ly",
        badge: "Lớp 11"
    },
    {
        title: "Sulfur tác dụng với Oxygen",
        keywords: "sulfur tac dung voi oxygen",
        ytLink: "https://www.youtube.com/watch?v=Shdtss0DKyA",
        thumbnail: "https://img.youtube.com/vi/Shdtss0DKyA/hqdefault.jpg",
        channel: "Kênh: Edusmart",
        badge: "Lớp 11"
    },
    {
        title: "Đồng (copper) tác dụng với dung dịch Sulfuric Acid đặc, nóng",
        keywords: "dong copper tac dung voi dung dich sulfuric acid dac nong",
        ytLink: "https://www.youtube.com/watch?v=IZzUKqydZao",
        thumbnail: "https://img.youtube.com/vi/IZzUKqydZao/hqdefault.jpg",
        channel: "Kênh: Học văn cùng cô Thu",
        badge: "Lớp 11"
    },
    {
        title: "Dung dịch sulfuric acid đặc tác dụng với đường mía",
        keywords: "dung dich sulfuric acid dac tac dung voi duong mia",
        ytLink: "https://www.youtube.com/watch?v=Dvd_fqyFazc",
        thumbnail: "https://img.youtube.com/vi/Dvd_fqyFazc/hqdefault.jpg",
        channel: "Kênh: Học văn cùng cô Thu",
        badge: "Lớp 11"
    },
    {
        title: "Nhận biết ion sulfate (dùng dung dịch muối barium)",
        keywords: "nhan biet ion sulfate dung dung dich muoi barium",
        ytLink: "https://www.youtube.com/watch?v=-zR-uqLlyg0",
        thumbnail: "https://img.youtube.com/vi/-zR-uqLlyg0/hqdefault.jpg",
        channel: "Kênh: Học văn cùng cô Thu",
        badge: "Lớp 11"
    },
    {
        title: "Chưng cất ethanol từ dung dịch ethanol - nước",
        keywords: "chung cat ethanol tu dung dich ethanol nuoc",
        ytLink: "https://www.youtube.com/watch?v=kzC_1BzdDc4",
        thumbnail: "https://img.youtube.com/vi/kzC_1BzdDc4/hqdefault.jpg",
        channel: "Kênh: Tổ Hóa Trường Tây",
        badge: "Lớp 11"
    },
    {
        title: "Tách B-carotene từ nước ép cà rốt",
        keywords: "tach b carotene tu nuoc ep ca rot",
        ytLink: "https://www.youtube.com/watch?v=QxH09kYOY6I",
        thumbnail: "https://img.youtube.com/vi/QxH09kYOY6I/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Phản ứng Bromine hóa Hexane C<sub>6</sub>H<sub>14</sub>",
        keywords: "phan ung bromine hoa hexane c6h14",
        ytLink: "https://www.youtube.com/watch?v=bnRR15ksyKQ",
        thumbnail: "https://img.youtube.com/vi/bnRR15ksyKQ/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Phản ứng Oxi hóa Hexane C<sub>6</sub>H<sub>14</sub>",
        keywords: "phan ung oxi hoa hexane c6h14",
        ytLink: "https://www.youtube.com/watch?v=VB1T8Ym19bY",
        thumbnail: "https://img.youtube.com/vi/VB1T8Ym19bY/hqdefault.jpg",
        channel: "Kênh: Tổ Hóa Trường Tây Thạnh",
        badge: "Lớp 11"
    },
    {
        title: "Điều chế và thử tính chất hóa học của Ethylene C<sub>2</sub>H<sub>4</sub>",
        keywords: "dieu che va thu tinh chat hoa hoc cua ethylene c2h4",
        ytLink: "https://www.youtube.com/watch?v=lUbu8zZ7RSs",
        thumbnail: "https://img.youtube.com/vi/lUbu8zZ7RSs/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Phản ứng Nitro hóa Benzene C<sub>6</sub>H<sub>6</sub>",
        keywords: "phan ung nitro hoa benzene c6h6",
        ytLink: "https://www.youtube.com/watch?v=JXdy_RB7DyE",
        thumbnail: "https://img.youtube.com/vi/JXdy_RB7DyE/hqdefault.jpg",
        channel: "Kênh: Smartschool",
        badge: "Lớp 11"
    },
    {
        title: "Phản ứng cộng Chlorine và Benzene C<sub>6</sub>H<sub>6</sub>",
        keywords: "phan ung cong chlorine va benzene c6h6",
        ytLink: "https://www.youtube.com/watch?v=mk9G-R-exkI",
        thumbnail: "https://img.youtube.com/vi/mk9G-R-exkI/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Phản ứng oxi hóa Toluene và Benzen bằng dung dịch KMnO<sub>4</sub>",
        keywords: "phan ung oxi hoa toluene va benzen bang dung dich kmno4",
        ytLink: "https://www.youtube.com/watch?v=0-Is2lVfuls",
        thumbnail: "https://img.youtube.com/vi/0-Is2lVfuls/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Phản ứng thủy phân Bromoethane C<sub>2</sub>H<sub>5</sub>Br",
        keywords: "phan ung thuy phan bromoethane c2h5br",
        ytLink: "https://www.youtube.com/watch?v=ozZ4E9pvevQ",
        thumbnail: "https://img.youtube.com/vi/ozZ4E9pvevQ/hqdefault.jpg",
        channel: "Kênh: Ý Nguyễn Như",
        badge: "Lớp 11"
    },
    {
        title: "Nghiên cứu về phản ứng cháy của Alcohol",
        keywords: "nghien cuu ve phan ung chay cua alcohol",
        ytLink: "https://www.youtube.com/watch?v=3fQjAP7bBvo",
        thumbnail: "https://img.youtube.com/vi/3fQjAP7bBvo/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Copper(II) hydroxide tác dụng với Alcohol đa chức",
        keywords: "copper ii hydroxide tac dung voi alcohol da chuc",
        ytLink: "https://www.youtube.com/watch?v=--8iWaNOLKI",
        thumbnail: "https://img.youtube.com/vi/--8iWaNOLKI/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Nghiên cứu phản ứng của Phenol với NaOH và Na<sub>2</sub>CO<sub>3</sub>",
        keywords: "nghien cuu phan ung cua phenol voi naoh va na2co3",
        ytLink: "https://www.youtube.com/watch?v=3jYmkpTaj1g",
        thumbnail: "https://img.youtube.com/vi/3jYmkpTaj1g/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Phản ứng của Phenol với nước Bromine",
        keywords: "phan ung cua phenol voi nuoc bromine",
        ytLink: "https://www.youtube.com/watch?v=6YA95z4zXqg",
        thumbnail: "https://img.youtube.com/vi/6YA95z4zXqg/hqdefault.jpg",
        channel: "Kênh: ABC Chemistry",
        badge: "Lớp 11"
    },
    {
        title: "Phản ứng nitro hóa Phenol - tổng hợp Picric acid",
        keywords: "phan ung nitro hoa phenol tong hop picric acid",
        ytLink: "https://www.youtube.com/watch?v=b98xqphz050",
        thumbnail: "https://img.youtube.com/vi/b98xqphz050/hqdefault.jpg",
        channel: "Kênh: ABC Chemistry",
        badge: "Lớp 11"
    },
    {
        title: "Phản ứng của Aldehyde với thuốc thử Tollens",
        keywords: "phan ung cua aldehyde voi thuoc thu tollens",
        ytLink: "https://www.youtube.com/watch?v=4F8AJIguX8w",
        thumbnail: "https://img.youtube.com/vi/4F8AJIguX8w/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Phản ứng oxi hóa Aldehyde bằng Copper(II) Hydroxide",
        keywords: "phan ung oxi hoa aldehyde bang copper ii hydroxide",
        ytLink: "https://www.youtube.com/watch?v=7j5ihOJDKeE",
        thumbnail: "https://img.youtube.com/vi/7j5ihOJDKeE/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Phản ứng tạo Iodoform từ Acetone",
        keywords: "phan ung tao iodoform tu acetone",
        ytLink: "https://www.youtube.com/watch?v=oGGp8pmm0Es",
        thumbnail: "https://img.youtube.com/vi/oGGp8pmm0Es/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Tính acid của Acetic Acid",
        keywords: "tinh acid cua acetic acid",
        ytLink: "https://www.youtube.com/watch?v=JUSbWMP_rxA",
        thumbnail: "https://img.youtube.com/vi/JUSbWMP_rxA/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },
    {
        title: "Phản ứng ester hóa - điều chế Ethyl Acetate",
        keywords: "phan ung ester hoa dieu che ethyl acetate",
        ytLink: "https://www.youtube.com/watch?v=d12h3HMx4sc",
        thumbnail: "https://img.youtube.com/vi/d12h3HMx4sc/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 11"
    },

    // ==========================================
    //                 LỚP 12
    // ==========================================
    {
        title: "Phản ứng xà phòng hoá chất béo",
        keywords: "phan ung xa phong hoa chat beo",
        ytLink: "https://www.youtube.com/watch?v=KorZTnmmWnA",
        thumbnail: "https://img.youtube.com/vi/KorZTnmmWnA/hqdefault.jpg",
        channel: "Kênh: Hóa Học ABC",
        badge: "Lớp 12"
    },
    {
        title: "Phản ứng của glucose với Cu(OH)<sub>2</sub>",
        keywords: "phan ung cua glucose voi cuoh2",
        ytLink: "https://www.youtube.com/watch?v=mxIbHNoeMBg",
        thumbnail: "https://img.youtube.com/vi/mxIbHNoeMBg/hqdefault.jpg",
        channel: "Kênh: HÓA HỌC CƠ BẢN",
        badge: "Lớp 12"
    },
    {
        title: "Tính chất aldehyde của glucose",
        keywords: "tinh chat aldehyde cua glucose",
        ytLink: "https://www.youtube.com/watch?v=4JcVnNKHGw0",
        thumbnail: "https://img.youtube.com/vi/4JcVnNKHGw0/hqdefault.jpg",
        channel: "Kênh: Khánh Linh",
        badge: "Lớp 12"
    },
    {
        title: "Phản ứng của saccharose với Cu(OH)<sub>2</sub>",
        keywords: "phan ung cua saccharose voi cuoh2",
        ytLink: "https://www.youtube.com/watch?v=9XZfytvk0MM",
        thumbnail: "https://img.youtube.com/vi/9XZfytvk0MM/hqdefault.jpg",
        channel: "Kênh: Học Hóa Cùng Cô Ly",
        badge: "Lớp 12"
    },
    {
        title: "Phản ứng thuỷ phân tinh bột",
        keywords: "phan ung thuy phan tinh bot",
        ytLink: "https://www.youtube.com/watch?v=eRP-x_a4RjQ",
        thumbnail: "https://img.youtube.com/vi/eRP-x_a4RjQ/hqdefault.jpg",
        channel: "Kênh: Giac Cao Cu",
        badge: "Lớp 12"
    },
    {
        title: "Phản ứng màu của hồ tinh bột với iodine",
        keywords: "phan ung mau cua ho tinh bot voi iodine",
        ytLink: "https://www.youtube.com/watch?v=7oqGLkQqTi8",
        thumbnail: "https://img.youtube.com/vi/7oqGLkQqTi8/hqdefault.jpg",
        channel: "Kênh: Giac Cao Cu",
        badge: "Lớp 12"
    },
    {
        title: "Phản ứng thuỷ phân cellulose trong môi trường acid",
        keywords: "phan ung thuy phan cellulose trong moi truong acid",
        ytLink: "https://www.youtube.com/watch?v=bav5TCJjUsg",
        thumbnail: "https://img.youtube.com/vi/bav5TCJjUsg/hqdefault.jpg",
        channel: "Kênh: Học Hóa Cùng Cô Ly",
        badge: "Lớp 12"
    },
    {
        title: "Phản ứng của cellulose với nitric acid",
        keywords: "phan ung cua cellulose voi nitric acid",
        ytLink: "https://www.youtube.com/watch?v=Y2GTUes9w-o",
        thumbnail: "https://img.youtube.com/vi/Y2GTUes9w-o/hqdefault.jpg",
        channel: "Kênh: Thầy Nguyễn Phú Hoạt",
        badge: "Lớp 12"
    },
    {
        title: "Tính tan của cellulose trong nước Schweizer",
        keywords: "tinh tan cua cellulose trong nuoc schweizer",
        ytLink: "https://www.youtube.com/watch?v=hn3BsJuEETk",
        thumbnail: "https://img.youtube.com/vi/hn3BsJuEETk/hqdefault.jpg",
        channel: "Kênh: Học Hóa Cùng Cô Ly",
        badge: "Lớp 12"
    },
    {
        title: "Phản ứng của nhóm amine",
        keywords: "phan ung cua nhom amine",
        ytLink: "https://www.youtube.com/watch?v=mpNe1LvWMKk",
        thumbnail: "https://img.youtube.com/vi/mpNe1LvWMKk/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 12"
    },
    {
        title: "Phản ứng của aniline với nước bromine",
        keywords: "phan ung cua aniline voi nuoc bromine",
        ytLink: "https://www.youtube.com/watch?v=9OfqTga8Fbs",
        thumbnail: "https://img.youtube.com/vi/9OfqTga8Fbs/hqdefault.jpg",
        channel: "Kênh: Khánh Linh",
        badge: "Lớp 12"
    },
    {
        title: "Thí nghiệm với protein",
        keywords: "thi nghiem voi protein",
        ytLink: "https://www.youtube.com/watch?v=MMxXhTEGJw4",
        thumbnail: "https://img.youtube.com/vi/MMxXhTEGJw4/hqdefault.jpg",
        channel: "Kênh: Hóa Học ABC",
        badge: "Lớp 12"
    },
    {
        title: "Lắp ráp một pin đơn giản",
        keywords: "lap rap mot pin don gian",
        ytLink: "https://www.youtube.com/watch?v=WMwtRIxld0A",
        thumbnail: "https://img.youtube.com/vi/WMwtRIxld0A/hqdefault.jpg",
        channel: "Kênh: Học Hóa Cùng Cô Ly",
        badge: "Lớp 12"
    },
    {
        title: "Điện phân dung dịch CuSO<sub>4</sub>",
        keywords: "dien phan dung dich cuso4",
        ytLink: "https://www.youtube.com/watch?v=MdDScm4EBD8",
        thumbnail: "https://img.youtube.com/vi/MdDScm4EBD8/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 12"
    },
    {
        title: "Điện phân dung dịch (tự điều chế nước Javel để tẩy rửa)",
        keywords: "dien phan dung dich tu dieu che nuoc javel de tay rua",
        ytLink: "https://www.youtube.com/watch?v=1hW1hJghqq0",
        thumbnail: "https://img.youtube.com/vi/1hW1hJghqq0/hqdefault.jpg",
        channel: "Kênh: Mr.Skeleton Thí Nghiệm",
        badge: "Lớp 12"
    },
    {
        title: "Kim loại tác dụng với phi kim",
        keywords: "kim loai tac dung voi phi kim",
        ytLink: "https://www.youtube.com/watch?v=59m13-yZYiM",
        thumbnail: "https://img.youtube.com/vi/59m13-yZYiM/hqdefault.jpg",
        channel: "Kênh: Thầy Nguyễn Phú Hoạt",
        badge: "Lớp 12"
    },
    {
        title: "Kim loại tác dụng với dung dịch acid loãng",
        keywords: "kim loai tac dung voi dung dich acid loang",
        ytLink: "https://www.youtube.com/watch?v=ijfk0e8ofbs",
        thumbnail: "https://img.youtube.com/vi/ijfk0e8ofbs/hqdefault.jpg",
        channel: "Kênh: Thầy Nguyễn Phú Hoạt",
        badge: "Lớp 12"
    },
    {
        title: "Kim loại tác dụng với dung dịch muối",
        keywords: "kim loai tac dung voi dung dich muoi",
        ytLink: "https://www.youtube.com/watch?v=ymO_GpLB1q8",
        thumbnail: "https://img.youtube.com/vi/ymO_GpLB1q8/hqdefault.jpg",
        channel: "Kênh: Thầy Nguyễn Phú Hoạt",
        badge: "Lớp 12"
    },
    {
        title: "Sự ăn mòn điện hoá sắt",
        keywords: "su an mon dien hoa sat",
        ytLink: "https://www.youtube.com/watch?v=2vGUEWVCYmk",
        thumbnail: "https://img.youtube.com/vi/2vGUEWVCYmk/hqdefault.jpg",
        channel: "Kênh: Thầy Nguyễn Phú Hoạt",
        badge: "Lớp 12"
    },
    {
        title: "Bảo vệ sắt bằng phương pháp điện hóa",
        keywords: "bao ve sat bang phuong phap dien hoa",
        ytLink: "https://www.youtube.com/watch?v=psz18-j7TlA",
        thumbnail: "https://img.youtube.com/vi/psz18-j7TlA/hqdefault.jpg",
        channel: "Kênh: Thầy Nguyễn Phú Hoạt",
        badge: "Lớp 12"
    },
    {
        title: "So sánh độ tan giữa Calcium sulfate và Barium sulfate",
        keywords: "so sanh do tan giua calcium sulfate va barium sulfate",
        ytLink: "https://www.youtube.com/watch?v=K8OCBFc937o",
        thumbnail: "https://img.youtube.com/vi/K8OCBFc937o/hqdefault.jpg",
        channel: "Kênh: Thầy Nguyễn Phú Hoạt",
        badge: "Lớp 12"
    },
    {
        title: "Nhận biết từng ion riêng lẽ trong dung dịch",
        keywords: "nhan biet tung ion rieng le trong dung dich",
        ytLink: "https://www.youtube.com/watch?v=e1k6565b63k",
        thumbnail: "https://img.youtube.com/vi/e1k6565b63k/hqdefault.jpg",
        channel: "Kênh: Thầy Nguyễn Phú Hoạt",
        badge: "Lớp 12"
    },
    {
        title: "Xác định hàm lượng muối Fe(II) bằng dung dịch thuốc tím",
        keywords: "xac dinh ham luong muoi feii bang dung dich thuoc tim",
        ytLink: "https://www.youtube.com/watch?v=q-fAd5-MIXQ",
        thumbnail: "https://img.youtube.com/vi/q-fAd5-MIXQ/hqdefault.jpg",
        channel: "Kênh: Thầy Nguyễn Phú Hoạt",
        badge: "Lớp 12"
    },
    {
        title: "Kiểm tra sự có mặt từng ion riêng biệt Cu<sup>2+</sup> Fe<sup>3+</sup>",
        keywords: "kiem tra su co mat tung ion rieng biet cu2+ fe3+",
        ytLink: "https://www.youtube.com/watch?v=KDXp9_kcBUc",
        thumbnail: "https://img.youtube.com/vi/KDXp9_kcBUc/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 12"
    },
    {
        title: "Sự tạo thành phức chất của Cu<sup>2+</sup>",
        keywords: "su tao thanh phuc chat cua cu2+",
        ytLink: "https://www.youtube.com/watch?v=M7QydP6CLQ8",
        thumbnail: "https://img.youtube.com/vi/M7QydP6CLQ8/hqdefault.jpg",
        channel: "Kênh: Cô Bích Ngọc Hóa Học",
        badge: "Lớp 12"
    },
    {
        title: "Thí nghiệm thử màu ngọn lửa kim loại kiềm thổ",
        keywords: "thi nghiem thu mau ngon lua kim loai kiem tho",
        ytLink: "https://www.youtube.com/watch?v=acKADFjYCG4",
        thumbnail: "https://img.youtube.com/vi/acKADFjYCG4/hqdefault.jpg",
        channel: "Kênh: Thầy Nguyễn Phú Hoạt",
        badge: "Lớp 12"
    },
    {
        title: "Thí nghiệm thử màu ngọn lửa kim loại kiềm",
        keywords: "thi nghiem thu mau ngon lua kim loai kiem",
        ytLink: "https://www.youtube.com/watch?v=JbRLVBLEMEw",
        thumbnail: "https://img.youtube.com/vi/JbRLVBLEMEw/hqdefault.jpg",
        channel: "Kênh: Thầy Nguyễn Phú Hoạt",
        badge: "Lớp 12"
    }
];
