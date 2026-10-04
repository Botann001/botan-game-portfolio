/* Data game. Tambah game baru di sini. */
const GAMES = {
  ml: {
    tab: 'Mobile Legends', page: 'ml.html', icon: 'img/icon-ml.webp', color: '#4cc3ff', genre: 'MOBA',
    title: 'Mobile Legends',
    meta: 'Nick <b>Nah i\'d win</b> • ID 237817687 (9261) • Squad <b>CYBER CHERUBIN</b> • Level 135',
    art: 'img/ml-char.webp',
    badge: { img: 'img/icon-ml.webp', name: 'Nah i\'d win', sub: '9 tahun bersama • Indonesia' },
    stats: [
      { v: 11406, l: 'Pertandingan' },
      { v: 53.23, d: 2, s: '%', l: 'Win rate', hl: 1 },
      { v: 1274, l: 'MVP', hl: 1 },
      { v: 736, l: 'Legendary' },
      { v: 16, l: 'Savage', hl: 1 },
      { v: 129, l: 'Maniac' },
      { v: 743, l: 'Triple kill' },
      { v: 4836, l: 'Double kill' },
      { v: 1118, l: 'First blood' },
      { v: 14, l: 'Win streak tertinggi' },
      { v: 27, l: 'Kill terbanyak' },
      { v: 1271, l: 'Gold / menit (tertinggi)' }
    ],
    radar: {
      labels: ['Push', 'KDA', 'Durabilitas', 'Team Fight', 'Farm', 'Damage'],
      values: [.67, .30, .72, .60, .85, .68]
    },
    chips: ['Juara MCL Mingguan ×8', 'MCL Champion', 'The Lone Star', 'Medali Mythic 16', 'Rank tertinggi ★38', 'Titan Level 1', 'Kolektor Terhormat IV'],
    gallery: [
      { src: 'img/ml-profile.webp', cap: 'Profil Mobile Legends' },
      { src: 'img/ml-stats.webp', cap: 'Statistik semua season' }
    ]
  },
  wuwa: {
    tab: 'Wuthering Waves', page: 'wuwa.html', icon: 'img/wuwa_icon.png', color: '#7fe3ff', genre: 'ACTION RPG',
    title: 'Wuthering Waves',
    meta: 'Nama <b>Kei Kuronuma</b> • UID 901954339 • Title <b>Legend Smasher</b> • Terakhir main 2 Okt',
    art: 'img/wuwa-char.webp',
    badge: { img: 'img/wuwa-avatar.webp', name: 'Kei Kuronuma', sub: 'Union Level 80 • SOL3 Phase Rank 8' },
    stats: [
      { v: 997, l: 'Jam bermain (Steam)', hl: 1 },
      { v: 80, l: 'Union level', hl: 1 },
      { v: 8, l: 'SOL3 phase rank' },
      { v: 12, s: '+', l: 'Resonator Lv. 90' }
    ],
    bars: { title: 'Union EXP', cur: 1994950, max: 9999999, fmt: true },
    chips: ['Legend Smasher', 'Union Level 80', 'SOL3 Phase Rank 8', 'Qingxiao Lv. 90'],
    gallery: [
      { src: 'img/wuwa-roster.webp', cap: 'Koleksi Resonators (Qingxiao dipilih)' },
      { src: 'img/wuwa-profile.webp', cap: 'Terminal / profil Union' },
      { src: 'img/wuwa-playtime.webp', cap: '997 jam tercatat di Steam' }
    ]
  },
  valo: {
    tab: 'Valorant', page: 'valo.html', icon: 'img/valo_icon.png', color: '#ff4655', genre: 'TACTICAL FPS',
    title: 'Valorant',
    meta: 'Riot ID <b>DONTOL#SAWIT</b> • Level 22 • Agent main <b>Raze</b> (Duelist)',
    art: 'img/valo-char.webp',
    badge: { img: 'img/valo-profile.webp', name: 'Bronze 3', sub: 'Level 22 • 14 match kompetitif' },
    stats: [
      { v: 225, d: 1, l: 'ACS', hl: 1 },
      { v: 0.97, d: 2, l: 'K/D ratio' },
      { v: 144.9, d: 1, l: 'Damage / round' },
      { v: 73.3, d: 1, s: '%', l: 'KAST' },
      { v: 9.4, d: 1, s: '%', l: 'Headshot' },
      { v: 1.47, d: 2, l: 'KAD ratio' },
      { v: 221, l: 'Kills' },
      { v: 112, l: 'Assists' },
      { v: 6, l: 'Clutch (1v1)', hl: 1 },
      { v: 8, l: 'Flawless round' }
    ],
    donut: { win: 8, lose: 6, pct: 57.1 },
    chips: ['Bronze 3', 'Level 22', 'Raze main', '8 menang dari 14 match'],
    gallery: [
      { src: 'img/valo-profile.webp', cap: 'Profil & rank' },
      { src: 'img/valo-logo.svg', cap: 'Competitive overview' },
      { src: 'img/valo-agent.webp', cap: 'Agent: Raze' }
    ]
  }
};
