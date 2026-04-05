<?php
include '../koneksi.php';

$id_kelas = $_GET['id_kelas'];

// saldo
$kas = mysqli_fetch_assoc(mysqli_query($koneksi,
"SELECT SUM(nominal) as total FROM kas WHERE id_kelas='$id_kelas'"
));

// pengeluaran
$keluar = mysqli_fetch_assoc(mysqli_query($koneksi,
"SELECT SUM(nominal) as total FROM pengeluaran WHERE id_kelas='$id_kelas'"
));

// siswa
$total_siswa = mysqli_num_rows(mysqli_query($koneksi,
"SELECT * FROM siswa WHERE id_kelas='$id_kelas'"
));

// sudah bayar minggu ini (pakai minggu terbaru)
$minggu = mysqli_fetch_assoc(mysqli_query($koneksi,
"SELECT MAX(minggu) as m FROM kas WHERE id_kelas='$id_kelas'"
))['m'] ?? 1;

$sudah = mysqli_num_rows(mysqli_query($koneksi,
"SELECT DISTINCT nis FROM kas WHERE id_kelas='$id_kelas' AND minggu='$minggu'"
));

echo json_encode([
  "saldo" => ($kas['total'] ?? 0) - ($keluar['total'] ?? 0),
  "total_siswa" => $total_siswa,
  "sudah" => $sudah,
  "belum" => $total_siswa - $sudah
]);