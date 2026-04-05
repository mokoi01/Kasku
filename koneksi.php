<?php
$koneksi = mysqli_connect("localhost", "root", "", "kasku");

if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>