<?php
include '../koneksi.php';

$data = json_decode(file_get_contents("php://input"));

// ambil minggu terakhir
$m = mysqli_fetch_assoc(mysqli_query($koneksi,
"SELECT MAX(minggu) as m FROM kas WHERE id_kelas='$data->id_kelas'"
))['m'] ?? 1;

$minggu = $m;

mysqli_query($koneksi,"
INSERT INTO kas (nis,id_kelas,nominal,tanggal,id_status,minggu)
VALUES ('$data->nis','$data->id_kelas','$data->nominal',NOW(),1,'$minggu')
");

echo json_encode(["status"=>"ok"]);