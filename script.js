// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Cursor glow effect
document.addEventListener('mousemove', (e) => {
  const glow = document.getElementById('pointer-glow');
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// Password protection for external links
document.querySelectorAll('.secure-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const password = prompt('Enter password to access this page:');
    if (password === 'integrity') {
      window.open(link.href, '_blank');
    } else {
      alert('Incorrect password');
    }
  });
});