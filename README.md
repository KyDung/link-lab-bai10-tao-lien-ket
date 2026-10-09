# Link Lab — Bài 10: Tạo liên kết

Web học tương tác Tin học 12 (Kết nối tri thức). Dự án xuyên suốt: **xây website cho lớp 12A**. HTML/CSS/JavaScript thuần, không cần npm hay build. Cấu trúc module theo `HUONG_DAN_TAO_BAI_MOI.md`.

- Học sinh: `index.html`
- Giáo viên: `teacher.html` (gõ tên đăng nhập, ví dụ `dung`, hệ thống tự thêm `@linklab.edu.vn`)
- Mã bài: `html-bai10-tao-lien-ket`
- Nơi lưu: `lessons/html-bai10-tao-lien-ket/students/<lop_hoten-khong-dau>`

## Chạy

Mở thư mục bằng VS Code và dùng Live Server với `index.html`, hoặc chạy `python -m http.server 8080` rồi mở http://localhost:8080. Không mở bằng `file://` vì Firebase cần địa chỉ http(s). Có thể đưa lên GitHub Pages (đang dùng) hoặc Firebase Hosting.

## Nội dung bài học

Website mô phỏng của lớp (`lop12a.edu.vn`):

```
├── index.html          trang chủ
├── gioi_thieu.html
├── thanh_vien/         an.html, binh.html, em.html (trang của học sinh)
├── bai_tap/            tin_hoc.html
└── images/             logo.jpg, lop.jpg, em.jpg
```

1. **Khởi động**: trang bài viết giả, học sinh nhấp thử để biết cái gì là liên kết.
2. **Hình thành kiến thức** (6 bài): URL tuyệt đối → cùng thư mục → thư mục con → `../` thư mục cha → liên kết neo → ảnh làm liên kết. Mỗi bài có mã mẫu tô màu giải thích từng thành phần, khung kết quả bấm thử được và nhiệm vụ viết thêm vào mã có sẵn.
3. **Luyện tập** (3 bài): làm menu trang chủ → nối trang thành viên → tìm và sửa liên kết hỏng (bấm thử thấy 404 rồi sửa). Nộp phần 1.
4. **Vận dụng**: viết trang giới thiệu bản thân `thanh_vien/em.html` có 3 liên kết ngoài, liên kết neo, liên kết về trang chủ và ảnh liên kết. Checklist trực tiếp, nộp riêng.

Từ điển HTML ở nút góc trên, tìm có hoặc không dấu.

## Xem trước và an toàn

Mã học sinh luôn chạy trong iframe sandbox không có `allow-same-origin`; script, iframe, form và thuộc tính `on*` của mã học sinh bị loại. Khung chỉ chạy một script nhỏ của hệ thống (CSP nonce) để bắt cú nhấp. Bấm liên kết ngoài (`https://`) mở website thật ở tab mới; bấm liên kết đến tệp của website lớp mở hộp “Trang đích” (báo 404 nếu sai đường dẫn, kể cả `../` đi quá thư mục gốc); liên kết neo cuộn ngay trong khung. Ảnh minh họa là SVG tự vẽ, nhúng thẳng trong mã, không tải từ ngoài. Font Be Vietnam Pro lưu cục bộ (SIL OFL, xem `assets/fonts/OFL.txt`). Chỉ Firebase cần mạng.

Dữ liệu tự lưu trên máy theo mã bài; nộp thất bại không xóa dữ liệu. Có tải bản sao JSON và HTML ở phần Vận dụng.

## Thiết lập Firebase (project `db-web-dayhoc`, dùng chung nhiều bài)

1. Authentication → bật Email/Password; tạo tài khoản giáo viên (email dạng `ten@linklab.edu.vn`).
2. Firestore → collection `teachers` ở cấp gốc: document ID là UID giáo viên, trường `name` (string).
3. Firestore → Rules: hàm `isTeacher()` cho phép email Google quản trị **hoặc** UID có trong `teachers` (xem `firestore.rules`). Ghép vào Rules đang có, không xóa quy tắc của bài khác.
4. Authentication → Settings → Authorized domains: thêm `localhost` và tên miền triển khai (ví dụ `kydung.github.io`).
5. Kiểm tra: học sinh nộp bài; giáo viên đăng nhập `teacher.html` thấy bài, lọc theo lớp, xóa bài thử.

Học sinh không đọc được database nhưng ghi được vào khóa `lớp_họ-tên`. Hai học sinh trùng tên và lớp dùng chung khóa; cần thêm định danh vào tên. Đây là công cụ lớp học, không phải hệ thống điểm chống giả mạo. Checklist chấm cấu trúc liên kết, không chấm nội dung cá nhân; thống kê gõ chỉ để giáo viên tham khảo.

## Giấy phép

- Font: Be Vietnam Pro, SIL Open Font License (`assets/fonts/OFL.txt`).
- Biểu tượng trong `assets/images`: [Twemoji](https://github.com/twitter/twemoji), CC BY 4.0, bản quyền Twitter và cộng tác viên.
