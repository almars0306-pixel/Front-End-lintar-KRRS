/* =========================================================
   TEMPLATE LAYOUT & SIDEBAR
   ========================================================= */

(function () {
  "use strict";

  var SESSION_KEY = "currentUser";
  var THEME_KEY = "lintar_theme";

  var DEFAULT_USER = {
    nama: "Mahasiswa Demo",
    nim: "535250153",
    email: "mahasiswa@untar.ac.id",
    semester: 3
  };

  /* Menu sidebar dikelompokkan PER BAGIAN */
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
      header: "Aplikasi Staff",
      items: [
        { id: "staff-beranda", label: "Beranda", href: "../tampilan_utama_Staff/dashboard.html", icon: "home" },
        { id: "staff-isi", label: "Pengisian KRRS", href: "../tampilan_utama_Staff/isi_krrs_staff.html", icon: "edit" },
        { id: "staff-konfirmasi", label: "Konfirmasi", href: "../tampilan_utama_Staff/konfirmasi.html", icon: "check" },
        { id: "staff-cetak", label: "Cetak KRRS", href: "../tampilan_utama_Staff/cetak.html", icon: "printer" }
      ]
    }
  }
  

  var STEPS = [
    { label: "Pengisian", note: "Pilih mata kuliah" },
    { label: "Konfirmasi", note: "Periksa & kunci" },
    { label: "Cetak", note: "Unduh / print" }
  ];

  var ICONS = {
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'
  };

  function svgIcon(name) {
    var content = ICONS[name] || ICONS.home;
    return (
      '<svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      content +
      "</svg>"
    );
  }

  function renderSidebar() {
    var key = document.body.dataset.menu || "s1";
    var group = MENU_GROUPS[key] || MENU_GROUPS.s1;
    var container = document.getElementById("sidebar-nav");
    if (!container) return;

    var activeId = document.body.dataset.active || "";
    var html = '<div class="sidebar-header">' + group.header + "</div><ul>";

    group.items.forEach(function (item) {
      var cls = item.id === activeId ? "active" : "";
      html +=
        '<li><a href="' +
        item.href +
        '" class="' +
        cls +
        '">' +
        svgIcon(item.icon) +
        "<span>" +
        item.label +
        "</span></a></li>";
    });

    html += "</ul>";
    container.innerHTML = html;
  }

  function renderUser() {
    var elNama = document.getElementById("user-nama");
    var elNim = document.getElementById("user-nim");
    if (elNama) elNama.textContent = DEFAULT_USER.nama;
    if (elNim) elNim.textContent = DEFAULT_USER.nim;
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderSidebar();
    renderUser();
  });
})();