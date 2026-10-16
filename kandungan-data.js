/* MANDAT Kelantan V2.2 | Kandungan editorial disahkan sahaja.
   Tambah rekod hanya selepas tarikh, butiran, dan kebenaran penerbitan disahkan.
   berita: {id, tajuk, tarikh:"YYYY-MM-DD", kategori, ringkasan, kandungan:[...], imej:"", sumber:""}
   program: {id, tajuk, tarikh:"YYYY-MM-DD", masa:"", lokasi:"", format:"Online|Fizikal", status:"Akan datang|Selesai", penerangan:[...], pendaftaran:""}
   Gunakan ID unik huruf kecil dan sempang, contoh: "nama-program-2026".
   Jika tarikh belum disahkan, jangan masukkan rekod ke kalendar.
*/
window.MANDAT_CONTENT = Object.freeze({
  berita: [],
  program: []
});
