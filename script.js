// Config
const PASSWORD = "integrity";

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Cursor glow
(function(){
  const glow = document.getElementById('cursor-glow');
  const move = (e)=>{
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  };
  window.addEventListener('mousemove', move, {passive:true});
})();

// Starfield background (original)
(function(){
  const c = document.getElementById('bg-stars');
  const ctx = c.getContext('2d');
  let w,h,dpr,stars;

  function resize(){
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio||1));
    w = c.width = Math.floor(innerWidth*dpr);
    h = c.height = Math.floor(innerHeight*dpr);
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
    stars = Array.from({length:180}, ()=>({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.4 + .3,
      v: Math.random()*0.15 + 0.05
    }));
  }
  window.addEventListener('resize', resize); resize();

  function step(){
    ctx.clearRect(0,0,w,h);
    // soft haze
    const g = ctx.createRadialGradient(w*0.7,h*0.3,40,w*0.7,h*0.3,Math.max(w,h)*0.7);
    g.addColorStop(0,'rgba(120,210,255,0.10)');
    g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

    // stars
    for(const s of stars){
      s.y += s.v;
      if(s.y > h) { s.y = -5; s.x = Math.random()*w; }
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle = 'rgba(150,210,255,0.9)';
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();
})();

// Password gate for external links
document.querySelectorAll('.ext-link').forEach(link=>{
  link.addEventListener('click', (e)=>{
    const entered = prompt('Enter access password:');
    if(!entered || entered.trim().toLowerCase() !== PASSWORD){
      e.preventDefault();
      alert('Incorrect password.');
    }
  });
});

// Contact form mock
document.getElementById('contact-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const status = document.getElementById('form-status');
  status.textContent = 'Sending…';
  await new Promise(r=>setTimeout(r, 700));
  status.textContent = 'Thank you — we will get back to you shortly.';
  e.target.reset();
});
