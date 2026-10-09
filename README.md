# Link Lab — Bài 10: Tạo liên kết

Website Tin học 12, Kết nối tri thức; nội dung từ `Bài 10 tin 12.docx`, cấu trúc module theo `HUONG_DAN_TAO_BAI_MOI.md`. HTML/CSS/JavaScript thuần, không cần npm hay build.

## Chạy

Mở thư mục bằng VS Code và dùng Live Server với `index.html`, hoặc chạy `python -m http.server 8080` rồi mở http://localhost:8080. Không mở bằng file:// để sử dụng Firebase. Có thể đưa các file web lên GitHub Pages hoặc Firebase Hosting.

- Học sinh: `index.html`.
- Giáo viên: `teacher.html`, đăng nhập email/mật khẩu.
- Mã bài: `html-bai10-tao-lien-ket`.
- Nơi lưu: `lessons/html-bai10-tao-lien-ket/students/<lop_hoten-khong-dau>`.
- Không dùng ảnh do AI tạo. Các biểu tượng chìa khóa, khóa và máy tính lấy từ Twemoji và lưu cục bộ; font Be Vietnam Pro cũng lưu cục bộ. Chỉ Firebase cần mạng. Tệp ảnh trong cây là tệp ảo, việc phân giải đường dẫn diễn ra trên trình duyệt.

## Thiết lập Firebase một lần

Cấu hình project `db-web-dayhoc` đã được điền. Chỉ có cấu hình Web app không đủ quyền thay đổi Rules hay triển khai Hosting; cần thao tác dưới tài khoản quản trị Firebase.

1. Trong Authentication → Sign-in method, bật Email/Password (đã được người dùng xác nhận).
2. Authentication → Users → Add user: tạo tài khoản cho từng giáo viên, sao chép UID. Không đưa mật khẩu vào mã nguồn.
3. Firestore → Data: tạo collection `teachers`, document ID là UID giáo viên; thêm trường `name` (string) tùy ý. Lặp lại cho đồng nghiệp. Chỉ quản trị viên Console tạo được danh sách này.
4. Ghép các quy tắc cần thiết trong `firestore.rules` với Rules hiện có, rồi Publish. Không xóa quy tắc dành cho ứng dụng khác nếu project dùng chung. File mẫu này hỗ trợ các bài theo cùng schema, đọc bài chỉ khi UID nằm trong `teachers`.
5. Nếu Firebase yêu cầu cấu hình domain, thêm localhost/domain triển khai ở Authentication → Settings → Authorized domains.
6. Chạy hết bài, nộp phần 1, kiểm tra document xuất hiện; nộp vận dụng và kiểm tra cập nhật cùng document. Đăng nhập giáo viên để kiểm tra quyền đọc.

Mô hình ghi không đăng nhập học sinh được giữ theo file hướng dẫn: học sinh không đọc được database nhưng có thể ghi vào khóa lớp_họ-tên. Hai học sinh trùng tên và lớp dùng chung khóa; cần dùng tên nhóm hoặc thêm định danh vào tên. Đây là công cụ lớp học, không phải hệ thống điểm số chống giả mạo. Checklist và thống kê gõ không chấm nội dung cá nhân hay điểm hợp tác.

## Hoạt động

- Khởi động 5 phút: khám phá ba điểm nhấp và thảo luận siêu văn bản.
- Hình thành 15 phút: 5 bài nhỏ có giải thích, mẫu và preview; mỗi bài có mã mẫu tô màu giải thích từng thành phần, khung kết quả cho thấy tác dụng của thẻ; học sinh viết thêm vào mã có sẵn (không chặn dán).
- Luyện tập 20 phút: 3 cánh cửa không mã mẫu, phản hồi từng tiêu chí, nộp phần 1.
- Vận dụng 5 phút khởi đầu, hoàn thiện ở nhà: CV với 3 liên kết ngoài + neo + liên kết tương đối + liên kết ảnh. Checklist trực tiếp, nộp riêng, tự nộp bù phần 1.
- Từ điển truy cập bằng nút góc trên, tìm có hoặc không dấu.
- Bản đồ tệp ảo giải thích `../`, `./`, `/`, tên tệp và phân biệt URL ngoài.

Mã học sinh luôn được xem trong iframe sandbox không có allow-same-origin; script, iframe, form và thuộc tính on* của mã học sinh bị loại. Khung chỉ chạy một script nhỏ của hệ thống (CSP nonce) để bắt cú nhấp. Bấm liên kết ngoài (https://) mở website thật ở tab mới; bấm liên kết đến tệp trong dự án mở trang đích mô phỏng; liên kết neo cuộn ngay trong khung. Các nút “thử đi theo liên kết” dưới khung làm cùng việc. Dữ liệu tự lưu theo mã bài; nộp thất bại không xóa dữ liệu. Có tải bản sao JSON và HTML ở Vận dụng. Đổi học sinh tải bản sao trước khi bắt đầu lượt mới.

## Nguồn kỹ thuật

- [MDN — Creating links](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Creating_links)
- [MDN — Resolving relative references](https://developer.mozilla.org/en-US/docs/Web/API/URL_API/Resolving_relative_references)
- [Firebase — Batched writes](https://firebase.google.com/docs/firestore/manage-data/transactions)

Các mốc thời gian mang tính gợi ý; giáo viên phân công thành viên luân phiên gõ và quan sát hợp tác theo rubric 4–3–3 trong kế hoạch bài dạy.

## Giấy phép tài nguyên

- Biểu tượng: [Twemoji](https://github.com/twitter/twemoji), đồ họa CC BY 4.0, bản quyền Twitter và cộng tác viên. Các tệp SVG giữ nguyên, dùng làm hình minh họa cho tệp ảnh ảo .jpg.
- Font: Be Vietnam Pro, SIL Open Font License; giấy phép ở `assets/fonts/OFL.txt`.
