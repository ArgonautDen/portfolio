import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import styles from './Contact.module.css';
import useScrollReveal from '../hooks/useScrollReveal';

const vertexShader = `void main() { gl_Position = vec4(position, 1.0); }`;

const fragmentShader = /* glsl */`
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform float uMouseActive;

  #define PI 3.14159265

  float hash2(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
  float vnoise(vec2 p) {
    vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f);
    return mix(mix(hash2(i),hash2(i+vec2(1,0)),f.x),mix(hash2(i+vec2(0,1)),hash2(i+vec2(1,1)),f.x),f.y);
  }
  float fbm2(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*vnoise(p);p=p*2.1+vec2(.3,.4);a*=.5;}return v;}

  void main() {
    vec2 uv  = gl_FragCoord.xy / uResolution.xy;
    float ar = uResolution.x / uResolution.y;
    float t  = uTime;

    vec2 src    = vec2(0.0, 0.0);
    vec2 delta  = vec2((uv.x - src.x) * ar, uv.y - src.y);
    float dist  = length(delta);
    float speed = 0.55;
    float waves = 0.0;

    for (int i = 0; i < 6; i++) {
      float fi    = float(i);
      float delay = fi * 0.38;
      float freq  = 5.5 - fi * 0.4;
      float decay = 1.8 + fi * 0.6;
      float noise = fbm2(uv * 2.8 + vec2(t*0.04, t*0.03)) * 0.06;
      float distW = dist + noise;
      float ring  = sin(distW * freq * 2.0 * PI - t * speed * 3.5 + delay * 2.0);
      ring = pow(max(ring, 0.0), 2.5);
      float amp   = exp(-distW * decay) * (1.0 - fi * 0.14);
      float angle   = atan(delta.y, delta.x / ar);
      float angMask = smoothstep(-0.25, 0.15, angle) * smoothstep(PI*0.62, PI*0.42, angle);
      waves += ring * amp * angMask;
    }

    vec3 bg      = vec3(0.932, 0.930, 0.926);
    vec3 waveCol = vec3(0.0, 0.0, 0.0);
    vec3 col = mix(bg, waveCol, waves * 0.08);
    float srcGlow = exp(-dist * 3.5) * 0.04;
    col *= 1.0 - srcGlow;
    gl_FragColor = vec4(col, 1.0);
  }
`;

// ── Shader background ─────────────────────────────────────────────────────────

const ShaderBg = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(1);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime:        { value: 0 },
      uResolution:  { value: new THREE.Vector2() },
      uMouse:       { value: new THREE.Vector2(0.5, 0.5) },
      uMouseActive: { value: 0 },
    };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms }),
    );
    scene.add(mesh);

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let isVisible = false;
    const io = new IntersectionObserver(
      ([e]) => { isVisible = e.isIntersecting; },
      { threshold: 0 },
    );
    io.observe(el);

    const section = el.parentElement;
    let activeTarget = 0;

    const onMove  = (e) => {
      const r = section.getBoundingClientRect();
      uniforms.uMouse.value.set(
        (e.clientX - r.left) / r.width,
        1 - (e.clientY - r.top) / r.height,
      );
    };
    const onEnter = () => { activeTarget = 1; };
    const onLeave = () => { activeTarget = 0; };

    section.addEventListener('mousemove',  onMove);
    section.addEventListener('mouseenter', onEnter);
    section.addEventListener('mouseleave', onLeave);

    let rafId;
    const clock = new THREE.Clock();
    const tick = () => {
      if (isVisible) {
        uniforms.uTime.value = clock.getElapsedTime();
        const c = uniforms.uMouseActive.value;
        uniforms.uMouseActive.value = c + (activeTarget - c) * 0.05;
        renderer.render(scene, camera);
      }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      section.removeEventListener('mousemove',  onMove);
      section.removeEventListener('mouseenter', onEnter);
      section.removeEventListener('mouseleave', onLeave);
      mesh.geometry.dispose();
      mesh.material.dispose();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
};

// ── Иконки ────────────────────────────────────────────────────────────────────

const IconEmail = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconGitHub = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const IconTelegram = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8-1.7 8.02c-.12.55-.46.68-.93.42l-2.57-1.89-1.24 1.19c-.14.13-.25.24-.51.24l.18-2.6 4.72-4.26c.2-.18-.05-.28-.32-.1l-5.83 3.67-2.51-.78c-.55-.17-.56-.55.11-.81l9.79-3.77c.45-.16.85.11.81.67z" />
  </svg>
);
// eslint-disable-next-line no-unused-vars
const BgAvatar = ({ Icon }) => (
  <div className={styles.cardBgLogo} aria-hidden="true">
    <Icon />
  </div>
);

// ── 3D-карточка ──────────────────────────────────────────────────────────────

const ICONS = { Email: IconEmail, GitHub: IconGitHub, Telegram: IconTelegram };

const contacts = [
  {
    idx: '01', type: 'Email',    val: 'jokko0704@gmail.com',
    href: 'mailto:jokko0704@gmail.com',
    avatar: IconEmail,
  },
  {
    idx: '02', type: 'GitHub',   val: 'github.com/ArgonautDen',
    href: 'https://github.com/ArgonautDen',
    avatar: IconGitHub,
  },
  {
    idx: '03', type: 'Telegram', val: '@DeniRDV',
    href: 'https://t.me/DeniRDV',
    avatar: IconTelegram,
  },
];

const TICKER_TEXT = '◎ ВСЕ УШЛО В ДЫМ ◈ FRONTEND DEVELOPER ◉ REACT · CSS · JAVASCRIPT ◈ SHEIDER';
const tickerItems = Array(8).fill(TICKER_TEXT);

const TiltCard = ({ c }) => {
  const cardRef     = useRef(null);
  const frameRef    = useRef(null);
  const spinningRef = useRef(false);

  const stateRef = useRef({
    rotX: 0, rotY: 0, glX: 50, glY: 50, scale: 1,
    targetRotX: 0, targetRotY: 0, targetGlX: 50, targetGlY: 50, targetScale: 1,
  });

  const Icon = ICONS[c.type];

  const lerp = (a, b, t) => a + (b - a) * t;

  const startLoop = useCallback(() => {
    const s  = stateRef.current;
    const el = cardRef.current;
    if (!el) return;

    const animate = () => {
      if (spinningRef.current) {
        frameRef.current = null;
        return;
      }

      s.rotX  = lerp(s.rotX,  s.targetRotX,  0.1);
      s.rotY  = lerp(s.rotY,  s.targetRotY,  0.1);
      s.glX   = lerp(s.glX,   s.targetGlX,   0.1);
      s.glY   = lerp(s.glY,   s.targetGlY,   0.1);
      s.scale = lerp(s.scale, s.targetScale,  0.1);

      el.style.transform = `perspective(700px) rotateX(${s.rotX}deg) rotateY(${s.rotY}deg) scale3d(${s.scale},${s.scale},${s.scale})`;
      el.style.setProperty('--glare-x', `${s.glX}%`);
      el.style.setProperty('--glare-y', `${s.glY}%`);

      const stillMoving =
        Math.abs(s.rotX  - s.targetRotX)  > 0.01 ||
        Math.abs(s.rotY  - s.targetRotY)  > 0.01 ||
        Math.abs(s.scale - s.targetScale) > 0.001;

      frameRef.current = stillMoving ? requestAnimationFrame(animate) : null;
    };

    if (!frameRef.current) frameRef.current = requestAnimationFrame(animate);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (spinningRef.current) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top)  / rect.height;
    const s = stateRef.current;
    s.targetRotX = -(y - 0.5) * 22;
    s.targetRotY =  (x - 0.5) * 22;
    s.targetGlX  = x * 100;
    s.targetGlY  = y * 100;
    startLoop();
  }, [startLoop]);

  const onMouseEnter = useCallback(() => {
    if (spinningRef.current) return;
    stateRef.current.targetScale = 1.04;
    cardRef.current?.setAttribute('data-hovered', '');
    startLoop();
  }, [startLoop]);

  const onMouseLeave = useCallback(() => {
    if (spinningRef.current) return;
    const s = stateRef.current;
    s.targetRotX  = 0;
    s.targetRotY  = 0;
    s.targetScale = 1;
    cardRef.current?.removeAttribute('data-hovered');
    startLoop();
  }, [startLoop]);

  useEffect(() => () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <a
      href={c.href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      ref={cardRef}
      aria-label={`Открыть ${c.type}`}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.cardBgLogoWrap}>
        <BgAvatar Icon={c.avatar} />
      </div>

      <div className={styles.cardGlare} />

      <div className={styles.cardHeader}>
        <span className={styles.cardIdx}>{c.idx}</span>
        <span className={styles.cardArrow}>↗</span>
      </div>

      <div className={styles.cardIcon}>
        {Icon && <Icon />}
      </div>

      <span className={styles.cardType}>{c.type}</span>
      <span className={styles.cardVal}>{c.val}</span>
    </a>
  );
};

// ── Основной компонент ────────────────────────────────────────────────────────

const Contact = () => {
  const [time, setTime] = useState('');
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef);

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      <ShaderBg />

      <div className={styles.top} data-reveal="up">
        <span className={styles.label}>Связаться</span>
        <h2 className={styles.title}>
          Контакты
        </h2>
      </div>

      <div className={styles.tickerWrap}>
        <div className={styles.ticker}>
          {tickerItems.map((t, idx) => <span key={idx}>{t}</span>)}
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.cards}>
          {contacts.map((c, idx) => (
            <div
              key={idx}
              data-reveal="up"
              data-reveal-delay={String(idx * 120)}
            >
              <TiltCard c={c} />
            </div>
          ))}
        </div>

        <div className={styles.foot} data-reveal="up" data-reveal-delay="400">
          <span>©DeniRDV 2026</span>
          <div className={styles.footBar} />
          <span>#1c1d20 · {time}</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;