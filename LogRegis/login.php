<?php
include "../koneksi.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

$query = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = mysqli_query($koneksi, $query);

if (mysqli_num_rows($result) > 0) {
    $user = mysqli_fetch_assoc($result);

    echo json_encode([
        "status" => "success",
        "role" => $user['role']
    ]);
} else {
    echo json_encode(["status" => "fail"]);
}
?>