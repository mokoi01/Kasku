<?php
include '../koneksi.php';

$id_kelas = $_GET['id_kelas'];

$q = mysqli_query($koneksi,"
SELECT * FROM pengeluaran WHERE id_kelas='$id_kelas' ORDER BY tanggal DESC
");

$data = [];
while($r = mysqli_fetch_assoc($q)){
  $data[] = $r;
}

echo json_encode($data);