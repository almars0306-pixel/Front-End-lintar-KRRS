/* =========================================================
   APP LAYOUT — Lintar KRRS (Anggota 2)
   ---------------------------------------------------------
   Sidebar, topbar, dan stepper terisi OTOMATIS di halaman
   yang memakai slot. Cara pakai untuk semua anggota:

   1. Link file ini + global.css:
        <link rel="stylesheet" href="../shared/global.css">
        <script src="../shared/app.js"></script>
   2. Pakai kerangka seperti di krrs/isi-krrs.html:
        <body data-page="isi-krrs" data-step="1">
          <div class="app">
            <div data-slot="sidebar"></div>
            <button class="overlay" data-slot="overlay"></button>
            <div class="app__body">
              <header class="topbar" data-slot="topbar" data-title="..."></header>
              <main class="page"> ... konten ... </main>
              <footer class="footer"> ... </footer>
            </div>
          </div>
        </body>
   - data-page  → menentukan menu sidebar yang aktif
   - data-step  → (opsional) menampilkan stepper 1-2-3 KRRS
   ========================================================= */

(function () {
  "use strict";

  /* ====== KONFIG ====== */

  /* Sesi login ditulis Auth.js (Anggota 1) dengan key "currentUser"
     berisi { name, email }. Field lain dilengkapi default di bawah. */
  var SESSION_KEY = "currentUser";
  var EXTRA_KEY = "lintar_user";

  var DEFAULT_USER = {
    nama: "Mahasiswa Demo",
    nim: "211062500001",
    prodi: "Teknik Informatika",
    fakultas: "Fakultas Sains dan Teknologi",
    semester: 5,
    email: "mahasiswa@radenintan.ac.id"
  };

  /* Menu sidebar — satu-satunya tempat mengubah menu.
     Anggota lain menambahkan menunya di sini setelah halamannya jadi. */
  var MENU = [
    { id: "beranda", label: "Beranda", href: "../tampilan_utama/dashboard.html", icon: "home" },
    { section: "KRRS Reguler" },
    { id: "isi-krrs", label: "Pengisian KRRS", href: "../krrs/isi-krrs.html", icon: "edit" },
    { id: "konfirmasi", label: "Konfirmasi", href: "../krrs/konfirmasi.html", icon: "check" },
    { id: "cetak", label: "Cetak KRRS", href: "../krrs/cetak.html", icon: "printer" }
  ];

  var STEPS = [
    { label: "Pengisian", note: "Pilih mata kuliah" },
    { label: "Konfirmasi", note: "Periksa & kunci" },
    { label: "Cetak", note: "Unduh / print" }
  ];

  /* ====== IKON (Feather-style, stroke currentColor) ====== */

  var ICONS = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    chart: '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>'
  };

  /* ====== UTIL ====== */

  function icon(name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
  }

  function el(html) {
    var wrap = document.createElement("div");
    wrap.innerHTML = html.trim();
    return wrap.firstChild;
  }

  function getUser() {
    var base = {}, extra = {};
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      if (raw) base = JSON.parse(raw) || {};
      var rawExtra = localStorage.getItem(EXTRA_KEY);
      if (rawExtra) extra = JSON.parse(rawExtra) || {};
    } catch (e) { /* abaikan */ }

    var merged = {};
    [DEFAULT_USER, extra, base].forEach(function (src) {
      Object.keys(src).forEach(function (k) { if (src[k]) merged[k] = src[k]; });
    });
    if (!merged.nama && merged.name) merged.nama = merged.name;
    return merged;
  }

  function initials(name) {
    return String(name || "?").split(" ").slice(0, 2)
      .map(function (w) { return w.charAt(0); }).join("").toUpperCase();
  }

  function tanggalIndo(date) {
    var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    var bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return hari[date.getDay()] + ", " + date.getDate() + " " +
      bulan[date.getMonth()] + " " + date.getFullYear();
  }

  /* ====== RENDER: SIDEBAR ====== */

  function renderSidebar(slot) {
    var nav = "";

    MENU.forEach(function (item) {
      if (item.section) {
        nav += '<p class="nav__label">' + item.section + "</p>";
        return;
      }

      var active = document.body.dataset.page === item.id ? " is-active" : "";
      nav += '<a class="nav__link' + active + '" href="' + item.href + '"' +
        (active ? ' aria-current="page"' : "") + ">" +
        icon(item.icon) + "<span>" + item.label + "</span></a>";
    });

    slot.appendChild(el(
      '<div class="sidebar">' +
        '<a class="sidebar__brand" href="../tampilan_utama/dashboard.html">' +
          '<img src="../assets/logo.png" alt="Logo Lintar KRRS">' +
          "<span><strong>Lintar KRRS</strong><small>UIN Raden Intan Lampung</small></span>" +
        "</a>" +
        '<nav class="sidebar__nav" aria-label="Menu utama">' + nav + "</nav>" +
        '<div class="sidebar__foot">Front-End KRRS &middot; v1.0</div>' +
      "</div>"
    ));
  }

  /* ====== RENDER: TOPBAR ====== */

  function renderTopbar(slot, user) {
    var title = slot.dataset.title || "Lintar KRRS";

    slot.appendChild(el(
      '<button class="topbar__burger" type="button" aria-label="Buka menu" aria-expanded="false">' +
        icon("menu") +
      "</button>" +
      '<h1 class="topbar__title">' + title + "</h1>" +
      '<span class="topbar__spacer"></span>' +
      '<span class="topbar__date">' + tanggalIndo(new Date()) + "</span>" +
      '<div class="user">' +
        '<button class="user__chip" type="button" aria-haspopup="true" aria-expanded="false">' +
          '<span class="user__name"><span data-user-field="nama">' + user.nama + "</span>" +
            "<small>NIM " + user.nim + "</small></span>" +
          '<span class="avatar">' + initials(user.nama) + "</span>" +
        "</button>" +
        '<div class="user__menu" role="menu">' +
          '<div class="user__meta"><strong>' + user.nama + "</strong><span>" + user.email + "</span></div>" +
          '<button class="user__item user__item--out" type="button" role="menuitem" data-logout>' +
            icon("logout") + "Keluar</button>" +
        "</div>" +
      "</div>"
    ));
  }

  /* ====== RENDER: STEPPER (khusus halaman KRRS) ====== */

  function renderStepper(pageEl) {
    var step = Number(document.body.dataset.step || 0);
    if (!step) return;

    var html = '<ol class="stepper" aria-label="Langkah pengisian KRRS">';

    STEPS.forEach(function (s, i) {
      var n = i + 1;
      var state = n < step ? " is-done" : n === step ? " is-active" : "";
      var dot = n < step ? "&#10003;" : String(n);

      if (i > 0) html += '<span class="step__bar-wrap"><span class="step__bar"></span></span>';

      html += '<li class="step' + state + '">' +
        '<span class="step__dot">' + dot + "</span>" +
        '<span class="step__label"><strong>' + s.label + "</strong><span>" + s.note + "</span></span>" +
        "</li>";
    });

    html += "</ol>";
    pageEl.insertBefore(el(html), pageEl.firstChild);
  }

  /* ====== INTERAKSI ====== */

  function setupInteractions(app) {
    var burger = app.querySelector(".topbar__burger");
    var overlay = app.querySelector(".overlay");
    var chip = app.querySelector(".user__chip");
    var menu = app.querySelector(".user__menu");

    function setNav(open) {
      app.classList.toggle("nav-open", open);
      if (burger) burger.setAttribute("aria-expanded", String(open));
    }

    if (burger) burger.addEventListener("click", function () {
      setNav(!app.classList.contains("nav-open"));
    });
    if (overlay) overlay.addEventListener("click", function () { setNav(false); });

    function closeMenu() {
      if (!menu) return;
      menu.classList.remove("is-open");
      if (chip) chip.setAttribute("aria-expanded", "false");
    }

    if (chip && menu) {
      chip.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = menu.classList.toggle("is-open");
        chip.setAttribute("aria-expanded", String(open));
      });
      document.addEventListener("click", function (e) {
        if (!menu.contains(e.target) && e.target !== chip) closeMenu();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { setNav(false); closeMenu(); }
    });

    /* Logout — membersihkan sesi lalu ke halaman login */
    var logoutBtn = app.querySelector("[data-logout]");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        try {
          localStorage.removeItem(SESSION_KEY);
          localStorage.removeItem(EXTRA_KEY);
        } catch (e) {}
        window.location.href = "../authentication_user/login.html";
      });
    }
  }

  /* ====== DATA USER DI HALAMAN ======
     Cukup tulis: <span data-user-field="nama"></span>
     Field: nama, nim, prodi, fakultas, semester, email */

  function fillUserData(user) {
    document.querySelectorAll("[data-user-field]").forEach(function (node) {
      var key = node.dataset.userField;
      if (user[key]) node.textContent = user[key];
    });
  }

  /* ====== INIT ====== */

  document.addEventListener("DOMContentLoaded", function () {
    var app = document.querySelector(".app");
    var sidebarSlot = document.querySelector('[data-slot="sidebar"]');
    var topbarSlot = document.querySelector('[data-slot="topbar"]');
    var pageEl = document.querySelector(".page");
    var user = getUser();

    if (sidebarSlot) renderSidebar(sidebarSlot);
    if (topbarSlot) renderTopbar(topbarSlot, user);
    if (pageEl) renderStepper(pageEl);
    if (app) setupInteractions(app);
    fillUserData(user);
  });

  /* Diekspos untuk anggota lain: LINTAR.getUser() */
  window.LINTAR = { getUser: getUser };
})();
