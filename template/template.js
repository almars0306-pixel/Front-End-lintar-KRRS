/* =========================================================
   TEMPLATE ENGINE — Lintar KRRS (Universitas Tarumanagara)
   ---------------------------------------------------------
   Sidebar, topbar, dan stepper terisi OTOMATIS di halaman
   yang memakai slot. Satu template untuk semua bagian:
   S1 · S2 · S3 & Profesi · Aplikasi KRRS Staf · Panduan

   CARA PAKAI (untuk semua anggota, setelah template di-ACC):
   1. Link di <head>:
        <link rel="stylesheet" href="../template/template.css">
   2. Pakai kerangka:
        <body data-page="id-menu" data-step="1">
          <div class="app">
            <div data-slot="sidebar"></div>
            <button class="overlay" data-slot="overlay"></button>
            <div class="app__body">
              <header class="topbar" data-slot="topbar"
                      data-title="Judul Halaman"
                      data-sub="Nama Bagian"></header>
              <main class="page"> ... konten ... </main>
              <footer class="footer"> ... </footer>
            </div>
          </div>
        </body>
   3. Script sebelum </body>:
        <script src="../template/template.js"></script>

   - data-page  → menentukan menu sidebar yang aktif (lihat MENU)
   - data-step  → (opsional) stepper 1-2-3 untuk alur KRRS
   ========================================================= */

(function () {
  "use strict";

  /* ====== KONFIG ====== */

  var SESSION_KEY = "currentUser";
  var THEME_KEY = "lintar_theme";

  var DEFAULT_USER = {
    nama: "Mahasiswa Demo",
    nim: "535250153",
    email: "mahasiswa@untar.ac.id",
    semester: 3
  };

  /* Menu sidebar — dikelompokkan PER BAGIAN. Halaman memilih
     grupnya lewat <body data-menu="...">, jadi tiap bagian hanya
     menampilkan menunya sendiri (masing-masing). */
  var MENU_GROUPS = {
    s1: {
      header: "Mahasiswa S1",
      items: [
        { id: "s1-beranda", label: "Beranda", href: "../tampilan_utama_s1/dashboard.html", icon: "home" },
        { id: "s1-isi", label: "Pengisian KRRS", href: "../tampilan_utama_s1/isi-krrs.html", icon: "edit" },
        { id: "s1-konfirmasi", label: "Konfirmasi", href: "../tampilan_utama_s1/konfirmasi.html", icon: "check" },
        { id: "s1-cetak", label: "Cetak KRRS", href: "../tampilan_utama_s1/cetak.html", icon: "printer" }
      ]
    },
    s2: {
      header: "Mahasiswa S2",
      items: [
        { id: "s2-beranda", label: "Beranda", href: "../tampilan_utama_s2/dashboard.html", icon: "home" }
      ]
    },
    s3: {
      header: "S3 & Profesi",
      items: [
        { id: "s3-beranda", label: "Beranda", href: "../tampilan_utama_Staff/dashboard.html", icon: "home" }
      ]
    },
    panduan: {
      header: "Panduan",
      items: [
        { id: "panduan", label: "Panduan KRRS", href: "../panduan/index.html", icon: "book" }
      ]
    }
  };

  var STEPS = [
    { label: "Pengisian", note: "Pilih mata kuliah" },
    { label: "Konfirmasi", note: "Periksa & kunci" },
    { label: "Cetak", note: "Unduh / print" }
  ];

  var ICONS = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    sun: '<circle cx="12" cy="12" r="4"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
    moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
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
    /* Prioritas: data akun login (currentUser) MENIMPA default.
       Auth.js menyimpan "name", di sini dipetakan ke "nama". */
    var base = {};
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      if (raw) base = JSON.parse(raw) || {};
    } catch (e) {}

    return {
      nama: base.name || base.nama || DEFAULT_USER.nama,
      nim: base.nim || DEFAULT_USER.nim,
      email: base.email || DEFAULT_USER.email,
      semester: base.semester || DEFAULT_USER.semester
    };
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

  function greeting() {
    var h = new Date().getHours();
    if (h < 11) return "Selamat pagi";
    if (h < 15) return "Selamat siang";
    if (h < 18) return "Selamat sore";
    return "Selamat malam";
  }

  /* ====== TEMA TERANG/GELAP ====== */

  function getTheme() {
    try { return localStorage.getItem(THEME_KEY) || "light"; }
    catch (e) { return "light"; }
  }

  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
  }

  /* ====== RENDER: SIDEBAR ====== */

  function renderSidebar(slot) {
    /* Ambil grup menu sesuai <body data-menu="...">.
       Kalau tidak ada, tampilkan semua grup. */
    var key = document.body.dataset.menu;
    var nav = "";

    if (key && MENU_GROUPS[key]) {
      var grup = MENU_GROUPS[key];
      nav += '<p class="nav__label">' + grup.header + "</p>";
      grup.items.forEach(function (item) {
        nav += linkHtml(item);
      });
    } else {
      Object.keys(MENU_GROUPS).forEach(function (k) {
        var grup = MENU_GROUPS[k];
        nav += '<p class="nav__label">' + grup.header + "</p>";
        grup.items.forEach(function (item) {
          nav += linkHtml(item);
        });
      });
    }

    slot.appendChild(el(
      '<div class="sidebar">' +
        '<a class="sidebar__brand" href="../authentication_user/pilih_jenjang.html">' +
          '<img src="../assets/logo.png" alt="Logo UNTAR">' +
          "<span><strong>Lintar KRRS</strong><small>Universitas Tarumanagara</small></span>" +
        "</a>" +
        '<nav class="sidebar__nav" aria-label="Menu utama">' + nav + "</nav>" +
        '<div class="sidebar__foot">Front-End KRRS &middot; v1.0</div>' +
      "</div>"
    ));
  }

  function linkHtml(item) {
    var active = document.body.dataset.page === item.id ? " is-active" : "";
    return '<a class="nav__link' + active + '" href="' + item.href + '"' +
      (active ? ' aria-current="page"' : "") + ">" +
      icon(item.icon) + "<span>" + item.label + "</span></a>";
  }

  /* ====== RENDER: TOPBAR ====== */

  function renderTopbar(slot, user) {
    var title = slot.dataset.title || "Lintar KRRS";
    var sub = slot.dataset.sub || "";

    slot.appendChild(el(
      '<button class="topbar__burger" type="button" aria-label="Buka menu" aria-expanded="false">' +
        icon("menu") +
      "</button>" +
      '<h1 class="topbar__title">' + title + (sub ? "<small>" + sub + "</small>" : "") + "</h1>" +
      '<span class="topbar__spacer"></span>' +
      '<span class="topbar__date">' + tanggalIndo(new Date()) + "</span>" +
      '<button class="topbar__theme" type="button" data-theme-toggle aria-label="Ganti tema terang/gelap" title="Terang / gelap">' +
        icon(getTheme() === "dark" ? "sun" : "moon") +
      "</button>" +
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

  /* ====== RENDER: STEPPER ====== */

  function renderStepper(pageEl) {
    var step = Number(document.body.dataset.step || 0);
    if (!step) return;

    var html = '<ol class="stepper" aria-label="Langkah alur">';

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

    /* Tema terang/gelap — tersimpan */
    var themeBtn = app.querySelector("[data-theme-toggle]");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
        themeBtn.innerHTML = icon(next === "dark" ? "sun" : "moon");
      });
    }

    /* Logout */
    var logoutBtn = app.querySelector("[data-logout]");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
        window.location.href = "../authentication_user/login.html";
      });
    }
  }

  /* ====== DATA USER & SAPAAN ====== */

  function fillUserData(user) {
    document.querySelectorAll("[data-user-field]").forEach(function (node) {
      var key = node.dataset.userField;
      if (user[key]) node.textContent = user[key];
    });

    var greetNode = document.querySelector("[data-greeting]");
    if (greetNode) greetNode.textContent = greeting();
  }

  /* ====== INIT ====== */

  document.addEventListener("DOMContentLoaded", function () {
    var app = document.querySelector(".app");
    var sidebarSlot = document.querySelector('[data-slot="sidebar"]');
    var topbarSlot = document.querySelector('[data-slot="topbar"]');
    var pageEl = document.querySelector(".page");
    var user = getUser();

    applyTheme(getTheme());

    if (sidebarSlot) renderSidebar(sidebarSlot);
    if (topbarSlot) renderTopbar(topbarSlot, user);
    if (pageEl) renderStepper(pageEl);
    if (app) setupInteractions(app);
    fillUserData(user);
  });

  window.LINTAR = { getUser: getUser };
})();
