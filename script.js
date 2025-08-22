// MadWerx Portfolio interactions
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Password gating for "Read more" -> forwards to nanoresonance.org if correct
const PASSWORD = 'integrity';
let pendingCompany = null;

function openPwdModal(company){
  pendingCompany = company;
  const modal = document.getElementById('pwd-modal');
  const input = document.getElementById('pwd-input');
  const error = document.getElementById('pwd-error');
  if (!modal) return;
  error.textContent = '';
  modal.showModal();
  setTimeout(()=>input.focus(), 50);
}

function handleUnlock(action){
  const modal = document.getElementById('pwd-modal');
  const input = document.getElementById('pwd-input');
  const error = document.getElementById('pwd-error');
  if (action !== 'confirm') { modal.close(); return; }
  const val = (input.value || '').trim();
  if (val.toLowerCase() === PASSWORD){
    window.open('https://www.nanoresonance.org', '_blank', 'noopener');
    modal.close();
    input.value='';
  } else {
    error.textContent = 'Incorrect password.';
    // small shake
    modal.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 250 });
    input.select();
  }
}

document.querySelectorAll('.readmore').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const company = e.currentTarget.getAttribute('data-company');
    openPwdModal(company);
  });
});

const pwdForm = document.getElementById('pwd-form');
if (pwdForm){
  pwdForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUnlock('confirm');
  });
}
document.getElementById('pwd-modal')?.addEventListener('close', () => {
  document.getElementById('pwd-input').value = '';
  document.getElementById('pwd-error').textContent = '';
});

// Hover support on touch: tap to toggle reveal
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('touchstart', () => {
    card.classList.toggle('touch-reveal');
  });
});

// Animated cosmic resonance background (lightweight particle field)
(function cosmicBackground(){
  const canvas = document.getElementById('cosmic-bg');
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  const particles = [];
  const max = 90; // particle count
  function resize(){
    dpr = window.devicePixelRatio || 1;
    w = canvas.width = Math.round(innerWidth * dpr);
    h = canvas.height = Math.round(innerHeight * dpr);
  }
  window.addEventListener('resize', resize, { passive:true });
  resize();
  function spawn(){
    return {
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random()-.5)*0.05*dpr,
      vy: (Math.random()-.5)*0.05*dpr,
      r: (Math.random()*1.2 + .6) * dpr,
      a: Math.random()*Math.PI*2
    };
  }
  for (let i=0;i<max;i++) particles.push(spawn());
  function step(){
    ctx.clearRect(0,0,w,h);
    // subtle vignette
    const grad = ctx.createRadialGradient(w*0.5,h*0.5,0,w*0.5,h*0.5,Math.max(w,h)*0.6);
    grad.addColorStop(0,'rgba(12,20,36,0.15)');
    grad.addColorStop(1,'rgba(5,7,11,0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,w,h);

    // draw particles
    for (let i=0;i<particles.length;i++){
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.a += 0.003;
      // resonance shimmer
      const pulse = 0.7 + Math.sin(p.a)*0.3;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r*pulse, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(191,217,255,0.8)';
      ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(127,180,255,0.6)';
      ctx.fill();

      // bounds wrap
      if (p.x<0) p.x = w; if (p.x>w) p.x=0;
      if (p.y<0) p.y = h; if (p.y>h) p.y=0;
    }
    // draw subtle connective lines (resonance) for nearby particles
    for (let i=0;i<particles.length;i++){
      for (let j=i+1;j<particles.length;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy=a.y-b.y;
        const dist = Math.hypot(dx,dy);
        if (dist < 90*dpr){
          const alpha = (1 - dist/(90*dpr)) * 0.12;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(122,166,255,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }
  step();
})();
