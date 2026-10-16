(()=>{'use strict';
const grid=document.getElementById('candidateGrid');
const detail=document.getElementById('detail');
if(grid){grid.replaceChildren();grid.textContent='Memuatkan profil yang diterbitkan…'}
if(detail){detail.hidden=true;const directory=document.getElementById('directory');if(directory)directory.hidden=true}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function refresh(){
try{
const rows=await window.MANDAT_CMS_READ('cms_candidates?select=id,name,bio,role_title,photo_path,is_published&is_published=eq.true&order=id.asc');
const photo=window.MANDAT_CMS_PHOTO;
const page=location.pathname.split('/').pop();
if(page==='index.html'||!page){
const root=document.getElementById('candidateGrid');if(!root)return;
root.innerHTML=rows.map(c=>'<article class="card candidate candidate-v21"><div class="candidate-avatar" aria-hidden="true">'+(c.photo_path?'<img class="cms-photo" loading="lazy" alt="" src="'+esc(photo(c.photo_path))+'">':'<span class="candidate-head"></span><span class="candidate-shoulders"></span>')+'</div><div class="candidate-info"><small class="candidate-index">PROFIL '+String(c.id).padStart(2,'0')+'</small><h3>'+esc(c.name)+'</h3><small class="candidate-pending">'+esc(c.role_title||'Profil calon')+'</small><a class="candidate-link" href="calon.html?id='+c.id+'">Lihat profil ↗</a></div></article>').join('');
if(!rows.length)root.textContent='Belum ada profil calon diterbitkan.';
const input=document.getElementById('candidateSearch');if(input)input.dispatchEvent(new Event('input'));
}
if(page==='calon.html'){
const root=document.getElementById('candidateGrid');const dir=document.getElementById('directory');const detail=document.getElementById('detail');
const id=new URLSearchParams(location.search).get('id');const c=rows.find(x=>String(x.id)===id);
if(id){
if(!c){if(detail)detail.hidden=true;if(dir){dir.hidden=false;dir.textContent='Profil ini belum diterbitkan.'}document.title='Profil belum diterbitkan | MANDAT Kelantan';return}
if(detail)detail.hidden=false;if(dir)dir.hidden=true;
const name=document.getElementById('profileName');if(name)name.textContent=c.name;
document.title=c.name+' | MANDAT Kelantan';
const bio=document.querySelector('.placeholder-text');if(bio)bio.textContent=c.bio||'Biodata belum diterbitkan';
const banner=document.querySelector('.detail-banner');if(banner&&c.photo_path){banner.replaceChildren();banner.classList.add('cms-detail-photo');const img=document.createElement('img');img.src=photo(c.photo_path);img.alt='Foto '+c.name;banner.append(img)}
}else{
if(dir)dir.hidden=false;if(detail)detail.hidden=true;
if(root){root.replaceChildren();for(const c of rows){const article=document.createElement('article');article.className='person';const visual=document.createElement('div');visual.className='person-visual';if(c.photo_path){const img=document.createElement('img');img.src=photo(c.photo_path);img.alt='Foto '+c.name;img.className='cms-photo';img.loading='lazy';visual.append(img)}const tag=document.createElement('span');tag.className='person-tag';tag.textContent='PROFIL '+String(c.id).padStart(2,'0');visual.append(tag);const body=document.createElement('div');body.className='person-body';const h=document.createElement('h2');h.textContent=c.name;const link=document.createElement('a');link.className='person-link';link.href='calon.html?id='+c.id;link.textContent='Lihat profil →';body.append(h,link);article.append(visual,body);root.append(article)}if(!rows.length)root.textContent='Belum ada profil calon diterbitkan.'}
}
}
}catch(e){console.error('Failed to load published candidates',e);if(grid)grid.textContent='Senarai calon tidak dapat dimuatkan buat masa ini.';if(detail)detail.hidden=true}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refresh);else refresh();
})();