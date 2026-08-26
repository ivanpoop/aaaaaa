ChatGPT said:
Yep — here are the two complete files with the changes included.

script.js
const stage = document.getElementById('stage');
const envelopeWrap = document.getElementById('envelopeWrap');
const flowerLayer = document.getElementById('flowerLayer');
const cardWrap = document.getElementById('cardWrap');
const card = document.getElementById('card');

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ---------- FLOWERS ---------- */

function makeFlowerSVG(color){
  return `
    <svg
      viewBox="0 0 26 26"
      width="26"
      height="26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        ${[0,72,144,216,288].map(a => `
          <ellipse
            cx="13"
            cy="7"
            rx="4.2"
            ry="6"
            fill="${color}"
            transform="rotate(${a} 13 13)"
            opacity="0.92"
          />
        `).join('')}

        <circle
          cx="13"
          cy="13"
          r="3.1"
          fill="#E0A458"
        />
      </g>
    </svg>
  `;
}


const flowerPalette = [
  '#E8794A',
  '#F7D9B8',
  '#E0A458',
  '#8FA876',
  '#F0925A',
  '#FCE2BC'
];


function random(min, max){
  return Math.random() * (max - min) + min;
}


function spawnFlowers(){

  if (prefersReducedMotion) return;

  /* 90 flowers for maximum chaos 🌸 */

  const count = 90;

  for (let i = 0; i < count; i++){

    const el = document.createElement('div');

    el.className = 'flower';

    const color =
      flowerPalette[
        Math.floor(Math.random() * flowerPalette.length)
      ];

    el.innerHTML = makeFlowerSVG(color);


    /* Random flower size */

    const size = random(0.55, 1.45);

    el.style.setProperty(
      '--flower-scale',
      size
    );


    /* Massive radial explosion */

    const angle =
      random(Math.PI, Math.PI * 2);

    const spread =
      random(100, 330);

    const tx =
      Math.cos(angle) * spread;

    const ty =
      Math.sin(angle) * spread * random(0.7, 1.15)
      - random(40, 120);


    /* Second movement phase */

    const fx =
      random(-260, 260);

    const fy =
      random(180, 520);


    /* Huge random spins */

    const rot =
      random(-720, 720);


    /* Different speeds */

    const duration =
      random(2.2, 4.2);


    /* Stagger the explosion */

    const delay =
      random(0, 0.85);


    el.style.setProperty('--tx', `${tx}px`);
    el.style.setProperty('--ty', `${ty}px`);

    el.style.setProperty('--fx', `${fx}px`);
    el.style.setProperty('--fy', `${fy}px`);

    el.style.setProperty('--rot', `${rot}deg`);

    el.style.setProperty(
      '--duration',
      `${duration}s`
    );

    el.style.animationDelay =
      `${delay}s`;


    /* Slightly randomize the starting position */

    const originX =
      random(-12, 12);

    const originY =
      random(-8, 8);

    el.style.left =
      `calc(50% + ${originX}px)`;

    el.style.top =
      `calc(44% + ${originY}px)`;


    flowerLayer.appendChild(el);


    el.addEventListener(
      'animationend',
      () => el.remove(),
      { once:true }
    );
  }
}


/* ---------- ENVELOPE ---------- */

function openEnvelope(){

  stage.classList.add('open');

  /* Envelope opens, then flowers explode */

  setTimeout(() => {
    spawnFlowers();
  }, prefersReducedMotion ? 0 : 380);


  /* Card appears after the explosion begins */

  setTimeout(() => {
    stage.classList.add('card-out');
  }, prefersReducedMotion ? 200 : 820);


  envelopeWrap.removeEventListener(
    'click',
    openEnvelope
  );
}


envelopeWrap.addEventListener(
  'click',
  openEnvelope,
  { once:true }
);


/* ---------- CARD FLIP ---------- */

card.addEventListener('click', () => {
  card.classList.toggle('flipped');
});
