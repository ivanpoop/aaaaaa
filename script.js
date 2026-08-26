const stage = document.getElementById('stage');
const envelopeWrap = document.getElementById('envelopeWrap');
const flowerLayer = document.getElementById('flowerLayer');
const cardWrap = document.getElementById('cardWrap');
const card = document.getElementById('card');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function makeFlowerSVG(color){
  return `
    <svg viewBox="0 0 26 26" width="26" height="26" xmlns="http://www.w3.org/2000/svg">
      <g>
        ${[0,72,144,216,288].map(a => `
          <ellipse cx="13" cy="7" rx="4.2" ry="6" fill="${color}"
            transform="rotate(${a} 13 13)" opacity="0.92"/>
        `).join('')}
        <circle cx="13" cy="13" r="3.1" fill="#E0A458"/>
      </g>
    </svg>`;
}

const flowerPalette = ['#E8794A', '#F7D9B8', '#E0A458', '#8FA876'];

function spawnFlowers(){
  if (prefersReducedMotion) return;
  const count = 28;
  for (let i = 0; i < count; i++){
    const el = document.createElement('div');
    el.className = 'flower';
    const color = flowerPalette[i % flowerPalette.length];
    el.innerHTML = makeFlowerSVG(color);

    const angle = (Math.random() * Math.PI) + Math.PI; // upward-ish spread
    const spread = 70 + Math.random() * 130;
    const tx = Math.cos(angle) * spread;
    const ty = Math.sin(angle) * spread * 0.6 - 50;
    const fx = (Math.random() - 0.5) * 60;
    const fy = 110 + Math.random() * 80;
    const rot = (Math.random() - 0.5) * 320;
    const delay = Math.random() * 0.4;

    el.style.setProperty('--tx', tx + 'px');
    el.style.setProperty('--ty', ty + 'px');
    el.style.setProperty('--fx', fx + 'px');
    el.style.setProperty('--fy', fy + 'px');
    el.style.setProperty('--rot', rot + 'deg');
    el.style.animationDelay = delay + 's';

    flowerLayer.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

function openEnvelope(){
  stage.classList.add('open');
  setTimeout(() => {
    spawnFlowers();
  }, prefersReducedMotion ? 0 : 420);
  setTimeout(() => {
    stage.classList.add('card-out');
  }, prefersReducedMotion ? 200 : 750);
  envelopeWrap.removeEventListener('click', openEnvelope);
}

envelopeWrap.addEventListener('click', openEnvelope, { once: true });

card.addEventListener('click', () => {
  card.classList.toggle('flipped');
});
