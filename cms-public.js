(()=>{'use strict';
const c=window.MANDAT_SUPABASE,api=c.url+'/rest/v1/',headers={apikey:c.key};
const read=async q=>{const r=await fetch(api+q,{headers});if(!r.ok)throw Error('Kandungan tidak dapat dimuatkan ('+r.status+')');return r.json()};
const data=window.MANDAT_CONTENT||{berita:[],program:[]};window.MANDAT_CONTENT=data;
const dayMY=s=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(s));
window.MANDAT_CMS_PHOTO=path=>path?c.url+'/storage/v1/object/public/'+c.bucket+'/'+path.split('/').map(encodeURIComponent).join('/'):null;
window.MANDAT_CMS_READ=read;
window.MANDAT_CMS_READY=(async()=>{
const [news,events]=await Promise.allSettled([read('cms_articles?select=*&status=eq.published&order=published_at.desc'),read('cms_events?select=*&status=eq.published&order=starts_at.asc')]);
if(news.status==='fulfilled')data.berita=news.value.filter(x=>x.published_at).map(x=>({id:String(x.id),tajuk:x.title,ringkasan:x.excerpt,kategori:'Berita',tarikh:dayMY(x.published_at),kandungan:String(x.body||'').split('\n'),gambar:x.cover_path||null}));
else {data.berita=[];console.warn('CMS berita gagal dimuatkan',news.reason)}
if(events.status==='fulfilled')data.program=events.value.filter(x=>x.starts_at).map(x=>({id:String(x.id),tajuk:x.title,tarikh:dayMY(x.starts_at),masa:new Intl.DateTimeFormat('ms-MY',{timeZone:'Asia/Kuala_Lumpur',hour:'2-digit',minute:'2-digit'}).format(new Date(x.starts_at)),lokasi:x.location,format:'Fizikal',status:'Disahkan',penerangan:String(x.description||'').split('\n'),pendaftaran:x.registration_url,gambar:x.poster_path||null}));
else {data.program=[];console.warn('CMS program gagal dimuatkan',events.reason)}
})();
})();