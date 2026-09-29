(function () {
    'use strict';

    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = '../authentication_user/login.html';
        return;
    } else if (user.role !== 'S2') {
        alert('Anda tidak memiliki akses ke halaman ini!');
        window.location.href = '../authentication_user/login.html';
        return;
    }

    function getUserName() {
        try {
            var raw = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
            if (raw) {
                var user = JSON.parse(raw);
                if (user && user.name) return user.name;
            }
        } catch (e) { }
        return 'MAHASISWA';
    }
    document.getElementById('user-name').textContent = getUserName().toUpperCase();

    var alertBox = document.getElementById('welcome');
    alertBox.querySelector('.alert__close').addEventListener('click', function () {
        alertBox.hidden = true;
    });

    document.querySelectorAll('.group__btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var open = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!open));
            btn.nextElementSibling.hidden = open;
        });
    });

    var layout = document.getElementById('layout');
    document.getElementById('collapse-btn').addEventListener('click', function () {
        layout.classList.toggle('is-collapsed');
    });

    document.getElementById('logout').addEventListener('click', function () {
        try {
            localStorage.removeItem('currentUser');
            sessionStorage.removeItem('currentUser');
        } catch (e) { }
    });
})();