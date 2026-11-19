import { useEffect, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { Check, FileText, Search, Sparkles } from 'lucide-react';
import { EASE } from '../../lib/motion';

/**
 * Layered, floating product panels. Abstract by design: they reference real
 * product capabilities without displaying invented data.
 */
export function HeroPanels() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my, reduce]);

  return (
    // Composed at a fixed 480×560 and scaled to the column, so the arrangement is identical at every width.
    <div className="relative h-[440px] w-full xl:h-[560px]" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[480px] -translate-x-1/2 -translate-y-1/2 scale-[0.77] xl:scale-100">
      {/* Orbit rings */}
      <div className="absolute left-1/2 top-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" />
      <div className="absolute left-1/2 top-1/2 size-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line" />
      <div className="absolute left-1/2 top-1/2 size-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

      <Layer x={sx} y={sy} depth={18} className="left-0 top-[44px] z-20 w-[230px]" delay={0.55} floatDelay="0s">
        <PipelinePanel />
      </Layer>

      <Layer x={sx} y={sy} depth={34} className="right-0 top-[150px] z-10 w-[290px]" delay={0.7} floatDelay="-3s">
        <CreditPanel />
      </Layer>

      <Layer x={sx} y={sy} depth={24} className="bottom-0 left-[3%] z-20 w-[260px]" delay={0.85} floatDelay="-6s">
        <FinancePanel />
      </Layer>

      <Layer x={sx} y={sy} depth={46} className="right-0 top-0 z-30" delay={1.05} floatDelay="-4.5s">
        <div className="glass flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[0.66rem] tracking-wide text-fg-muted">
          <span className="text-accent">deterministic engine</span>
          <span className="text-fg-dim">→</span>
          <span>LLM interpretation</span>
        </div>
      </Layer>
      </div>
    </div>
  );
}

function Layer({
  children,
  className,
  x,
  y,
  depth,
  delay,
  floatDelay,
}: {
  children: ReactNode;
  className: string;
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth: number;
  delay: number;
  floatDelay: string;
}) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ x: tx, y: ty }}
      initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <div className="animate-float will-change-transform" style={{ animationDelay: floatDelay }}>
        {children}
      </div>
    </motion.div>
  );
}

function PanelHeader({ name, tag }: { name: string; tag: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
      <div className="flex items-center gap-2">
        <span className="flex gap-1">
          <span className="size-1.5 rounded-full bg-fg-dim/50" />
          <span className="size-1.5 rounded-full bg-fg-dim/50" />
          <span className="size-1.5 rounded-full bg-fg-dim/50" />
        </span>
        <span className="text-[0.72rem] font-medium text-fg">{name}</span>
      </div>
      <span className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-fg-dim">{tag}</span>
    </div>
  );
}

function PipelinePanel() {
  const steps = ['Target country', 'Product & quantity', 'Buyer discovery', 'AI analysis', 'PDF report'];
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <PanelHeader name="LeadNova" tag="Pipeline" />
      <ol className="space-y-2.5 px-4 py-3.5">
        {steps.map((s, i) => (
          <motion.li
            key={s}
            className="flex items-center gap-2.5 text-[0.72rem]"
            initial={{ opacity: 0.35 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.35, duration: 0.5 }}
          >
            <motion.span
              className="grid size-4 place-items-center rounded-full border"
              initial={{ borderColor: 'rgba(148,172,205,0.25)', backgroundColor: 'rgba(61,230,214,0)' }}
              animate={{ borderColor: 'rgba(61,230,214,0.6)', backgroundColor: 'rgba(61,230,214,0.15)' }}
              transition={{ delay: 1.2 + i * 0.35, duration: 0.4 }}
            >
              <Check size={9} className="text-accent" strokeWidth={3} />
            </motion.span>
            <span className={i === steps.length - 1 ? 'text-fg' : 'text-fg-muted'}>{s}</span>
            {i === steps.length - 1 && <FileText size={12} className="ml-auto text-accent" />}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function CreditPanel() {
  const ratings = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C', 'D'];
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <PanelHeader name="ByteCheck UZ" tag="Credit" />
      <div className="space-y-4 px-4 py-4">
        <div className="flex items-center gap-2 rounded-lg border border-line bg-ink-950/60 px-3 py-2">
          <Search size={12} className="text-fg-dim" />
          <span className="font-mono text-[0.66rem] tracking-[0.2em] text-fg-dim">INN</span>
          <span className="ml-1 font-mono text-[0.66rem] tracking-[0.3em] text-fg-muted">•••••••••</span>
        </div>
        <div>
          <div className="mb-2 flex justify-between font-mono text-[0.58rem] uppercase tracking-[0.14em] text-fg-dim">
            <span>Score 0–100</span>
            <span>Rating</span>
          </div>
          <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-azure to-accent"
              initial={{ width: '0%' }}
              animate={{ width: '72%' }}
              transition={{ delay: 1.3, duration: 1.6, ease: EASE }}
            />
          </div>
        </div>
        <div className="grid grid-cols-10 gap-1">
          {ratings.map((r, i) => (
            <span
              key={r}
              className={`rounded-[4px] py-1 text-center font-mono text-[0.5rem] ${
                i === 2 ? 'bg-accent/20 text-accent-soft ring-1 ring-accent/50' : 'bg-white/[0.03] text-fg-dim'
              }`}
            >
              {r}
            </span>
          ))}
        </div>
        <div className="flex items-start gap-2 rounded-lg bg-white/[0.025] p-2.5">
          <Sparkles size={12} className="mt-0.5 shrink-0 text-accent" />
          <div className="w-full space-y-1.5">
            <div className="skeleton h-1.5 w-[92%]" />
            <div className="skeleton h-1.5 w-[70%]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FinancePanel() {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <PanelHeader name="ByteReport" tag="Cash flow" />
      <div className="px-4 pb-4 pt-3">
        <svg viewBox="0 0 240 80" className="h-[78px] w-full" fill="none">
          <defs>
            <linearGradient id="hp-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#3de6d6" stopOpacity="0.25" />
              <stop offset="1" stopColor="#3de6d6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 60 C20 52 36 58 52 46 S84 30 104 38 S140 22 160 26" stroke="#3de6d6" strokeWidth="1.6" />
          <path d="M0 60 C20 52 36 58 52 46 S84 30 104 38 S140 22 160 26 V80 H0Z" fill="url(#hp-area)" />
          <path d="M160 26 C178 22 196 28 214 18 S232 14 240 12" stroke="#5b9dff" strokeWidth="1.4" strokeDasharray="4 4" />
          <circle cx="104" cy="38" r="3" fill="#ff7a6b" />
          <line x1="160" x2="160" y1="8" y2="80" stroke="rgba(148,172,205,0.2)" strokeDasharray="2 3" />
        </svg>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-1">
            {['UZ', 'RU', 'EN'].map((l, i) => (
              <span
                key={l}
                className={`rounded px-1.5 py-0.5 font-mono text-[0.55rem] ${i === 2 ? 'bg-accent/15 text-accent-soft' : 'text-fg-dim'}`}
              >
                {l}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-3 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-fg-dim">
            <span className="flex items-center gap-1">
              <span className="h-px w-3 bg-accent" />
              Actual
            </span>
            <span className="flex items-center gap-1">
              <span className="h-px w-3 border-t border-dashed border-azure" />
              Forecast
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
