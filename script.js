/* ═══════════════════════════════════════════════════════════
   BIRTHDAY — script.js
   Modular, production-level vanilla JS
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── Global Configuration ─── */
const CONFIG = {
  name: 'My Love❤️',
  email: 'demo@gmail.com'
};

const FORMSUBMIT_EMAIL = CONFIG.email;
const RECIPIENT_NAME = CONFIG.name;

/* ─────────────────────────────────────────
   MODULE: NAME INJECTOR
───────────────────────────────────────── */
const NameInjector = (() => {
  const init = () => {
    document.title = `Happy Birthday, ${CONFIG.name} ✨`;
    document.querySelectorAll('.nav-logo').forEach(el => {
      el.textContent = `${CONFIG.name} ✦`;
    });
    document.querySelectorAll('.italic-name').forEach(el => {
      el.textContent = CONFIG.name;
    });
    document.querySelectorAll('.letter-salutation').forEach(el => {
      el.textContent = `Dear ${CONFIG.name},`;
    });
    document.querySelectorAll('.finale-footer').forEach(el => {
      el.textContent = `Happy Birthday, ${CONFIG.name}. Here's to every beautiful thing ahead. 🌟`;
    });
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: LOADER
───────────────────────────────────────── */
const Loader = (() => {
  const init = () => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('fade-out');
        loader.addEventListener('transitionend', () => loader.remove(), { once: true });
      }, 1200);
    });
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: CUSTOM CURSOR
───────────────────────────────────────── */
const Cursor = (() => {
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;
  let raf;

  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');

  const move = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  };

  const animateTrail = () => {
    trailX += (mouseX - trailX) * 0.14;
    trailY += (mouseY - trailY) * 0.14;
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    raf = requestAnimationFrame(animateTrail);
  };

  const init = () => {
    document.addEventListener('mousemove', move);
    animateTrail();

    // Sparkle trail on click
    document.addEventListener('click', (e) => {
      spawnSparkle(e.clientX, e.clientY);
    });
  };

  const spawnSparkle = (x, y) => {
    const s = document.createElement('div');
    s.className = 'floating-heart';
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.position = 'fixed';
    s.style.zIndex = '9990';
    s.textContent = ['✦', '✧', '⋆', '·', '✶'][Math.floor(Math.random() * 5)];
    s.style.color = Math.random() > 0.5 ? '#c9a84c' : '#e8748a';
    s.style.fontSize = (Math.random() * 10 + 10) + 'px';
    document.body.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  };

  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: SCROLL PROGRESS + NAV
───────────────────────────────────────── */
const ScrollUI = (() => {
  const bar = document.getElementById('scroll-progress');
  const nav = document.getElementById('nav');

  const update = () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
    nav.classList.toggle('scrolled', scrolled > 60);
  };

  const init = () => {
    window.addEventListener('scroll', update, { passive: true });
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: HERO PARTICLE SYSTEM
───────────────────────────────────────── */
const ParticleSystem = (() => {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], raf;

  const COLORS = ['rgba(201,168,76,', 'rgba(232,116,138,', 'rgba(240,208,128,', 'rgba(255,179,193,'];

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 10;
      this.r = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.6 + 0.2);
      this.life = 1;
      this.decay = Math.random() * 0.003 + 0.001;
      this.col = COLORS[Math.floor(Math.random() * COLORS.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
      if (this.life <= 0 || this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.col + this.life + ')';
      ctx.fill();
    }
  }

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };

  const loop = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  };

  const init = () => {
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 90; i++) particles.push(new Particle());
    loop();
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: HERO MOUSE GLOW FOLLOW
───────────────────────────────────────── */
const GlowFollow = (() => {
  const glow = document.getElementById('glow-follow');
  const init = () => {
    document.getElementById('hero').addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: TIME GREETING
───────────────────────────────────────── */
const TimeGreeting = (() => {
  const init = () => {
    const h = new Date().getHours();
    const el = document.getElementById('time-greeting');
    if (h < 12) el.textContent = '🌸 A Beautiful Morning to Celebrate the Most Beautiful Soul';
    else if (h < 17) el.textContent = '✨ The Stars Aligned the Day You Were Born';
    else el.textContent = '🌙 Tonight the World Celebrates You, Love';
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: CONFETTI
───────────────────────────────────────── */
const Confetti = (() => {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, pieces = [], raf, active = false;

  const COLORS_C = ['#c9a84c', '#f0d080', '#e8748a', '#ffb3c1', '#ffffff', '#ff8c69'];

  class Piece {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * H - H;
      this.w = Math.random() * 10 + 6;
      this.h = Math.random() * 6 + 3;
      this.color = COLORS_C[Math.floor(Math.random() * COLORS_C.length)];
      this.vx = (Math.random() - 0.5) * 3;
      this.vy = Math.random() * 4 + 2;
      this.angle = Math.random() * Math.PI * 2;
      this.va = (Math.random() - 0.5) * 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.angle += this.va;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
      ctx.restore();
    }
  }

  const resize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };

  const loop = () => {
    if (!active) return;
    ctx.clearRect(0, 0, W, H);
    pieces.forEach(p => { p.update(); p.draw(); });
    pieces = pieces.filter(p => p.y < H + 20);
    if (pieces.length > 0) raf = requestAnimationFrame(loop);
    else { ctx.clearRect(0, 0, W, H); active = false; }
  };

  const burst = (count = 200) => {
    resize();
    active = true;
    for (let i = 0; i < count; i++) pieces.push(new Piece());
    cancelAnimationFrame(raf);
    loop();
  };

  const init = () => { resize(); window.addEventListener('resize', resize); };
  return { init, burst };
})();

/* ─────────────────────────────────────────
   MODULE: SURPRISE FLOW (CTA button)
───────────────────────────────────────── */
const SurpriseFlow = (() => {
  const overlay = document.getElementById('transition-overlay');

  const init = () => {
    document.getElementById('open-surprise-btn').addEventListener('click', () => {
      // Show overlay
      overlay.classList.add('active');
      Confetti.burst(280);

      // Animate cake section entrance after delay
      setTimeout(() => {
        overlay.classList.remove('active');
        overlay.classList.add('exit');
        // Scroll to cake
        document.getElementById('cake-section').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => overlay.classList.remove('exit'), 800);
      }, 2800);
    });
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: BIRTHDAY CAKE — CANDLE BLOWING
───────────────────────────────────────── */
const CakeModule = (() => {
  const candles = Array.from(document.querySelectorAll('.candle'));
  const blowBtn = document.getElementById('blow-btn');
  const micBtn = document.getElementById('mic-btn');
  const blowCtrl = document.getElementById('blow-controls');
  const wishMessage = document.getElementById('wish-message');
  const wishText = document.getElementById('wish-text');
  let blownCount = 0;
  let allBlown = false;

  const WISH = `May this birthday bring you the kind of happiness that stays long after the candles are gone — the kind that lives in your smile, your dreams, and the little moments that make you who you are. I hope life gives you every beautiful thing you deserve, and I hope I get to be there for many of those moments. Happy Birthday,❤️✨ ${CONFIG.name}. 🌟`;

  const blowCandle = (index) => {
    if (allBlown) return;
    const c = candles[index];
    if (c.classList.contains('blown')) return;
    c.classList.add('blown');
    const smoke = c.querySelector('.candle-smoke');
    smoke.classList.remove('hidden');
    blownCount++;
    if (blownCount >= candles.length) celebrateAllBlown();
  };

  const blowAll = () => {
    if (allBlown) return;
    candles.forEach((_, i) => {
      setTimeout(() => blowCandle(i), i * 220);
    });
  };

  const celebrateAllBlown = () => {
    allBlown = true;
    blowCtrl.style.opacity = '0';
    blowCtrl.style.pointerEvents = 'none';

    // Send email via FormSubmit
    fetch("https://formsubmit.co/ajax/" + FORMSUBMIT_EMAIL + "", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        message: "🎂 She blew the candles! 💨✨"
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

    setTimeout(() => {
      wishMessage.classList.remove('hidden');
      typewriterEffect(wishText, WISH, 28);
      FireworksModule.start();
    }, 600);
  };

  // Typewriter for wish
  const typewriterEffect = (el, text, delay = 30) => {
    el.textContent = '';
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(tick, delay);
      }
    };
    tick();
  };

  // Microphone blow detection
  const initMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      src.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      let detected = false;

      const checkBlow = () => {
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        if (avg > 30 && !detected) {
          detected = true;
          blowAll();
        }
        if (!allBlown) requestAnimationFrame(checkBlow);
      };
      checkBlow();
      document.getElementById('mic-hint').textContent = '🎤 Microphone active — blow now!';
    } catch {
      document.getElementById('mic-hint').textContent = 'Microphone unavailable. Use the button!';
    }
  };

  const init = () => {
    blowBtn.addEventListener('click', blowAll);
    micBtn.addEventListener('click', initMic);
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: FIREWORKS
───────────────────────────────────────── */
const FireworksModule = (() => {
  const canvas = document.getElementById('fireworks-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], raf, running = false;

  const COLORS_F = ['#c9a84c', '#f0d080', '#e8748a', '#ffb3c1', '#ff6eb4', '#fff4a1'];

  class FWParticle {
    constructor(x, y) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      this.x = x; this.y = y;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.r = Math.random() * 3 + 1;
      this.color = COLORS_F[Math.floor(Math.random() * COLORS_F.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.08;
      this.vx *= 0.98;
      this.life -= this.decay;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + Math.floor(this.life * 255).toString(16).padStart(2, '0');
      ctx.fill();
    }
  }

  const spawnBurst = () => {
    const x = Math.random() * W * 0.8 + W * 0.1;
    const y = Math.random() * H * 0.5 + H * 0.05;
    for (let i = 0; i < 80; i++) particles.push(new FWParticle(x, y));
  };

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };

  let burstInterval;
  const loop = () => {
    if (!running) return;
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    particles = particles.filter(p => p.life > 0);
    raf = requestAnimationFrame(loop);
  };

  const start = () => {
    resize();
    running = true;
    loop();
    spawnBurst();
    burstInterval = setInterval(spawnBurst, 600);
    setTimeout(() => {
      clearInterval(burstInterval);
      running = false;
      cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, W, H);
    }, 6000);
  };

  const init = () => { resize(); window.addEventListener('resize', resize); };
  return { init, start };
})();

/* ─────────────────────────────────────────
   MODULE: FINALE FIREWORKS (looping)
───────────────────────────────────────── */
const FinaleFireworks = (() => {
  const canvas = document.getElementById('finale-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], raf, running = false;

  const COLORS_FF = ['#c9a84c', '#f0d080', '#e8748a', '#ffb3c1', '#ffffff', '#ff6eb4', '#fff4a1', '#88ddff'];

  class FFParticle {
    constructor(x, y) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 1.5;
      this.x = x; this.y = y;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 1;
      this.decay = Math.random() * 0.015 + 0.01;
      this.r = Math.random() * 3.5 + 1;
      this.color = COLORS_FF[Math.floor(Math.random() * COLORS_FF.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      this.vy += 0.06; this.vx *= 0.99;
      this.life -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  const resize = () => {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };

  const spawnBurst = () => {
    const x = Math.random() * W * 0.85 + W * 0.075;
    const y = Math.random() * H * 0.6 + 0.05 * H;
    for (let i = 0; i < 70; i++) particles.push(new FFParticle(x, y));
  };

  const loop = () => {
    if (!running) return;
    ctx.fillStyle = 'rgba(10,6,8,0.18)';
    ctx.fillRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    particles = particles.filter(p => p.life > 0);
    raf = requestAnimationFrame(loop);
  };

  const start = () => {
    if (running) return;
    resize();
    running = true;
    loop();
    spawnBurst();
    setInterval(spawnBurst, 900);
  };

  const init = () => {
    resize();
    window.addEventListener('resize', resize);
    // Start when finale section is in view
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) start();
    }, { threshold: 0.3 });
    obs.observe(document.getElementById('finale'));
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: SCROLL REVEAL (Intersection Observer)
───────────────────────────────────────── */
const ScrollReveal = (() => {
  const init = () => {
    const items = document.querySelectorAll('.reveal-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Staggered delay for grid children
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('revealed'), delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el, i) => {
      el.dataset.delay = (i % 4) * 100;
      observer.observe(el);
    });
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: ENVELOPE / LETTER
───────────────────────────────────────── */
const LetterModule = (() => {
  const envelope = document.getElementById('envelope');
  const prompt = document.getElementById('open-prompt');
  const paper = document.getElementById('letter-paper');
  const dateEl = document.getElementById('letter-date');
  let opened = false;

  const LETTER_P1 = "On this special day, I just want you to know how much you mean to me. Having you in my life has made so many ordinary moments feel truly special. ❤️.";
  const LETTER_P2 = "I hope your birthday is filled with the kind of happiness that stays in your heart. Keep smiling, keep dreaming, and always remember how deeply you are loved. ✨.";
  const LETTER_P3 = "You are someone I never want to take for granted. I’m grateful for every moment, every smile, and every memory we share. Happy Birthday, my love. ❤️";

  const typeIn = (el, text, delay = 22, onDone) => {
    el.textContent = '';
    let i = 0;
    const tick = () => {
      if (i < text.length) { el.textContent += text[i++]; setTimeout(tick, delay); }
      else if (onDone) onDone();
    };
    tick();
  };

  const spawnHearts = () => {
    const container = document.getElementById('letter-hearts');
    ['💛', '✨', '🌸', '💫', '🌷', '⭐'].forEach((emoji, idx) => {
      const span = document.createElement('span');
      span.style.cssText = `display:inline-block;font-size:1.4rem;opacity:0;animation:fade-up 0.5s ${idx * 0.12}s ease forwards`;
      span.textContent = emoji;
      container.appendChild(span);
    });
  };

  const openLetter = () => {
    if (opened) return;
    opened = true;
    envelope.classList.add('opened');
    prompt.textContent = '✉️ Opening…';

    // Send email via FormSubmit
    fetch("https://formsubmit.co/ajax/" + FORMSUBMIT_EMAIL + "", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        message: "💌 She opened the love letter! ✉️💛"
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));

    // Set date
    dateEl.textContent = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    });

    setTimeout(() => {
      envelope.style.opacity = '0';
      envelope.style.transform = 'scale(0.85) translateY(-20px)';
      envelope.style.transition = 'all 0.5s ease';
      setTimeout(() => {
        envelope.style.display = 'none';
        paper.classList.remove('hidden');
        typeIn(document.getElementById('letter-p1'), LETTER_P1, 18, () => {
          typeIn(document.getElementById('letter-p2'), LETTER_P2, 16, () => {
            typeIn(document.getElementById('letter-p3'), LETTER_P3, 14, spawnHearts);
          });
        });
      }, 500);
    }, 900);
  };

  const init = () => {
    envelope.addEventListener('click', openLetter);
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: WISHES GENERATOR
───────────────────────────────────────── */
const WishesGenerator = (() => {
  const WISHES = [
   "May your smile always stay as beautiful as it is today. ❤️",
   "May every dream in your heart slowly become reality. ✨",
   "May your days be filled with love, laughter, and beautiful moments. 💕",
   "May you always have countless reasons to smile. 🌸",
   "May every happiness you deserve find its way to you. 🫶",
   "May the love you give always come back to you, even more beautifully. ❤️",
   "May this new year of your life be softer, brighter, and happier. 🌙",
   "May every moment with you become a memory worth keeping. ✨",
   "May your heart always be surrounded by warmth, love, and peace. 💗",
   "May life give you more beautiful surprises than you ever expect. 🎀",
   "May you never forget how precious and special you are to me. ❤️",
   "May every ordinary day remind you how extraordinary you truly are. ⭐"

  ];

  let last = -1;
  const display = document.getElementById('wish-quote');
  const btn = document.getElementById('wish-spin-btn');

  const spin = () => {
    display.classList.add('fading');
    setTimeout(() => {
      let idx;
      do { idx = Math.floor(Math.random() * WISHES.length); } while (idx === last);
      last = idx;
      display.textContent = WISHES[idx];
      display.classList.remove('fading');

      // Send email via FormSubmit
      fetch("https://formsubmit.co/ajax/" + FORMSUBMIT_EMAIL + "", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          message: "✦ She spun a wish! ✦",
          wish: WISHES[idx]
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }, 350);
  };

  const init = () => {
    btn.addEventListener('click', spin);
    // Set initial
    last = Math.floor(Math.random() * WISHES.length);
    display.textContent = WISHES[last];
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: FINALE DECORATIONS
───────────────────────────────────────── */
const FinaleDecorations = (() => {
  const init = () => {
    // Lanterns
    const lanterns = document.getElementById('lanterns');
    ['🏮', '✨', '🏮', '💫', '🏮'].forEach(e => {
      const span = document.createElement('span');
      span.textContent = e;
      lanterns.appendChild(span);
    });

    // Balloons
    const balloons = document.getElementById('balloons');
    ['🎈', '🎀', '🎈', '🎊', '🎈'].forEach(e => {
      const span = document.createElement('span');
      span.textContent = e;
      balloons.appendChild(span);
    });
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: MUSIC (Web Audio API — ambient tone)
───────────────────────────────────────── */
const MusicModule = (() => {
  let ctx, active = false, nodes = [];

  const NOTES = [261.63, 329.63, 392.00, 523.25, 659.25]; // C major pentatonic
  let noteIdx = 0;

  const createTone = (freq, time) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filt = ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.value = 1200;

    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.04, time + 0.3);
    gain.gain.linearRampToValueAtTime(0, time + 2.5);
    osc.connect(filt);
    filt.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 3);
    nodes.push(osc);
  };

  let seqInterval;
  const startSequence = () => {
    const play = () => {
      if (!active) return;
      const now = ctx.currentTime;
      createTone(NOTES[noteIdx % NOTES.length], now);
      createTone(NOTES[(noteIdx + 2) % NOTES.length], now + 0.5);
      noteIdx++;
    };
    play();
    seqInterval = setInterval(play, 2200);
  };

  const toggle = () => {
    const btn = document.getElementById('music-btn');
    if (!active) {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      active = true;
      btn.querySelector('.music-label').textContent = 'Mute';
      btn.querySelector('.music-icon').style.color = '#c9a84c';
      startSequence();
    } else {
      active = false;
      clearInterval(seqInterval);
      btn.querySelector('.music-label').textContent = 'Music';
      btn.querySelector('.music-icon').style.color = '';
    }
  };

  const init = () => {
    document.getElementById('music-btn').addEventListener('click', toggle);
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: EASTER EGG (Konami Code)
───────────────────────────────────────── */
const EasterEgg = (() => {
  const sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
  let pos = 0;

  const burst = () => {
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.style.cssText = `position:fixed;left:${Math.random() * 90 + 5}%;top:${Math.random() * 80 + 5}%;font-size:2rem;pointer-events:none;z-index:9999;animation:float-heart 2.5s ease forwards`;
        el.textContent = ['🌸', '💛', '✨', '🌟', '💫', '🌺'][Math.floor(Math.random() * 6)];
        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
      }, i * 150);
    }
    Confetti.burst(120);
  };

  const init = () => {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === sequence[pos]) {
        pos++;
        if (pos === sequence.length) { burst(); pos = 0; }
      } else { pos = 0; }
    });
  };
  return { init };
})();

/* ─────────────────────────────────────────
   MODULE: FLOATING HEARTS ON CAKE HOVER
───────────────────────────────────────── */
const FloatingHearts = (() => {
  const spawn = (x, y) => {
    const h = document.createElement('div');
    h.className = 'floating-heart';
    h.style.left = x + 'px';
    h.style.top = y + 'px';
    h.style.position = 'fixed';
    h.style.pointerEvents = 'none';
    h.style.zIndex = '999';
    h.textContent = ['💛', '🌸', '✨', '💫', '❤️'][Math.floor(Math.random() * 5)];
    document.body.appendChild(h);
    h.addEventListener('animationend', () => h.remove());
  };

  const init = () => {
    let last = 0;
    document.getElementById('cake-wrapper').addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - last > 300) {
        last = now;
        spawn(e.clientX, e.clientY);
      }
    });
  };
  return { init };
})();

/* ─────────────────────────────────────────
   INIT ALL MODULES
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  NameInjector.init();
  Loader.init();
  Cursor.init();
  ScrollUI.init();
  ParticleSystem.init();
  GlowFollow.init();
  TimeGreeting.init();
  Confetti.init();
  SurpriseFlow.init();
  CakeModule.init();
  FireworksModule.init();
  ScrollReveal.init();
  LetterModule.init();
  WishesGenerator.init();
  FinaleDecorations.init();
  FinaleFireworks.init();
  MusicModule.init();
  EasterEgg.init();
  FloatingHearts.init();
});
