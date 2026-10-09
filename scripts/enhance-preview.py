from pathlib import Path
p=Path('js/editor.js');s=p.read_text(encoding='utf-8')
s=s.replace("const Preview={", '''const Preview={
 openTarget(result,currentHtml,current){
   document.querySelector('#virtual-browser')?.remove();
   const dialog=document.createElement('dialog');dialog.id='virtual-browser';
   const address=result.external?result.url:'https://server.test/'+result.path+(result.hash||'');
   dialog.innerHTML='<div class="dialog-head"><h2>Trình duyệt mô phỏng</h2><button aria-label="Đóng trang mô phỏng">✕</button></div><p class="resolve-result">'+Util.esc(address)+'</p><div class="virtual-content"></div>';
   document.body.append(dialog);dialog.querySelector('button').onclick=()=>dialog.close();
   const content=dialog.querySelector('.virtual-content');
   if(!result.ok){content.innerHTML='<h3>404 · Chưa tìm thấy tệp</h3><p>'+Util.esc(result.message)+'</p>'}
   else if(result.external){content.innerHTML='<h3>Em đang đi ra ngoài dự án</h3><p>Đây là URL tuyệt đối. Trong website thực, trình duyệt sẽ mở tài nguyên ở địa chỉ này.</p><a target="_blank" rel="noopener noreferrer" href="'+Util.esc(result.url)+'">Mở website thật ↗</a>'}
   else {const pages={
     'index.html':'<h1>Sảnh chính</h1><p>Em đã trở lại Server_Root. Từ đây, em có thể đi vào Vault hoặc Database.</p>',
     'Vault/khoa_mat_ma.html':'<h1>Kho mật mã đã mở</h1><p>Đúng thư mục, đúng tệp. Chìa khóa tiếp theo là biết cách trở về thư mục cha bằng ../.</p><img src="../images/ket_sat.jpg" alt="Kho đã mở">',
     'Database/ghi_chu.html':'<h1>Nhật ký máy chủ</h1><p>Mỗi ../ đi lên một cấp. Tên thư mục và tên tệp cần khớp chính xác.</p>',
     'hanh_lang/cua_thoat.html':'<h1>Em đã đến cửa thoát!</h1><p>Liên kết từ phòng giam đã đưa em vào thư mục hanh_lang. Hãy hoàn thành nhiệm vụ gửi tín hiệu ra ngoài để kết thúc Escape Room.</p><img src="../images/chia_khoa.jpg" alt="Chìa khóa cửa thoát">',
     'du_an/san_pham.html':'<h1>Sản phẩm đầu tay</h1><p>Đây là trang dự án được cung cấp sẵn trong mô phỏng. Liên kết từ CV của em đã hoạt động.</p><img src="../images/du_an.jpg" alt="Dự án website">',
     'phong_giam.html':'<h1>Phòng giam</h1><p id="gam_giuong">Dưới gầm giường có một chiếc chìa khóa.</p>',
     'cv.html':'<h1>Portfolio</h1><p>Trang giới thiệu cá nhân của em.</p>'
   };const frame=document.createElement('iframe');frame.setAttribute('sandbox','');frame.title='Trang đích trong thư mục ảo';frame.style='width:100%;height:320px;border:0';content.append(frame);this.update(frame,result.path===current?currentHtml:pages[result.path]||'<h1>Tệp hình ảnh</h1><img src="'+result.path+'" alt="Ảnh trong dự án">',result.path)}
   dialog.showModal();
 },''')
s=s.replace("container.append(box)};container.append(b)", "container.append(box);this.openTarget({...r,message},html,current)};container.append(b)")
p.write_text(s,encoding='utf-8')
p=Path('js/app.js');s=p.read_text(encoding='utf-8');s=s.replace('<span style="font:50px Georgia">⌘</span>', '<img src="assets/images/project.svg" width="64" height="64" alt="Bản đồ dự án">');p.write_text(s,encoding='utf-8')
for name in ['index.html','teacher.html']:
 p=Path(name);s=p.read_text(encoding='utf-8');s=s.replace('<title>', '<link rel="icon" href="assets/images/key.svg"><title>',1);p.write_text(s,encoding='utf-8')
