const stage = document.getElementById('stage');
const envelopeWrap = document.getElementById('envelopeWrap');
const flowerLayer = document.getElementById('flowerLayer');
const card = document.getElementById('card');

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ---------- FLOWERS ---------- */

function makeFlowerSVG(color) {
  return `
    <svg
      viewBox="0 0 26 26"
      width="26"
      height="26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        ${[0,72,144,216,288].map(angle => `
          <ellipse
            cx="13"
            cy="7"
            rx="4.2"
            ry="6"
            fill="${color}"
            transform="rotate(${angle} 13 13)"
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


function random(min, max) {
  return Math.random() * (max - min) + min;
}


function spawnFlowers() {

  if (prefersReducedMotion) return;


  /*
    🌸🌸🌸
    200 FLOWERS
    🌸🌸🌸
  */

  const count = 200;


  for (let i = 0; i < count; i++) {

    const el = document.createElement('div');

    el.className = 'flower';


    /* Random flower color */

    const color =
      flowerPalette[
        Math.floor(
          Math.random() *
          flowerPalette.length
        )
      ];

    el.innerHTML =
      makeFlowerSVG(color);


    /* Random size */

    const size =
      random(0.45, 1.4);

    el.style.setProperty(
      '--flower-scale',
      size
    );


    /*
      Wide upward explosion.

      Flowers launch in different directions
      instead of following identical paths.
    */

    const angle =
      random(
        Math.PI * 0.05,
        Math.PI * 0.95
      );

    const distance =
      random(100, 380);


    const tx =
      Math.cos(angle) *
      distance;

    const ty =
      -Math.sin(angle) *
      distance;


    /*
      Gentle sideways drifting after
      reaching the peak.
    */

    const driftX =
      random(-180, 180);

    const driftY =
      random(180, 450);


    /*
      Smooth rotation.
    */

    const rot =
      random(-360, 360);


    /*
      Longer duration makes everything
      feel floaty rather than darting.
    */

    const duration =
      random(3.5, 6.5);


    /*
      Stagger flowers across the first
      1.1 seconds.
    */

    const delay =
      random(0, 1.1);


    /* CSS variables */

    el.style.setProperty(
      '--tx',
      `${tx}px`
    );

    el.style.setProperty(
      '--ty',
      `${ty}px`
    );

    el.style.setProperty(
      '--fx',
      `${driftX}px`
    );

    el.style.setProperty(
      '--fy',
      `${driftY}px`
    );

    el.style.setProperty(
      '--rot',
      `${rot}deg`
    );

    el.style.setProperty(
      '--duration',
      `${duration}s`
    );


    /*
      Individual animation delay.
    */

    el.style.animationDelay =
      `${delay}s`;


    /*
      Slightly randomize the point where
      the flower comes out of the envelope.
    */

    const originX =
      random(-15, 15);

    const originY =
      random(-10, 10);

    el.style.left =
      `calc(50% + ${originX}px)`;

    el.style.top =
      `calc(44% + ${originY}px)`;


    flowerLayer.appendChild(el);


    /*
      Clean up after animation.
    */

    el.addEventListener(
      'animationend',
      () => el.remove(),
      { once:true }
    );
  }
}


/* ---------- OPEN ENVELOPE ---------- */

function openEnvelope() {

  stage.classList.add('open');


  /*
    Envelope starts opening.
    Then the flower explosion begins.
  */

  setTimeout(() => {

    spawnFlowers();

  }, prefersReducedMotion ? 0 : 380);


  /*
    Card comes in after the explosion
    has already started.
  */

  setTimeout(() => {

    stage.classList.add('card-out');

  }, prefersReducedMotion ? 200 : 820);
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
