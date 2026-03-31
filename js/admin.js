function resetPin(btn) {
  const row = btn.closest('tr');
  const pinSpan = row.querySelector('span[style*="letter-spacing"]');
  
  if (pinSpan) {
    const newPin = Math.floor(1000 + Math.random() * 9000);
    pinSpan.textContent = newPin;

    const teksAwal = btn.textContent;
    btn.textContent = '✅ Berhasil';
    btn.classList.replace('btn-abu', 'btn-hijau');
    
    setTimeout(() => {
      btn.textContent = teksAwal;
      btn.classList.replace('btn-hijau', 'btn-abu');
    }, 1500);
  }
}

function logoutAdmin() {
  window.location.href = 'index.html';
}