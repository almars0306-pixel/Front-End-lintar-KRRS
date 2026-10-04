# Front-End Lintar KRRS

Replika sistem **KRRS Online** (Kartu Rencana Studi) mahasiswa — proyek tugas mata kuliah Front-End, dibuat **murni dengan HTML, CSS, dan JavaScript** (tanpa framework CSS/JS).

## 👥 Anggota & Pembagian Tugas

Setiap anggota membuat minimal 3 web pages:

| Anggota | NIM | Bagian |
|---|---|---|
| Aldho Prahauga | 535250153 | **Template layout** (design system semua bagian) + **Bagian S1**: dashboard, pengisian KRRS, konfirmasi, cetak KRRS |
| Dimas | 535250152 | Login, register, sesi (localStorage) |
| Rivaldi | 535250129 | Pilih jenjang & tampilan awal jenjang S2, S3 & Profesi |
| Rizky | 535250110 | Panduan KRRS mahasiswa |
| Dava | 535250136 | Aplikasi KRRS Staf |

## 🧭 Alur Aplikasi

```
Register → Login → Pilih Jenjang (S1 / S2 / S3 & Profesi) → Dashboard
                                                          └─ S1: Pengisian KRRS
                                                             → Konfirmasi (kunci KRRS)
                                                             → Cetak KRRS (print/PDF)
```

## 📁 Struktur Proyek

```
├── index.html               → halaman depan (redirect ke login)
├── authentication_user/     → login, register, sesi  (Dimas)
├── tampilan_utama_s1/       → BAGIAN S1 (Aldho):
│     dashboard · isi-krrs · konfirmasi · cetak
├── tampilan_utama_s2/       → tampilan jenjang S2    (Rivaldi)
├── tampilan_utama_Staff/    → S3 & Profesi           (Rivaldi)
├── tampilan_utama_panduan/  → panduan mahasiswa      (Rizky)
├── app-staf-krrs/           → aplikasi staf          (Dava)
├── template/                → design system bersama  (Aldho)
│     template.css · template.js · preview.html
├── krrs/data-matkul.js      → data mata kuliah semester 3 (asli)
├── shared/                  → aset bersama lama
└── assets/                  → logo & gambar
```

## ▶️ Cara Menjalankan

Buka langsung file HTML di browser, atau jalankan server lokal:

```bash
npx serve .          # atau: python -m http.server 8000
```

Lalu buka `http://localhost:3000/` → register akun baru → login → pilih jenjang **S1** → coba alur pengisian sampai cetak.

## ✨ Fitur Utama (Bagian S1)

- Pengisian KRRS: mata kuliah **paket otomatis tercentang**, pilihan bebas (Data Mining, NLP, Business Analyst, Computer Vision — 4 SKS)
- **Hitung SKS otomatis** dengan batas maksimal 24 SKS + progress bar
- **Deteksi jadwal bentrok** antar mata kuliah (termasuk kelas 2 sesi/minggu) — baris menyala merah, tombol simpan terkunci
- **Pratinjau jadwal mingguan** visual (grid Senin–Jumat)
- Konfirmasi mengunci KRRS + animasi sukses
- Dokumen **KRRS siap cetak/PDF** (kop UNTAR, tanda tangan Dekan)
- **Dark mode**, responsive (mobile), tema UNTAR (navy + emas)

## 🎨 Template Layout (untuk semua anggota)

Semua bagian bisa pakai design system yang sama — lihat `template/preview.html` untuk katalog komponen & panduan singkat. Sidebar menu diatur terpusat di `template/template.js` (array `MENU_GROUPS`).

## 🌐 Deployment

Project di-deploy lewat **GitHub Pages**:

1. GitHub → **Settings → Pages**
2. Source: **Deploy from a branch** → `main` / `root` → Save
3. Buka `https://<user>.github.io/Front-End-lintar-KRRS/`

> Halaman depan otomatis mengarahkan ke login.

---

Untuk keperluan tugas kuliah — bukan produk resmi Universitas Tarumanagara.