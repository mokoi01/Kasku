async function prosesRegister() {
  const nama = document.getElementById("reg-nama").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-pass").value;

  const res = await fetch("register.php", {
    method: "POST",
    headers: {
    "Content-Type": "application/json"
  },
    body: JSON.stringify({ nama, email, password })
  });

  const data = await res.json();
  alert("Register berhasil sebagai " + data.role);
}

async function prosesLogin() {
  const email = document.getElementById("inp-user").value;
  const password = document.getElementById("inp-pass").value;

  const res = await fetch("login.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ email, password })
});

  const data = await res.json();

  if (data.status === "success") {
    localStorage.setItem("role", data.role);

    if (data.role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "dashboard.html";
    }
  } else {
    alert("Login gagal");
  }
}