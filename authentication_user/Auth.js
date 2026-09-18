document.querySelectorAll("[data-toggle]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var input = document.getElementById(btn.dataset.toggle);
    var show = input.type === "password";
    input.type = show ? "text" : "password";
    btn.textContent = show ? "Sembunyikan" : "Tampilkan";
    btn.setAttribute("aria-pressed", String(show));
  });
});

var form = document.querySelector("form[data-auth]");

if (form) {
  var status = form.querySelector(".status");

  var rules = {
    required: function (v) { return v.trim() !== "" || "Kolom ini wajib diisi."; },
    name: function (v) { return v.trim().length >= 3 || "Nama minimal 3 karakter."; },
    email: function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Format email belum benar.";
    },
    password: function (v) { return v.length >= 8 || "Password minimal 8 karakter."; },
    confirm: function (v) {
      return v === form.elements.password.value || "Konfirmasi password tidak sama.";
    }
  };

  function validate(input) {
    var result = rules[input.dataset.rule](input.value);
    var message = result === true ? "" : result;
    document.getElementById(input.id + "-error").textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  }

  var inputs = Array.prototype.slice.call(form.querySelectorAll("input[data-rule]"));

  inputs.forEach(function (input) {
    input.addEventListener("blur", function () { validate(input); });
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") validate(input);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.className = "status";
    status.textContent = "";

    var firstInvalid = null;
    inputs.forEach(function (input) {
      if (!validate(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) { firstInvalid.focus(); return; }

    // TODO: kirim data ke backend di sini, misalnya dengan fetch("/api/...").
    if (form.dataset.auth === "register") {
      status.className = "status ok";
      status.textContent = "Akun berhasil dibuat. Mengarahkan ke halaman masuk...";
      setTimeout(function () { window.location.href = "login.html"; }, 1200);
    } else {
      status.className = "status ok";
      status.textContent = "Berhasil masuk.";
    }
  });
}