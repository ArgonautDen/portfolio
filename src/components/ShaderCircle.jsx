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

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),             hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  // 4 октавы — достаточно для маленького размера
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * vnoise(p);
      p  = p * 2.03 + vec2(0.31, 0.17);
      a *= 0.48;
    }
    return v;
  }

  float cloudDensity(vec2 uv, float t) {
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

  // Упрощённый scatter — один сдвиг вместо двух
  float fakeScatter(vec2 uv, float t) {
    vec2 lightDir = normalize(vec2(0.6, 0.8));
    float d0 = cloudDensity(uv, t);
    float d1 = cloudDensity(uv + lightDir * 0.06, t);
    return d0 * (1.0 - d1 * 0.45);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    uv.x *= uResolution.x / uResolution.y;
    uv *= 2.4;

    float t       = uTime;
    float density = cloudDensity(uv, t);
    float scatter = fakeScatter(uv, t);

    vec3 bgColor    = vec3(0.055, 0.055, 0.055);
    vec3 cloudDark  = vec3(0.08, 0.09, 0.13);
    vec3 cloudLight = vec3(0.22, 0.24, 0.32);
    vec3 cloudColor = mix(cloudDark, cloudLight, scatter);
    vec3 col        = mix(bgColor, cloudColor, density);

    // Виньетка
    vec2  vc   = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
    float vign = 1.0 - dot(vc * vec2(0.7, 1.0), vc * vec2(0.7, 1.0)) * 0.35;
    col *= vign;

    // Зерно
    float grain = (hash(gl_FragCoord.xy + uTime * 0.1) - 0.5) * 0.018;
    col += grain;

    gl_FragColor = vec4(max(col, 0.0), 1.0);
  }
`;

const SIZE = 250;

const ShaderCircle = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(1);
    renderer.setSize(SIZE, SIZE, false);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime:       { value: 0 },
      uResolution: { value: new THREE.Vector2(SIZE, SIZE) },
    };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    );
    scene.add(mesh);

    // Рендер только когда виден
    let isVisible = false;
    const io = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(el);

    // 30 fps cap
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
      renderer.render(scene, camera);
    };
    requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
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
        width:  SIZE,
        height: SIZE,
        borderRadius: '50%',
        overflow: 'hidden',
        pointerEvents: 'none',
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    />
  );
};

export default ShaderCircle;
