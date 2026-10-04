/* Halaman detail game: membaca data-game dari <body> */
const key = document.body.dataset.game;
const g = GAMES[key];
document.title = `${g.title} • Botan`;
$('#appIcon').src = g.icon;
$('#appName').textContent = g.title;

const statHTML = s =>
  `<div class="stat ${s.hl ? 'hl' : ''}"><b data-to="${s.v}" data-d="${s.d || 0}" data-s="${s.s || ''}">0</b><small>${s.l}</small></div>`;

let viz = '';
if (g.radar) viz += `<div class="viz-card"><h4>Radar performa</h4><canvas data-radar width="360" height="320"></canvas><p class="note">Nilai radar diperkirakan dari grafik di game.</p></div>`;
if (g.bars) {
  const pct = (g.bars.cur / g.bars.max * 100).toFixed(1);
  viz += `<div class="viz-card"><h4>${g.bars.title}</h4><div class="bar"><i data-w="${pct}%"></i></div><div class="bar-row"><b>${fmt(g.bars.cur)}</b><span>/ ${fmt(g.bars.max)} (${fmt(+pct, 1)}%)</span></div></div>`;
}
if (g.donut) {
  const C = 2 * Math.PI * 48, wp = g.donut.win / (g.donut.win + g.donut.lose);
  viz += `<div class="viz-card"><h4>Menang / Kalah</h4><div class="donut">
    <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" stroke="#ff4655" opacity=".55"/>
    <circle class="arc" cx="60" cy="60" r="48" stroke="#2ee6a6" stroke-dasharray="0 ${C}" data-arc="${(C * wp).toFixed(1)} ${C.toFixed(1)}" style="transition:stroke-dasharray 1.4s cubic-bezier(.2,.8,.2,1)"/></svg>
    <div class="legend"><b>${g.donut.win}W • ${g.donut.lose}L</b><span>Win ${fmt(g.donut.pct, 1)}%</span></div></div></div>`;
}

const panel = $('#panel');
panel.innerHTML = `
  <div class="p-art">
    <img class="main" src="${g.art}" alt="${g.title}">
    <div class="badge"><img src="${g.badge.img}" alt=""><div><b>${g.badge.name}</b><small>${g.badge.sub}</small></div></div>
  </div>
  <div class="p-info">
    <div class="p-title"><h3>${g.title}</h3><span class="genre">${g.genre}</span></div>
    <p class="p-meta">${g.meta}</p>
    <div class="stat-grid">${g.stats.map(statHTML).join('')}</div>
    <div class="viz">${viz}</div>
    <div class="chips">${g.chips.map(c => `<span class="chip">${c}</span>`).join('')}</div>
    <p class="gallery-h">Screenshot</p>
    <div class="gallery">${g.gallery.map((p, i) => `<button class="thumb" data-i="${i}"><img src="${p.src}" alt="${p.cap}" loading="lazy"><span>${p.cap}</span></button>`).join('')}</div>
  </div>`;
$$('.thumb', panel).forEach(t => t.onclick = () => openLB(g.gallery[+t.dataset.i]));

/* game lain (ikon) */
$('#otherApps').innerHTML = Object.entries(GAMES).filter(([k]) => k !== key).map(([k, o]) =>
  `<a class="app small" href="${o.page}" style="--c:${o.color}"><span class="app-icon"><img src="${o.icon}" alt=""></span><span class="app-label">${o.tab}</span></a>`).join('');

/* ============ LIVE COMMENTS ============ */
const commentSection = document.createElement('div');
commentSection.className = 'comments-wrapper reveal';
commentSection.style.marginTop = '60px';
commentSection.style.width = '100%';
commentSection.innerHTML = `
  <p class="gallery-h">Live Comments</p>
  <form id="commentForm" class="comment-form">
    <input type="text" id="commentName" placeholder="Nama / Nickname" required autocomplete="off" maxlength="30">
    <textarea id="commentText" placeholder="Tulis komentar kamu..." required rows="3" maxlength="200"></textarea>
    <button type="submit" class="btn primary">Kirim Komentar</button>
  </form>
  <div id="commentsList" class="comments-list" style="margin-top:20px;"></div>
`;
document.querySelector('.game-main').insertBefore(commentSection, $('.other'));

const form = $('#commentForm');
const list = $('#commentsList');
const SUPABASE_URL = 'https://rtqhwyyvloixlftecndev.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0cWh3eXZsb2l4bGZ0ZWNuZGV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNjYyMzgsImV4cCI6MjEwNjY0MjIzOH0.ppp6t-4Poy0bHREmg5I11nKC1jNNG5CNi-0Jk8CNTDU';
const API_URL = `${SUPABASE_URL}/rest/v1/comments`;

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json'
};

function formatDate(isoString) {
  if (!isoString) return 'Baru saja';
  const d = new Date(isoString);
  const diff = Math.floor((new Date() - d) / 1000);
  if (diff < 60) return 'Baru saja';
  if (diff < 3600) return Math.floor(diff / 60) + ' menit yang lalu';
  if (diff < 86400) return Math.floor(diff / 3600) + ' jam yang lalu';
  return d.toLocaleDateString('id-ID');
}

function renderComments(commentsData) {
  if (commentsData.length === 0) {
    list.innerHTML = '<p class="muted" style="text-align:center; font-size:0.9rem;">Belum ada komentar. Jadilah yang pertama!</p>';
    return;
  }
  list.innerHTML = commentsData.map(c => `
    <div class="comment-item">
      <h4>${c.name.replace(/</g, '&lt;')} <span>${formatDate(c.created_at)}</span></h4>
      <p>${c.text.replace(/</g, '&lt;')}</p>
    </div>
  `).join('');
}

async function loadComments() {
  list.innerHTML = '<p class="muted" style="text-align:center; font-size:0.9rem;">Memuat komentar...</p>';
  try {
    const res = await fetch(`${API_URL}?game_id=eq.${key}&select=*&order=created_at.desc`, { headers });
    if (!res.ok) {
      const err = await res.text();
      throw new Error(err);
    }
    const data = await res.json();
    renderComments(data);
  } catch(e) {
    console.error("Load Error:", e);
    list.innerHTML = '<p class="muted" style="text-align:center; color:#ff4655; font-size:0.9rem;">Gagal memuat komentar. Cek console.</p>';
  }
}

loadComments();

form.addEventListener('submit', async e => {
  e.preventDefault();
  const nameInput = $('#commentName');
  const textInput = $('#commentText');
  const name = nameInput.value.trim();
  const text = textInput.value.trim();
  
  if (name && text) {
    const btn = form.querySelector('button');
    const oldTxt = btn.textContent;
    btn.textContent = 'Mengirim...';
    btn.disabled = true;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { ...headers, 'Prefer': 'return=representation' },
        body: JSON.stringify({ game_id: key, name, text })
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }
      nameInput.value = '';
      textInput.value = '';
      await loadComments();
    } catch(e) {
      console.error("Post Error:", e);
      alert('Gagal mengirim komentar! ' + e.message);
    } finally {
      btn.textContent = oldTxt;
      btn.disabled = false;
    }
  }
});

$('#year').textContent = new Date().getFullYear();
observe();
