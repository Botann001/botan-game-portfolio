/* ============ CYBERPUNK BGM PLAYER ============ */
(function () {
  const TRACKS = [
    { title: 'Cipher', tag: 'CYBER SYNTH', src: 'audio/bgm.mp3' },
    { title: 'Bit Shift', tag: '8-BIT GAMING', src: 'audio/bit-shift.mp3' }
  ];

  let currentTrack = parseInt(localStorage.getItem('botan_bgm_track') || '0', 10);
  if (isNaN(currentTrack) || currentTrack < 0 || currentTrack >= TRACKS.length) currentTrack = 0;

  let savedVol = parseFloat(localStorage.getItem('botan_bgm_vol') || '0.6');
  if (isNaN(savedVol) || savedVol < 0 || savedVol > 1) savedVol = 0.6;

  const audio = new Audio();
  audio.loop = true;
  audio.preload = 'metadata';
  audio.volume = savedVol;
  audio.src = TRACKS[currentTrack].src;

  // Restore position if previously playing in this session
  const prevTime = parseFloat(sessionStorage.getItem('botan_bgm_time') || '0');
  if (!isNaN(prevTime) && prevTime > 0) {
    audio.currentTime = prevTime;
  }

  let audioCtx = null;
  let analyser = null;
  let dataArray = null;
  let isWebAudioReady = false;

  function initWebAudio() {
    if (isWebAudioReady) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      audioCtx = new AudioCtx();
      const source = audioCtx.createMediaElementSource(audio);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
      isWebAudioReady = true;
    } catch (e) {
      // Graceful fallback for cross-origin or local restricted environments
      isWebAudioReady = false;
    }
  }

  function createWidget() {
    if ($('#bgmWidget')) return;

    const widget = document.createElement('div');
    widget.id = 'bgmWidget';
    widget.className = 'bgm-widget';
    widget.setAttribute('role', 'region');
    widget.setAttribute('aria-label', 'Music Player');

    const track = TRACKS[currentTrack];

    widget.innerHTML = `
      ${!sessionStorage.getItem('botan_bgm_hint') ? '<div class="bgm-tooltip" id="bgmTooltip">Putar BGM 🎧</div>' : ''}
      <button class="bgm-play-btn" id="bgmPlayBtn" aria-label="Play Music" title="Putar / Jeda BGM">
        <svg id="bgmPlayIcon" viewBox="0 0 24 24"><polygon points="6 4 20 12 6 20 6 4"/></svg>
      </button>

      <div class="bgm-body">
        <div class="bgm-info">
          <span class="bgm-title" id="bgmTitle">${track.title}</span>
          <span class="bgm-status" id="bgmStatus">[PAUSED]</span>
        </div>
        <div class="bgm-viz" id="bgmViz">
          <span class="bgm-bar"></span>
          <span class="bgm-bar"></span>
          <span class="bgm-bar"></span>
          <span class="bgm-bar"></span>
          <span class="bgm-bar"></span>
          <span class="bgm-bar"></span>
        </div>
      </div>

      <div class="bgm-actions">
        <button class="bgm-icon-btn" id="bgmNextBtn" title="Ganti Lagu" aria-label="Ganti Lagu">
          <svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
        </button>

        <div class="bgm-vol-wrap">
          <button class="bgm-icon-btn" id="bgmMuteBtn" title="Mute / Unmute" aria-label="Mute / Unmute">
            <svg id="bgmVolIcon" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
          <input type="range" class="bgm-vol-slider" id="bgmVolSlider" min="0" max="1" step="0.05" value="${audio.volume}" title="Volume">
        </div>
      </div>
    `;

    document.body.appendChild(widget);

    const playBtn = $('#bgmPlayBtn', widget);
    const playIcon = $('#bgmPlayIcon', widget);
    const titleEl = $('#bgmTitle', widget);
    const statusEl = $('#bgmStatus', widget);
    const nextBtn = $('#bgmNextBtn', widget);
    const muteBtn = $('#bgmMuteBtn', widget);
    const volSlider = $('#bgmVolSlider', widget);
    const volIcon = $('#bgmVolIcon', widget);
    const tooltip = $('#bgmTooltip', widget);
    const bars = $$('.bgm-bar', widget);

    function updateIcons(isPlaying) {
      if (isPlaying) {
        widget.classList.add('playing');
        playIcon.innerHTML = '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>';
        statusEl.textContent = `[${TRACKS[currentTrack].tag}]`;
        if (tooltip) tooltip.remove();
        sessionStorage.setItem('botan_bgm_hint', '1');
      } else {
        widget.classList.remove('playing');
        playIcon.innerHTML = '<polygon points="6 4 20 12 6 20 6 4"/>';
        statusEl.textContent = '[PAUSED]';
      }
    }

    function togglePlay() {
      initWebAudio();
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (audio.paused) {
        audio.play().then(() => {
          updateIcons(true);
          sessionStorage.setItem('botan_bgm_playing', '1');
          sessionStorage.removeItem('botan_bgm_user_paused');
        }).catch(() => {
          updateIcons(false);
        });
      } else {
        audio.pause();
        updateIcons(false);
        sessionStorage.setItem('botan_bgm_playing', '0');
        sessionStorage.setItem('botan_bgm_user_paused', '1');
      }
    }

    function tryStartMusicWithFadeIn() {
      if (!audio.paused) return;
      initWebAudio();
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const targetVol = savedVol || 0.6;
      audio.volume = 0;
      audio.play().then(() => {
        updateIcons(true);
        sessionStorage.setItem('botan_bgm_playing', '1');
        // Smooth fade-in
        let cur = 0;
        const fadeTimer = setInterval(() => {
          cur += 0.05;
          if (cur >= targetVol) {
            audio.volume = targetVol;
            clearInterval(fadeTimer);
          } else {
            audio.volume = cur;
          }
        }, 60);
      }).catch(() => {
        updateIcons(false);
      });
    }

    function changeTrack(step = 1) {
      currentTrack = (currentTrack + step + TRACKS.length) % TRACKS.length;
      localStorage.setItem('botan_bgm_track', currentTrack.toString());
      const wasPlaying = !audio.paused;

      audio.src = TRACKS[currentTrack].src;
      audio.currentTime = 0;
      titleEl.textContent = TRACKS[currentTrack].title;

      if (wasPlaying) {
        audio.play().then(() => updateIcons(true)).catch(() => updateIcons(false));
      } else {
        statusEl.textContent = `[${TRACKS[currentTrack].tag}]`;
      }
    }

    function updateVolIcon(vol, muted) {
      if (muted || vol === 0) {
        volIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" stroke-width="2"/><line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" stroke-width="2"/>';
      } else if (vol < 0.5) {
        volIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
      } else {
        volIcon.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
      }
    }

    playBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', () => changeTrack(1));

    let prevVol = savedVol || 0.6;
    muteBtn.addEventListener('click', () => {
      if (audio.muted || audio.volume === 0) {
        audio.muted = false;
        audio.volume = prevVol || 0.6;
        volSlider.value = audio.volume;
      } else {
        prevVol = audio.volume;
        audio.muted = true;
        volSlider.value = 0;
      }
      updateVolIcon(audio.volume, audio.muted);
    });

    volSlider.addEventListener('input', e => {
      audio.muted = false;
      audio.volume = parseFloat(e.target.value);
      localStorage.setItem('botan_bgm_vol', audio.volume.toString());
      updateVolIcon(audio.volume, false);
    });

    // Animate Visualizer Bars
    let waveTick = 0;
    function renderViz() {
      if (!audio.paused) {
        if (isWebAudioReady && analyser && dataArray) {
          analyser.getByteFrequencyData(dataArray);
          const binIndices = [2, 5, 9, 14, 20, 26];
          bars.forEach((bar, idx) => {
            const val = dataArray[binIndices[idx]] || 0;
            const h = Math.max(3, Math.min(15, (val / 255) * 15));
            bar.style.height = `${h.toFixed(1)}px`;
          });
        } else {
          // Algorithmic dynamic wave fallback
          waveTick += 0.15;
          bars.forEach((bar, idx) => {
            const h = 4 + Math.abs(Math.sin(waveTick + idx * 0.9) * 9 + Math.cos(waveTick * 0.7 + idx) * 3);
            bar.style.height = `${Math.min(15, Math.max(3, h)).toFixed(1)}px`;
          });
        }
      } else {
        bars.forEach(bar => { bar.style.height = '3px'; });
      }
      requestAnimationFrame(renderViz);
    }
    renderViz();

    // ============ AUTO-PLAY ON FIRST USER CLICK / GESTURE ============
    const userExplicitlyPaused = sessionStorage.getItem('botan_bgm_user_paused') === '1';

    // 1. Try immediate auto-play (if browser allows it)
    if (!userExplicitlyPaused) {
      audio.play().then(() => {
        updateIcons(true);
        sessionStorage.setItem('botan_bgm_playing', '1');
      }).catch(() => {
        // Autoplay blocked: wait for first click/tap anywhere on page
        updateIcons(false);
      });
    }

    // 2. Click anywhere on the webpage to start music (without removing or bypassing the player widget)
    const onAnyFirstInteraction = (e) => {
      if (sessionStorage.getItem('botan_bgm_user_paused') === '1') return;
      if (e && e.target && e.target.closest && e.target.closest('#bgmWidget')) return; // handled by widget buttons

      tryStartMusicWithFadeIn();

      ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, onAnyFirstInteraction);
      });
    };

    if (!userExplicitlyPaused) {
      ['pointerdown', 'touchstart', 'click', 'keydown'].forEach(evt => {
        window.addEventListener(evt, onAnyFirstInteraction, { once: true, passive: true });
      });
    }

    // Save audio position on page leave
    const saveState = () => {
      sessionStorage.setItem('botan_bgm_time', audio.currentTime.toString());
      sessionStorage.setItem('botan_bgm_playing', audio.paused ? '0' : '1');
    };
    window.addEventListener('beforeunload', saveState);
    window.addEventListener('pagehide', saveState);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
