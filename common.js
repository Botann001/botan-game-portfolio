/* Fungsi bersama untuk semua halaman */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = (n, d = 0) => n.toLocaleString('id-ID', { minimumFractionDigits: d, maximumFractionDigits: d });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============ BACKGROUND PARTICLES ============ */
(function () {
  const c = $('#bg'), x = c.getContext('2d');
  let w, h, pts = [], mouse = { x: -999, y: -999 };
  const resize = () => {
    w = c.width = innerWidth; h = c.height = innerHeight;
    const n = Math.min(90, Math.floor(w * h / 18000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }));
  };
  addEventListener('resize', resize); resize();
  addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  let col = '76,195,255';
  const hex2rgb = hx => { hx = hx.trim().replace('#', ''); if (hx.length === 3) hx = [...hx].map(a => a + a).join(''); return [0, 2, 4].map(i => parseInt(hx.substr(i, 2), 16)).join(','); };
  const readColor = () => { try { col = hex2rgb(getComputedStyle(document.body).getPropertyValue('--accent')); } catch (e) { } };
  setInterval(readColor, 600); readColor();
  function frame() {
    x.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      x.fillStyle = `rgba(${col},.7)`; x.fillRect(p.x, p.y, 2, 2);
    }
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 130) { x.strokeStyle = `rgba(${col},${.16 * (1 - d / 130)})`; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke(); }
    }
    for (const p of pts) {
      const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (d < 160) { x.strokeStyle = `rgba(${col},${.4 * (1 - d / 160)})`; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(mouse.x, mouse.y); x.stroke(); }
    }
    if (!document.hidden && !reduced) requestAnimationFrame(frame);
    else if (!reduced) setTimeout(() => requestAnimationFrame(frame), 300);
  }
  frame();
})();

/* ============ COUNT-UP ============ */
function countUp(el) {
  const to = parseFloat(el.dataset.to), d = +(el.dataset.d || 0), s = el.dataset.s || '';
  if (reduced) { el.textContent = fmt(to, d) + s; return; }
  const t0 = performance.now(), dur = 1400;
  (function step(t) {
    const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(to * e, d) + s;
    if (p < 1) requestAnimationFrame(step);
  })(t0);
}
$$('[data-count]').forEach(el => { el.dataset.to = el.dataset.count; });

/* ============ REVEAL ============ */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  $$('[data-to]', e.target).forEach(countUp);
  if (e.target.dataset.to) countUp(e.target);
  $$('.bar i[data-w]', e.target).forEach(b => b.style.width = b.dataset.w);
  $$('.arc[data-arc]', e.target).forEach(a => a.setAttribute('stroke-dasharray', a.dataset.arc));
  const cv = $('canvas[data-radar]', e.target); if (cv) drawRadar(cv);
  io.unobserve(e.target);
}), { threshold: .15 });
const observe = () => $$('.reveal:not(.in), .total b[data-to]').forEach(el => io.observe(el));

/* ============ RADAR ============ */
function drawRadar(cv, customRadar) {
  const g = customRadar || cv._radarData || (GAMES.ml && (GAMES.ml.radar || (GAMES.ml.accounts && GAMES.ml.accounts[0].radar)));
  if (!g) return;
  const x = cv.getContext('2d'), W = cv.width, H = cv.height, cx = W / 2, cy = H / 2 + 6, R = 108;
  const acc = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#4cc3ff';
  const n = g.labels.length, ang = i => -Math.PI / 2 + i * 2 * Math.PI / n;
  const t0 = performance.now();
  (function f(t) {
    const p = reduced ? 1 : Math.min(1, (t - t0) / 1100), e = 1 - Math.pow(1 - p, 3);
    x.clearRect(0, 0, W, H);
    x.strokeStyle = 'rgba(255,255,255,.14)'; x.lineWidth = 1;
    for (let r = 1; r <= 4; r++) { x.beginPath(); for (let i = 0; i < n; i++) { const a = ang(i), rr = R * r / 4; x[i ? 'lineTo' : 'moveTo'](cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } x.closePath(); x.stroke(); }
    for (let i = 0; i < n; i++) { const a = ang(i); x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); x.stroke(); }
    x.beginPath(); g.values.forEach((v, i) => { const a = ang(i), rr = R * v * e; x[i ? 'lineTo' : 'moveTo'](cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }); x.closePath();
    x.fillStyle = acc + '44'; x.fill(); x.strokeStyle = acc; x.lineWidth = 2; x.stroke();
    g.values.forEach((v, i) => { const a = ang(i), rr = R * v * e; x.fillStyle = '#fff'; x.beginPath(); x.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 3.5, 0, 7); x.fill(); });
    x.fillStyle = '#c4cee0'; x.font = '600 13px "Chakra Petch",sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    g.labels.forEach((l, i) => { const a = ang(i); x.fillText(l, cx + Math.cos(a) * (R + 26), cy + Math.sin(a) * (R + 18)); });
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}

/* ============ LIGHTBOX ============ */
const lb = $('#lightbox');
function openLB(p) { $('#lbImg').src = p.src; $('#lbImg').alt = p.cap; $('#lbCap').textContent = p.cap; lb.hidden = false; }
lb.onclick = e => { if (e.target !== $('#lbImg')) lb.hidden = true; };
addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });


/* ============ TRANSISI BUKA APLIKASI (gaya Android) ============ */
function openApp(url, fromEl, color) {
  if (reduced || !fromEl) { location.href = url; return; }
  const r = fromEl.getBoundingClientRect();
  const o = document.createElement('div');
  o.className = 'app-launch';
  o.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;--lc:${color || '#4cc3ff'}`;
  document.body.appendChild(o);
  requestAnimationFrame(() => o.classList.add('go'));
  setTimeout(() => { location.href = url; }, 380);
}
addEventListener('pageshow', e => { if (e.persisted) $$('.app-launch').forEach(o => o.remove()); });
