const Practice={activities:[
 {id:'practice-anchor',name:'Phòng giam',title:'Cánh cửa 1 · Manh mối dưới gầm giường',current:'phong_giam.html',
  lead:'Em bị nhốt trong một căn phòng số. Nhật ký ghi rằng chìa khóa nằm dưới gầm giường, nhưng liên kết chỉ đường đã bị xóa mất.',
  starter:'<h1>Phòng giam</h1>\n<!-- Thêm liên kết “Kiểm tra gầm giường” ở đây, giống bài Liên kết neo -->\n<p>Căn phòng tối om, chỉ có một ô cửa sổ nhỏ trên cao. Mùi ẩm mốc xộc vào mũi em.</p>\n<p>Trên bàn là cuốn nhật ký cũ. Trang cuối ghi: “Mọi thứ quan trọng đều được giấu ở nơi thấp nhất trong phòng.”</p>\n<p>Em nhìn quanh: một chiếc tủ sắt khóa chặt, một ngọn đèn bàn chập chờn và một chiếc giường kê sát tường.</p>\n<p>Dưới gầm giường có thứ gì đó lóe sáng. Đó là một chiếc chìa khóa nhỏ bằng đồng.</p>\n',
  task:["Làm giống bài Liên kết neo.", "Thêm liên kết có chữ “Kiểm tra gầm giường” và href=\"#gam_giuong\" ở đầu trang.", "Thêm id=\"gam_giuong\" vào đoạn văn cuối cùng (đoạn nói về chiếc chìa khóa)."],
  validate:html=>Validators.link(html,{kind:'anchor',target:'gam_giuong'})},
 {id:'practice-image',name:'Chiếc chìa khóa',title:'Cánh cửa 2 · Mang chìa khóa ra hành lang',current:'phong_giam.html',
  lead:'Em đã tìm thấy chìa khóa! Bây giờ hãy biến ảnh chìa khóa thành một cánh cửa dẫn ra hành lang.',
  starter:'<h1>Phòng giam</h1>\n<p>Em đã có chìa khóa. Cánh cửa dẫn ra hành lang đang chờ em.</p>\n<!-- Bọc ảnh vào trong một liên kết mở hanh_lang/cua_thoat.html, giống bài Liên kết ảnh -->\n<img src="images/chia_khoa.jpg" alt="Chìa khóa">\n',
  task:["Làm giống bài Liên kết ảnh. Tệp em đang ở là phong_giam.html.", "Bọc ảnh images/chia_khoa.jpg trong thẻ <a> có href mở hanh_lang/cua_thoat.html.", "Sửa alt thành mô tả việc ảnh làm, ví dụ “Ra cửa thoát”."],
  validate:html=>Validators.link(html,{kind:'relative',target:'hanh_lang/cua_thoat.html',current:'phong_giam.html',image:'images/chia_khoa.jpg'})},
 {id:'practice-external',name:'Gửi tín hiệu',title:'Cánh cửa 3 · Kết nối ra bên ngoài',current:'hanh_lang/cua_thoat.html',
  lead:'Cửa thoát đã mở ra Internet. Em cần gửi tín hiệu cầu cứu ra bên ngoài bằng một liên kết dùng URL tuyệt đối.',
  starter:'<h1>Cửa thoát</h1>\n<p>Em đã ra đến hành lang cuối cùng. Chỉ còn một việc: gửi tín hiệu cầu cứu cho thầy cô.</p>\n<!-- Viết liên kết có chữ “Gửi tín hiệu cho thầy cô” dẫn tới một website bên ngoài, giống bài Liên kết & URL -->\n',
  task:["Làm giống bài Liên kết & URL.", "Viết liên kết có chữ cầu cứu, ví dụ “Gửi tín hiệu cho thầy cô”.", "href là URL tuyệt đối.", "Bấm một nút “URL gợi ý”, hoặc tự gõ địa chỉ website trường em."],
  urls:[{label:'Bộ GD&ĐT',url:'https://moet.gov.vn/'},{label:'Wikipedia tiếng Việt',url:'https://vi.wikipedia.org/'},{label:'Khan Academy',url:'https://www.khanacademy.org/'}],
  validate:html=>Validators.link(html,{kind:'absolute'})}
],render(index=0){Activity.render('practice',this.activities,index)},async submitPart1(){await App.submit('part1')}};
