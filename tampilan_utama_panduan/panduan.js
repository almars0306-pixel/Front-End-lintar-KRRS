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
/* =========================================================
   TAMBAHAN: FAQ + PUSAT BANTUAN
   ========================================================= */

// FAQ - CONTOH isi, sesuaikan dengan aturan kampus yang sebenarnya
const FAQ = [
  {
    q: "Saya lupa password akun KRRS, bagaimana cara meresetnya?",
    a: "Klik tautan lupa password di halaman login jika tersedia. Jika tidak, hubungi pusat bantuan dengan menyertakan nama dan NIM agar password dapat direset.",
  },
  {
    q: "Bagaimana cara mengisi KRRS online?",
    a: "Masuk dengan akun kamu, pilih mata kuliah dan kelas yang tersedia pada periode pengisian, lalu simpan. Langkah lengkap ada di file panduan di bagian atas halaman ini.",
  },
  {
    q: "Kenapa halaman KRRS tidak bisa dibuka atau tombol pengisian tidak muncul?",
    a: "Pastikan periode pengisian KRRS sedang dibuka dan kamu sudah login dengan akun yang benar. Coba muat ulang halaman atau gunakan browser lain.",
  },
  {
    q: "Mata kuliah yang saya pilih bentrok jadwalnya, apa yang harus dilakukan?",
    a: "Pilih kelas lain untuk mata kuliah yang sama jika tersedia. Jika tidak ada pilihan lain, hubungi pusat bantuan atau dosen pembimbing akademik.",
  },
  {
    q: "Kuota kelas sudah penuh, apakah masih bisa mendaftar?",
    a: "Kelas yang penuh tidak dapat dipilih. Pilih kelas paralel lain atau ajukan permohonan melalui pusat bantuan.",
  },
  {
    q: "Apakah KRRS bisa diubah setelah disimpan?",
    a: "Perubahan hanya bisa dilakukan selama masa perubahan KRRS masih dibuka. Setelah itu, perubahan harus diajukan melalui pusat bantuan.",
  },
  {
    q: "Bagaimana cara mencetak KRRS?",
    a: "Setelah KRRS tersimpan, gunakan menu cetak atau unduh pada halaman KRRS kamu.",
  },
];

// Kontak pusat bantuan - GANTI dengan data resmi (sekarang masih placeholder)
const CONTACT = {
  email: "krrs@untar.ac.id",
  whatsapp: "6281234567890", // format internasional tanpa + dan tanpa 0 di depan
  phone: "(021) 5666952",
  hours: "Senin - Jumat, 08.00 - 16.00 WIB",
  topics: [
    "Lupa password / tidak bisa login",
    "Kendala pengisian KRRS",
    "Jadwal bentrok / kuota penuh",
    "Perubahan KRRS",
    "Lainnya",
  ],
};

const faqList = document.getElementById("faq-list");
const contactGrid = document.getElementById("contact-grid");
const askForm = document.getElementById("ask-form");
const askError = document.getElementById("ask-error");
const askTopik = document.getElementById("ask-topik");

function renderFaq() {
  faqList.innerHTML = "";

  FAQ.forEach((item, i) => {
    const wrap = document.createElement("div");
    wrap.className = "faq__item";
    wrap.dataset.text = (item.q + " " + item.a).toLowerCase();

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "faq__q";
    btn.id = `faq-q-${i}`;
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", `faq-a-${i}`);

    const qText = document.createElement("span");
    qText.textContent = item.q;
    const chev = document.createElement("span");
    chev.className = "faq__chev";
    chev.setAttribute("aria-hidden", "true");
    chev.textContent = "+";
    btn.append(qText, chev);

    const panel = document.createElement("div");
    panel.className = "faq__a";
    panel.id = `faq-a-${i}`;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", btn.id);
    panel.hidden = true;
    const p = document.createElement("p");
    p.textContent = item.a;
    panel.appendChild(p);

    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      chev.textContent = open ? "+" : "\u2013";
      panel.hidden = open;
    });

    wrap.append(btn, panel);
    faqList.appendChild(wrap);
  });
}

function renderContacts() {
  const cards = [
    {
      title: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      cta: "Kirim email",
    },
    {
      title: "WhatsApp",
      value: "+" + CONTACT.whatsapp,
      href: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Halo, saya ingin bertanya tentang KRRS Online.")}`,
      cta: "Chat WhatsApp",
      external: true,
    },
    {
      title: "Telepon",
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`,
      cta: "Telepon sekarang",
    },
    {
      title: "Jam layanan",
      value: CONTACT.hours,
    },
  ];

  contactGrid.innerHTML = "";
  cards.forEach((c) => {
    const card = document.createElement("div");
    card.className = "contact-card";

    const h = document.createElement("h3");
    h.textContent = c.title;
    const v = document.createElement("p");
    v.textContent = c.value;
    card.append(h, v);

    if (c.href) {
      const a = document.createElement("a");
      a.href = c.href;
      a.textContent = c.cta;
      if (c.external) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      card.appendChild(a);
    }
    contactGrid.appendChild(card);
  });
}

function renderTopics() {
  CONTACT.topics.forEach((t) => {
    const o = document.createElement("option");
    o.value = t;
    o.textContent = t;
    askTopik.appendChild(o);
  });
}

askForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = askForm.nama.value.trim();
  const nim = askForm.nim.value.trim();
  const topik = askForm.topik.value;
  const pesan = askForm.pesan.value.trim();

  if (!nama || !nim || !pesan) {
    askError.textContent = "Nama, NIM, dan pertanyaan wajib diisi.";
    return;
  }
  askError.textContent = "";

  const subject = `[KRRS Online] ${topik} - ${nim}`;
  const body = [`Nama : ${nama}`, `NIM  : ${nim}`, `Topik: ${topik}`, "", pesan].join("\r\n");

  window.location.href =
    `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

renderFaq();
renderContacts();
renderTopics();