// =======================
// NAVIGATION SUB MENU
// =======================
function tampilSub(id, el) {
  // sembunyiin semua isi
  const semua = document.querySelectorAll(".isi");
  semua.forEach(div => div.style.display = "none");

  // tampilkan yang dipilih
  const aktif = document.getElementById(id);
  if (aktif) aktif.style.display = "block";

  // update tombol aktif
  const btns = document.querySelectorAll(".nav-btn");
  btns.forEach(btn => btn.classList.remove("aktif"));

  if (el) el.classList.add("aktif");

  // ganti judul topbar
  const judul = document.getElementById("judul-topbar");
  if (!judul) return;

  if (id === "sub-ringkasan") judul.innerText = "Ringkasan Kas";
  else if (id === "sub-iuran") judul.innerText = "Input Iuran";
  else if (id === "sub-pengeluaran") judul.innerText = "Pengeluaran";
  else if (id === "sub-riwayat") judul.innerText = "Riwayat Transaksi";
  else if (id === "sub-siswa") judul.innerText = "Data Siswa";
}

// =======================
// AUTO LOAD DEFAULT
// =======================
window.onload = () => {
  tampilSub("sub-ringkasan", document.querySelector(".nav-btn"));
};

// =======================
// CHECKLIST IURAN
// =======================
function toggleCek(el) {
  el.classList.toggle("lunas");
}

// =======================
// CEK SEMUA
// =======================
function cekSemua() {
  document.querySelectorAll(".cek-btn").forEach(btn => {
    btn.classList.add("lunas");
  });
}

// =======================
// RESET SEMUA
// =======================
function resetSemua() {
  document.querySelectorAll(".cek-btn").forEach(btn => {
    btn.classList.remove("lunas");
  });
}

// =======================
// TAMBAH PENGELUARAN (DUMMY)
// =======================
function tambahPengeluaran() {
  alert("Pengeluaran disimpan (dummy dulu 😄)");
}

async function loadDashboard() {
  const id_kelas = localStorage.getItem("kelasAktif");

  const res = await fetch(`../API/get_dashboard.php?id_kelas=${id_kelas}`);
  const data = await res.json();

  document.getElementById("saldo").innerText = "Rp " + data.saldo;
  document.getElementById("sudah").innerText = data.sudah + " / " + data.total_siswa;
  document.getElementById("belum").innerText = data.belum + " siswa";
}

async function loadPengeluaran() {
  const id_kelas = localStorage.getItem("kelasAktif");

  const res = await fetch(`../API/get_pengeluaran.php?id_kelas=${id_kelas}`);
  const data = await res.json();

  const tbody = document.getElementById("tabel-pengeluaran");
  tbody.innerHTML = "";

  data.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.tanggal}</td>
        <td>${item.deskripsi}</td>
        <td>Rp ${item.nominal}</td>
      </tr>
    `;
  });
}

async function loadRiwayat() {
  const id_kelas = localStorage.getItem("kelasAktif");

  const res = await fetch(`../API/get_riwayat.php?id_kelas=${id_kelas}`);
  const data = await res.json();

  const tbody = document.getElementById("tabel-riwayat");
  tbody.innerHTML = "";

  data.forEach(item => {
    tbody.innerHTML += `
      <tr>
        <td>${item.tanggal}</td>
        <td>${item.jenis}</td>
        <td>Rp ${item.nominal}</td>
      </tr>
    `;
  });
}

async function loadSiswa() {
  const id_kelas = localStorage.getItem("kelasAktif");

  const res = await fetch(`../API/get_siswa.php?id_kelas=${id_kelas}`);
  const data = await res.json();

  const tbody = document.getElementById("tabel-siswa-data");
  tbody.innerHTML = "";

  data.forEach((s, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i+1}</td>
        <td>${s.nama_siswa}</td>
        <td>Rp ${s.total}</td>
      </tr>
    `;
  });
}

async function tambahPengeluaran() {
  const id_kelas = localStorage.getItem("kelasAktif");
  const deskripsi = document.getElementById("desk").value;
  const nominal = document.getElementById("nominal").value;

  await fetch("../API/tambah_pengeluaran.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id_kelas,
      deskripsi,
      nominal
    })
  });

  loadPengeluaran();
  loadDashboard();
}

window.onload = () => {
  tampilSub("sub-ringkasan", document.querySelector(".nav-btn"));

  loadDashboard();
  loadPengeluaran();
  loadRiwayat();
  loadSiswa();

  // 🔒 ROLE CONTROL
  const role = localStorage.getItem("role");

  if (role === "walas") {
    // disable input pengeluaran
    document.getElementById("desk").disabled = true;
    document.getElementById("nominal").disabled = true;

    // disable tombol simpan
    const btn = document.querySelector("#sub-pengeluaran button");
    if (btn) btn.disabled = true;
  }
};