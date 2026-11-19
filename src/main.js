// Амино — вся интерактивность сайта.
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createScene, STAGES } from './scene.js';

gsap.registerPlugin(ScrollTrigger);

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;
const isAuto = new URLSearchParams(location.search).has('static'); // для скриншотов

$('#year').textContent = new Date().getFullYear();

// ---------- Плавная прокрутка ----------
let lenis = null;
if (!reduce && !isAuto) {
  lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
$$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
  const id = a.getAttribute('href');
  const el = id.length > 1 ? $(id) : document.body;
  if (!el) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(el, { duration: 1.8 });
  else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
}));

// ---------- 3D-история ----------
const story = $('#story');
const sky = $('.sky');
let scene = null;
try {
  scene = createScene($('#scene'), { pixelRatio: innerWidth < 768 ? 1.5 : 1.75 });
} catch (err) {
  document.documentElement.classList.add('no-webgl');
}

const POS = [0, 0.34, 0.67, 1];
const HOLD = 0.07;
const smooth = (t) => t * t * (3 - 2 * t);
function stageAt(p) {
  for (let i = 0; i < POS.length - 1; i++) {
    if (p <= POS[i] + HOLD) return [i, i, 0];
    const a = POS[i] + HOLD, b = POS[i + 1] - HOLD;
    if (p < b) return [i, i + 1, smooth((p - a) / (b - a))];
  }
  return [POS.length - 1, POS.length - 1, 0];
}
function mixStage(A, B, t, out) {
  for (const k in A) {
    if (Array.isArray(A[k])) out[k] = A[k].map((v, i) => v + (B[k][i] - v) * t);
    else out[k] = A[k] + (B[k] - A[k]) * t;
  }
}

const chapters = $$('.chapter');
const railItems = $$('.rail li');
let activeChapter = 0;
function setStory(p) {
  if (scene) {
    const [a, b, t] = stageAt(p);
    mixStage(STAGES[a], STAGES[b], t, scene.target);
  }
  const ch = p < 0.17 ? 0 : p < 0.5 ? 1 : p < 0.83 ? 2 : 3;
  if (ch !== activeChapter) {
    activeChapter = ch;
    chapters.forEach((c, i) => c.classList.toggle('is-active', i === ch));
    railItems.forEach((li, i) => li.classList.toggle('is-active', i === ch));
  }
  story.classList.toggle('is-scrolled', p > 0.02);
}
ScrollTrigger.create({
  trigger: story, start: 'top top', end: 'bottom bottom',
  onUpdate: (self) => setStory(self.progress),
});
setStory(0);

// Значения HUD и цвет неба — каждый кадр из сглаженного состояния сцены
const hudTime = $('#hud-time'), hudSun = $('#hud-sun');
const rgb = (a) => `rgb(${a.map((v) => Math.round(v * 255)).join(',')})`;
const lerpHex = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const LIGHT_FG = [238, 235, 229], DARK_FG = [20, 23, 28];
let storyVisible = true;
new IntersectionObserver(([e]) => { storyVisible = e.isIntersecting; }).observe(story);

function tick() {
  if (!scene || !storyVisible) return;
  scene.frame(reduce ? 1 : 0.075);
  const c = scene.cur;
  sky.style.background = `linear-gradient(${rgb(c.sky)}, ${rgb(c.bg)} 62%)`;
  // время по азимуту солнца: восток 90° = 6:00, юг 180° = 12:00
  const h = 6 + (c.sunAz - 90) / 15;
  const hh = Math.floor(h), mm = Math.floor((h - hh) * 60);
  hudTime.textContent = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  hudSun.textContent = `${Math.round(c.sunAz)}° / ${Math.round(c.sunEl)}°`;
  // цвет текста зависит от яркости фона
  const lum = 0.2126 * c.bg[0] + 0.7152 * c.bg[1] + 0.0722 * c.bg[2];
  const k = Math.min(1, Math.max(0, (lum - 0.45) / 0.25));
  story.style.setProperty('--fg', `rgb(${lerpHex(LIGHT_FG, DARK_FG, k).join(',')})`);
}
gsap.ticker.add(tick);
addEventListener('resize', () => scene && scene.resize());
if (fine) addEventListener('pointermove', (e) => {
  if (!scene) return;
  scene.pointer.x = (e.clientX / innerWidth - 0.5) * 2;
  scene.pointer.y = (e.clientY / innerHeight - 0.5) * -2;
});

// ---------- Прелоадер и вступление ----------
function intro() {
  const tl = gsap.timeline();
  if (scene && !reduce) { scene.cur.cy = 140; } // камера «опускается» на чертёж
  tl.to('.loader', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' })
    .from('.hero-title .line > span', { yPercent: 110, duration: 1.3, stagger: 0.09, ease: 'expo.out' }, '-=.45')
    .from(['.hero-sub', '.hud', '.header'], { opacity: 0, y: 20, duration: 1, stagger: 0.08, ease: 'power3.out' }, '-=1')
    .set('.loader', { display: 'none' });
}
if (isAuto || reduce) {
  $('.loader').style.display = 'none';
} else {
  const counter = { v: 0 };
  const countEl = $('#count');
  const loaded = new Promise((r) => (document.readyState === 'complete' ? r() : addEventListener('load', r)));
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  gsap.to('.loader-bar i', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' });
  gsap.to(counter, {
    v: 100, duration: 1.6, ease: 'power2.inOut',
    onUpdate: () => { countEl.textContent = Math.round(counter.v); },
    onComplete: () => Promise.all([loaded, fonts]).then(intro),
  });
}

// ---------- Манифест: слова проявляются при прокрутке ----------
$$('[data-words]').forEach((el) => {
  el.innerHTML = el.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(' ');
  if (reduce) return;
  gsap.to($$('.w', el), {
    opacity: 1, stagger: 0.12, ease: 'none',
    scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true },
  });
});

// ---------- Заголовки секций: подъём из-под маски ----------
if (!reduce) {
  $$('.section-title, .contact-title .line > span').forEach((el) => {
    gsap.from(el, {
      yPercent: 60, opacity: 0, duration: 1.4, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
}

// ---------- Проекты: горизонтальная прокрутка ----------
const mm = gsap.matchMedia();
mm.add('(min-width: 901px)', () => {
  const track = $('.track');
  const dist = () => track.scrollWidth - innerWidth;
  const tween = gsap.to(track, {
    x: () => -dist(), ease: 'none',
    scrollTrigger: {
      trigger: '.projects', start: 'top top', end: () => '+=' + dist(),
      pin: true, scrub: 1, invalidateOnRefresh: true,
      onUpdate: (s) => gsap.set('.projects-progress i', { scaleX: s.progress }),
    },
  });
  $$('.project-media img').forEach((img) => {
    gsap.fromTo(img, { xPercent: -6 }, {
      xPercent: 6, ease: 'none',
      scrollTrigger: { trigger: img.closest('.project'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
    });
  });
});
mm.add('(max-width: 900px)', () => {
  $$('.project-media').forEach((m) => {
    gsap.from(m, { clipPath: 'inset(12% 8% 12% 8%)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: m, start: 'top 85%' } });
  });
});

// ---------- Процесс: линия и активные шаги ----------
gsap.to('.process-line i', {
  scaleY: 1, ease: 'none',
  scrollTrigger: { trigger: '.process-steps', start: 'top 60%', end: 'bottom 70%', scrub: true },
});
$$('.step').forEach((s) => ScrollTrigger.create({
  trigger: s, start: 'top 62%', onEnter: () => s.classList.add('is-on'), onLeaveBack: () => s.classList.remove('is-on'),
}));

// ---------- Курсор, картинки услуг, магнитная кнопка ----------
if (fine && !reduce) {
  const cursor = $('.cursor'), dot = $('.cursor-dot'), ring = $('.cursor-ring'), label = $('.cursor-label');
  const dx = gsap.quickTo(dot, 'x', { duration: 0.1 }), dy = gsap.quickTo(dot, 'y', { duration: 0.1 });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });
  const hover = $('.hover-img'), hoverImg = $('img', hover);
  const hx = gsap.quickTo(hover, 'x', { duration: 0.7, ease: 'power3' }), hy = gsap.quickTo(hover, 'y', { duration: 0.7, ease: 'power3' });
  addEventListener('pointermove', (e) => {
    cursor.classList.add('is-ready');
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); hx(e.clientX); hy(e.clientY);
  });
  document.addEventListener('pointerover', (e) => {
    const lab = e.target.closest('[data-cursor]');
    const link = e.target.closest('a, button');
    cursor.classList.toggle('is-label', !!lab && lab.dataset.cursor.trim() !== '');
    cursor.classList.toggle('is-link', !!link && !(lab && lab.dataset.cursor.trim()));
    if (lab) label.textContent = lab.dataset.cursor;
  });
  $$('.service').forEach((s) => {
    s.addEventListener('pointerenter', () => { hoverImg.src = s.dataset.img; hover.classList.add('is-on'); });
    s.addEventListener('pointerleave', () => hover.classList.remove('is-on'));
  });
  $$('.magnet').forEach((m) => {
    const mx = gsap.quickTo(m, 'x', { duration: 0.6, ease: 'power3' }), my = gsap.quickTo(m, 'y', { duration: 0.6, ease: 'power3' });
    m.addEventListener('pointermove', (e) => {
      const r = m.getBoundingClientRect();
      mx((e.clientX - r.left - r.width / 2) * 0.4); my((e.clientY - r.top - r.height / 2) * 0.4);
    });
    m.addEventListener('pointerleave', () => { gsap.to(m, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, .4)' }); });
  });
}

addEventListener('load', () => ScrollTrigger.refresh());
