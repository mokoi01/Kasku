let pinVal = "";

// buka modal PIN
function bukaPin(idKelas, namaKelas) {
  pinVal = "";

  localStorage.setItem("id_kelas", idKelas);

  document.getElementById("pin-judul").textContent = "Masuk ke " + namaKelas;
  document.getElementById("pin-error").textContent = "";

  updateDot();
  document.getElementById("modal-pin").classList.add("tampil");
}

// tutup modal
function tutupPin() {
  document.getElementById("modal-pin").classList.remove("tampil");
  pinVal = "";
  updateDot();
}

// input angka
function pinAngka(d) {
  if (pinVal.length >= 4) return;

  pinVal += d;
  updateDot();

  if (pinVal.length === 4) {
    setTimeout(cekPin, 200);
  }
}

// hapus angka
function pinHapus() {
  pinVal = pinVal.slice(0, -1);
  updateDot();
}

// update tampilan bulatan
function updateDot() {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById("d" + i);
    dot.classList.remove("isi", "salah");

    if (i <= pinVal.length) {
      dot.classList.add("isi");
    }
  }
}

// 🔥 CEK PIN KE PHP
async function cekPin() {
  const id_kelas = localStorage.getItem("id_kelas");
  const errorEl = document.getElementById("pin-error");

  try {
    const res = await fetch("cekpin.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id_kelas: id_kelas,
        pin: pinVal
      })
    });

    const data = await res.json();

    if (data.status === "success") {
      // simpan kelas aktif
      localStorage.setItem("kelasAktif", id_kelas);

      window.location.href = "dashboard.html";
    } else {
      errorEl.textContent = "PIN salah!";

      // efek merah
      for (let i = 1; i <= 4; i++) {
        document.getElementById("d" + i).classList.add("salah");
      }

      // reset
      pinVal = "";
      setTimeout(updateDot, 500);
    }

  } catch (err) {
    errorEl.textContent = "Server error!";
    console.error(err);
  }
}