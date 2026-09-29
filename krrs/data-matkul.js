/* =========================================================
   DATA MATA KULIAH — Lintar KRRS (Anggota 2)
   Dipakai bersama oleh: isi-krrs.js, konfirmasi.js, cetak.js.
   Anggota lain (KHS/Jadwal) juga boleh memakai data ini.
   ========================================================= */

(function () {
  "use strict";

  window.MATAKULIAH = [
    /* — Wajib: otomatis diambil — */
    { kode: "TIF3151", nama: "Kecerdasan Artifisial", sks: 3, jenis: "Wajib", hari: "Senin",  jam: "07.50-09.30", ruang: "D.203", dosen: "Dr. Ahmad Fauzi, M.Kom." },
    { kode: "TIF3152", nama: "Rekayasa Perangkat Lunak", sks: 3, jenis: "Wajib", hari: "Selasa", jam: "10.20-12.00", ruang: "D.201", dosen: "Rina Novianti, M.T." },
    { kode: "TIF3153", nama: "Jaringan Komputer", sks: 3, jenis: "Wajib", hari: "Rabu",   jam: "07.50-09.30",  ruang: "D.205", dosen: "Budi Santoso, M.Kom." },
    { kode: "TIF3154", nama: "Teori Bahasa dan Otomata", sks: 3, jenis: "Wajib", hari: "Kamis",  jam: "10.20-12.00", ruang: "D.202", dosen: "Dewi Lestari, M.Si." },
    { kode: "TIF3155", nama: "Metodologi Penelitian", sks: 2, jenis: "Wajib", hari: "Jumat",  jam: "09.40-11.20",  ruang: "D.204", dosen: "Hendra Saputra, M.T." },
    { kode: "TIF3156", nama: "Sistem Operasi", sks: 3, jenis: "Wajib", hari: "Senin",  jam: "13.00-14.40",  ruang: "D.203", dosen: "Fitri Handayani, M.Kom." },
    /* — Pilihan: dicentang sendiri — */
    { kode: "TIF3161", nama: "Pengolahan Citra Digital", sks: 3, jenis: "Pilihan", hari: "Rabu",   jam: "10.20-12.00", ruang: "D.205", dosen: "Dr. Ahmad Fauzi, M.Kom." },
    { kode: "TIF3162", nama: "Pemrograman Mobile", sks: 3, jenis: "Pilihan", hari: "Kamis",  jam: "07.50-09.30",  ruang: "Lab. 1", dosen: "Rina Novianti, M.T." },
    { kode: "TIF3163", nama: "Kewirausahaan", sks: 2, jenis: "Pilihan", hari: "Selasa", jam: "13.00-14.40",  ruang: "D.201", dosen: "Agus Wijaya, M.M." },
    { kode: "TIF3164", nama: "Data Mining", sks: 3, jenis: "Pilihan", hari: "Jumat",  jam: "13.00-14.40",  ruang: "Lab. 2", dosen: "Budi Santoso, M.Kom." },
    { kode: "TIF3165", nama: "Kompresi Data", sks: 2, jenis: "Pilihan", hari: "Rabu",   jam: "13.00-14.40",  ruang: "D.202", dosen: "Dewi Lestari, M.Si." }
  ];

  /* Key localStorage untuk KRRS aktif */
  window.KRRS_KEY = "krrs_aktif";
})();
