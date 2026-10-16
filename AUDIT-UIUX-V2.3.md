# MANDAT Kelantan V2.3 | UI/UX Refinement & Audit

Tarikh perubahan: 16 Oktober 2026

## Penambahbaikan dilaksanakan

- **Identiti visual:** gunakan CSS bersama `v23.css` pada homepage, calon, berita dan program. Logo rasmi HD dan palet navy-emas dikekalkan.
- **Homepage:** keseimbangan hero desktop/mobile, skala logo, susun atur metrik, butang dan kad calon.
- **Navigasi:** menu mobile konsisten pada semua halaman, penanda halaman aktif, `aria-expanded` dan Escape untuk menutup menu.
- **Direktori & profil:** kad calon lebih sekata, ruang nama panjang, pautan profil dan placeholder neutral.
- **Berita:** tipografi, kad, penapis, paparan kosong dan halaman artikel yang konsisten.
- **Program:** paparan desktop mengekalkan kalendar bulanan. Mobile menggunakan **senarai program mengikut bulan** dengan kawalan bulan sebelum/selepas dan penapis format yang sedia ada.
- **Footer:** pautan utama tersedia pada semua halaman, butang kembali ke atas dan bar kemajuan bacaan.
- **Accessibility:** pautan langkau ke kandungan, fokus papan kekunci, sasaran sentuh lebih besar, sokongan reduced motion, dan status menu untuk pembaca skrin.

## Fail

- `v23.css`: CSS refinement bersama.
- `v23.js`: peningkatan navigasi, footer, progress, back-to-top, dan agenda mobile.
- `index.html`, `calon.html`, `berita.html`, `program.html`: memuatkan kedua-dua fail V2.3.

## Integriti kandungan

- Nama calon menggunakan 14 entri sedia ada dalam `calon-data.js`. Tiada biodata, pengalaman atau potret rekaan.
- `kandungan-data.js` kekal dengan `berita: []` dan `program: []`. Tiada berita atau tarikh program direka.
- Rujukan ePBMy dan penafian bukan laman rasmi Parlimen Malaysia dikekalkan.

## Semakan kod yang dilaksanakan

- Semua empat halaman mempunyai pautan ke `v23.css` dan `v23.js`.
- Logo HD masih digunakan pada setiap halaman.
- Direktori kekal mempunyai 14 calon.
- Halaman berita dan program kekal tanpa rekod kandungan belum disahkan.
- Media query untuk 540px, 760px, 850px, 1100px serta reduced motion wujud.
- Navbar halaman calon dikemas kini supaya memaut ke berita dan program.

## Ujian visual / browser yang masih perlu

Ujian browser sebenar belum dapat disahkan daripada persekitaran ini. **Jangan tafsir semakan kod sebagai keputusan Lighthouse atau ujian browser lulus.**

1. Buka halaman utama, calon, berita dan program pada viewport **375px, 768px, 1440px**.
2. Semak menu mobile, fokus Tab, Escape, carian calon, dan pautan profil.
3. Semak agenda mobile, navigasi bulan, penapis online/fizikal, dan keadaan kosong.
4. Uji scroll-to-top dan reduced motion.
5. Jalankan Lighthouse Performance/Accessibility serta semak console error.
6. Sahkan deployment GitHub Pages dan cache fail V2.3.

Jika ada isu visual pada peranti sebenar, pembaikan perlu dibuat berdasarkan screenshot/hasil audit tersebut.
