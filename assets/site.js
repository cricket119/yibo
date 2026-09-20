const menu=document.querySelector('.menu'),nav=document.querySelector('.navlinks');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'关闭 ×':'菜单 ☰'});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='菜单 ☰'}));
let toastTimer;function toast(text){const box=document.querySelector('.toast');box.textContent=text;box.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.hidden=true,3500)}
async function copy(text){try{await navigator.clipboard.writeText(text);toast('已复制，可以粘贴到微信分享')}catch{const input=document.querySelector('.share-url');if(input){input.focus();input.select();toast('请长按或按住复制快捷键，复制已选中的链接')}else toast('暂时无法复制，请手动选择文字复制')}}
const dialog=document.querySelector('#share-dialog');let opener;
document.querySelectorAll('[data-share]').forEach(b=>b.addEventListener('click',()=>{opener=b;dialog.showModal()}));
document.querySelector('.close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog?.addEventListener('close',()=>opener?.focus());
document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',()=>copy(b.dataset.copy)));
document.querySelector('[data-native-share]')?.addEventListener('click',async()=>{const url=document.querySelector('.share-url').value;if(navigator.share){try{await navigator.share({title:document.title,url})}catch(e){if(e.name!=='AbortError')copy(url)}}else copy(url)});
const filters=[...document.querySelectorAll('.filter')],rows=[...document.querySelectorAll('[data-category]')],search=document.querySelector('.search');let category='全部';
function filter(){let count=0;const query=search?.value.trim().toLowerCase()||'';rows.forEach(r=>{r.hidden=!(category==='全部'||r.dataset.category===category)||!r.textContent.toLowerCase().includes(query);if(!r.hidden)count++});const empty=document.querySelector('.empty');if(empty)empty.hidden=count>0;const status=document.querySelector('#result-status');if(status)status.textContent=`共 ${count} 篇内容`}
filters.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;filters.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));filter()}));search?.addEventListener('input',filter);
