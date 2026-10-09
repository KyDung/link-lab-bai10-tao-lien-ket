const VirtualFS={
 host:'lop12a.edu.vn',
 files:['index.html','gioi_thieu.html','thanh_vien/an.html','thanh_vien/binh.html','thanh_vien/em.html','bai_tap/tin_hoc.html','images/logo.jpg','images/lop.jpg','images/em.jpg'],
 // Ảnh minh họa tự vẽ bằng SVG (không dùng ảnh bên ngoài)
 svg:{
  logo:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#e3f3ee"/><path d="M32 14 6 26l26 12 26-12z" fill="#0a7c70"/><path d="M16 33v10c0 4 7 8 16 8s16-4 16-8V33l-16 7z" fill="#075f56"/><path d="M56 27v16" stroke="#f0b13e" stroke-width="3" stroke-linecap="round"/><circle cx="56" cy="45" r="3" fill="#f0b13e"/></svg>',
  lop:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#fff6e0"/><circle cx="32" cy="22" r="7" fill="#f0b13e"/><path d="M19 48c0-9 6-14 13-14s13 5 13 14z" fill="#f0b13e"/><circle cx="14" cy="27" r="5" fill="#0a7c70"/><path d="M5 48c0-7 3-11 9-11 2 0 4 .5 5 1.5-3 2-5 5-5 9.5z" fill="#0a7c70"/><circle cx="50" cy="27" r="5" fill="#0a7c70"/><path d="M59 48c0-7-3-11-9-11-2 0-4 .5-5 1.5 3 2 5 5 5 9.5z" fill="#0a7c70"/></svg>',
  em:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#e8eefc"/><circle cx="32" cy="23" r="9" fill="#1a5fd0"/><path d="M14 54c0-11 8-18 18-18s18 7 18 18z" fill="#1a5fd0"/><path d="m50 8 2 5 5 .5-4 3.5 1.2 5L50 19l-4.200 3 1.200-5-4-3.500 5-.5z" fill="#f0b13e"/></svg>'
 },
 image(path){const key=path.includes('logo')?'logo':path.includes('lop')?'lop':'em';return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(this.svg[key])},
 // Các trang đích mô phỏng khi học sinh bấm liên kết
 pages:{
  'index.html':'<h1>Website lớp 12A</h1><p>Chào mừng các bạn! Đây là trang chủ của lớp.</p>',
  'gioi_thieu.html':'<h1>Giới thiệu lớp 12A</h1><p>Lớp 12A có 40 bạn, thích học Tin học và làm website.</p>',
  'thanh_vien/an.html':'<h1>Trang của An</h1><p>An là lớp trưởng của lớp 12A.</p>',
  'thanh_vien/binh.html':'<h1>Trang của Bình</h1><p>Bình phụ trách câu lạc bộ lập trình của lớp.</p>',
  'bai_tap/tin_hoc.html':'<h1>Đề cương ôn tập Tin học 12</h1><p>Phần 1: Lý thuyết. Phần 2: Bài tập. Phần 3: Mẹo làm bài.</p>'
 },
 // Phân giải liên kết giống trình duyệt, nhưng ../ không được đi quá thư mục gốc của website
 resolve(value,current){
  const v=String(value||'').trim();
  if(!v)return {ok:false,message:'Liên kết chưa có địa chỉ. Em kiểm tra lại phần href.'};
  if(/^https?:\/\//i.test(v)){
   try{const u=new URL(v);if(!u.hostname.includes('.'))throw new Error('host');return {ok:true,external:true,url:u.href,message:'Liên kết ra website ngoài → '+u.href}}
   catch{return {ok:false,message:'URL chưa đúng. Em cần viết dạng https://tên-website'}}
  }
  if(/^[a-z][a-z0-9+.-]*:/i.test(v)||v.startsWith('//'))return {ok:false,message:'Trong bài này chỉ thử địa chỉ bắt đầu bằng https:// hoặc đường dẫn tới tệp của website.'};
  if(v.startsWith('/'))return {ok:false,message:'Đường dẫn bắt đầu bằng / tính từ gốc website. Trong bài này em dùng đường dẫn tương đối, không có / ở đầu.'};
  const at=v.indexOf('#'),hash=at>=0?v.slice(at):'';
  const path=v.startsWith('#')?current:Validators.resolvePath(v,current);
  if(path===null)return {ok:false,hash,message:'../ đi quá thư mục gốc của website. Em kiểm tra lại số lần ../'};
  const ok=this.files.includes(path);
  let message=ok?'Tìm thấy tệp → '+this.host+'/'+path+hash:'Không tìm thấy tệp “'+path+'”. Em kiểm tra lại tên tệp, chữ hoa/thường và số lần ../';
  if(!ok&&/^(www\.|.+\.(com|org|net|vn|edu|gov)$)/i.test(path.split('/').pop()))message+='. Nếu đây là website ngoài, em cần viết đầy đủ https://';
  return {ok,path,hash,message};
 }
};
const Preview={
 openTarget(result,currentHtml,current){
   document.querySelector('#virtual-browser')?.remove();
   const dialog=document.createElement('dialog');dialog.id='virtual-browser';
   const address=result.external?result.url:'https://'+VirtualFS.host+'/'+result.path+(result.hash||'');
   dialog.innerHTML='<div class="dialog-head"><h2>Trang đích</h2><button aria-label="Đóng trang mô phỏng">✕</button></div><p class="resolve-result">'+Util.esc(address)+'</p><div class="virtual-content"></div>';
   document.body.append(dialog);dialog.querySelector('button').onclick=()=>dialog.close();
   const content=dialog.querySelector('.virtual-content');
   if(!result.ok){content.innerHTML='<h3>404 · Không tìm thấy trang</h3><p>'+Util.esc(result.message)+'</p>'}
   else if(result.external){content.innerHTML='<h3>Liên kết này đi ra website ngoài</h3><p>Đây là URL tuyệt đối, nên trình duyệt sẽ mở đúng trang web ở địa chỉ trên.</p><a target="_blank" rel="noopener noreferrer" href="'+Util.esc(result.url)+'">Mở website này ↗</a>'}
   else {const pages=VirtualFS.pages;const frame=document.createElement('iframe');frame.setAttribute('sandbox','');frame.title='Trang đích trong thư mục ảo';frame.style='width:100%;height:320px;border:0';content.append(frame);this.update(frame,result.path===current?currentHtml:pages[result.path]||(/\.jpg$/.test(result.path)?'<h2>Ảnh trong website</h2><img src="'+result.path.split('/').pop()+'" alt="Ảnh trong website">':'<h1>Trang của em</h1><p>Đây là trang em đang viết.</p>'),result.path)}
   dialog.showModal();
 },
 sanitize(html,current){const d=Validators.parseHTML(html);d.querySelectorAll('script,base,meta,link,iframe,object,embed,form,style,svg,math').forEach(el=>el.remove());d.querySelectorAll('*').forEach(el=>{[...el.attributes].forEach(a=>{if(/^on/i.test(a.name)||['srcdoc','style','target','action','formaction','srcset'].includes(a.name))el.removeAttribute(a.name)});if(el.tagName==='IMG'){const r=VirtualFS.resolve(el.getAttribute('src')||'',current);el.removeAttribute('src');if(r.ok&&!r.external&&r.path.endsWith('.jpg'))el.src=VirtualFS.image(r.path);el.style.maxWidth='180px'}if(el.tagName==='A'){const h=(el.getAttribute('href')||'').trim();if(/^https?:\/\/[^\s]+$/i.test(h)){el.setAttribute('target','_blank');el.setAttribute('rel','noopener noreferrer');el.title='Bấm để mở website này ở tab mới'}else if(!h.startsWith('#')){el.removeAttribute('href');if(h)el.setAttribute('data-rel',h);el.style.color='#087f75';el.style.textDecoration='underline';el.style.cursor='pointer';el.title='Bấm để đi theo liên kết này'}}});const nonce=Math.random().toString(36).slice(2)+Date.now().toString(36);return `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'; script-src 'nonce-${nonce}'"><style>body{font:15px/1.6 Arial;padding:18px;color:#18373c}a{color:#087f75}img{max-width:180px}h1{font-size:25px}:target,.hit{background:#fff0b7;outline:3px solid #e3ab49;border-radius:4px}p{margin:16px 0} [id]{scroll-margin:12px}</style></head><body>${d.body.innerHTML}<script nonce="${nonce}">document.addEventListener('click',function(ev){var l=ev.target.closest&&ev.target.closest('a');if(!l)return;var h=l.getAttribute('href');if(h&&h.charAt(0)==='#'){ev.preventDefault();var t=document.getElementById(decodeURIComponent(h.slice(1)));var o=document.querySelector('.hit');if(o)o.classList.remove('hit');if(t){t.classList.add('hit');t.scrollIntoView({block:'center'})}else{parent.postMessage({missing:h},'*')}return}var r=l.getAttribute('data-rel');if(r===null)return;ev.preventDefault();parent.postMessage({rel:r},'*')})</script></body></html>`},
 update(frame,html,current){frame._ctx={html,current};frame.srcdoc=this.sanitize(html,current)},
 follow(href,html,current,container){const r=VirtualFS.resolve(href,current);let message=r.message;if(r.hash&&!r.external&&r.path===current&&!Validators.parseHTML(html).getElementById(r.hash.slice(1))){r.ok=false;message='Có tệp này nhưng chưa có phần tử có id ứng với '+r.hash}Util.toast(message);if(container){container.querySelector('.resolve-result')?.remove();const box=document.createElement('div');box.className='resolve-result';box.textContent=message;container.append(box)}this.openTarget({...r,message},html,current)},
 links(container,html,current){const links=[...Validators.parseHTML(html).querySelectorAll('a[href]')];container.innerHTML=links.length?'<span>Hoặc bấm nút để thử đi theo liên kết:</span>':'Khi em viết liên kết, nút để thử đi theo liên kết sẽ hiện ở đây.';links.forEach(a=>{const b=document.createElement('button');b.textContent=a.textContent.trim()||a.querySelector('img')?.alt||'Liên kết ảnh';b.onclick=()=>this.follow(a.getAttribute('href'),html,current,container);container.append(b)})}
};
const Editor={mount(textarea,record,onChange,blockPaste=true){const stats=record.typingStats||(record.typingStats={keyCount:0,changeCount:0,charsTyped:0,pasteBlocked:0,pasteCount:0,firstInputAt:null,lastInputAt:null});let old=textarea.value;textarea.addEventListener('keydown',e=>{stats.keyCount++;if(e.key==='Tab'){e.preventDefault();textarea.setRangeText('  ',textarea.selectionStart,textarea.selectionEnd,'end');textarea.dispatchEvent(new Event('input'))}});textarea.addEventListener('paste',e=>{if(blockPaste){e.preventDefault();stats.pasteBlocked++;Util.toast('Em hãy tự gõ để luyện nhớ cú pháp.')}else stats.pasteCount++;onChange()});textarea.addEventListener('drop',e=>{if(blockPaste){e.preventDefault();stats.pasteBlocked++;onChange()}});textarea.addEventListener('input',()=>{const now=new Date().toISOString();stats.firstInputAt??=now;stats.lastInputAt=now;stats.changeCount++;stats.charsTyped+=Math.max(0,textarea.value.length-old.length);old=textarea.value;document.querySelector('.lines').textContent=Array.from({length:textarea.value.split('\n').length},(_,i)=>i+1).join('\n');onChange()})}};
addEventListener('message',ev=>{const d=ev.data;if(!d||typeof d.rel!=='string')return;const f=[...document.querySelectorAll('iframe')].find(x=>x.contentWindow===ev.source);if(f&&f._ctx)Preview.follow(d.rel,f._ctx.html,f._ctx.current,f.parentElement.querySelector('.preview-links'))});
addEventListener('message',ev=>{const d=ev.data;if(!d||typeof d.missing!=='string')return;if([...document.querySelectorAll('iframe')].some(x=>x.contentWindow===ev.source))Util.toast('Chưa có phần tử nào có id “'+d.missing.slice(1)+'”. Em kiểm tra lại id và href.')});
