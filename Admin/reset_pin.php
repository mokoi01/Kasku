<?php
header('Content-Type: application/json');

include '../koneksi.php';

if ($koneksi->connect_error) {
    echo json_encode(["success" => false]);
    exit;
}

// ambil data JSON
$data = json_decode(file_get_contents("php://input"), true);
$kelas = $data['kelas'] ?? '';

if (!$kelas) {
    echo json_encode(["success" => false]);
    exit;
}

// generate PIN baru
$pin_baru = rand(1000, 9999);

// update ke database
$stmt = $koneksi->prepare("UPDATE kelas SET pin_kelas = ?, updated_at = NOW() WHERE nama_kelas = ?");
$stmt->bind_param("is", $pin_baru, $kelas);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "pin" => $pin_baru
    ]);
} else {
    echo json_encode([
  "success" => false,
  "error" => $stmt->error
]);
}