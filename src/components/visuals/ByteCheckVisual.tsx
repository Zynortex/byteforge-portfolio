import { motion } from 'framer-motion';
import { FileText, Search, Sparkles } from 'lucide-react';
import { EASE } from '../../lib/motion';
import { MockCard, MockLabel } from './shared';

const ratings = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C', 'D'];
const ratios = ['76%', '48%', '64%', '35%'];

export function ByteCheckVisual() {
  // Semicircle gauge: arc length of a r=60 half circle
  const L = Math.PI * 60;
  return (
    <div className="flex h-full flex-col gap-3 p-3 @lg:p-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-line bg-ink-950/60 px-3 py-2">
          <Search size={13} className="text-fg-dim" />
          <span className="font-mono text-[0.62rem] tracking-[0.2em] text-fg-dim">INN</span>
          <span className="font-mono text-[0.66rem] tracking-[0.35em] text-fg-muted">•••••••••</span>
        </div>
        <span className="rounded-lg bg-accent/90 px-3 py-2 text-[0.68rem] font-medium text-ink-950">Analyse</span>
      </div>

      <div className="grid flex-1 gap-3 @lg:grid-cols-2">
        <MockCard className="flex flex-col">
          <div className="flex items-center justify-between">
            <MockLabel>Credit score</MockLabel>
            <MockLabel>0–100</MockLabel>
          </div>
          <div className="relative mx-auto mt-2 w-full max-w-[200px]">
            <svg viewBox="0 0 140 78" className="w-full">
              <defs>
                <linearGradient id="bc-gauge" x1="0" x2="1">
                  <stop offset="0" stopColor="#ff7a6b" />
                  <stop offset="0.5" stopColor="#5b9dff" />
                  <stop offset="1" stopColor="#3de6d6" />
                </linearGradient>
              </defs>
              <path d="M10 70 A60 60 0 0 1 130 70" stroke="rgba(148,172,205,0.12)" strokeWidth="8" fill="none" strokeLinecap="round" />
              <motion.path
                d="M10 70 A60 60 0 0 1 130 70"
                stroke="url(#bc-gauge)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={L}
                initial={{ strokeDashoffset: L }}
                whileInView={{ strokeDashoffset: L * 0.28 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
              />
              <motion.g
                style={{ originX: 0.5, originY: 1 }}
                initial={{ rotate: -90 }}
                whileInView={{ rotate: 39.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
              >
                <line x1="70" y1="70" x2="70" y2="24" stroke="#e8eef6" strokeWidth="1.6" strokeLinecap="round" />
              </motion.g>
              <circle cx="70" cy="70" r="4" fill="#e8eef6" />
            </svg>
          </div>
          <div className="mt-auto grid grid-cols-10 gap-0.5 pt-3">
            {ratings.map((r, i) => (
              <span
                key={r}
                className={`rounded-[3px] py-1 text-center font-mono text-[0.46rem] @md:text-[0.52rem] ${
                  i === 2 ? 'bg-accent/20 text-accent-soft ring-1 ring-accent/50' : 'bg-white/[0.03] text-fg-dim'
                }`}
              >
                {r}
              </span>
            ))}
          </div>
        </MockCard>

        <div className="hidden flex-col gap-3 @lg:flex">
          <MockCard>
            <MockLabel>Financial ratios</MockLabel>
            <div className="mt-3 space-y-2.5">
              {ratios.map((w, i) => (
                <div key={w} className="flex items-center gap-2">
                  <div className="skeleton h-1.5 w-12 shrink-0" />
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                    <motion.div
                      className="h-full rounded-full bg-accent/75"
                      initial={{ width: '0%' }}
                      whileInView={{ width: w }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: EASE, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </MockCard>
          <MockCard className="flex-1">
            <div className="flex items-center justify-between">
              <MockLabel className="flex items-center gap-1.5">
                <Sparkles size={10} className="text-accent" /> AI commentary
              </MockLabel>
              <span className="flex items-center gap-1 font-mono text-[0.52rem] text-fg-dim">
                <FileText size={10} /> PDF
              </span>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="skeleton h-1.5 w-full" />
              <div className="skeleton h-1.5 w-[82%]" />
              <div className="skeleton h-1.5 w-[66%]" />
            </div>
          </MockCard>
        </div>
      </div>
    </div>
  );
}
