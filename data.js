/* Data game. Tambah game baru di sini. */
const GAMES = {
  ml: {
    tab: 'Mobile Legends', page: 'ml.html', icon: 'img/ml/icon-ml.webp', color: '#4cc3ff', genre: 'MOBA',
    accounts: [
      {
        name: 'Akun Utama',
        tag: 'MAIN',
        icon: '👑',
        copyId: { label: 'ID Mobile Legends (Main)', value: '237817687 (9261)' },
        title: 'Mobile Legends',
        meta: 'Nick <b>Nah i\'d win</b> • ID 237817687 (9261) • Squad <b>CYBER CHERUBIN</b> • Level 135',
        art: 'img/ml/char-ml.png',
        badge: { img: 'img/ml/icon-ml.webp', name: 'Nah i\'d win', sub: '9 tahun bersama • Indonesia' },
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
          { src: 'img/ml/ml-profile.webp', cap: 'Profil Mobile Legends (Akun Utama)' },
          { src: 'img/ml/ml-stats.webp', cap: 'Statistik Semua Season' },
          { src: 'img/ml/ml-skins.jpg', cap: 'Koleksi Skin & Pajangan' }
        ]
      },
      {
        name: 'Akun Kedua',
        tag: 'SMURF',
        icon: '⚡',
        copyId: { label: 'ID Mobile Legends (Akun 2)', value: '237817687 (9218)' },
        title: 'Mobile Legends',
        meta: 'Nick <b>™ 『THE』¡×ONE</b> • ID 237817687 (9218) • Level 59 • 8 Tahun Bersama',
        art: 'img/ml/char-ml.png',
        badge: { img: 'img/ml/icon-ml.webp', name: '™ 『THE』¡×ONE', sub: '8 tahun bersama • Server 9218' },
        stats: [
          { v: 2527, l: 'Pertandingan' },
          { v: 63.36, d: 2, s: '%', l: 'Win rate', hl: 1 },
          { v: 468, l: 'MVP', hl: 1 },
          { v: 294, l: 'Legendary' },
          { v: 6, l: 'Savage', hl: 1 },
          { v: 56, l: 'Maniac' },
          { v: 298, l: 'Triple kill' },
          { v: 1484, l: 'Double kill' },
          { v: 261, l: 'First blood' },
          { v: 19, l: 'Win streak tertinggi', hl: 1 },
          { v: 31, l: 'Kill terbanyak' },
          { v: 1285, l: 'Gold / menit (tertinggi)' }
        ],
        radar: {
          labels: ['Push', 'KDA', 'Durabilitas', 'Team Fight', 'Farm', 'Damage'],
          values: [.85, .50, .80, .65, .80, .70]
        },
        chips: ['Win Rate 63.36%', 'Kolektor Ternama IV (250 Skin)', 'Full Lightborn Squad', 'Juara MCL Mingguan ×4', 'Man of Steel', 'Rank tertinggi ★25'],
        gallery: [
          { src: 'img/ml/ml2-profile.jpg', cap: 'Profil Akun Kedua — ™ 『THE』¡×ONE' },
          { src: 'img/ml/ml2-stats.jpg', cap: 'Statistik Semua Season (Win Rate 63.36%)' },
          { src: 'img/ml/ml2-history.jpg', cap: 'Riwayat Rank (Win Streak Gusion)' },
          { src: 'img/ml/ml2-skins.jpg', cap: 'Koleksi Skin & Pajangan (Full Lightborn)' }
        ]
      }
    ],
    copyId: { label: 'ID Mobile Legends', value: '237817687 (9261)' },
    title: 'Mobile Legends',
    meta: 'Nick <b>Nah i\'d win</b> • ID 237817687 (9261) • Squad <b>CYBER CHERUBIN</b> • Level 135',
    art: 'img/ml/char-ml.png',
    badge: { img: 'img/ml/icon-ml.webp', name: 'Nah i\'d win', sub: '9 tahun bersama • Indonesia' },
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
      { src: 'img/ml/ml-profile.webp', cap: 'Profil Mobile Legends (Akun Utama)' },
      { src: 'img/ml/ml-stats.webp', cap: 'Statistik semua season' }
    ]
  },
  wuwa: {
    tab: 'Wuthering Waves', page: 'wuwa.html', icon: 'img/wuwa/wuwa_icon.png', color: '#7fe3ff', genre: 'ACTION RPG',
    copyId: { label: 'UID Wuthering Waves', value: '901954339' },
    title: 'Wuthering Waves',
    meta: 'Nama <b>Kei Kuronuma</b> • UID 901954339 • Title <b>Legend Smasher</b> • Terakhir main 2 Okt',
    art: 'img/wuwa/wuwa-char.webp',
    badge: { img: 'img/wuwa/wallhaven-l8rloq.jpg', name: 'Kei Kuronuma', sub: 'Union Level 80 • SOL3 Phase Rank 8' },
    stats: [
      { v: 997, l: 'Jam bermain (Steam)', hl: 1 },
      { v: 80, l: 'Union level', hl: 1 },
      { v: 8, l: 'SOL3 phase rank' },
      { v: 12, s: '+', l: 'Resonator Lv. 90' }
    ],
    bars: { title: 'Union EXP', cur: 1994950, max: 9999999, fmt: true },
    chips: ['Legend Smasher', 'Union Level 80', 'SOL3 Phase Rank 8', 'Qingxiao Lv. 90'],
    gallery: [
      { src: 'img/wuwa/wuwa-roster.webp', cap: 'Koleksi Resonators (Qingxiao dipilih)' },
      { src: 'img/wuwa/wuwa-profile.webp', cap: 'Terminal / profil Union' },
      { src: 'img/wuwa/wuwa-playtime.webp', cap: '997 jam tercatat di Steam' }
    ]
  },
  valo: {
    tab: 'Valorant', page: 'valo.html', icon: 'img/valo/valo_icon.png', color: '#ff4655', genre: 'TACTICAL FPS',
    accounts: [
      {
        name: 'Akun Utama',
        tag: 'MAIN',
        icon: '👑',
        copyId: { label: 'Riot ID (Main)', value: 'PrabowoAnjing#Botan' },
        title: 'Valorant',
        meta: 'Riot ID <b>PrabowoAnjing#Botan</b> • Level 181 • Rank <b>Silver 1</b> • Agent Main <b>Raze</b>',
        art: 'img/valo/valo1-char.png',
        badge: { img: 'img/valo/valo1-profile.png', name: 'Silver 1', sub: 'Level 181 • 709 Jam Playtime' },
        stats: [
          { v: 709, l: 'Jam Bermain', hl: 1 },
          { v: 1260, l: 'Total Match' },
          { v: 213.6, d: 1, l: 'ACS', hl: 1 },
          { v: 0.99, d: 2, l: 'K/D Ratio' },
          { v: 137.3, d: 1, l: 'Damage / Round' },
          { v: 68.9, d: 1, s: '%', l: 'KAST' },
          { v: 8.5, d: 1, s: '%', l: 'Headshot' },
          { v: 1.34, d: 2, l: 'KAD Ratio' },
          { v: 18038, l: 'Kills' },
          { v: 6326, l: 'Assists' },
          { v: 304, l: 'Clutches (1v1)', hl: 1 },
          { v: 767, l: 'Flawless Rounds' }
        ],
        donut: { win: 612, lose: 618, pct: 48.6 },
        chips: ['Silver 1', 'Level 181', 'Raze Main (150 Match • 55.3% WR)', 'Icebox 64% WR', '709 Jam Playtime', '612 Menang'],
        gallery: [
          { src: 'img/valo/valo1-profile.png', cap: 'Profil & Rank Silver 1 (Level 181)' },
          { src: 'img/valo/valo1-comp.png', cap: 'Competitive Overview (709h Playtime • 1,260 Matches)' },
          { src: 'img/valo/valo1-topagent.png', cap: 'Top Agents: Raze (55.3% WR), Sage, Waylay' },
          { src: 'img/valo/valo1-char.png', cap: 'Agent Main: Raze' }
        ]
      },
      {
        name: 'Akun Kedua',
        tag: 'SMURF',
        icon: '⚡',
        copyId: { label: 'Riot ID (Smurf)', value: 'DONTOL#SAWIT' },
        title: 'Valorant',
        meta: 'Riot ID <b>DONTOL#SAWIT</b> • Level 22 • Rank <b>Bronze 3</b> • Agent Main <b>Phoenix</b>',
        art: 'img/valo/valo2-char.png',
        badge: { img: 'img/valo/valo-profile.webp', name: 'Bronze 3', sub: 'Level 22 • 14 Match Kompetitif' },
        stats: [
          { v: 225, d: 1, l: 'ACS', hl: 1 },
          { v: 0.97, d: 2, l: 'K/D Ratio' },
          { v: 144.9, d: 1, l: 'Damage / Round' },
          { v: 73.3, d: 1, s: '%', l: 'KAST' },
          { v: 9.4, d: 1, s: '%', l: 'Headshot' },
          { v: 1.47, d: 2, l: 'KAD Ratio' },
          { v: 221, l: 'Kills' },
          { v: 112, l: 'Assists' },
          { v: 6, l: 'Clutch (1v1)', hl: 1 },
          { v: 8, l: 'Flawless Round' }
        ],
        donut: { win: 8, lose: 6, pct: 57.1 },
        chips: ['Bronze 3', 'Level 22', 'Phoenix Main (75% WR)', 'Sunset 100% WR', '8 Menang dari 14 Match'],
        gallery: [
          { src: 'img/valo/valo-profile.webp', cap: 'Profil & Rank Bronze 3' },
          { src: 'img/valo/valo-comp.webp', cap: 'Competitive Overview' },
          { src: 'img/valo/valo2-topagent.png', cap: 'Top Agents: Phoenix (75% WR), Sage, Sova' },
          { src: 'img/valo/valo2-char.png', cap: 'Agent Main: Phoenix' }
        ]
      }
    ],
    copyId: { label: 'Riot ID Valorant', value: 'PrabowoAnjing#Botan' },
    title: 'Valorant',
    meta: 'Riot ID <b>PrabowoAnjing#Botan</b> • Level 181 • Rank <b>Silver 1</b> • Agent Main <b>Raze</b>',
    art: 'img/valo/valo1-char.png',
    badge: { img: 'img/valo/valo1-profile.png', name: 'Silver 1', sub: 'Level 181 • 709 Jam Playtime' },
    stats: [
      { v: 709, l: 'Jam Bermain', hl: 1 },
      { v: 1260, l: 'Total Match' },
      { v: 213.6, d: 1, l: 'ACS', hl: 1 },
      { v: 0.99, d: 2, l: 'K/D Ratio' },
      { v: 137.3, d: 1, l: 'Damage / Round' },
      { v: 68.9, d: 1, s: '%', l: 'KAST' },
      { v: 8.5, d: 1, s: '%', l: 'Headshot' },
      { v: 1.34, d: 2, l: 'KAD Ratio' },
      { v: 18038, l: 'Kills' },
      { v: 6326, l: 'Assists' },
      { v: 304, l: 'Clutches (1v1)', hl: 1 },
      { v: 767, l: 'Flawless Rounds' }
    ],
    donut: { win: 612, lose: 618, pct: 48.6 },
    chips: ['Silver 1', 'Level 181', 'Raze Main', '709 Jam Playtime', '612 Menang'],
    gallery: [
      { src: 'img/valo/valo1-profile.png', cap: 'Profil & Rank Silver 1' },
      { src: 'img/valo/valo1-comp.png', cap: 'Competitive Overview' },
      { src: 'img/valo/valo1-char.png', cap: 'Agent: Raze' }
    ]
  },
  roblox: {
    tab: 'Roblox', page: 'roblox.html', icon: 'img/roblox/icon-roblox.png', color: '#0066ff', genre: 'SANDBOX / MMO',
    copyId: { label: 'Username Roblox', value: 'O_forYou' },
    title: 'Roblox',
    meta: 'Display Name <b>Botan</b> • Username <b>@O_forYou</b> • Teman <b>13</b> • Avatar Main',
    art: 'img/roblox/roblox-char.png',
    badge: { img: 'img/roblox/icon-roblox.png', name: 'Botan', sub: '@O_forYou • 13 Teman' },
    stats: [
      { v: 13, l: 'Teman', hl: 1 },
      { v: 0, l: 'Pengikut' },
      { v: 0, l: 'Mengikuti' },
      { v: 12, s: '+', l: 'Game Dikunjungi', hl: 1 }
    ],
    chips: ['@O_forYou', 'Display Name: Botan', 'Rise of Nations', 'Mini Empires', 'Obrolan Suara', 'Sambung Kata'],
    gallery: [
      { src: 'img/roblox/roblox-profile.png', cap: 'Profil & Karakter Avatar Roblox (@O_forYou)' },
      { src: 'img/roblox/Beranda.png', cap: 'Beranda Roblox & Game yang Sering Dimainkan' }
    ]
  }
};
