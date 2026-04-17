import { useEffect, useRef } from 'react';
import styles from './BubbleSkills.module.css';

import iconHtml    from '../assets/icons/html5.svg';
import iconCss     from '../assets/icons/css3.svg';
import iconJs      from '../assets/icons/javascript.svg';
import iconReact   from '../assets/icons/react.svg';
import iconGit     from '../assets/icons/git.svg';
import iconFigma   from '../assets/icons/figma.svg';
import iconVite    from '../assets/icons/vitejs.svg';
import iconBlender from '../assets/icons/blender.svg';

const SKILLS = [
  { name: 'HTML5',      icon: iconHtml },
  { name: 'CSS3',       icon: iconCss },
  { name: 'JavaScript', icon: iconJs },
  { name: 'React',      icon: iconReact },
  { name: 'Git',        icon: iconGit },
  { name: 'Figma',      icon: iconFigma },
  { name: 'Vite',       icon: iconVite },
  { name: 'Blender',    icon: iconBlender },
];

const OIL = [
  [228, 22, 14], [232, 25, 18], [225, 18, 20],
  [230, 28, 22], [235, 20, 16], [226, 24, 19], [233, 26, 15],
];

const RIM_COLORS = [
  [228, 18, 82], [232, 22, 70], [225, 15, 88],
  [230, 20, 76], [228, 25, 92],
];

const drawOil = (ctx, x, y, r, phase) => {
  for (let i = 0; i < OIL.length; i++) {
    const t  = (i / OIL.length + phase) % 1;
    const a  = t * Math.PI * 2;
    const [h, s, l] = OIL[i];
    const bx = x + Math.cos(a) * r * 0.38;
    const by = y + Math.sin(a) * r * 0.38;
    const br = r * (0.38 + 0.14 * Math.sin(a + 1));
    const g  = ctx.createRadialGradient(bx, by, 0, bx, by, br);
    g.addColorStop(0,    `hsla(${h},${s}%,${l}%,0.62)`);
    g.addColorStop(0.25, `hsla(${h},${s}%,${l}%,0.30)`);
    g.addColorStop(0.6,  `hsla(${h},${s}%,${l}%,0.08)`);
    g.addColorStop(1,    `hsla(${h},${s}%,${l}%,0)`);
    ctx.save();
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    ctx.restore();
  }
};

const createBubble = (canvasRef, skillPoolRef) => {
  const canvas = canvasRef.current;
  const W = canvas.width;
  const H = canvas.height;

  if (skillPoolRef.current.length === 0) {
    skillPoolRef.current = [...SKILLS];
  }
  const idx   = Math.floor(Math.random() * skillPoolRef.current.length);
  const skill = skillPoolRef.current.splice(idx, 1)[0];

  return {
    r:         30 + Math.random() * 34,
    x:         0,
    y:         0,
    vx:        (Math.random() - 0.5) * 0.45,
    vy:        -(0.22 + Math.random() * 0.30),
    wobble:    Math.random() * Math.PI * 2,
    wobbleSpd: 0.009 + Math.random() * 0.006,
    phase:     Math.random(),
    phaseSpd:  0.0006 + Math.random() * 0.0004,
    alive:     true,
    sqX: 1, sqY: 1,
    sqVX: 0, sqVY: 0,
    skill,
    glowPhase:  Math.random() * Math.PI * 2,
    glowSpeed:  0.00018 + Math.random() * 0.00022,
    pulseSpeed: 0.0008  + Math.random() * 0.0012,
    pulsePhase: Math.random() * Math.PI * 2,
    _init(initial) {
      this.x = this.r * 2 + Math.random() * (W - this.r * 4);
      this.y = initial
        ? Math.random() * (H - this.r * 2) + this.r
        : H + this.r + 20;
      /* lifetime: 5–12 секунд рандомно у каждого пузыря */
      this.birthTime = performance.now();
      this.lifetime  = 5000 + Math.random() * 7000;
      return this;
    },
  };
};

const bubbleBoop = (b, nx, ny, strength) => {
  const s = Math.min(strength, 1.0) * 0.06;
  b.sqVX -= nx * s;
  b.sqVY -= ny * s;
};

const bubbleUpdate = (b, canvasWidth, canvasHeight) => {
  b._canvasH = canvasHeight;
  b.wobble += b.wobbleSpd;
  b.phase  += b.phaseSpd;
  b.x += b.vx + Math.sin(b.wobble * 0.7) * 0.20;
  b.y += b.vy;

  if (b.x - b.r < 0) {
    b.x  = b.r;
    b.vx = Math.abs(b.vx) * 0.55;
    bubbleBoop(b, -1, 0, 0.5);
  }
  if (b.x + b.r > canvasWidth) {
    b.x  = canvasWidth - b.r;
    b.vx = -Math.abs(b.vx) * 0.55;
    bubbleBoop(b, 1, 0, 0.5);
  }

  /* Нижняя стенка — отталкивание, не лопание */
  if (b.y + b.r > b._canvasH) {
    b.y  = b._canvasH - b.r;
    b.vy = -Math.abs(b.vy) * 0.55;
    bubbleBoop(b, 0, 1, 0.5);
  }

  const stiff = 0.18, damp = 0.72;
  b.sqVX += (1 - b.sqX) * stiff; b.sqVX *= damp; b.sqX += b.sqVX;
  b.sqVY += (1 - b.sqY) * stiff; b.sqVY *= damp; b.sqY += b.sqVY;
  /* Подъёмная сила — пузыри всегда тянет вверх */
  b.vy -= 0.012;
  /* Ограничиваем максимальную скорость подъёма */
  if (b.vy < -0.55) b.vy = -0.55;

  b.vx *= 0.997;
};

const bubbleDraw = (ctx, b, now) => {
  const { x, y, r } = b;
  const wSX = 1 + Math.sin(b.wobble) * 0.020;
  const wSY = 1 - Math.sin(b.wobble) * 0.020;
  const sx  = b.sqX * wSX;
  const sy  = b.sqY * wSY;

  ctx.save();
  ctx.translate(x, y); ctx.scale(sx, sy); ctx.translate(-x, -y);

  /* База — холодный ледяной тинт */
  /* Тёмная сердцевина — провал (В) + кольцо у края (Е) + glow шейдера */
  const core = ctx.createRadialGradient(x, y, 0, x, y, r * 0.9);
  core.addColorStop(0,    'rgba(10,10,14,0.98)');
  core.addColorStop(0.30, 'rgba(14,16,22,0.85)');
  core.addColorStop(0.60, 'rgba(20,23,33,0.42)');
  core.addColorStop(0.85, 'rgba(20,23,33,0.12)');
  core.addColorStop(1,    'rgba(20,23,33,0)');
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = core; ctx.fill();

  const edge = ctx.createRadialGradient(x, y, r * 0.72, x, y, r);
  edge.addColorStop(0,   'rgba(14,16,22,0)');
  edge.addColorStop(0.7, 'rgba(14,16,22,0.38)');
  edge.addColorStop(1,   'rgba(10,10,14,0.78)');
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = edge; ctx.fill();

  const innerGlow = ctx.createRadialGradient(x, y, 0, x, y, r * 0.5);
  innerGlow.addColorStop(0, 'rgba(30,38,56,0.20)');
  innerGlow.addColorStop(1, 'rgba(30,38,56,0)');
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = innerGlow; ctx.fill();

  drawOil(ctx, x, y, r, b.phase);

  /* Внешний ободок */
  ctx.save();
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
  const rp  = b.phase * Math.PI * 2;
  const rim = ctx.createLinearGradient(
    x + Math.cos(rp) * r, y + Math.sin(rp) * r,
    x - Math.cos(rp) * r, y - Math.sin(rp) * r,
  );
  RIM_COLORS.forEach(([h, s, l], i, a) => {
    rim.addColorStop(i / (a.length - 1), `hsla(${h},${s}%,${l}%,0.92)`);
  });
  ctx.strokeStyle = rim; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.arc(x, y, r - 0.6, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();

  /* Внутренний ободок — толщина стекла */
  ctx.save();
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
  const rim2 = ctx.createLinearGradient(
    x + Math.cos(rp + 1.2) * r * 0.7, y + Math.sin(rp + 1.2) * r * 0.7,
    x - Math.cos(rp + 1.2) * r * 0.7, y - Math.sin(rp + 1.2) * r * 0.7,
  );
  rim2.addColorStop(0,   'rgba(255,255,255,0.45)');
  rim2.addColorStop(0.5, 'rgba(255,255,255,0.0)');
  rim2.addColorStop(1,   'rgba(56,61,82,0.18)');
  ctx.strokeStyle = rim2; ctx.lineWidth = 1.0;
  ctx.beginPath(); ctx.arc(x, y, r - 3.5, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();

  /* Блик — дуга-штрих, у каждого пузыря своя скорость и фаза */
  const glowAngle = b.glowPhase + now * b.glowSpeed;
  const arcHalf   = Math.PI * 0.28;
  const aStart    = glowAngle - arcHalf;
  const aEnd      = glowAngle + arcHalf;
  const hr        = r - 2.5;
  const midX      = x + Math.cos(glowAngle) * hr;
  const midY      = y + Math.sin(glowAngle) * hr;

  const hg = ctx.createLinearGradient(
    x + Math.cos(aStart) * hr, y + Math.sin(aStart) * hr,
    midX, midY,
  );
  hg.addColorStop(0,    'rgba(255,255,255,0)');
  hg.addColorStop(0.45, 'rgba(255,255,255,0.96)');
  hg.addColorStop(0.55, 'rgba(255,255,255,0.96)');
  hg.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.beginPath();
  ctx.arc(x, y, hr, aStart, aEnd);
  ctx.strokeStyle = hg;
  ctx.lineWidth   = 2.0;
  ctx.lineCap     = 'round';
  ctx.stroke();

  /* Точка + гало — пульсируют независимо */
  const pulse = 0.70 + 0.30 * Math.sin(now * b.pulseSpeed + b.pulsePhase);

  const dot = ctx.createRadialGradient(midX, midY, 0, midX, midY, r * 0.13);
  dot.addColorStop(0,   `rgba(255,255,255,${0.98 * pulse})`);
  dot.addColorStop(0.5, `rgba(200,210,230,${0.45 * pulse})`);
  dot.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.beginPath(); ctx.arc(midX, midY, r * 0.13, 0, Math.PI * 2);
  ctx.fillStyle = dot; ctx.fill();

  const glow = ctx.createRadialGradient(midX, midY, 0, midX, midY, r * 0.30);
  glow.addColorStop(0,   `rgba(56,61,82,${0.22 * pulse})`);
  glow.addColorStop(0.5, `rgba(56,61,82,${0.06 * pulse})`);
  glow.addColorStop(1,   'rgba(210,230,255,0)');
  ctx.beginPath(); ctx.arc(midX, midY, r * 0.30, 0, Math.PI * 2);
  ctx.fillStyle = glow; ctx.fill();

  /* Нижнее отражение */
  const ref = ctx.createRadialGradient(x, y + r * 0.55, 0, x, y + r * 0.55, r * 0.30);
  ref.addColorStop(0, 'rgba(14,16,22,0.28)');
  ref.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.beginPath(); ctx.arc(x, y + r * 0.55, r * 0.30, 0, Math.PI * 2);
  ctx.fillStyle = ref; ctx.fill();

  ctx.restore();
};

/* ── Пузырь касается AABB прямоугольника ── */
const hitsRect = (b, rect) => {
  const nearX = Math.max(rect.x, Math.min(b.x, rect.x + rect.width));
  const nearY = Math.max(rect.y, Math.min(b.y, rect.y + rect.height));
  return Math.hypot(b.x - nearX, b.y - nearY) < b.r;
};

/* ── Пузырь касается горизонтальной линии снизу (поднимается вверх) ── */
const hitsLineFromBelow = (b, lineY) => b.y - b.r <= lineY;

const bubbleContains = (b, mx, my) => Math.hypot(mx - b.x, my - b.y) < b.r;

const resolveCollisions = (bubbles) => {
  for (let i = 0; i < bubbles.length; i++) {
    const a = bubbles[i]; if (!a.alive) continue;
    for (let j = i + 1; j < bubbles.length; j++) {
      const bub = bubbles[j]; if (!bub.alive) continue;
      const dx   = bub.x - a.x, dy = bub.y - a.y;
      const dist = Math.hypot(dx, dy);
      const minD = a.r + bub.r;
      if (dist < minD && dist > 0.01) {
        const nx = dx / dist, ny = dy / dist;
        const overlap = (minD - dist) * 0.30;
        a.x   -= nx * overlap * 0.5; a.y   -= ny * overlap * 0.5;
        bub.x += nx * overlap * 0.5; bub.y += ny * overlap * 0.5;
        const dvx = a.vx - bub.vx, dvy = a.vy - bub.vy;
        const dot = dvx * nx + dvy * ny;
        if (dot > 0) {
          const imp = dot * 0.18;
          a.vx   -= imp * nx; a.vy   -= imp * ny;
          bub.vx += imp * nx; bub.vy += imp * ny;
          const s = Math.min(dot * 0.6, 1.0);
          bubbleBoop(a,    nx,  ny,  s);
          bubbleBoop(bub, -nx, -ny, s);
        }
      }
    }
  }
};

/* ══════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════ */
const BubbleSkills = ({ getBarriers }) => {
  const sceneRef     = useRef(null);
  const canvasRef    = useRef(null);
  const skillPoolRef = useRef([...SKILLS]);

  useEffect(() => {
    const scene  = sceneRef.current;
    const canvas = canvasRef.current;
    if (!scene || !canvas) return;

    const ctx = canvas.getContext('2d');
    let animId;
    let mouseX = -999, mouseY = -999;
    const particles = [];
    const badges    = [];
    const timers    = new Set();

    const resize = () => {
      canvas.width  = scene.clientWidth;
      canvas.height = scene.clientHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(scene);

    const bubbles = Array.from({ length: 6 }, () =>
      createBubble(canvasRef, skillPoolRef)._init(true),
    );

    const spawnParticles = (x, y, r) => {
      const hues = [300, 200, 160, 40, 260, 320, 180];
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2 + Math.random() * 0.4;
        const speed = r * 0.035 + Math.random() * r * 0.055;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4,
          life: 1,
          decay: 0.034 + Math.random() * 0.022,
          r: 1.5 + Math.random() * 2.8,
          h: hues[i % hues.length],
        });
      }
    };

    let glareRaf;
    const animateGlares = (now) => {
      badges.forEach(bd => {
        if (!bd.el.isConnected) return;
        const glare = bd.el.querySelector(`.${styles.sbGlare}`);
        const ring  = bd.el.querySelector(`.${styles.sbRing}`);
        const px  = 50 + Math.sin(now * bd.spX + bd.phX) * bd.ampX;
        const py  = 50 + Math.sin(now * bd.spY + bd.phY) * bd.ampY;
        const ddx = Math.cos(now * bd.spX + bd.phX) * bd.spX;
        const ddy = Math.cos(now * bd.spY + bd.phY) * bd.spY;
        const ang = Math.atan2(ddy, ddx) * (180 / Math.PI) + 90;
        /* пульс блика на badge — своя фаза у каждого */
        const pulse = 0.70 + 0.30 * Math.sin(now * bd.pulseSpeed + bd.pulsePhase);
        bd.el.style.setProperty('--mx',    `${px}%`);
        bd.el.style.setProperty('--my',    `${py}%`);
        bd.el.style.setProperty('--angle', `${ang}deg`);
        bd.el.style.setProperty('--pulse', String(pulse));
        if (glare) { glare.style.setProperty('--mx', `${px}%`); glare.style.setProperty('--my', `${py}%`); }
        if (ring)  { ring.style.setProperty('--angle', `${ang}deg`); }
      });
      glareRaf = requestAnimationFrame(animateGlares);
    };
    glareRaf = requestAnimationFrame(animateGlares);

    const popBubble = (b, mx, my) => {
      b.alive = false;
      spawnParticles(mx, my, b.r);

      const el = document.createElement('div');
      el.className = styles.skillBadge;
      el.innerHTML = `
        <div class="${styles.sbGlare}"></div>
        <div class="${styles.sbRing}"></div>
        <img
          class="${styles.sbIcon}"
          src="${b.skill.icon}"
          alt="${b.skill.name}"
          draggable="false"
        />
        <span class="${styles.sbText}">${b.skill.name}</span>
      `;
      el.style.left = `${mx}px`;
      el.style.top  = `${my}px`;
      scene.appendChild(el);

      const bd = {
        el,
        birthTime:  performance.now(),
        phX:        Math.random() * Math.PI * 2,
        phY:        Math.random() * Math.PI * 2,
        spX:        0.00028 + Math.random() * 0.00012,
        spY:        0.00022 + Math.random() * 0.00014,
        ampX:       28 + Math.random() * 16,
        ampY:       22 + Math.random() * 18,
        pulseSpeed: 0.0008  + Math.random() * 0.0012,
        pulsePhase: Math.random() * Math.PI * 2,
      };
      badges.push(bd);
      requestAnimationFrame(() => el.classList.add(styles.popIn));

      const t1 = setTimeout(() => {
        el.classList.add(styles.fadeOut);
        const t2 = setTimeout(() => {
          el.remove();
          const i = badges.indexOf(bd);
          if (i > -1) badges.splice(i, 1);
          timers.delete(t2);
        }, 700);
        timers.add(t2);
        timers.delete(t1);
      }, 5000);
      timers.add(t1);

      const t3 = setTimeout(() => {
        const idx = bubbles.indexOf(b);
        if (idx > -1) {
          bubbles[idx] = createBubble(canvasRef, skillPoolRef)._init(false);
        }
        timers.delete(t3);
      }, 500 + Math.random() * 700);
      timers.add(t3);
    };

    const handleClick = (e) => {
      const rect = scene.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (const b of bubbles) {
        if (b.alive && bubbleContains(b, mx, my)) {
          popBubble(b, mx, my);
          break;
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = scene.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    scene.addEventListener('click', handleClick);
    scene.addEventListener('mousemove', handleMouseMove);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.065; p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.h},8%,30%,${p.life * 0.70})`; ctx.fill();
      }

      const barriers = getBarriers ? getBarriers() : null;

      for (const b of bubbles) {
        if (!b.alive) continue;
        bubbleUpdate(b, canvas.width, canvas.height);

        /* Репульсия от мыши */
        const dx   = b.x - mouseX;
        const dy   = b.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < b.r + 55 && dist > 0) {
          const f = (b.r + 55 - dist) * 0.0018;
          b.vx += (dx / dist) * f;
          b.vy += (dy / dist) * f;
        }

        /* Авто-лопание — рандомный lifetime, не более 4 badge одновременно */
        if (
          performance.now() - b.birthTime > b.lifetime &&
          badges.length < 2
        ) {
          popBubble(b, b.x, b.y);
          continue;
        }

        /* Барьер — AABB фото */
        if (barriers?.rect && hitsRect(b, barriers.rect)) {
          popBubble(b, b.x, b.y);
          continue;
        }

        /* Барьер — нижний край текста */
        if (barriers?.lineY != null && hitsLineFromBelow(b, barriers.lineY)) {
          popBubble(b, b.x, b.y);
          continue;
        }

        /* Лопание при касании badge:
           — только свежие badge (моложе 2.5s)
           — только с вероятностью 30% (проверяем один раз при первом касании) */
        const hitBadge = badges.some(bd => {
          if (!bd.el.isConnected) return false;
          if (performance.now() - bd.birthTime > 2500) return false;
          const rect = bd.el.getBoundingClientRect();
          const wrapRect = scene.getBoundingClientRect();
          const bx = rect.left + rect.width  / 2 - wrapRect.left;
          const by = rect.top  + rect.height / 2 - wrapRect.top;
          const half = 22;
          const nearX = Math.max(bx - half, Math.min(b.x, bx + half));
          const nearY = Math.max(by - half, Math.min(b.y, by + half));
          return Math.hypot(b.x - nearX, b.y - nearY) < b.r;
        });
        if (hitBadge) {
          /* 30% шанс что badge лопнет пузырь */
          if (!b._badgeRoll) b._badgeRoll = Math.random();
          if (b._badgeRoll < 0.30) {
            popBubble(b, b.x, b.y);
            continue;
          }
        } else {
          /* сбрасываем ролл когда пузырь вышел из зоны */
          b._badgeRoll = null;
        }

        /* Страховка — верхняя граница canvas */
        if (b.y - b.r <= 0) {
          popBubble(b, b.x, Math.max(b.r, 0));
          continue;
        }
      }

      resolveCollisions(bubbles);

      for (const b of bubbles) {
        if (b.alive) bubbleDraw(ctx, b, performance.now());
      }

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      cancelAnimationFrame(glareRaf);
      ro.disconnect();
      scene.removeEventListener('click', handleClick);
      scene.removeEventListener('mousemove', handleMouseMove);
      timers.forEach(id => clearTimeout(id));
      timers.clear();
    };
  }, [getBarriers]);

  return (
    <div className={styles.scene} ref={sceneRef}>
      <canvas className={styles.canvas} ref={canvasRef} />
      <span className={styles.hint}>Лопай пузыри ✦</span>
    </div>
  );
};

export default BubbleSkills;