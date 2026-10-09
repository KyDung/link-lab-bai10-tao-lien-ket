const Validators=(()=>{
 const parseHTML=html=>new DOMParser().parseFromString(html,'text/html');
 const chk=(id,ok,label,hint)=>({id,ok:!!ok,label,hint});
 const result=checks=>({passed:checks.every(c=>c.ok),errors:checks.filter(c=>!c.ok).map(c=>c.hint),checks});
 const href=a=>(a.getAttribute('href')||'').trim();
 const absolute=value=>{try{const u=new URL(value);return /^https?:$/.test(u.protocol)&&!!u.hostname}catch{return false}};
 const visible=a=>a.textContent.trim().length>0||!!a.querySelector('img[alt]');
 const relative=(value,target,current)=>{try{return value&&!/^(?:[a-z]+:|\/\/|#|\/)/i.test(value)&&new URL(value,'https://server.test/'+current).pathname==='/'+target}catch{return false}};
 function link(html,opt){const d=parseHTML(html),links=[...d.querySelectorAll('a[href]')];const match=links.find(a=>visible(a)&&(opt.kind==='absolute'?absolute(href(a)):opt.kind==='anchor'?href(a)==='#'+opt.target:relative(href(a),opt.target,opt.current)));const checks=[chk('link',match,'Liên kết có nội dung và đúng địa chỉ',opt.kind==='absolute'?'href phải là địa chỉ đầy đủ, bắt đầu bằng https:// và có tên website, ví dụ https://www.wikipedia.org/.':opt.kind==='anchor'?'href phải có dấu # đứng trước tên id, ví dụ href="#gam_giuong".':'Hãy xem tệp em đang đứng nằm trong thư mục nào, rồi tính xem cần đi lên (../) hay đi vào thư mục nào để đến tệp đích.')];
 if(opt.kind==='anchor') checks.push(chk('anchor',d.getElementById(opt.target)?.textContent.trim(),'Có nội dung đích với id khớp liên kết','Thêm một thẻ có id trùng với tên viết sau dấu # trong href, và thẻ đó phải có chữ bên trong.'));
 if(opt.image)checks.push(chk('image',match?.querySelector('img[src][alt]')&&relative(match.querySelector('img').getAttribute('src'),opt.image,opt.current)&&match.querySelector('img').getAttribute('alt').trim(),'Ảnh nằm trong liên kết, src đúng và alt có ý nghĩa','Đặt thẻ <img> bên trong thẻ <a>, kiểm tra đường dẫn trong src, và viết alt mô tả ảnh.'));
 return result(checks)}
 function final(html){const d=parseHTML(html),a=[...d.querySelectorAll('a[href]')];return result([
 chk('intro',d.querySelector('h1')?.textContent.trim()&&[...d.querySelectorAll('p')].some(p=>p.textContent.trim().length>=30),'Có tiêu đề <h1> và đoạn giới thiệu <p> dài ít nhất 30 ký tự','Thêm thẻ <h1> làm tiêu đề, và một đoạn <p> viết về kỹ năng hoặc định hướng của em (ít nhất 30 ký tự).'),
 chk('external',new Set(a.filter(x=>visible(x)&&absolute(href(x))).map(href)).size>=3,'Có 3 liên kết ra website ngoài, mỗi liên kết một URL khác nhau','Thêm đủ ba liên kết có chữ hiển thị, href là ba URL https:// khác nhau.'),
 chk('anchor',a.some(x=>href(x).startsWith('#')&&href(x).length>1&&d.getElementById(href(x).slice(1))?.textContent.trim()),'Có một liên kết neo nhảy đến một mục trong CV','Gắn id cho một mục (ví dụ <h2 id="skills">), rồi tạo liên kết href="#skills".'),
 chk('project',a.some(x=>visible(x)&&relative(href(x),'du_an/san_pham.html','cv.html')),'Có liên kết mở trang du_an/san_pham.html','Từ cv.html, viết đường dẫn đi vào thư mục du_an để mở san_pham.html.'),
 chk('image',a.some(x=>relative(href(x),'du_an/san_pham.html','cv.html')&&x.querySelector('img')&&relative(x.querySelector('img').getAttribute('src'),'images/du_an.jpg','cv.html')&&x.querySelector('img').getAttribute('alt')?.trim()),'Ảnh images/du_an.jpg là liên kết mở trang sản phẩm, có alt','Đặt <img src="images/du_an.jpg" alt="…"> vào trong liên kết mở du_an/san_pham.html.')
 ])}
 return {parseHTML,link,final,absolute,relative,result,chk};
})();
