// ==== NAVIGASI SUB-HALAMAN KELAS ====
const labelSub = {
  'sub-ringkasan': 'Ringkasan Kas',
  'sub-iuran': 'Input Iuran Mingguan',
  'sub-pengeluaran': 'Catat Pengeluaran',
  'sub-riwayat': 'Riwayat Transaksi',
  'sub-siswa': 'Data Siswa'
};

function tampilSub(id, elNav) {
  ['sub-ringkasan','sub-iuran','sub-pengeluaran','sub-riwayat','sub-siswa'].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.style.display = 'none';
  });
  const el = document.getElementById(id);
  if (el) el.style.display = 'block';
  
  if (elNav) {
    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('aktif'));
    elNav.classList.add('aktif');
  }
  
  const judul = document.getElementById('judul-topbar');
  if (judul && labelSub[id]) judul.textContent = labelSub[id];
}

// ==== SUMBER DATA (Bisa dipakai di semua menu) ====
const daftarSiswa = [
  { no: '01', nama: 'Ahmad Rizky Fadhila' },
  { no: '02', nama: 'Bella Aulia Sari' },
  { no: '03', nama: 'Candra Wijaya' },
  { no: '04', nama: 'Desi Kartika' },
  { no: '05', nama: 'Eko Prasetyo' },
  { no: '06', nama: 'Fira Nanda Sari' },
  { no: '07', nama: 'Gunawan Pratama' },
  { no: '08', nama: 'Hani Fitriani' },
  { no: '09', nama: 'Irfan Maulana' },
  { no: '10', nama: 'Joko Susilo' },
  { no: '11', nama: 'Kartika Dewi' },
  { no: '12', nama: 'Lutfi Hakim' },
  { no: '13', nama: 'Maya Sari' },
];

const hari = ['Sen 13', 'Sel 14', 'Rab 15', 'Kam 16', 'Jum 17'];
let statusCek = {};

daftarSiswa.forEach(s => {
  statusCek[s.no] = [
    s.no <= '07' ? 1 : 0,
    s.no <= '05' ? 1 : 0,
    s.no <= '08' && s.no !== '03' ? 1 : 0,
    s.no <= '06' && s.no !== '03' ? 1 : 0,
    s.no <= '04' ? 1 : 0,
  ];
});

// ==== FUNGSI RENDER TABEL INPUT IURAN ====
function buatChecklist() {
  const tbody = document.getElementById('isi-checklist');
  if (!tbody) return; 
  
  tbody.innerHTML = '';
  daftarSiswa.forEach(s => {
    const st = statusCek[s.no];
    const jmlLunas = st.filter(x => x === 1).length;
    const baris = document.createElement('tr');
    
    if (jmlLunas === hari.length) baris.style.background = '#f0fdf4'; 
    
    baris.innerHTML = `
      <td class="no-absen">${s.no}</td>
      <td class="nama-siswa">${s.nama}</td>
      ${hari.map((h, i) => `
        <td class="hari">
          <button class="cek-btn ${st[i] === 1 ? 'lunas' : ''}"
            onclick="toggleCek('${s.no}', ${i})">
            ${st[i] === 1 ? '✓' : ''}
          </button>
        </td>
      `).join('')}
      <td style="text-align:center">
        <span class="badge ${jmlLunas === hari.length ? 'badge-hijau' : jmlLunas >= 3 ? 'badge-kuning' : 'badge-merah'}">
          ${jmlLunas}/${hari.length}
        </span>
      </td>
    `;
    tbody.appendChild(baris);
  });
  updateProgress();
}

// ==== FUNGSI RENDER TABEL DATA SISWA ====
function buatTabelSiswa() {
  const tbody = document.getElementById('isi-tabel-siswa');
  if (!tbody) return;

  tbody.innerHTML = ''; 
  
  daftarSiswa.forEach(s => {
    const st = statusCek[s.no] || [0,0,0,0,0];
    const jmlLunas = st.filter(x => x === 1).length;
    
    const totalBayar = jmlLunas * 30000; 

    let statusHtml = '';
    if (jmlLunas === 5) {
      statusHtml = '<span class="badge badge-hijau">Sangat Rajin</span>';
    } else if (jmlLunas >= 3) {
      statusHtml = '<span class="badge badge-hijau">Rajin Bayar</span>';
    } else if (jmlLunas >= 1) {
      statusHtml = '<span class="badge badge-kuning">Kadang Telat</span>';
    } else {
      statusHtml = '<span class="badge badge-merah">Sering Nunggak</span>';
    }

    const baris = document.createElement('tr');
    baris.innerHTML = `
      <td class="no-absen">${s.no}</td>
      <td class="nama-siswa">${s.nama}</td>
      <td style="font-weight:700;color:var(--hijau)">Rp ${totalBayar.toLocaleString('id-ID')}</td>
      <td style="color:var(--abu-tua)">${jmlLunas} / 5</td>
      <td>${statusHtml}</td>
      <td><button class="btn btn-abu btn-sm">Edit</button></td>
    `;
    tbody.appendChild(baris);
  });

  const info = document.getElementById('info-jumlah-siswa');
  if(info) info.textContent = `Menampilkan total ${daftarSiswa.length} siswa`;
}

// ==== AKSI TOMBOL ====
function toggleCek(no, i) {
  statusCek[no][i] = statusCek[no][i] === 1 ? 0 : 1;
  buatChecklist();
  buatTabelSiswa(); // Biar tabel data siswa ikut berubah otomatis
}

function updateProgress() {
  const total = daftarSiswa.length;
  const lunas = daftarSiswa.filter(s => statusCek[s.no].some(x => x === 1)).length;
  const pct = Math.round(lunas / total * 100);
  
  const prog = document.getElementById('prog-minggu');
  const angka = document.getElementById('angka-minggu');
  
  if (prog) prog.style.width = pct + '%';
  if (angka) angka.textContent = lunas + ' / ' + total + ' lunas';
}

function cekSemua() {
  daftarSiswa.forEach(s => { statusCek[s.no] = [1, 1, 1, 1, 1]; });
  buatChecklist();
  buatTabelSiswa();
}

function resetSemua() {
  daftarSiswa.forEach(s => { statusCek[s.no] = [0, 0, 0, 0, 0]; });
  buatChecklist();
  buatTabelSiswa();
}

// ==== JALANKAN SAAT HALAMAN PERTAMA DIBUKA ====
document.addEventListener("DOMContentLoaded", () => {
    // Set teks header dan sidebar
    const kelas = localStorage.getItem('kelasAktif') || 'XII-A';
    const namaUser = localStorage.getItem('namaUser') || 'Pengguna Kelas';
    
    const labelSidebar = document.getElementById('label-kelas-sidebar');
    const roleSidebar = document.getElementById('role-sidebar');
    const namaUserSidebar = document.getElementById('nama-user-sidebar');
    
    if(labelSidebar) labelSidebar.textContent = 'Kelas ' + kelas;
    if(roleSidebar) roleSidebar.textContent = kelas;
    if(namaUserSidebar) namaUserSidebar.textContent = namaUser;
    
    // Render kedua tabel
    buatChecklist();
    buatTabelSiswa(); 
});