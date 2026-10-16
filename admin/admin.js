(()=>{'use strict';
const $=id=>document.getElementById(id),cfg=window.MANDAT_SUPABASE;
if(!window.supabase){$('loginStatus').textContent='Tidak dapat memuatkan pustaka Supabase. Semak sambungan internet.';return}
const db=window.supabase.createClient(cfg.url,cfg.key,{auth:{persistSession:true,autoRefreshToken:true}});
let candidates=[],articles=[],events=[],authorized=false;
const message=(txt,login=false)=>{(login?$('loginStatus'):$('appStatus')).textContent=txt};
const err=e=>e?.message||'Ralat tidak diketahui';
const button=(label,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',fn);return b};
const entry=(title,subtitle,fn)=>{const el=document.createElement('div');el.className='entry';const info=document.createElement('div');const strong=document.createElement('strong');strong.textContent=title;const small=document.createElement('small');small.textContent=subtitle;info.append(strong,small);el.append(info,button('Edit',fn));return el};
async function load(){
 const [a,b,c]=await Promise.all([db.from('cms_candidates').select('*').order('id'),db.from('cms_articles').select('*').order('created_at',{ascending:false}),db.from('cms_events').select('*').order('created_at',{ascending:false})]);
 for(const x of [a,b,c])if(x.error)throw x.error;
 candidates=a.data;articles=b.data;events=c.data;
 $('newsCount').textContent=articles.length;$('eventCount').textContent=events.length;
 $('candidateList').replaceChildren(...candidates.map(c=>entry(String(c.id).padStart(2,'0')+' / '+c.name,c.photo_path?'Foto tersedia':'Foto belum dimuat naik',()=>editCandidate(c))));
 $('articleList').replaceChildren(...articles.map(a=>entry(a.title,a.status==='published'?'Diterbitkan':'Draf',()=>editArticle(a))));
 $('eventList').replaceChildren(...events.map(e=>entry(e.title,e.status==='published'?'Diterbitkan':'Draf',()=>editEvent(e))));
}
async function session(){
 const {data:{user}}=await db.auth.getUser();
 if(!user){authorized=false;$('dashboard').hidden=true;$('login').hidden=false;return}
 const {data,error}=await db.from('cms_admins').select('user_id').eq('user_id',user.id).maybeSingle();
 if(error||!data){authorized=false;await db.auth.signOut();$('dashboard').hidden=true;$('login').hidden=false;message('Akaun belum diluluskan sebagai admin. Hubungi pemilik projek untuk mengaktifkan akses.',true);return}
 authorized=true;$('login').hidden=true;$('dashboard').hidden=false;
 try{await load()}catch(e){message('Gagal memuatkan data: '+err(e))}
}
$('loginForm').addEventListener('submit',async e=>{e.preventDefault();message('Sedang log masuk...',true);const {error}=await db.auth.signInWithPassword({email:$('email').value.trim(),password:$('password').value});if(error){message(err(error),true);return}message('',true);await session()});
$('logout').addEventListener('click',async()=>{await db.auth.signOut();await session()});
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('.module').forEach(x=>x.hidden=x.id!==b.dataset.tab);message('')}));
function editCandidate(c){$('candidateForm').hidden=false;$('candidateId').value=c.id;$('candidateName').value=c.name;$('candidateRole').value=c.role_title||'';$('candidateBio').value=c.bio||'';$('candidatePhoto').value='';$('candidateTitle').textContent='Profil '+String(c.id).padStart(2,'0');const img=$('candidatePreview');img.hidden=!c.photo_path;if(c.photo_path)img.src=cfg.url+'/storage/v1/object/public/'+cfg.bucket+'/'+c.photo_path;$('candidateForm').scrollIntoView({behavior:'smooth',block:'start'})}
$('cancelCandidate').addEventListener('click',()=>{$('candidateForm').hidden=true});
$('candidateForm').addEventListener('submit',async e=>{e.preventDefault();if(!authorized)return;const id=Number($('candidateId').value);const old=candidates.find(x=>x.id===id);if(!old)return;const file=$('candidatePhoto').files[0];const patch={name:$('candidateName').value.trim(),role_title:$('candidateRole').value.trim(),bio:$('candidateBio').value.trim(),updated_at:new Date().toISOString()};try{message('Menyimpan profil...');if(file){if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024)throw Error('Foto mesti JPG, PNG atau WebP, maksimum 5 MB');const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp'}[file.type];const path='candidates/'+id+'-'+Date.now()+'.'+ext;const upload=await db.storage.from(cfg.bucket).upload(path,file,{contentType:file.type,upsert:false});if(upload.error)throw upload.error;patch.photo_path=path}const {error}=await db.from('cms_candidates').update(patch).eq('id',id);if(error)throw error;await load();$('candidateForm').hidden=true;message('Profil berjaya disimpan. Semak website awam.')}catch(x){message('Gagal simpan: '+err(x))}});
function editArticle(a){$('articleForm').hidden=false;$('articleId').value=a?.id||'';$('articleTitle').value=a?.title||'';$('articleExcerpt').value=a?.excerpt||'';$('articleBody').value=a?.body||'';$('articleStatus').value=a?.status||'draft';$('articleForm').scrollIntoView({behavior:'smooth',block:'start'})}
$('newArticle').addEventListener('click',()=>editArticle(null));$('cancelArticle').addEventListener('click',()=>{$('articleForm').hidden=true});
$('articleForm').addEventListener('submit',async e=>{e.preventDefault();if(!authorized)return;const id=$('articleId').value;const old=articles.find(a=>a.id===id);const status=$('articleStatus').value;const patch={title:$('articleTitle').value.trim(),excerpt:$('articleExcerpt').value.trim(),body:$('articleBody').value.trim(),status,published_at:status==='published'?(old?.published_at||new Date().toISOString()):null,updated_at:new Date().toISOString()};const r=id?await db.from('cms_articles').update(patch).eq('id',id):await db.from('cms_articles').insert(patch);if(r.error){message('Gagal simpan: '+err(r.error));return}await load();$('articleForm').hidden=true;message('Artikel berjaya disimpan.')});
function localDate(v){if(!v)return'';const d=new Date(v);const parts=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(d);return parts.replace(' ','T')}
function editEvent(v){$('eventForm').hidden=false;$('eventId').value=v?.id||'';$('eventTitle').value=v?.title||'';$('eventDescription').value=v?.description||'';$('eventDate').value=localDate(v?.starts_at);$('eventLocation').value=v?.location||'';$('eventUrl').value=v?.registration_url||'';$('eventStatus').value=v?.status||'draft';$('eventForm').scrollIntoView({behavior:'smooth',block:'start'})}
$('newEvent').addEventListener('click',()=>editEvent(null));$('cancelEvent').addEventListener('click',()=>{$('eventForm').hidden=true});
$('eventForm').addEventListener('submit',async e=>{e.preventDefault();if(!authorized)return;const id=$('eventId').value,status=$('eventStatus').value,when=$('eventDate').value;if(status==='published'&&(!when||!$('eventLocation').value.trim())){message('Program diterbitkan mesti mempunyai tarikh, masa dan lokasi.');return}const url=$('eventUrl').value.trim();if(url&&!/^https:\/\//.test(url)){message('URL pendaftaran mesti menggunakan HTTPS.');return}const patch={title:$('eventTitle').value.trim(),description:$('eventDescription').value.trim(),starts_at:when?new Date(when+':00+08:00').toISOString():null,location:$('eventLocation').value.trim(),registration_url:url,status,updated_at:new Date().toISOString()};const r=id?await db.from('cms_events').update(patch).eq('id',id):await db.from('cms_events').insert(patch);if(r.error){message('Gagal simpan: '+err(r.error));return}await load();$('eventForm').hidden=true;message('Program berjaya disimpan.')});
session();
})();