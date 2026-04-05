<?php
include '../koneksi.php';

$id_kelas = $_GET['id_kelas'];

$q = mysqli_query($koneksi,"
SELECT s.nis, s.nama_siswa,
COALESCE(SUM(k.nominal),0) as total
FROM siswa s
LEFT JOIN kas k ON s.nis = k.nis
WHERE s.id_kelas='$id_kelas'
GROUP BY s.nis
");

$data = [];
while($r = mysqli_fetch_assoc($q)){
  $data[] = $r;
}

echo json_encode($data);