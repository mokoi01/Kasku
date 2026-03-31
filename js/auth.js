let currentRole = 'bendahara'; 
let currentUserName = 'Pengguna Kelas';

function toggleAuth(type) {
  if (type === 'register') {
    document.getElementById('view-login').style.display = 'none';
    document.getElementById('view-register').style.display = 'block';
  } else {
    document.getElementById('view-register').style.display = 'none';
    document.getElementById('view-login').style.display = 'block';
  }
}

function gantiRole(role) {
  currentRole = role;
  const judul = document.getElementById('judul-login');
  const sub = document.getElementById('sub-login');
  const inputUser = document.getElementById('inp-user');
  const inputPass = document.getElementById('inp-pass');
  const opsiLogin = document.getElementById('opsi-login');
  document.getElementById('login-error').textContent = '';

  let htmlOpsi = '';

  if (role === 'bendahara') {
    judul.textContent = 'Masuk sebagai Bendahara';
    sub.textContent = 'Gunakan akun bendahara kelas';
    inputUser.value = 'bendahara';
    inputPass.value = 'bendahara123';
    htmlOpsi = `
      <button class="link-btn" onclick="gantiRole('admin')">🛡️ Login sebagai Admin</button>
      <button class="link-btn" onclick="gantiRole('wali')">👨‍🏫 Login sebagai Wali Kelas</button>
    `;
  } else if (role === 'admin') {
    judul.textContent = 'Masuk sebagai Admin';
    sub.textContent = 'Gunakan akun admin sekolah';
    inputUser.value = 'admin';
    inputPass.value = 'admin123';
    htmlOpsi = `
      <button class="link-btn" onclick="gantiRole('bendahara')">💰 Login sebagai Bendahara</button>
      <button class="link-btn" onclick="gantiRole('wali')">👨‍🏫 Login sebagai Wali Kelas</button>
    `;
  } else if (role === 'wali') {
    judul.textContent = 'Masuk sebagai Wali Kelas';
    sub.textContent = 'Gunakan akun wali kelas';
    inputUser.value = 'wali';
    inputPass.value = 'wali123';
    htmlOpsi = `
      <button class="link-btn" onclick="gantiRole('bendahara')">💰 Login sebagai Bendahara</button>
      <button class="link-btn" onclick="gantiRole('admin')">🛡️ Login sebagai Admin</button>
    `;
  }
  
  opsiLogin.innerHTML = htmlOpsi;
}

function prosesLogin() {
  const user = document.getElementById('inp-user').value.trim();
  const pass = document.getElementById('inp-pass').value.trim();
  
  if (currentRole === 'bendahara' && user === 'bendahara' && pass === 'bendahara123') {
      window.location.href = 'pilih_kelas.html'; 
  } else if (currentRole === 'admin' && user === 'admin' && pass === 'admin123') {
      window.location.href = 'admin.html';
  } else if (currentRole === 'wali' && user === 'wali' && pass === 'wali123') {
      window.location.href = 'pilih_kelas.html'; 
  } else {
      document.getElementById('login-error').textContent = 'Username atau password salah!';
  }
}

function prosesRegister() {
  const nama = document.getElementById('reg-nama').value.trim();
  const user = document.getElementById('reg-user').value.trim();
  const pass = document.getElementById('reg-pass').value.trim();
  
  if (!nama || !user || !pass) {
    document.getElementById('register-error').textContent = 'Semua kolom wajib diisi ya!';
    return;
  }
  
  localStorage.setItem('namaUser', nama); // Simpan nama sementara pakai localStorage
  window.location.href = 'pilih_kelas.html';
}