let pinVal = '';

function bukaPin(namakelas) {
  pinVal = '';
  document.getElementById('pin-judul').textContent = 'Masuk ke Kelas ' + namakelas;
  document.getElementById('pin-error').textContent = '';
  localStorage.setItem('kelasAktif', namakelas); // Simpan info kelas
  updateDot();
  document.getElementById('modal-pin').classList.add('tampil');
}

function tutupPin() {
  document.getElementById('modal-pin').classList.remove('tampil');
  pinVal = '';
  updateDot();
}

function pinAngka(d) {
  if (pinVal.length >= 4) return;
  pinVal += d;
  updateDot();
  if (pinVal.length === 4) setTimeout(cekPin, 150);
}

function pinHapus() {
  pinVal = pinVal.slice(0, -1);
  updateDot();
}

function updateDot() {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById('d' + i);
    dot.classList.remove('isi', 'salah');
    if (i <= pinVal.length) dot.classList.add('isi');
  }
}

function cekPin() {
  // Pindah ke halaman dashboard jika PIN diisi (simulasi sukses)
  window.location.href = 'dashboard.html';
}