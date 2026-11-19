import { motion } from 'framer-motion';
import { FileSpreadsheet, FileText, Image, Mic, Sparkles, Type } from 'lucide-react';
import { EASE } from '../../lib/motion';
import { MockCard, MockLabel } from './shared';

const bars = ['84%', '62%', '51%', '38%', '26%', '17%'];

export function ByteReportVisual() {
  const C = 2 * Math.PI * 34;
  return (
    <div className="flex h-full flex-col gap-3 p-3 @lg:p-4">
      <div className="flex items-center justify-between gap-2">
        <MockLabel>Statement analysis</MockLabel>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-line p-0.5">
            {['UZ', 'RU', 'EN'].map((l, i) => (
              <span
                key={l}
                className={`rounded px-1.5 py-0.5 font-mono text-[0.55rem] ${i === 0 ? 'bg-accent/15 text-accent-soft' : 'text-fg-dim'}`}
              >
                {l}
              </span>
            ))}
          </div>
          <span className="hidden items-center gap-1 rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.55rem] text-fg-dim @md:flex">
            <FileText size={10} /> PDF
          </span>
          <span className="hidden items-center gap-1 rounded-md border border-line px-1.5 py-0.5 font-mono text-[0.55rem] text-fg-dim @md:flex">
            <FileSpreadsheet size={10} /> XLSX
          </span>
        </div>
      </div>

      <div className="grid gap-3 @md:grid-cols-[0.75fr_1.25fr]">
        <MockCard className="hidden flex-col items-center justify-center @md:flex">
          <svg viewBox="0 0 80 80" className="size-[88px] -rotate-90">
            <circle cx="40" cy="40" r="34" stroke="rgba(148,172,205,0.12)" strokeWidth="6" fill="none" />
            <motion.circle
              cx="40"
              cy="40"
              r="34"
              stroke="url(#br-ring)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              whileInView={{ strokeDashoffset: C * 0.3 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
            />
            <defs>
              <linearGradient id="br-ring" x1="0" x2="1">
                <stop offset="0" stopColor="#5b9dff" />
                <stop offset="1" stopColor="#3de6d6" />
              </linearGradient>
            </defs>
          </svg>
          <p className="mt-2 text-center text-[0.66rem] leading-tight text-fg-muted">Financial Health Score</p>
        </MockCard>

        <MockCard>
          <div className="flex items-center justify-between">
            <MockLabel>Cash flow</MockLabel>
            <span className="flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-wider text-signal">
              <span className="size-1.5 rounded-full bg-signal" /> Anomaly
            </span>
          </div>
          <svg viewBox="0 0 260 90" className="mt-2 h-[84px] w-full" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="br-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#3de6d6" stopOpacity="0.22" />
                <stop offset="1" stopColor="#3de6d6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[22, 45, 68].map((y) => (
              <line key={y} x1="0" x2="260" y1={y} y2={y} stroke="rgba(148,172,205,0.08)" />
            ))}
            <path d="M0 70 C18 62 30 66 46 54 S76 40 96 48 S128 26 150 32 S170 30 176 28 V90 H0Z" fill="url(#br-area)" />
            <motion.path
              d="M0 70 C18 62 30 66 46 54 S76 40 96 48 S128 26 150 32 S170 30 176 28"
              stroke="#3de6d6"
              strokeWidth="1.8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE }}
            />
            <motion.path
              d="M176 28 C196 24 214 30 232 20 S252 14 260 12"
              stroke="#5b9dff"
              strokeWidth="1.6"
              strokeDasharray="4 4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.3 }}
            />
            <line x1="176" x2="176" y1="4" y2="90" stroke="rgba(148,172,205,0.22)" strokeDasharray="2 3" />
            <circle cx="96" cy="48" r="3.5" fill="#ff7a6b" />
            <circle cx="96" cy="48" r="8" fill="#ff7a6b" fillOpacity="0.15" />
          </svg>
          <div className="mt-1 flex gap-3 font-mono text-[0.52rem] uppercase tracking-wider text-fg-dim">
            <span className="flex items-center gap-1">
              <span className="h-px w-3 bg-accent" /> Actual
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 border-t border-dashed border-azure" /> Forecast
            </span>
          </div>
        </MockCard>
      </div>

      <div className="grid flex-1 gap-3 @md:grid-cols-2">
        <MockCard className="flex flex-col">
          <MockLabel>Expense analysis</MockLabel>
          <div className="mt-3 flex flex-1 flex-col justify-around gap-2">
            {bars.map((w, i) => (
              <div key={w} className="flex items-center gap-2">
                <div className="skeleton h-1.5 w-10 shrink-0" />
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-azure/80 to-accent/80"
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
        <MockCard className="hidden flex-col @md:flex">
          <div className="flex items-center justify-between">
            <MockLabel className="flex items-center gap-1.5">
              <Sparkles size={10} className="text-accent" /> AI interpretation
            </MockLabel>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="skeleton h-1.5 w-full" />
            <div className="skeleton h-1.5 w-[88%]" />
            <div className="skeleton h-1.5 w-[94%]" />
            <div className="skeleton h-1.5 w-[60%]" />
          </div>
          <div className="mt-auto space-y-1.5 border-t border-line pt-3">
            <MockLabel>Notes</MockLabel>
            <div className="flex gap-1.5">
              {[
                { icon: Mic, label: 'Voice' },
                { icon: Type, label: 'Text' },
                { icon: Image, label: 'Image' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1 rounded border border-line px-1.5 py-0.5 text-[0.55rem] text-fg-dim">
                  <Icon size={9} /> {label}
                </span>
              ))}
            </div>
          </div>
        </MockCard>
      </div>
    </div>
  );
}
