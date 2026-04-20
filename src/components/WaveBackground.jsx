import { useEffect, useRef, useState } from 'react';

const NUM_CURVES = 50;
const TENSION    = 0.5;
const SEGS       = 24;

function getCurvePoints(pts, tension, segs) {
  const _p = pts.slice();
  _p.unshift(pts[1], pts[0]);
  _p.push(pts[pts.length - 2], pts[pts.length - 1]);
  const res = [];
  for (let i = 2; i < _p.length - 4; i += 2) {
    for (let t = 0; t <= segs; t++) {
      const st = t / segs;
      const t1x = (_p[i+2] - _p[i-2]) * tension;
      const t2x = (_p[i+4] - _p[i  ]) * tension;
      const t1y = (_p[i+3] - _p[i-1]) * tension;
      const t2y = (_p[i+5] - _p[i+1]) * tension;
      const c1 =  2*st*st*st - 3*st*st + 1;
      const c2 = -2*st*st*st + 3*st*st;
      const c3 =    st*st*st - 2*st*st + st;
      const c4 =    st*st*st -   st*st;
      res.push(
        c1*_p[i]   + c2*_p[i+2] + c3*t1x + c4*t2x,
        c1*_p[i+1] + c2*_p[i+3] + c3*t1y + c4*t2y,
      );
    }
  }
  return res;
}

const WaveBackground = () => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  // Следим за изменением ширины окна
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return; // на мобильных не запускаем вообще

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let rafId;
    let isVisible = true;
    let lastWidth = 0;
    let resizeTimer;
    let state = null;

    const FPS_INTERVAL = 1000 / 40;
    let lastFrame = 0;

    const initState = (W, H) => {
      const SX = 0, SY = H;
      const EX = W, EY = H * 0.5;

      const dx = EX - SX, dy = EY - SY;
      const len = Math.sqrt(dx*dx + dy*dy);
      const px = -dy / len;
      const py =  dx / len;

      const ts      = [0, 0.25, 0.5, 0.75, 1.0];
      const spreads = [0, H*0.18, H*0.25, H*0.14, 0];
      const phases  = [0, 1.1, 2.3, 3.5, 4.7];
      const speeds  = [0, 0.00032, 0.00040, 0.00028, 0];

      const baseXs = ts.map(t => SX + t*(EX-SX));
      const baseYs = ts.map(t => SY + t*(EY-SY));

      state = { SX, SY, EX, EY, px, py, baseXs, baseYs, spreads, phases, speeds };
    };

    const setSize = () => {
      const parent = canvas.parentElement;
      const W = parent.clientWidth;
      const H = parent.clientHeight;
      canvas.width  = W;
      canvas.height = H;
      lastWidth = W;
      initState(W, H);
    };

    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const w = canvas.parentElement?.clientWidth;
        if (w && w !== lastWidth) setSize();
      }, 100);
    });

    setSize();
    ro.observe(canvas.parentElement);

    const io = new IntersectionObserver(
      ([e]) => { isVisible = e.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(canvas);

    const draw = (now) => {
      rafId = requestAnimationFrame(draw);
      if (!isVisible || !state) return;
      if (now - lastFrame < FPS_INTERVAL) return;
      lastFrame = now;

      const { SX, SY, EX, EY, px, py, baseXs, baseYs, spreads, phases, speeds } = state;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const curOff = phases.map((ph, i) =>
        Math.sin(now * speeds[i] + ph) * spreads[i] * 0.15
      );

      const grad = ctx.createLinearGradient(SX, SY, EX, EY);
      grad.addColorStop(0,    'rgba(28,29,32,0.80)');
      grad.addColorStop(0.55, 'rgba(28,29,32,0.18)');
      grad.addColorStop(1,    'rgba(28,29,32,0.00)');
      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1.0;

      for (let c = 0; c < NUM_CURVES; c++) {
        const t = c / (NUM_CURVES - 1);

        const flatPts = baseXs.map((bx, i) => {
          const perp = (t - 0.5) * 2 * spreads[i] + curOff[i];
          return [bx + px * perp, baseYs[i] + py * perp];
        }).flat();

        const edge = 1 - Math.abs(t - 0.5) * 2;
        ctx.globalAlpha = 0.22 + edge * 0.78;

        const cp = getCurvePoints(flatPts, TENSION, SEGS);
        ctx.beginPath();
        ctx.moveTo(cp[0], cp[1]);
        for (let i = 2; i < cp.length - 1; i += 2) ctx.lineTo(cp[i], cp[i+1]);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      ro.disconnect();
      io.disconnect();
    };
  }, [isMobile]); // перезапускаем если isMobile изменился

  if (isMobile) return null; // на мобильных не рендерим canvas вообще

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        0,
        willChange:    'transform',
        transform:     'translateZ(0)',
      }}
    />
  );
};

export default WaveBackground;