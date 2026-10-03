/* =========================================================
   Konfirmasi KRRS — S1 (halaman 2/3)
   Ringkasan + tabel + pratinjau jadwal mingguan + konfirmasi
   yang mengunci KRRS (dengan modal sukses).
   ========================================================= */

(function () {
  "use strict";

  var MATAKULIAH = window.MATAKULIAH;

  var kosongEl = document.getElementById("kosong");
  var isiEl = document.getElementById("isi");
  var rowsEl = document.getElementById("rows");
  var jmlMkEl = document.getElementById("jml-mk");
  var jmlSksEl = document.getElementById("jml-sks");
  var sksTotalEl = document.getElementById("sks-total");
  var statusBadge = document.getElementById("status-badge");
  var notice = document.getElementById("notice");
  var konfirmasiBtn = document.getElementById("konfirmasi");
  var ubahLink = document.getElementById("ubah");
  var keCetakLink = document.getElementById("ke-cetak");
  var batalBtn = document.getElementById("batal");
  var suksesEl = document.getElementById("sukses");

  var krrs = null;
  try { krrs = JSON.parse(localStorage.getItem("krrs_aktif") || "null"); }
  catch (e) { krrs = null; }

  if (!krrs || !krrs.kode || krrs.kode.length === 0) {
    kosongEl.hidden = false;
    return;
  }

  isiEl.hidden = false;

  /* ====== Tabel ringkasan ====== */

  function jadwalHtml(mk) {
    return mk.jadwal.map(function (j) {
      return j.hari + " " + j.jam + " &middot; " + j.ruang;
    }).join("<br>");
  }

  var html = "";
  var totalSks = 0;

  krrs.kode.forEach(function (kode, i) {
    var mk = null;
    for (var j = 0; j < MATAKULIAH.length; j++) {
      if (MATAKULIAH[j].kode === kode) { mk = MATAKULIAH[j]; break; }
    }
    if (!mk) return;
    totalSks += mk.sks;

    html += "<tr>" +
      "<td>" + (i + 1) + "</td>" +
      '<td><span class="kode">' + mk.kode + "</span></td>" +
      "<td><b>" + mk.nama + '</b><br><span class="sub">' + mk.dosen + "</span></td>" +
      "<td>" + (mk.jenis === "Wajib"
        ? '<span class="tag tag--wajib">Wajib</span>'
        : '<span class="tag tag--pilih">Pilihan</span>') + "</td>" +
      "<td>" + mk.sks + "</td>" +
      "<td>" + jadwalHtml(mk) + "</td>" +
      "</tr>";
  });

  rowsEl.innerHTML = html;
  jmlMkEl.textContent = krrs.kode.length;
  jmlSksEl.textContent = totalSks;
  sksTotalEl.textContent = totalSks;

  /* ====== Status + waktu ====== */

  var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  function formatWaktu(iso) {
    try {
      var d = new Date(iso);
      var jam = ("0" + d.getHours()).slice(-2);
      var menit = ("0" + d.getMinutes()).slice(-2);
      return d.getDate() + " " + bulan[d.getMonth()] + " " + d.getFullYear() + " " + jam + "." + menit;
    } catch (e) {
      return "-";
    }
  }

  function setNotice(tipe, teks) {
    notice.className = "notice " + tipe;
    notice.textContent = teks;
  }

  function simpan() {
    try { localStorage.setItem("krrs_aktif", JSON.stringify(krrs)); } catch (e) {}
  }

  function renderStatus() {
    var ok = krrs.status === "disetujui";

    statusBadge.textContent = ok ? "Disetujui" : "Draft";
    statusBadge.className = ok ? "badge badge--ok" : "badge badge--warn";

    konfirmasiBtn.disabled = ok;
    ubahLink.style.display = ok ? "none" : "";
    keCetakLink.hidden = !ok;
    batalBtn.hidden = !ok;

    if (ok && krrs.disetujuiPada) {
      setNotice("ok", "Dikonfirmasi pada " + formatWaktu(krrs.disetujuiPada) + ".");
    } else if (krrs.disimpanPada) {
      setNotice("info", "Terakhir disimpan: " + formatWaktu(krrs.disimpanPada) + ".");
    }
  }

  renderStatus();

  /* ====== Pratinjau jadwal mingguan ====== */

  function keMenit(jam) {
    var bagian = jam.split("-");
    function m(s) {
      var t = s.trim().split(".");
      return parseInt(t[0], 10) * 60 + parseInt(t[1], 10);
    }
    return [m(bagian[0]), m(bagian[1])];
  }

  function renderJadwal() {
    var grid = document.getElementById("jadwal-grid");
    var card = document.getElementById("jadwal-card");
    if (!grid) return;

    var HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    var MULAI = 7 * 60 + 30;    /* 07.30 */
    var SELESAI = 17 * 60 + 30; /* 17.30 */
    var TINGGI = 600;

    var dipilih = [];
    krrs.kode.forEach(function (kode) {
      for (var j = 0; j < MATAKULIAH.length; j++) {
        if (MATAKULIAH[j].kode === kode) { dipilih.push(MATAKULIAH[j]); break; }
      }
    });

    if (!dipilih.length) { card.hidden = true; return; }
    card.hidden = false;

    var html = '<div class="jadwal__corner"></div>';
    HARI.forEach(function (h) {
      html += '<div class="jadwal__hari">' + h + "</div>";
    });

    html += '<div class="jadwal__gutter">';
    for (var t = MULAI; t <= SELESAI; t += 60) {
      var top = ((t - MULAI) / (SELESAI - MULAI)) * TINGGI;
      var jam = ("0" + Math.floor(t / 60)).slice(-2) + "." + ("0" + (t % 60)).slice(-2);
      html += '<span class="jadwal__jam" style="top:' + top + 'px">' + jam + "</span>";
    }
    html += "</div>";

    HARI.forEach(function (h) {
      html += '<div class="jadwal__kolom">';

      for (var t = MULAI + 60; t < SELESAI; t += 60) {
        var top = ((t - MULAI) / (SELESAI - MULAI)) * TINGGI;
        html += '<i class="jadwal__garis" style="top:' + top + 'px"></i>';
      }

      /* Semua sesi matkul pada hari ini */
      dipilih.forEach(function (mk) {
        mk.jadwal.forEach(function (sesi) {
          if (sesi.hari !== h) return;
          var jm = keMenit(sesi.jam);
          var mulai = Math.max(jm[0], MULAI);
          var akhir = Math.min(jm[1], SELESAI);
          var top = ((mulai - MULAI) / (SELESAI - MULAI)) * TINGGI;
          var tinggi = ((akhir - mulai) / (SELESAI - MULAI)) * TINGGI;

          html += '<div class="jadwal__mk jadwal__mk--' +
            (mk.jenis === "Wajib" ? "wajib" : "pilih") +
            '" style="top:' + top + "px; height:" + tinggi + 'px" title="' +
            mk.nama + " · " + sesi.hari + " " + sesi.jam + " · " + sesi.ruang + '">' +
            "<b>" + mk.nama + "</b><span>" + sesi.jam + " · " + sesi.ruang + "</span></div>";
        });
      });

      html += "</div>";
    });

    grid.innerHTML = html;
  }

  renderJadwal();

  /* ====== Aksi ====== */

  konfirmasiBtn.addEventListener("click", function () {
    if (krrs.status === "disetujui") return;

    krrs.status = "disetujui";
    krrs.disetujuiPada = new Date().toISOString();
    simpan();
    renderStatus();

    suksesEl.classList.add("is-open");
    suksesEl.querySelector(".btn").focus();
    suksesEl.addEventListener("click", function (e) {
      if (e.target === suksesEl) suksesEl.classList.remove("is-open");
    });
  });

  batalBtn.addEventListener("click", function () {
    krrs.status = "draft";
    delete krrs.disetujuiPada;
    simpan();
    renderStatus();
    setNotice("info", "Konfirmasi dibatalkan — KRRS kembali menjadi draft.");
  });
})();
