<?php
include "../koneksi.php";

$data = json_decode(file_get_contents("php://input"), true);

$nama = $data['nama'];
$email = $data['email'];
$password = $data['password'];

$role = "bendahara";

if (strpos($password, "WL") !== false) {
    $role = "walas";
}

$query = "INSERT INTO users (nama, email, password, role) 
          VALUES ('$nama', '$email', '$password', '$role')";

if (mysqli_query($koneksi, $query)) {
    echo json_encode(["status" => "success", "role" => $role]);
} else {
    echo json_encode(["status" => "error"]);
}
?>