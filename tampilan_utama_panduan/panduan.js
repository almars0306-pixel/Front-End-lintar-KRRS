// Daftar panduan. Tambah/ubah di sini kalau ada file baru di folder assets.
const PANDUAN = [
  {
    label: "PANDUAN KRRS MAHASISWA NON KEDOKTERAN (KLIK)",
    file: "../assets/PANDUAN_KRRS_ONLINE_UNTAR.pdf",
  },
  {
    label: "PANDUAN KRRS MAHASISWA KEDOKTERAN (KLIK)",
    file: "../assets/panduan_krrs_fk.pdf",
  },
];

const listEl = document.getElementById("guide-list");
const backBtn = document.getElementById("btn-back");

function renderPanduan() {
  listEl.innerHTML = "";

  PANDUAN.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = item.file;
    a.textContent = item.label;
    a.target = "_blank";
    a.rel = "noopener";

    li.appendChild(a);
    listEl.appendChild(li);
  });
}

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (window.history.length > 1) {
    window.history.back();
  } else {
    // Ganti dengan halaman tujuan jika tidak ada riwayat
    window.location.href = "../tampilan_utama_s1/index.html";
  }
});

renderPanduan();