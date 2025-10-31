import './styles.css';
import { initCanvas, toggleCanvas } from './scratch-canvas.js';

/** Utility: map a value */
const lerp = (a,b,t)=> a+(b-a)*t;

/** FX toggles */
const fxScanline = document.getElementById('fxScanline');
const fxGrain = document.getElementById('fxGrain');
const fxGlitch = document.getElementById('fxGlitch');
const fxCanvas = document.getElementById('fxCanvas');
const fxSync = document.getElementById('fxSync');

/** Overlays */
const scanlines = document.querySelector('.scanlines');
const filmGrain = document.querySelector('.film-grain');

/** Index */
const indexToggle = document.getElementById('indexToggle');
const indexList = document.getElementById('indexList');
indexToggle.addEventListener('click',()=>{
  const open = indexList.hasAttribute('hidden') ? false : true;
  if(open){ indexList.setAttribute('hidden',''); indexToggle.setAttribute('aria-expanded','false'); }
  else { indexList.removeAttribute('hidden'); indexToggle.setAttribute('aria-expanded','true'); }
});

/** Split columns & scroll sync */
const left = document.getElementById('colLeft');
const right = document.getElementById('colRight');

let syncing = false;
let syncEnabled = true;

function syncScroll(master, slave){
  if(!syncEnabled) return;
  if(syncing) return;
  syncing = true;
  const ratio = master.scrollTop / (master.scrollHeight - master.clientHeight || 1);
  const y = ratio * (slave.scrollHeight - slave.clientHeight);
  slave.scrollTo({top:y, behavior:'auto'});
  syncing = false;
}

left.addEventListener('scroll', ()=> syncScroll(left, right));
right.addEventListener('scroll', ()=> syncScroll(right, left));

fxSync.addEventListener('change', ()=>{
  syncEnabled = fxSync.checked;
});

/** Parallax via JS (fallback for older browsers) */
const blocksL = [...left.querySelectorAll('.block')];
const blocksR = [...right.querySelectorAll('.block')];

function parallax(el, scroller){
  const speed = parseFloat(el.dataset.speed || '0');
  const rect = el.getBoundingClientRect();
  const h = scroller.clientHeight;
  const center = rect.top + rect.height*0.5;
  const t = (center - h*0.5) / h; // -1..1
  const dy = t * speed * 80; // px
  el.style.transform = `translateY(${dy}px)`;
  el.style.willChange = 'transform';
}

function onScroll(){
  blocksL.forEach(el => parallax(el, left));
  blocksR.forEach(el => parallax(el, right));
  // move overlays slightly for scratch/reveal vibe
  const r = left.scrollTop / (left.scrollHeight - left.clientHeight || 1);
  scanlines.style.transform = `translateY(${lerp(-4,4,r)}px)`;
  filmGrain.style.transform = `translate(${lerp(-6,6,r)}px, ${lerp(2,-2,r)}px)`;
}
left.addEventListener('scroll', onScroll, {passive:true});
right.addEventListener('scroll', onScroll, {passive:true});
onScroll();

/** Hover glitch toggle */
function setGlitch(on){
  document.documentElement.style.setProperty('--glitch-on', on ? '1' : '0');
  document.querySelectorAll('.glitchy').forEach(el => {
    if(on){
      el.setAttribute('data-shadow', el.textContent.trim());
    }else{
      el.removeAttribute('data-shadow');
    }
  });
}
fxGlitch.addEventListener('change', ()=> setGlitch(fxGlitch.checked));
setGlitch(true);

/** Overlays toggles */
fxScanline.addEventListener('change', ()=> scanlines.style.display = fxScanline.checked ? 'block' : 'none');
fxGrain.addEventListener('change', ()=> filmGrain.style.display = fxGrain.checked ? 'block' : 'none');

/** Canvas generative layer */
initCanvas();
fxCanvas.addEventListener('change', ()=> toggleCanvas(fxCanvas.checked));
// Touch to glitch (mobile)
addEventListener('touchstart', (e) => {
  const el = e.target.closest('.glitchy');
  if(!el) return;
  el.setAttribute('data-shadow', el.textContent.trim());
  el.classList.add('glitch-on');
  setTimeout(() => el.classList.remove('glitch-on'), 600);
}, {passive:true});
