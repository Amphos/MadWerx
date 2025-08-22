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

// Cursor glow that follows the pointer
(function cursorGlow(){
  const glow = document.getElementById('pointer-glow');
  const move = (e)=>{
    const x = e.clientX, y = e.clientY;
    glow.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
  };
  window.addEventListener('mousemove', move, {passive:true});
})();

// Cosmic electric background (cold blue only)
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

  const N = 110;
  const nodes = Array.from({length:N}, ()=> ({
    x: Math.random()*w, y: Math.random()*h,
    vx:(Math.random()-.5)*0.45, vy:(Math.random()-.5)*0.45,
    p: Math.random()*Math.PI*2
  }));

  function step(){
    ctx.clearRect(0,0,w,h);

    // nebula wash
    const g = ctx.createRadialGradient(w*0.7, h*0.3, 80, w*0.7, h*0.3, Math.max(w,h)*0.8);
    g.addColorStop(0,'rgba(100,190,255,0.10)');
    g.addColorStop(1,'rgba(7,11,20,0)');
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);

    // draw connections & drifting particles
    for(let i=0;i<N;i++){
      const a = nodes[i];
      a.x += a.vx; a.y += a.vy; a.p += 0.002;
      a.vx += Math.cos(a.p)*0.003; a.vy += Math.sin(a.p)*0.003;
      if(a.x<0||a.x>w) a.vx*=-1;
      if(a.y<0||a.y>h) a.vy*=-1;

      // node glow
      ctx.beginPath();
      ctx.arc(a.x,a.y,1.5,0,Math.PI*2);
      ctx.fillStyle='rgba(120,210,255,0.75)';
      ctx.fill();

      for(let j=i+1;j<N;j++){
        const b = nodes[j];
        const dx=a.x-b.x, dy=a.y-b.y;
        const dist = Math.hypot(dx,dy);
        if(dist<150*dpr){
          const alpha = 1 - dist/(150*dpr);
          ctx.strokeStyle = `rgba(110,200,255,${0.10*alpha})`;
          ctx.lineWidth = 1.2*dpr*alpha;
          ctx.beginPath();
          // graceful curve
          ctx.moveTo(a.x,a.y);
          const mx=(a.x+b.x)/2, my=(a.y+b.y)/2 - 16*dpr;
          ctx.quadraticCurveTo(mx,my,b.x,b.y);
          ctx.stroke();
        }
      }
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

// Dummy contact form handler
document.getElementById('contact-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const status = document.getElementById('form-status');
  status.textContent = 'Sending…';
  await new Promise(r=>setTimeout(r, 800));
  status.textContent = 'Thank you — we will get back to you shortly.';
  e.target.reset();
});
