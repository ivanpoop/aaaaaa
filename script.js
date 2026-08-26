const stage = document.getElementById('stage');
const envelopeWrap = document.getElementById('envelopeWrap');
const flowerLayer = document.getElementById('flowerLayer');
const card = document.getElementById('card');

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function makeFlowerSVG(color, size = 26) {
  return `
    <svg
      viewBox="0 0 26 26"
      width="${size}"
      height="${size}"
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

function createFlowerField() {
  const field = document.createElement('div');

  field.className = 'flower-field';

  flowerLayer.appendChild(field);

  const fieldCount = 170;

  for (let i = 0; i < fieldCount; i++) {

    const flower = document.createElement('div');

    flower.className = 'field-flower';

    const color =
      flowerPalette[
        Math.floor(
          Math.random() * flowerPalette.length
        )
      ];

    const size = random(9, 19);

    flower.innerHTML =
      makeFlowerSVG(color, size);

    const x = random(-5, 105);
    const y = random(67, 101);

    flower.style.left = `${x}%`;
    flower.style.top = `${y}%`;

    const depth = random(.65, 1);

    flower.style.setProperty(
      '--field-scale',
      depth
    );

    flower.style.setProperty(
      '--field-opacity',
      random(.45, .9)
    );

    flower.style.setProperty(
      '--field-rotation',
      `${random(-25,25)}deg`
    );

    field.appendChild(flower);
  }

  requestAnimationFrame(() => {
    field.classList.add('visible');
  });
}

function spawnFlowers() {

  if (prefersReducedMotion) return;

  const count = 500;

  for (let i = 0; i < count; i++) {

    const el = document.createElement('div');

    el.className = 'flower';

    const color =
      flowerPalette[
        Math.floor(
          Math.random() * flowerPalette.length
        )
      ];

    el.innerHTML =
      makeFlowerSVG(
        color,
        random(16,31)
      );

    const size = random(.45,1.35);

    el.style.setProperty(
      '--flower-scale',
      size
    );

    const angle =
      random(
        Math.PI * .02,
        Math.PI * .98
      );

    const distance = random(120,470);

    const tx =
      Math.cos(angle) * distance;

    const ty =
      -Math.sin(angle) * distance;

    const driftX = random(-280,280);
    const driftY = random(180,500);
    const rot = random(-540,540);
    const duration = random(4.2,7.2);
    const delay = random(0,1.4);

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

    el.style.animationDelay =
      `${delay}s`;

    el.style.left =
      `calc(50% + ${random(-20,20)}px)`;

    el.style.top =
      `calc(44% + ${random(-15,15)}px)`;

    flowerLayer.appendChild(el);

    el.addEventListener(
      'animationend',
      () => el.remove(),
      { once:true }
    );
  }

  setTimeout(() => {
    createFlowerField();
  }, 5200);
}

function openEnvelope() {

  stage.classList.add('open');

  setTimeout(() => {
    spawnFlowers();
  }, prefersReducedMotion ? 0 : 350);

  setTimeout(() => {
    stage.classList.add('card-out');
  }, prefersReducedMotion ? 200 : 820);
}

envelopeWrap.addEventListener(
  'click',
  openEnvelope,
  { once:true }
);

card.addEventListener('click', () => {
  card.classList.toggle('flipped');
});
