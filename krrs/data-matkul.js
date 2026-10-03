/* =========================================================
   DATA MATA KULIAH — Lintar KRRS (dipakai bersama)
   ---------------------------------------------------------
   Program S1 · Teknik Informatika · Semester 1 (Ganjil)
   TA 2025/2026 — DATA ASLI dari Lintar UNTAR

   - Paket 3 (Wajib): Mobile Programming,
     Front-End Programming, Computer Architecture & Organization
   - Paket 5 (Wajib): Scientific Writing, Machine Learning
   - Pilihan (4 SKS per matkul): Data Mining,
     Natural Language Processing, Business Analyst, Computer Vision

   CATATAN:
   - Beberapa matkul punya 2 sesi per minggu (array "jadwal")
   - Jadwal 3 matkul pilihan baru (DM/BA/CV) belum ada di data
     asli → masih dummy; Data Mining & Computer Vision sengaja
     satu slot supaya fitur deteksi bentrok bisa didemokan.
   ========================================================= */

(function () {
  "use strict";

  window.MATAKULIAH = [
    /* — Paket 3 (Wajib): otomatis diambil — */
    {
      kode: "TK23019", nama: "Mobile Programming", sks: 4, jenis: "Wajib", kelas: "C",
      dosen: "Darius Andana Haris, S.Kom., M.T.I. & Janson Hendryli, S.Kom., M.Kom.",
      jadwal: [
        { hari: "Rabu",   jam: "13.30-15.10", ruang: "R0902" },
        { hari: "Jumat",  jam: "07.30-09.10", ruang: "R1007" }
      ]
    },
    {
      kode: "TK23023", nama: "Front-End Programming", sks: 4, jenis: "Wajib", kelas: "C",
      dosen: "Janson Hendryli, S.Kom., M.Kom.",
      jadwal: [
        { hari: "Senin",  jam: "07.30-09.10", ruang: "R0905" },
        { hari: "Senin",  jam: "09.30-11.10", ruang: "R0902" }
      ]
    },
    {
      kode: "TK23029", nama: "Computer Architecture & Organization", sks: 2, jenis: "Wajib", kelas: "C",
      dosen: "Chairisni Lubis, Dra., M.Kom.",
      jadwal: [
        { hari: "Selasa", jam: "09.30-11.10", ruang: "R0804" }
      ]
    },

    /* — Paket 5 (Wajib): otomatis diambil — */
    {
      kode: "TK33050", nama: "Scientific Writing", sks: 2, jenis: "Wajib", kelas: "B",
      dosen: "Lina, Prof. S.T., M.Kom., Ph.D.",
      jadwal: [
        { hari: "Kamis",  jam: "07.30-09.10", ruang: "R0806" }
      ]
    },
    {
      kode: "TK34005", nama: "Machine Learning", sks: 4, jenis: "Wajib", kelas: "C",
      dosen: "Teny Handhayani, S.Kom., M.Kom., Ph.D.",
      jadwal: [
        { hari: "Kamis",  jam: "13.30-15.10", ruang: "R0902" },
        { hari: "Kamis",  jam: "15.30-17.10", ruang: "R0902" }
      ]
    },

    /* — Pilihan: dicentang sendiri (semuanya 4 SKS) — */
    {
      kode: "TK34007", nama: "Data Mining", sks: 4, jenis: "Pilihan", kelas: "A",
      dosen: "Teny Handhayani, S.Kom., M.Kom., Ph.D.",
      jadwal: [
        { hari: "Rabu",   jam: "09.30-11.10", ruang: "Lab. 2" }
      ]
    },
    {
      kode: "TK34018", nama: "Natural Language Processing (NLP)", sks: 4, jenis: "Pilihan", kelas: "A",
      dosen: "Viny Christanti Mawardi, S.Kom., M.Kom.",
      jadwal: [
        { hari: "Selasa", jam: "11.30-13.10", ruang: "R0705" },
        { hari: "Rabu",   jam: "07.30-09.10", ruang: "R0705" }
      ]
    },
    {
      kode: "TK34012", nama: "Business Analyst", sks: 4, jenis: "Pilihan", kelas: "B",
      dosen: "Sani M. Isa, S.Kom., M.M.",
      jadwal: [
        { hari: "Selasa", jam: "07.30-09.10", ruang: "R0903" }
      ]
    },
    {
      kode: "TK34010", nama: "Computer Vision", sks: 4, jenis: "Pilihan", kelas: "A",
      dosen: "Darius Andana Haris, S.Kom., M.T.I.",
      jadwal: [
        { hari: "Rabu",   jam: "09.30-11.10", ruang: "Lab. 4" }
      ]
    }
  ];

  /* Key localStorage untuk KRRS aktif */
  window.KRRS_KEY = "krrs_aktif";
})();
