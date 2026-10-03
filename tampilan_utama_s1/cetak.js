/* =========================================================
   Cetak KRRS — S1 (halaman 3/3)
   Merender dokumen KRRS dari localStorage, siap print/PDF
   lewat window.print() (aturan cetak ada di krrs.css +
   template.css).
   ========================================================= */

(function () {
  "use strict";

  var MATAKULIAH = window.MATAKULIAH;

  var kosongEl = document.getElementById("kosong");
  var isiEl = document.getElementById("isi");
  var warningEl = document.getElementById("warning");
  var rowsEl = document.getElementById("doc-rows");
  var jumlahEl = document.getElementById("doc-jumlah");
  var sksEl = document.getElementById("doc-sks");
  var taEl = document.getElementById("m-ta");
  var statusEl = document.getElementById("doc-status");
  var tanggalEl = document.getElementById("doc-tanggal");
  var cetakBtn = document.getElementById("cetak");

  var krrs = null;
  try { krrs = JSON.parse(localStorage.getItem("krrs_aktif") || "null"); }
  catch (e) { krrs = null; }

  if (!krrs || !krrs.kode || krrs.kode.length === 0) {
    kosongEl.hidden = false;
    return;
  }

  isiEl.hidden = false;

  /* Identitas dari sesi login */
  function getSession() {
    try {
      var raw = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
      if (raw) return JSON.parse(raw) || {};
    } catch (e) {}
    return {};
  }

  var user = getSession();
  document.getElementById("m-nama").textContent = user.name || "Mahasiswa Demo";
  document.getElementById("t-mahasiswa").textContent = user.name || "Mahasiswa Demo";
  document.getElementById("m-nim").textContent = user.nim || "535250153";
  taEl.textContent = krrs.tahun || "2025/2026";

  var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var now = new Date();
  tanggalEl.textContent = now.getDate() + " " + bulan[now.getMonth()] + " " + now.getFullYear();

  var disetujui = krrs.status === "disetujui";
  statusEl.textContent = disetujui ? "Disetujui" : "Draft";
  statusEl.className = disetujui ? "badge badge--ok" : "badge badge--warn";
  warningEl.hidden = disetujui;

  var html = "";
  var totalSks = 0;

  krrs.kode.forEach(function (kode, i) {
    var mk = null;
    for (var j = 0; j < MATAKULIAH.length; j++) {
      if (MATAKULIAH[j].kode === kode) { mk = MATAKULIAH[j]; break; }
    }
    if (!mk) return;
    totalSks += mk.sks;

    var jadwal = mk.jadwal.map(function (j) {
      return j.hari + " " + j.jam + " &middot; " + j.ruang;
    }).join("<br>");

    html += "<tr>" +
      "<td>" + (i + 1) + "</td>" +
      "<td>" + mk.kode + "</td>" +
      "<td><b>" + mk.nama + "</b></td>" +
      "<td>" + mk.dosen + "</td>" +
      "<td>" + mk.sks + "</td>" +
      "<td>" + jadwal + "</td>" +
      "</tr>";
  });

  rowsEl.innerHTML = html;
  jumlahEl.textContent = krrs.kode.length;
  sksEl.textContent = totalSks;

  cetakBtn.addEventListener("click", function () {
    window.print();
  });
})();
