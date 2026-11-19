import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}
interface Pulse {
  a: number;
  b: number;
  t: number;
  speed: number;
}

const LINK = 150;
const MOUSE_R = 190;

/**
 * Connected-node network with data pulses travelling along edges.
 * - Pauses when off-screen or the tab is hidden.
 * - Renders a single static frame under prefers-reduced-motion.
 * - Node count scales with area; DPR capped at 2.
 */
export function NetworkCanvas({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;
    let lastSpawn = 0;

    const init = () => {
      const count = Math.round(Math.min(95, Math.max(30, (w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.7,
      }));
      pulses = [];
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
      if (reduce) draw(0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      if (!reduce) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -20) n.x = w + 20;
          else if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          else if (n.y > h + 20) n.y = -20;
        }
      }

      // Edges
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const d = Math.sqrt(d2);
          let alpha = (1 - d / LINK) * 0.22;
          const mx = (a.x + b.x) / 2 - mouse.x;
          const my = (a.y + b.y) / 2 - mouse.y;
          const near = mx * mx + my * my < MOUSE_R * MOUSE_R;
          if (near) alpha *= 2.6;
          ctx.strokeStyle = near ? `rgba(61,230,214,${alpha})` : `rgba(110,160,255,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Cursor links
      if (mouse.x > -999) {
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_R * MOUSE_R) {
            const alpha = (1 - Math.sqrt(d2) / MOUSE_R) * 0.35;
            ctx.strokeStyle = `rgba(61,230,214,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // Data pulses
      if (!reduce) {
        if (time - lastSpawn > 260 && pulses.length < 14) {
          lastSpawn = time;
          const a = Math.floor(Math.random() * nodes.length);
          let best = -1;
          let bestD = Infinity;
          for (let j = 0; j < nodes.length; j++) {
            if (j === a) continue;
            const dx = nodes[a].x - nodes[j].x;
            const dy = nodes[a].y - nodes[j].y;
            const d2 = dx * dx + dy * dy;
            if (d2 < LINK * LINK && d2 < bestD && Math.random() > 0.3) {
              best = j;
              bestD = d2;
            }
          }
          if (best >= 0) pulses.push({ a, b: best, t: 0, speed: 0.008 + Math.random() * 0.01 });
        }
        pulses = pulses.filter((p) => p.t < 1);
        for (const p of pulses) {
          p.t += p.speed;
          const A = nodes[p.a];
          const B = nodes[p.b];
          const x = A.x + (B.x - A.x) * p.t;
          const y = A.y + (B.y - A.y) * p.t;
          const fade = Math.sin(Math.PI * p.t);
          ctx.fillStyle = `rgba(61,230,214,${0.12 * fade})`;
          ctx.beginPath();
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(160,250,240,${0.9 * fade})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Nodes
      for (const n of nodes) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const near = dx * dx + dy * dy < MOUSE_R * MOUSE_R;
        ctx.fillStyle = near ? 'rgba(143,243,233,0.95)' : 'rgba(170,195,230,0.5)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r + 0.5 : n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduce || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (reduce) draw(0);
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    if (finePointer) {
      window.addEventListener('pointermove', onPointer, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
    }
    document.addEventListener('visibilitychange', onVisibility);

    resize();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
