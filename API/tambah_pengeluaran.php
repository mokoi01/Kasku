<?php
include '../koneksi.php';

$data = json_decode(file_get_contents("php://input"));

mysqli_query($koneksi,"
INSERT INTO pengeluaran (id_kelas,deskripsi,nominal,tanggal)
VALUES ('$data->id_kelas','$data->deskripsi','$data->nominal',NOW())
");

echo json_encode(["status"=>"ok"]);