/* =========================================================
   Pengisian KRRS — S1 (halaman 1/3)
   Tabel wajib+pilihan, cari & filter, hitung SKS (maks 24),
   deteksi jadwal bentrok + sorot baris, simpan ke localStorage.
   ========================================================= */

(function () {
  "use strict";

  var MATAKULIAH = window.MATAKULIAH;
  var BATAS_SKS = 24;

  var rowsBody = document.getElementById("rows");
  var emptyMsg = document.getElementById("empty");
  var cari = document.getElementById("cari");
  var filterJenis = document.getElementById("filter-jenis");
  var filterHari = document.getElementById("filter-hari");
  var resetBtn = document.getElementById("reset");
  var simpanBtn = document.getElementById("simpan");
  var jmlMkEl = document.getElementById("jml-mk");
  var sksWajibEl = document.getElementById("sks-wajib");
  var sksPilihanEl = document.getElementById("sks-pilihan");
  var sksTotalEl = document.getElementById("sks-total");
  var meter = document.getElementById("meter");
  var meterFill = document.getElementById("meter-fill");
  var notice = document.getElementById("notice");
  var conflictBox = document.getElementById("conflict");
  var conflictList = document.getElementById("conflict-list");

  var dipilih = {};
  try {
    var simpanan = JSON.parse(localStorage.getItem("krrs_aktif") || "null");
    if (simpanan && simpanan.kode) {
      simpanan.kode.forEach(function (k) { dipilih[k] = true; });
    }
  } catch (e) {}

  function render() {
    var q = cari.value.trim().toLowerCase();
    var f = filterJenis.value;
    var fh = filterHari.value;
    var html = "";

    MATAKULIAH.forEach(function (mk) {
      if (f !== "semua" && mk.jenis !== f) return;
      if (fh !== "semua" && mk.hari !== fh) return;
      if (q && mk.nama.toLowerCase().indexOf(q) < 0 &&
              mk.kode.toLowerCase().indexOf(q) < 0 &&
              mk.dosen.toLowerCase().indexOf(q) < 0) return;

      var wajib = mk.jenis === "Wajib";
      var checked = wajib || dipilih[mk.kode];

      html += "<tr>" +
        '<td><input type="checkbox" data-kode="' + mk.kode + '"' +
          (checked ? " checked" : "") + (wajib ? " disabled" : "") +
          ' aria-label="Ambil ' + mk.nama + '"></td>' +
        '<td><span class="kode">' + mk.kode + "</span></td>" +
        "<td><b>" + mk.nama + '</b><br><span class="sub">' + mk.dosen + "</span></td>" +
        "<td>" + (wajib
          ? '<span class="tag tag--wajib">Wajib</span>'
          : '<span class="tag tag--pilih">Pilihan</span>') + "</td>" +
        "<td>" + mk.sks + "</td>" +
        "<td>" + mk.hari + " " + mk.jam + " &middot; " + mk.ruang + "</td>" +
        "</tr>";
    });

    rowsBody.innerHTML = html;
    emptyMsg.hidden = html !== "";
    hitung();
    tampilBentrok();
  }

  function terpilih() {
    var list = [];
    MATAKULIAH.forEach(function (mk) {
      if (mk.jenis === "Wajib" || dipilih[mk.kode]) list.push(mk);
    });
    return list;
  }

  function ringkas() {
    var wajib = 0, pilihan = 0;
    terpilih().forEach(function (mk) {
      if (mk.jenis === "Wajib") wajib += mk.sks; else pilihan += mk.sks;
    });
    return { wajib: wajib, pilihan: pilihan, total: wajib + pilihan };
  }

  function setNotice(tipe, teks) {
    notice.className = "notice " + tipe;
    notice.textContent = teks;
  }

  function hitung() {
    var s = ringkas();
    jmlMkEl.textContent = terpilih().length;
    sksWajibEl.textContent = s.wajib;
    sksPilihanEl.textContent = s.pilihan;
    sksTotalEl.textContent = s.total;

    var persen = Math.min(100, Math.round((s.total / BATAS_SKS) * 100));
    meterFill.style.width = persen + "%";
    meterFill.classList.toggle("is-over", s.total > BATAS_SKS);
    meter.setAttribute("aria-valuenow", String(s.total));

    var bentrok = cekBentrok();
    if (s.total > BATAS_SKS) {
      setNotice("fail", "Melebihi batas! Total " + s.total + " SKS, maksimal " + BATAS_SKS + ".");
    } else if (bentrok.length) {
      setNotice("fail", "Perbaiki jadwal yang bentrok dulu ya.");
    } else {
      setNotice("ok", "Total " + s.total + " dari " + BATAS_SKS + " SKS. Sisa kuota " +
        (BATAS_SKS - s.total) + " SKS.");
    }
    simpanBtn.disabled = s.total > BATAS_SKS || bentrok.length > 0;
  }

  function keMenit(jam) {
    var bagian = jam.split("-");
    function m(s) {
      var t = s.trim().split(".");
      return parseInt(t[0], 10) * 60 + parseInt(t[1], 10);
    }
    return [m(bagian[0]), m(bagian[1])];
  }

  function cekBentrok() {
    var list = terpilih();
    var hasil = [];
    for (var i = 0; i < list.length; i++) {
      for (var j = i + 1; j < list.length; j++) {
        var a = list[i], b = list[j];
        if (a.hari !== b.hari) continue;
        var ja = keMenit(a.jam), jb = keMenit(b.jam);
        if (ja[0] < jb[1] && jb[0] < ja[1]) {
          hasil.push({ teks: a.kode + " × " + b.kode + " (" + a.hari + ")", a: a.kode, b: b.kode });
        }
      }
    }
    return hasil;
  }

  function tampilBentrok() {
    var bentrok = cekBentrok();
    conflictBox.classList.toggle("is-on", bentrok.length > 0);
    conflictList.innerHTML = "";

    var kodeBentrok = {};
    bentrok.forEach(function (b) {
      var li = document.createElement("li");
      li.textContent = b.teks;
      conflictList.appendChild(li);
      kodeBentrok[b.a] = true;
      kodeBentrok[b.b] = true;
    });

    rowsBody.querySelectorAll("tr").forEach(function (tr) {
      var box = tr.querySelector('input[type="checkbox"]');
      tr.classList.toggle("row-bentrok", !!(box && kodeBentrok[box.dataset.kode]));
    });
  }

  rowsBody.addEventListener("change", function (e) {
    var box = e.target;
    if (box.type !== "checkbox") return;

    var mk = null;
    for (var i = 0; i < MATAKULIAH.length; i++) {
      if (MATAKULIAH[i].kode === box.dataset.kode) { mk = MATAKULIAH[i]; break; }
    }
    if (!mk) return;

    if (box.checked) {
      var s = ringkas();
      if (s.total + mk.sks > BATAS_SKS) {
        box.checked = false;
        setNotice("fail", 'Tidak bisa menambah "' + mk.nama + '" — akan melebihi batas ' + BATAS_SKS + " SKS.");
        return;
      }
      dipilih[mk.kode] = true;
    } else {
      delete dipilih[mk.kode];
    }
    hitung();
    tampilBentrok();
  });

  cari.addEventListener("input", render);
  filterJenis.addEventListener("change", render);
  filterHari.addEventListener("change", render);

  resetBtn.addEventListener("click", function () {
    cari.value = "";
    filterJenis.value = "semua";
    filterHari.value = "semua";
    dipilih = {};
    render();
    setNotice("", "");
  });

  simpanBtn.addEventListener("click", function () {
    var s = ringkas();
    if (s.total > BATAS_SKS || cekBentrok().length) return;

    try {
      localStorage.setItem("krrs_aktif", JSON.stringify({
        semester: 5,
        tahun: "2024/2025",
        kode: terpilih().map(function (mk) { return mk.kode; }),
        totalSks: s.total,
        status: "draft",
        disimpanPada: new Date().toISOString()
      }));
    } catch (e) {}

    setNotice("ok", "KRRS tersimpan. Mengarahkan ke konfirmasi...");
    setTimeout(function () { window.location.href = "konfirmasi.html"; }, 800);
  });

  render();
})();
