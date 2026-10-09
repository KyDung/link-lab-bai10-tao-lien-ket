async (page) => {
 const report=[];
 const assert=(condition,label)=>{if(!condition)throw new Error(label);report.push(label)};
 await page.goto('http://127.0.0.1:8081/#home');
 await page.getByRole('button',{name:'⌕ Từ điển HTML'}).click();
 await page.getByRole('searchbox').fill('thu muc cha');
 assert(await page.locator('.dict-entry').count()>=1,'Từ điển tìm không dấu');
 await page.getByRole('button',{name:'Đóng từ điển'}).click();
 await page.getByRole('textbox',{name:'Họ tên học sinh / tên nhóm'}).fill('Kiem Thu LinkLab');
 await page.getByRole('textbox',{name:'Lớp',exact:true}).fill('TEST12');
 await page.getByRole('button',{name:'Bắt đầu khám phá →'}).click();
 await page.goto('http://127.0.0.1:8081/#final');
 await page.waitForURL('**/#warmup');report.push('Chặn truy cập sớm bằng hash');
 await page.locator('[data-door="book"]').click();await page.locator('[data-door="profile"]').click();await page.locator('[data-door="map"]').click();
 await page.getByRole('button',{name:'Giải mã bằng thẻ HTML →'}).click();
 await page.locator('#code').fill('<a>Thiếu địa chỉ</a>');
 await page.getByRole('button',{name:'Kiểm tra mã →'}).click();
 assert((await page.locator('#feedback').innerText()).includes('Chưa đúng'),'Phản hồi mã sai');
 assert(await page.locator('#code').evaluate(el=>{const event=new ClipboardEvent('paste',{bubbles:true,cancelable:true});return !el.dispatchEvent(event)}),'Chặn dán bài kiến thức');
 const solutions=[
 '<a href="https://www.wikipedia.org/">Tìm hiểu</a>',
 '<a href="./Vault/khoa_mat_ma.html">Vào kho</a>',
 '<a href="../index.html">Quay lại</a>',
 '<a href="#gam_giuong">Gầm giường</a><p id="gam_giuong">Chìa khóa</p>',
 '<a href="Vault/khoa_mat_ma.html"><img src="./images/ket_sat.jpg" alt="Mở két"></a>'
 ];
 for(let i=0;i<solutions.length;i++){
   await page.waitForURL('**/#learning/'+i);
   await page.locator('#code').fill(solutions[i]);
   if(i===2){await page.reload();assert(await page.locator('#code').inputValue()===solutions[i],'Tải lại giữ nguyên mã chưa kiểm tra');assert(await page.evaluate(()=>App.availableIndex('learning'))===2,'Tải lại không tự mở khóa bài chưa kiểm tra');}
   await page.getByRole('button',{name:'Kiểm tra mã →'}).click();
   assert((await page.locator('#feedback').innerText()).includes('Chính xác'),'Bài kiến thức '+i+' chấp nhận mã đúng');
 }
 await page.getByRole('button',{name:'Vào phòng giam →'}).click();
 const practice=[solutions[3],'<a href="hanh_lang/cua_thoat.html"><img src="images/chia_khoa.jpg" alt="Ra cửa thoát"></a>',solutions[0]];
 for(let i=0;i<practice.length;i++){
   await page.waitForURL('**/#practice/'+i);await page.locator('#code').fill(practice[i]);await page.getByRole('button',{name:'Kiểm tra mã →'}).click();assert((await page.locator('#feedback').innerText()).includes('Chính xác'),'Luyện tập '+i+' đạt');
 }
 await page.getByRole('button',{name:'Tiếp tục vận dụng →'}).click();
 await page.getByRole('button',{name:'Nộp bài vận dụng →'}).click({force:true});
 assert((await page.locator('#submit-status').innerText()).includes('Còn thiếu'),'Nộp thiếu hiển thị yêu cầu');
 const final='<h1>CV kiểm thử</h1><p>Em thích lập trình website và muốn học cách tạo ra sản phẩm có ích.</p><a href="https://github.com/">GitHub</a><a href="https://developer.mozilla.org/">MDN</a><a href="https://www.wikipedia.org/">Wikipedia</a><a href="#skills">Kỹ năng</a><h2 id="skills">Kỹ năng HTML</h2><a href="du_an/san_pham.html"><img src="images/du_an.jpg" alt="Mở dự án"></a>';
 await page.locator('#code').fill(final);
 assert(await page.locator('#submit-final').getAttribute('aria-disabled')==='false','CV tổng hợp đạt đủ checklist');
 await page.getByText('Bản đồ máy chủ · Thử một đường dẫn',{exact:true}).click();
 await page.locator('#sim-current').selectOption('Vault/khoa_mat_ma.html');await page.locator('#sim-path').fill('../index.html');await page.locator('#sim-go').click();assert((await page.locator('#sim-result').innerText()).includes('Đã tìm thấy'),'Mô phỏng ../ đúng');
 await page.locator('#sim-path').fill('index.html');await page.locator('#sim-go').click();assert((await page.locator('#sim-result').innerText()).includes('Không tìm thấy'),'Mô phỏng sai thư mục');
 const security=await page.evaluate(()=>{const html=Preview.sanitize('<script>alert(1)</script><img src="x" onerror="alert(1)"><iframe src="https://example.com"></iframe>','cv.html');const d=new DOMParser().parseFromString(html,'text/html');return !d.querySelector('script,iframe,[onerror]')});assert(security,'Preview loại nội dung chủ động');
 await page.reload();assert(await page.locator('#code').inputValue()===final,'CV giữ nguyên sau tải lại');
 await page.setViewportSize({width:390,height:844});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Không tràn ngang trên điện thoại');
 await page.screenshot({path:'output/playwright/mobile-final.png',fullPage:true});
 await page.setViewportSize({width:1440,height:960});
 await page.screenshot({path:'output/playwright/desktop-final.png',fullPage:true});
 console.log(JSON.stringify(report,null,2));
}

