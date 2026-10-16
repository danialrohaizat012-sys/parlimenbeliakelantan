# Panduan kemas kini kandungan MANDAT Kelantan V2.2

Website ini dihoskan di GitHub Pages. **Berita dan program tidak akan diterbitkan secara automatik**. Hanya masukkan maklumat yang sudah disemak serta mendapat kebenaran penerbitan.

## Fail penting

- `index.html`: halaman utama dan pautan ke berita/program.
- `berita.html`: arkib berita dan halaman butiran artikel.
- `program.html`: kalendar dan halaman butiran program.
- `v22.css`: reka bentuk responsif berita dan program.
- `v22.js`: fungsi carian, penapis, kalendar dan halaman butiran.
- **`kandungan-data.js`**: satu-satunya fail yang perlu dikemas kini untuk menambah berita dan program.

## Cara tambah berita

Dalam `kandungan-data.js`, tambahkan objek ke dalam array `berita` dengan struktur:

```js
{
  id: "slug-unik-berita",
  tajuk: "Tajuk sebenar yang telah disahkan",
  tarikh: "YYYY-MM-DD",
  kategori: "Pengumuman",
  ringkasan: "Ringkasan yang telah disahkan",
  kandungan: ["Perenggan pertama yang disahkan.", "Perenggan kedua."],
  sumber: "https://pautan-rujukan-jika-ada"
}
```

Gunakan `id` huruf kecil, nombor dan sempang sahaja. Contoh di atas **hanyalah struktur teknikal**, bukan berita sebenar.

## Cara tambah program

Dalam array `program`, gunakan struktur:

```js
{
  id: "slug-unik-program",
  tajuk: "Nama program sebenar",
  tarikh: "YYYY-MM-DD",
  masa: "Masa yang disahkan",
  lokasi: "Lokasi yang disahkan",
  format: "Online",
  status: "Akan datang",
  penerangan: ["Penerangan program yang telah disahkan."],
  pendaftaran: "https://pautan-pendaftaran-jika-ada"
}
```

Nilai `format` ialah `Online` atau `Fizikal`. Nilai `status` ialah `Akan datang` atau `Selesai`.

**Jangan masukkan program ke kalendar jika tarikh belum disahkan.** Program tanpa tarikh masih boleh disebut sebagai cadangan pada homepage.

## Pautan halaman

- Pusat berita: `https://mandatbeliakelantan.binalab.my/berita.html`
- Kalendar: `https://mandatbeliakelantan.binalab.my/program.html`
- Artikel individu: `berita.html?id=slug-unik-berita`
- Program individu: `program.html?id=slug-unik-program`

Selepas kemas kini fail dan commit ke `main`, GitHub Pages akan deploy semula.

## Semakan sebelum menerbitkan

1. Semak nama, tarikh, tempat dan ejaan dengan sumber asal.
2. Pastikan kandungan diluluskan oleh pihak bertanggungjawab.
3. Dapatkan kebenaran untuk foto dan maklumat peribadi.
4. Uji pautan pendaftaran, telefon dan paparan mobile.
5. Bezakan maklumat pasukan MANDAT daripada pengumuman rasmi ePBMy.

Laman ini bukan portal rasmi Parlimen Malaysia. Gunakan `https://epbmy.parlimen.gov.my/` untuk rujukan rasmi.
