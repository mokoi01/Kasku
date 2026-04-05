<?php
header("Content-Type: application/json");
include "koneksi.php";

// ambil data dari JS
$data = json_decode(file_get_contents("php://input"), true);

$id_kelas = $data['id_kelas'] ?? null;
$pin = $data['pin'] ?? null;

// validasi basic
if (!$id_kelas || !$pin) {
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
    exit;
}

// query cek PIN
$query = "SELECT * FROM kelas WHERE id_kelas = ? AND pin_kelas = ?";
$stmt = mysqli_prepare($koneksi, $query);

mysqli_stmt_bind_param($stmt, "ii", $id_kelas, $pin);
mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {
    echo json_encode([
        "status" => "success"
    ]);
} else {
    echo json_encode([
        "status" => "fail"
    ]);
}
?>