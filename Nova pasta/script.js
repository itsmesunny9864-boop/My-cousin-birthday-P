(function(){
  const canvas = document.getElementById('sparkles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w=0,h=0, particles=[];
  const colors = ['rgba(212,175,55,0.95)','rgba(212,75,55,0.95)','rgba(212,145,55,0.95)'];
  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
  function spawn(){
    const x = Math.random()*w;
    const y = h + 20 + Math.random()*100;
    const size = 2 + Math.random()*4;
    const speed = 0.2 + Math.random()*1.2;
    const life = 80 + Math.random()*120;
    const color = colors[Math.floor(Math.random()*colors.length)];
    particles.push({x,y,size,speed,life,age:0,color,drift:(Math.random()-0.5)*0.6});
  }
  function update(){
    if(Math.random() < 0.6) spawn();
    ctx.clearRect(0,0,w,h);
    for(let i = particles.length-1;i>=0;i--){
      const p = particles[i];
      p.y -= p.speed;
      p.x += p.drift;
      p.age++;
      const alpha = 1 - p.age/p.life;
      ctx.beginPath();
      ctx.fillStyle = p.color.replace(/,0.95\)/, ','+alpha+')');
      ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fill();
      if(p.age > p.life) particles.splice(i,1);
    }
    requestAnimationFrame(update);
  }
  update();
})();
