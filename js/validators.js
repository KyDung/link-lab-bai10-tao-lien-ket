/* Bộ chấm bài: kiểm tra bằng DOM, trả về {passed, errors[], checks[]}.
   Website mô phỏng của lớp nằm trong VirtualFS.files (js/editor.js). */
const Validators=(()=>{
 const FINAL_FILE='thanh_vien/em.html';
 const parseHTML=html=>new DOMParser().parseFromString(html,'text/html');
 const chk=(id,ok,label,hint)=>({id,ok:!!ok,label,hint});
 const result=checks=>({passed:checks.every(c=>c.ok),errors:checks.filter(c=>!c.ok).map(c=>c.hint),checks});
 const href=a=>(a.getAttribute('href')||'').trim();
 const SCHEME=/^[a-z][a-z0-9+.-]*:/i;
 // URL tuyệt đối: bắt đầu bằng http(s):// và có tên miền
 const absolute=value=>{if(!/^https?:\/\/[^\s/]+/i.test(value))return false;try{const u=new URL(value);return /^https?:$/.test(u.protocol)&&u.hostname.includes('.')}catch{return false}};
 // Tính đường dẫn tương đối từ tệp hiện tại, trả về đường dẫn tính từ gốc website; null nếu không hợp lệ hoặc ../ đi quá gốc
 const resolvePath=(value,current)=>{
  if(!value||SCHEME.test(value)||value.startsWith('/')||value.startsWith('#'))return null;
  const clean=value.split('#')[0].split('?')[0];
  if(!clean)return null;
  const parts=current.split('/').slice(0,-1);
  for(const seg of clean.split('/')){
   if(seg===''||seg==='.')continue;
   if(seg==='..'){if(!parts.length)return null;parts.pop()}else{try{parts.push(decodeURIComponent(seg))}catch{return null}}
  }
  return parts.join('/');
 };
 const relative=(value,target,current)=>resolvePath(value,current)===target;
 const altOf=img=>(img.getAttribute('alt')||'').trim();
 // text=true: liên kết phải có chữ (không tính ảnh)
 const visible=(a,text)=>a.textContent.trim().length>0||(!text&&[...a.querySelectorAll('img')].some(altOf));
 const hasAnchorTarget=(d,id)=>!!id&&!!d.getElementById(id)?.textContent.trim();

 function link(html,opt){
  const d=parseHTML(html),links=[...d.querySelectorAll('a[href]')];
  const match=links.find(a=>visible(a,opt.text)&&(opt.kind==='absolute'?absolute(href(a))&&(!opt.host||new URL(href(a)).hostname.endsWith(opt.host)):opt.kind==='anchor'?href(a)==='#'+opt.target:relative(href(a),opt.target,opt.current)));
  const hints={
   absolute:'href phải là địa chỉ đầy đủ, bắt đầu bằng https:// và có tên website, ví dụ https://www.wikipedia.org/.',
   anchor:'href phải có dấu # đứng trước tên id, ví dụ href="#cuoi_trang".',
   relative:'Hãy xem tệp em đang đứng nằm trong thư mục nào, rồi tính xem cần đi lên (../) hay đi vào thư mục nào để đến tệp đích.'
  };
  const checks=[chk('link',match,'Liên kết có chữ hiển thị và đúng địa chỉ',opt.hint||hints[opt.kind])];
  if(opt.kind==='anchor')checks.push(chk('anchor',hasAnchorTarget(d,opt.target),'Có phần tử đích với id khớp liên kết','Thêm một thẻ có id trùng với tên viết sau dấu # trong href, và thẻ đó phải có chữ bên trong.'));
  if(opt.image){
   const img=match?.querySelector('img');
   checks.push(chk('image',img&&relative((img.getAttribute('src')||'').trim(),opt.image,opt.current)&&altOf(img),'Ảnh nằm trong liên kết, src đúng và alt có ý nghĩa','Đặt thẻ <img> bên trong thẻ <a>, kiểm tra đường dẫn trong src, và viết alt mô tả ảnh.'));
  }
  return result(checks);
 }

 // Nhiều yêu cầu liên kết cùng lúc: reqs = [{id,label,hint,kind,target,image,text,host}]
 function multi(html,current,reqs){
  return result(reqs.map(r=>{const res=link(html,{...r,current});return chk(r.id,res.passed,r.label,r.hint||res.errors[0])}));
 }

 // Tìm các liên kết/ảnh bị hỏng trong trang; trả về [{value, reason}]
 function broken(html,current){
  const d=parseHTML(html),files=VirtualFS.files,list=[];
  const reason=(value,isImg)=>{
   if(!value)return 'chưa có địa chỉ';
   if(value.startsWith('#')){const id=value.slice(1);return !id||d.getElementById(decodeURIComponent(id))?'':'không có phần tử nào có id “'+id+'”'}
   if(/^https?:/i.test(value))return absolute(value)?'':'URL chưa đúng, cần dạng https://tên-website';
   if(!isImg&&/^(mailto|tel):/i.test(value))return '';
   if(SCHEME.test(value)||value.startsWith('/'))return 'kiểu địa chỉ này chưa dùng trong bài';
   const p=resolvePath(value,current);
   if(p===null)return '../ đi quá thư mục gốc của website';
   if(!files.includes(p))return 'không có tệp “'+p+'”';
   const h=value.split('#')[1];
   if(!isImg&&h&&p===current&&!d.getElementById(h))return 'không có phần tử nào có id “'+h+'”';
   return '';
  };
  d.querySelectorAll('a[href]').forEach(a=>{const r=reason(href(a),false);if(r)list.push({value:href(a),reason:r})});
  d.querySelectorAll('img[src]').forEach(i=>{const v=(i.getAttribute('src')||'').trim();const r=reason(v,true);if(r)list.push({value:v,reason:r})});
  return list;
 }

 // Bài vận dụng: trang giới thiệu bản thân thanh_vien/em.html
 function final(html){
  const d=parseHTML(html),a=[...d.querySelectorAll('a[href]')];
  const externals=new Set(a.filter(x=>visible(x,true)&&absolute(href(x))).map(href));
  return result([
   chk('intro',d.querySelector('h1')?.textContent.trim()&&[...d.querySelectorAll('p')].some(p=>p.textContent.trim().length>=30),'Có tiêu đề <h1> và đoạn giới thiệu <p> dài ít nhất 30 ký tự','Thêm thẻ <h1> làm tiêu đề, và một đoạn <p> viết về em (ít nhất 30 ký tự).'),
   chk('external',externals.size>=3,'Có 3 liên kết ra website ngoài, mỗi liên kết một URL khác nhau','Thêm đủ ba liên kết có chữ hiển thị, href là ba URL https:// khác nhau.'),
   chk('anchor',a.some(x=>href(x).length>1&&href(x).startsWith('#')&&hasAnchorTarget(d,href(x).slice(1))),'Có một liên kết neo nhảy đến một mục trong trang','Gắn id cho một mục (ví dụ <h2 id="so_thich">), rồi tạo liên kết href="#so_thich".'),
   chk('home',a.some(x=>visible(x,true)&&relative(href(x),'index.html',FINAL_FILE)),'Có liên kết quay về trang chủ index.html','Em đang ở thư mục thanh_vien, nên đường dẫn về index.html cần ../'),
   chk('avatar',a.some(x=>relative(href(x),'gioi_thieu.html',FINAL_FILE)&&[...x.querySelectorAll('img')].some(i=>relative((i.getAttribute('src')||'').trim(),'images/em.jpg',FINAL_FILE)&&altOf(i))),'Ảnh images/em.jpg là liên kết mở trang Giới thiệu lớp, có alt','Đặt <img src="../images/em.jpg" alt="…"> vào trong liên kết href="../gioi_thieu.html".')
  ]);
 }
 return {FINAL_FILE,parseHTML,link,multi,broken,final,absolute,relative,resolvePath,visible,href,altOf,result,chk};
})();
