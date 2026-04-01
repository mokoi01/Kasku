// Fungsi untuk memunculkan tab/halaman menu
function tampilAdmin(idTarget, btn) {
  // Sembunyikan semua div yang punya class 'isi'
  const semuaIsi = document.querySelectorAll('.isi');
  semuaIsi.forEach(el => {
    el.style.display = 'none';
  });

  // Tampilkan div target yang diklik
  const target = document.getElementById(idTarget);
  if (target) {
    target.style.display = 'block';
  }

  // Atur class 'aktif' pada tombol menu
  if (btn) {
    const semuaBtn = document.querySelectorAll('.nav-btn');
    semuaBtn.forEach(el => el.classList.remove('aktif'));
    btn.classList.add('aktif');
  }
}

// Menjalankan tab pertama kali saat halaman dimuat agar data tidak "hilang"
document.addEventListener("DOMContentLoaded", () => {
  const btnAktif = document.querySelector('.nav-btn.aktif');
  if (btnAktif) {
    tampilAdmin('adm-pin', btnAktif);
  } else {
    // Jika tidak ada tombol yang aktif, panggil manual
    tampilAdmin('adm-pin', null);
  }
});

function resetPin(btn) {
  const row = btn.closest('tr');
  const pinSpan = row.querySelector('span[style*="letter-spacing"]');
  
  if (pinSpan) {
    const newPin = Math.floor(1000 + Math.random() * 9000);
    pinSpan.textContent = newPin;

    const teksAwal = btn.textContent;
    btn.textContent = '✅ Berhasil';
    btn.classList.replace('btn-abu', 'btn-hijau');
    
    setTimeout(() => {
      btn.textContent = teksAwal;
      btn.classList.replace('btn-hijau', 'btn-abu');
    }, 1500);
  }
}

function logoutAdmin() {
  window.location.href = 'index.html';
}