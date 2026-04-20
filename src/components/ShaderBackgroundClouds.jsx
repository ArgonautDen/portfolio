import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = /* glsl */`
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */`
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;       // нормализованные координаты мыши 0..1
  uniform float uMouseActive; // 0 = мышь ушла, 1 = мышь над секцией

  // ── Noise ──────────────────────────────────────────────────────────────────
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),             hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * vnoise(p);
      p  = p * 2.03 + vec2(0.31, 0.17);
      a *= 0.48;
    }
    return v;
  }

  // ── Облака с mouse offset ──────────────────────────────────────────────────
  float cloudDensity(vec2 uv, float t, vec2 mouseOffset) {
    uv += mouseOffset;

    vec2 q = vec2(
      fbm(uv + vec2(t * 0.05, t * 0.03)),
      fbm(uv + vec2(3.2, 1.6) + vec2(t * 0.04, t * 0.06))
    );
    vec2 r = vec2(
      fbm(uv + 2.5 * q + vec2(1.7, 9.2) + t * 0.02),
      fbm(uv + 2.5 * q + vec2(8.3, 2.8) + t * 0.015)
    );

    return smoothstep(0.38, 0.75, fbm(uv + 3.0 * r));
  }

  float fakeScatter(vec2 uv, float t, vec2 mouseOffset) {
    vec2 lightDir = normalize(vec2(0.6, 0.8) + uMouse * 0.4 * uMouseActive);
    float d0 = cloudDensity(uv, t, mouseOffset);
    float d1 = cloudDensity(uv + lightDir * 0.04, t, mouseOffset);
    float d2 = cloudDensity(uv + lightDir * 0.09, t, mouseOffset);
    return d0 * (1.0 - d1 * 0.4) * (1.0 - d2 * 0.25);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    uv.x *= uResolution.x / uResolution.y;
    uv *= 1.8;

    float t = uTime;

    vec2 mouseOffset = (uMouse - 0.5) * 0.18 * uMouseActive;

    float density = cloudDensity(uv, t, mouseOffset);
    float scatter = fakeScatter(uv, t, mouseOffset);

    vec3 bgColor    = vec3(0.055, 0.055, 0.055);
    vec3 cloudDark  = vec3(0.08, 0.09, 0.13);
    vec3 cloudLight = vec3(0.22, 0.24, 0.32);
    vec3 cloudColor = mix(cloudDark, cloudLight, scatter);

    vec3 col = mix(bgColor, cloudColor, density);

    // Виньетка
    vec2  vc   = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
    float vign = 1.0 - dot(vc * vec2(0.7, 1.0), vc * vec2(0.7, 1.0)) * 0.35;
    col *= vign;

    // Лёгкое свечение под курсором
    vec2  muv      = gl_FragCoord.xy / uResolution.xy;
    float mdist    = length(muv - uMouse);
    float glow     = smoothstep(0.35, 0.0, mdist) * 0.06 * uMouseActive;
    col += vec3(0.12, 0.15, 0.22) * glow;

    // Film grain
    float grain = (hash(gl_FragCoord.xy + uTime * 0.1) - 0.5) * 0.018;
    col += grain;

    gl_FragColor = vec4(max(col, 0.0), 1.0);
  }
`;

const ShaderBackgroundClouds = () => {
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
      new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    );
    scene.add(mesh);

    // ── Resize: только по ширине окна, высота = window ──────────────────────
    // Canvas покрывает весь viewport по высоте — шейдер фоновый, ему не нужно
    // точно следовать за высотой секции. Раскрытие .desc меняет только высоту
    // секции — мы это игнорируем и не делаем setSize вообще.
    // Ресайз срабатывает только когда меняется ширина окна (реальный resize).
    const section = el.parentElement;
    let lastWidth = 0;
    let resizeTimer;

    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        if (w === lastWidth) return; // высота изменилась — игнорируем
        lastWidth = w;
        renderer.setSize(w, h, false);
        uniforms.uResolution.value.set(w, h);
      }, 100);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    // Первый вызов — сразу без дебаунса
    lastWidth = window.innerWidth;
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);

    // IntersectionObserver — рендер только когда секция видна
    let isVisible = false;
    const io = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(el);

    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      uniforms.uMouse.value.set(
        (e.clientX - rect.left)  / rect.width,
        1.0 - (e.clientY - rect.top) / rect.height
      );
    };

    let activeTarget = 0;
    const onMouseEnter = () => { activeTarget = 1; };
    const onMouseLeave = () => { activeTarget = 0; };

    section.addEventListener('mousemove',  onMouseMove);
    section.addEventListener('mouseenter', onMouseEnter);
    section.addEventListener('mouseleave', onMouseLeave);

    // Render loop — cap 30fps, рендер только когда секция видна
    let rafId;
    const clock = new THREE.Clock();
    const FPS_INTERVAL = 1000 / 30;
    let lastFrame = 0;

    const tick = (now) => {
      rafId = requestAnimationFrame(tick);
      if (!isVisible) return;
      if (now - lastFrame < FPS_INTERVAL) return;
      lastFrame = now;

      uniforms.uTime.value = clock.getElapsedTime();

      const cur = uniforms.uMouseActive.value;
      uniforms.uMouseActive.value = cur + (activeTarget - cur) * 0.05;

      renderer.render(scene, camera);
    };
    requestAnimationFrame(tick);

    return () => {
      clearTimeout(resizeTimer); // <-- чистим дебаунс-таймер
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      section.removeEventListener('mousemove',  onMouseMove);
      section.removeEventListener('mouseenter', onMouseEnter);
      section.removeEventListener('mouseleave', onMouseLeave);
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
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  );
};

export default ShaderBackgroundClouds;