document.querySelectorAll("[data-toggle]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var input = document.getElementById(btn.dataset.toggle);

    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "Sembunyikan";
    } else {
      input.type = "password";
      btn.textContent = "Tampilkan";
    }
  });
});

var form = document.querySelector("form[data-auth]");

if (form) {

  form.addEventListener("submit", function (e) {

    e.preventDefault();

    var name = form.elements.name
      ? form.elements.name.value.trim()
      : "";

    var email = form.elements.email.value.trim().toLowerCase();

    var password = form.elements.password.value;

    var confirm = form.elements.confirm
      ? form.elements.confirm.value
      : "";

    if (form.dataset.auth === "register") {

      
      if (name.length < 3) {
        alert("Nama minimal 3 karakter.");
        return;
      }

      
      if (!email.includes("@")) {
        alert("Email tidak valid.");
        return;
      }

      
      if (password.length < 8) {
        alert("Password minimal 8 karakter.");
        return;
      }

      if (password !== confirm) {
        alert("Konfirmasi password tidak sama.");
        return;
      }


    
      var users = JSON.parse(
        localStorage.getItem("users") || "[]"
      );


      // Cek email sudah terdaftar
      var existingUser = users.find(function (user) {
        return user.email === email;
      });

      if (existingUser) {
        alert("Email ini sudah terdaftar.");
        return;
      }


      // Simpan user baru
      users.push({
        name: name,
        email: email,
        password: password
      });

      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );


      // Berhasil daftar
      alert("Akun berhasil dibuat!");


      // PINDAH KE LOGIN
      window.location.href = "login.html";

    }

    else {

      var users = JSON.parse(
        localStorage.getItem("users") || "[]"
      );

      var user = users.find(function (user) {
        return (
          user.email === email &&
          user.password === password
        );
      });


      if (!user) {
        alert("Email atau password salah.");
        return;
      }


      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: user.name,
          email: user.email
        })
      );


      alert("Login berhasil!");


      window.location.href = "pilih_jenjang.html";
    }

  });

}

