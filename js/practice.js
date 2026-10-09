/* Giai đoạn Luyện tập: áp dụng vào các trang của website lớp, không còn mã mẫu.
   Bài 1-2: viết thêm liên kết vào mã có sẵn. Bài 3: tìm và sửa liên kết bị hỏng. */
const Practice={activities:[
 {id:'practice-menu',name:'Menu trang chủ',title:'Bài 1 · Làm menu cho trang chủ',current:'index.html',showTree:true,
  lead:'Trang chủ của lớp mới có tiêu đề, chưa có liên kết nào. Em làm menu để người xem đi được tới các trang khác của website.',
  starter:'<h1>Website lớp 12A</h1>\n<p>Chào mừng các bạn! Chọn một mục để xem:</p>\n<ul>\n  <li><!-- Giới thiệu lớp → mở gioi_thieu.html --></li>\n  <li><!-- Trang của An → mở thanh_vien/an.html --></li>\n  <li><!-- Bài tập Tin học → mở bai_tap/tin_hoc.html --></li>\n  <li><!-- Wikipedia → website ngoài --></li>\n</ul>\n',
  task:['Em đang ở index.html. Viết liên kết vào từng dòng <li> trống.','“Giới thiệu lớp” mở gioi_thieu.html.','“Trang của An” mở thanh_vien/an.html.','“Bài tập Tin học” mở bai_tap/tin_hoc.html.','“Wikipedia” mở website ngoài https://www.wikipedia.org/ (bấm nút “URL gợi ý”).','Sau khi viết, bấm thử từng liên kết dưới khung kết quả.'],
  urls:[{label:'Wikipedia',url:'https://www.wikipedia.org/'},{label:'MDN Web Docs',url:'https://developer.mozilla.org/'},{label:'Khan Academy',url:'https://www.khanacademy.org/'}],
  validate:html=>Validators.multi(html,'index.html',[
   {id:'intro',kind:'relative',target:'gioi_thieu.html',text:true,label:'Liên kết “Giới thiệu lớp” mở gioi_thieu.html',hint:'gioi_thieu.html nằm cùng thư mục với index.html, nên chỉ cần viết tên tệp.'},
   {id:'an',kind:'relative',target:'thanh_vien/an.html',text:true,label:'Liên kết “Trang của An” mở thanh_vien/an.html',hint:'an.html nằm trong thư mục thanh_vien: viết thanh_vien/an.html.'},
   {id:'bai-tap',kind:'relative',target:'bai_tap/tin_hoc.html',text:true,label:'Liên kết “Bài tập Tin học” mở bai_tap/tin_hoc.html',hint:'tin_hoc.html nằm trong thư mục bai_tap: viết bai_tap/tin_hoc.html.'},
   {id:'wiki',kind:'absolute',host:'wikipedia.org',text:true,label:'Liên kết “Wikipedia” dùng URL tuyệt đối',hint:'Dùng URL đầy đủ có https://, ví dụ https://www.wikipedia.org/.'}
  ])},
 {id:'practice-member',name:'Trang thành viên',title:'Bài 2 · Nối trang của An với các trang khác',current:'thanh_vien/an.html',showTree:true,
  lead:'Trang của An nằm trong thư mục thanh_vien, nên các liên kết đi ra ngoài cần ../ Em thêm liên kết để người xem không bị “kẹt” ở trang này.',
  starter:'<!-- Logo: bọc ảnh vào liên kết mở trang chủ index.html -->\n<img src="../images/logo.jpg" alt="Logo lớp 12A">\n<h1>Trang của An</h1>\n<p>An là lớp trưởng của lớp 12A.</p>\n<ul>\n  <li><!-- Trang của Bình → mở binh.html --></li>\n  <li><!-- Giới thiệu lớp → mở gioi_thieu.html --></li>\n  <li><!-- Về trang chủ → mở index.html --></li>\n</ul>\n',
  task:['Em đang ở thanh_vien/an.html.','“Trang của Bình” mở binh.html (cùng thư mục thanh_vien).','“Giới thiệu lớp” mở gioi_thieu.html (ở thư mục cha).','“Về trang chủ” mở index.html (ở thư mục cha).','Bọc ảnh logo trong liên kết mở index.html, giữ nguyên alt.'],
  validate:html=>Validators.multi(html,'thanh_vien/an.html',[
   {id:'binh',kind:'relative',target:'thanh_vien/binh.html',text:true,label:'Liên kết “Trang của Bình” mở binh.html',hint:'binh.html nằm cùng thư mục với an.html, nên chỉ cần viết tên tệp.'},
   {id:'intro',kind:'relative',target:'gioi_thieu.html',text:true,label:'Liên kết “Giới thiệu lớp” mở gioi_thieu.html',hint:'gioi_thieu.html nằm ngoài thư mục thanh_vien: cần ../ phía trước.'},
   {id:'home',kind:'relative',target:'index.html',text:true,label:'Liên kết “Về trang chủ” mở index.html',hint:'index.html nằm ngoài thư mục thanh_vien: cần ../ phía trước.'},
   {id:'logo',kind:'relative',target:'index.html',image:'images/logo.jpg',label:'Ảnh logo là liên kết mở index.html',hint:'Đặt thẻ <img> vào trong thẻ <a> có href="../index.html", giữ nguyên src và alt.'}
  ])},
 {id:'practice-fix',name:'Sửa lỗi liên kết',title:'Bài 3 · Tìm và sửa liên kết bị hỏng',current:'thanh_vien/binh.html',showTree:true,
  lead:'Trang của Bình có nhiều liên kết bị hỏng. Em bấm thử từng liên kết dưới khung kết quả: liên kết nào báo 404 hoặc ảnh không hiện là liên kết sai. Em sửa lại cho đúng.',
  starter:'<img src="image/logo.jpg" alt="Logo lớp 12A">\n<h1>Trang của Bình</h1>\n<p>Bình phụ trách câu lạc bộ lập trình của lớp.</p>\n<ul>\n  <li><a href="index.html">Về trang chủ</a></li>\n  <li><a href="an.html">Trang của An</a></li>\n  <li><a href="../Bai_tap/tin_hoc.html">Bài tập Tin học</a></li>\n  <li><a href="www.wikipedia.org">Wikipedia</a></li>\n  <li><a href="#lien-he">Liên hệ</a></li>\n</ul>\n<h2 id="lienhe">Liên hệ</h2>\n<p>Email: binh@lop12a.edu.vn</p>\n',
  task:['Em đang ở thanh_vien/binh.html.','Bấm thử từng liên kết để tìm lỗi.','Sửa mọi lỗi trong mã cho đến khi tất cả mục bên dưới được đánh dấu ✓.','Lỗi thường gặp: thiếu ../, sai chữ hoa/thường, thiếu https://, id và href không khớp, sai thư mục ảnh.'],
  validate:html=>{
   const d=Validators.parseHTML(html),cur='thanh_vien/binh.html',a=[...d.querySelectorAll('a[href]')],hrefOf=Validators.href;
   const bad=Validators.broken(html,cur);
   const chk=Validators.chk;
   return Validators.result([
    chk('logo',[...d.querySelectorAll('img')].some(i=>Validators.relative((i.getAttribute('src')||'').trim(),'images/logo.jpg',cur)),'Ảnh logo hiện được','Ảnh nằm trong thư mục images ở ngoài thanh_vien, nên đường dẫn cần ../ và đúng tên thư mục.'),
    chk('home',a.some(x=>Validators.visible(x,true)&&Validators.relative(hrefOf(x),'index.html',cur)),'Liên kết “Về trang chủ” mở được trang chủ','index.html nằm ngoài thư mục thanh_vien: cần ../ phía trước.'),
    chk('baitap',a.some(x=>Validators.visible(x,true)&&Validators.relative(hrefOf(x),'bai_tap/tin_hoc.html',cur)),'Liên kết “Bài tập Tin học” mở được trang bài tập','Tên thư mục phải viết đúng chữ hoa/thường: bai_tap.'),
    chk('wiki',a.some(x=>Validators.visible(x,true)&&Validators.absolute(hrefOf(x))&&new URL(hrefOf(x)).hostname.endsWith('wikipedia.org')),'Liên kết “Wikipedia” ra đúng website ngoài','Liên kết ra website ngoài cần bắt đầu bằng https://'),
    chk('anchor',a.some(x=>hrefOf(x).length>1&&hrefOf(x).startsWith('#')&&!!d.getElementById(hrefOf(x).slice(1))),'Liên kết “Liên hệ” cuộn tới đúng mục Liên hệ','href sau dấu # phải giống hệt id của mục Liên hệ.'),
    chk('none',bad.length===0,'Không còn liên kết hay ảnh nào bị hỏng',bad.length?'Còn lỗi ở “'+bad[0].value+'”: '+bad[0].reason+'.':'')
   ]);
  }}
],render(index=0){Activity.render('practice',this.activities,index)},async submitPart1(){await App.submit('part1')}};
