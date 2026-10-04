/* Halaman utama */
/* ============ TYPING ============ */
(function () {
  const lines = ['Mobile Legends • 11.406 match', 'Wuthering Waves • 997 jam', 'Valorant • Raze main', 'Roblox • @O_forYou', 'Just For Fun'];
  const el = $('#typed');
  if (reduced) { el.textContent = lines[0]; return; }
  let li = 0, ci = 0, del = false;
  (function tick() {
    const s = lines[li];
    el.textContent = s.slice(0, ci);
    if (!del && ci === s.length) { del = true; return setTimeout(tick, 1600); }
    if (del && ci === 0) { del = false; li = (li + 1) % lines.length; }
    ci += del ? -1 : 1;
    setTimeout(tick, del ? 28 : 55);
  })();
})();

/* ============ TOTALS SHARE ============ */
$('#share').innerHTML = `<h4>Progres &amp; win rate</h4>
  ${[['Mobile Legends — win rate', 53.23, '53,23%'], ['Valorant — win rate', 57.1, '57,1%'], ['Wuthering Waves — Union Lv', 80 / 90 * 100, '80 / 90']]
    .map(r => `<div class="share-row"><span>${r[0]}</span><div class="bar"><i data-w="${r[1]}%"></i></div><em>${r[2]}</em></div>`).join('')}`;

/* ============ HOME SCREEN (grid ikon ala Android) ============ */
const grid = $('#appGrid');
Object.values(GAMES).forEach(g => {
  const a = document.createElement('a');
  a.className = 'app'; a.href = g.page; a.style.setProperty('--c', g.color);
  a.innerHTML = `<span class="app-icon"><img src="${g.icon}" alt=""></span><span class="app-label">${g.tab}</span>`;
  a.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault(); openApp(g.page, $('.app-icon', a), g.color);
  });
  grid.appendChild(a);
});

/* ============ HERO CARDS: tilt + buka halaman ============ */
$$('.poster').forEach(p => {
  const g = GAMES[p.dataset.go];
  p.addEventListener('pointermove', e => {
    if (reduced) return;
    const r = p.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
    p.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg) translateZ(10px)`;
  });
  p.addEventListener('pointerleave', () => p.style.transform = '');
  p.addEventListener('click', () => openApp(g.page, p, g.color));
});

/* ============ AIM TRAINER ============ */
(function () {
  const field = $('#aimField'), ov = $('#aimOverlay');
  const sc = $('#aimScore'), tm = $('#aimTime'), ac = $('#aimAcc'), bs = $('#aimBest');
  let best = 0;
  try { best = +localStorage.getItem('botan-aim-best') || 0; } catch (e) { }
  bs.textContent = best;
  let score, misses, left, timer, target, life;

  function spawn() {
    if (target) target.remove();
    const size = 38 + Math.random() * 30, W = field.clientWidth, H = field.clientHeight;
    const t = document.createElement('div');
    t.className = 'target';
    t.style.cssText = `width:${size}px;height:${size}px;left:${size / 2 + 8 + Math.random() * (W - size - 16)}px;top:${size / 2 + 8 + Math.random() * (H - size - 16)}px`;
    t.addEventListener('pointerdown', e => {
      e.stopPropagation(); score++; sc.textContent = score; updAcc();
      t.classList.add('hit'); setTimeout(() => t.remove(), 250);
      life = Math.max(550, life - 18); target = null; spawn();
    });
    field.appendChild(t); target = t;
    clearTimeout(spawn.to);
    spawn.to = setTimeout(() => { if (target === t) { misses++; updAcc(); spawn(); } }, life);
  }
  const updAcc = () => { const tot = score + misses; ac.textContent = tot ? Math.round(score / tot * 100) + '%' : '0%'; };

  field.addEventListener('pointerdown', e => {
    if (!timer || e.target !== field) return;
    misses++; updAcc();
    const r = field.getBoundingClientRect(), m = document.createElement('div');
    m.className = 'miss'; m.style.left = e.clientX - r.left + 'px'; m.style.top = e.clientY - r.top + 'px';
    field.appendChild(m); setTimeout(() => m.remove(), 400);
  });

  function start() {
    score = 0; misses = 0; left = 30; life = 1400;
    sc.textContent = 0; tm.textContent = left; ac.textContent = '0%';
    ov.hidden = true; spawn();
    timer = setInterval(() => {
      tm.textContent = --left;
      if (left <= 0) end();
    }, 1000);
  }
  function end() {
    clearInterval(timer); timer = null; clearTimeout(spawn.to);
    if (target) { target.remove(); target = null; }
    const isBest = score > best;
    if (isBest) { best = score; bs.textContent = best; try { localStorage.setItem('botan-aim-best', best); } catch (e) { } }
    $('#aimTitle').textContent = isBest && score > 0 ? 'Rekor baru!' : 'Selesai';
    $('#aimMsg').textContent = `Skor ${score} • Akurasi ${ac.textContent}. ${score >= 30 ? 'Aim kamu sudah siap Radiant.' : 'Coba lagi, pasti naik.'}`;
    $('#aimStart').textContent = 'Main lagi';
    ov.hidden = false;
  }
  $('#aimStart').onclick = start;
})();

/* ============ INIT ============ */
$('#year').textContent = new Date().getFullYear();
const clock = () => { const d = new Date(); $('.statusbar span').textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
clock(); setInterval(clock, 20000);
observe();
