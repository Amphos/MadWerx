// MadWerx interactions & visuals

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if(el){
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Light 'royal electricity' particle effect (not childish)
(function energyParticles(){
  const c = document.getElementById('energy-particles');
  const ctx = c.getContext('2d');
  let w, h, dpr;

  function resize(){
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio||1));
    w = c.width = Math.floor(innerWidth * dpr);
    h = c.height = Math.floor(innerHeight * dpr);
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
  }
  window.addEventListener('resize', resize); resize();

  const N = 70;
  const nodes = Array.from({length:N}, ()=> ({
    x: Math.random()*w, y: Math.random()*h,
    vx:(Math.random()-.5)*0.3, vy:(Math.random()-.5)*0.3
  }));

  function step(){
    ctx.clearRect(0,0,w,h);
    // faint royal gradient
    const g = ctx.createLinearGradient(0,0,w,0);
    g.addColorStop(0,'rgba(244,193,93,0.03)'); // gold
    g.addColorStop(1,'rgba(92,194,255,0.06)'); // blue
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

    // draw nodes & connections
    for(let i=0;i<N;i++){
      const a = nodes[i];
      a.x += a.vx; a.y += a.vy;
      if(a.x<0||a.x>w) a.vx*=-1;
      if(a.y<0||a.y>h) a.vy*=-1;

      // node
      ctx.beginPath();
      ctx.arc(a.x,a.y,1.4,0,Math.PI*2);
      ctx.fillStyle='rgba(92,194,255,0.65)';
      ctx.fill();

      for(let j=i+1;j<N;j++){
        const b = nodes[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const dist = Math.hypot(dx,dy);
        if(dist<130*dpr){
          const alpha = 1 - dist/(130*dpr);
          ctx.strokeStyle = `rgba(92,194,255,${0.08*alpha})`;
          ctx.lineWidth = 1*dpr*alpha;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          // slight curve for elegance
          ctx.quadraticCurveTo((a.x+b.x)/2,(a.y+b.y)/2 - 12*dpr, b.x,b.y);
          ctx.stroke();

          // occasional spark
          if(Math.random()<0.0009){
            ctx.strokeStyle = 'rgba(244,193,93,0.35)'; // gold spark
            ctx.lineWidth = 1.2*dpr;
            ctx.beginPath();
            ctx.moveTo(a.x,a.y);
            ctx.lineTo(b.x,b.y);
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(step);
  }
  step();
})();

// Dummy contact form handler (no backend). Replace with your endpoint later.
document.getElementById('contact-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const status = document.getElementById('form-status');
  status.textContent = 'Sending…';
  await new Promise(r=>setTimeout(r, 800));
  status.textContent = 'Thank you — we will get back to you shortly.';
  e.target.reset();
});
