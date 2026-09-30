/* =========================================================
   Dashboard S1 — dinamika kecil halaman beranda
   (kerangka sidebar/topbar/tema ditangani template.js)
   ========================================================= */

(function () {
  "use strict";

  /* Belum login → balik ke halaman masuk */
  if (!localStorage.getItem("currentUser") && !sessionStorage.getItem("currentUser")) {
    window.location.href = "../authentication_user/login.html";
    return;
  }

  /* Nama hari untuk panel "Jadwal Hari Ini" */
  var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var hariEl = document.getElementById("hari-ini");
  if (hariEl) hariEl.textContent = hari[new Date().getDay()];

  /* Animasi angka naik untuk statistik ber-atribut data-count */
  function countUp(el, target, decimals) {
    if (!el) return;
    var durasi = 900;
    var mulai = null;

    function langkah(ts) {
      if (!mulai) mulai = ts;
      var p = Math.min(1, (ts - mulai) / durasi);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(langkah);
    }
    requestAnimationFrame(langkah);
  }

  document.querySelectorAll("[data-count]").forEach(function (el) {
    countUp(el, parseFloat(el.dataset.count), parseInt(el.dataset.decimal || "0", 10));
  });

  /* Statistik KRRS dari data tersimpan */
  var sksEl = document.getElementById("stat-sks");
  var statusEl = document.getElementById("stat-status");
  var sksSekarang = 96; /* default: SKS lulus */

  try {
    var krrs = JSON.parse(localStorage.getItem("krrs_aktif") || "null");

    if (krrs && krrs.kode && krrs.kode.length) {
      if (sksEl) sksEl.textContent = krrs.totalSks || 0;

      if (statusEl) {
        if (krrs.status === "disetujui") {
          statusEl.textContent = "Disetujui";
          statusEl.className = "badge badge--ok";
        } else {
          statusEl.textContent = "Draft — belum dikonfirmasi";
          statusEl.className = "badge badge--warn";
        }
      }
    }
  } catch (e) {}

  /* Progres menuju kelulusan (144 SKS program S1) */
  var TARGET_SKS = 144;
  var pFill = document.getElementById("progres-fill");
  var pLabel = document.getElementById("progres-label");
  var pNote = document.getElementById("progres-note");

  if (pFill && pLabel) {
    var persen = Math.min(100, Math.round((sksSekarang / TARGET_SKS) * 100));

    setTimeout(function () {
      pFill.style.width = persen + "%";
    }, 300);

    pLabel.textContent = sksSekarang + " / " + TARGET_SKS + " SKS (" + persen + "%)";
    if (pNote) {
      pNote.textContent =
        "Kamu sudah menempuh " + sksSekarang + " dari " + TARGET_SKS +
        " SKS — tersisa " + (TARGET_SKS - sksSekarang) + " SKS menuju kelulusan.";
    }
  }
})();
