let canvas, ctx, raf;
let t=0, on=true;

export function initCanvas(){
  canvas = document.getElementById('bg-canvas');
  if(!canvas) return;
  ctx = canvas.getContext('2d', {alpha:true});
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  function resize(){
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  resize();
  addEventListener('resize', resize);
  loop();
}

export function toggleCanvas(v){
  on = v;
  if(on && !raf) loop();
}

function rnd(n=1){ return (Math.random()*2-1)*n; }

function loop(){
  if(!on){ raf = null; return; }
  raf = requestAnimationFrame(loop);
  t += 0.006;
  const w = canvas.width / (window.devicePixelRatio||1);
  const h = canvas.height / (window.devicePixelRatio||1);
  // Fade to create trails
  ctx.fillStyle = 'rgba(15,15,16,0.08)';
  ctx.fillRect(0,0,w,h);

  // Scratchy drifting lines
  const lines = 18;
  for(let i=0;i<lines;i++){
    const x = (i/lines)*w + Math.sin(t*2 + i)*8 + rnd(2);
    const y0 = (Math.sin(t + i*0.3)*0.5+0.5)*h;
    const y1 = y0 + Math.cos(t*1.6 + i)*12 + rnd(6);
    ctx.beginPath();
    ctx.moveTo(x, y0);
    ctx.lineTo(x + rnd(12), y1);
    ctx.strokeStyle = `rgba(230,224,214,${0.06 + (i%3==0?0.05:0)})`;
    ctx.lineWidth = 0.8 + (i%4==0?0.7:0);
    ctx.globalCompositeOperation = 'lighter';
    ctx.stroke();
  }

  // Occasional specks
  for(let k=0;k<40;k++){
    ctx.fillStyle = 'rgba(181,90,90,0.05)';
    ctx.fillRect(Math.random()*w, Math.random()*h, 1, 1);
  }
}
