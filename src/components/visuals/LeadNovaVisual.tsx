import { motion } from 'framer-motion';
import { ArrowRight, Check, FileText, Globe, Package, Scale } from 'lucide-react';
import { EASE } from '../../lib/motion';
import { MockCard, MockLabel } from './shared';

const inputs = [
  { icon: Globe, label: 'Target country', w: '58%' },
  { icon: Package, label: 'Exported product', w: '72%' },
  { icon: Scale, label: 'Export quantity', w: '38%' },
];

const steps = ['Discover potential buyers', 'Evaluate market opportunities', 'Process collected data', 'AI-based analysis'];

export function LeadNovaVisual() {
  return (
    <div className="grid h-full gap-3 p-3 @lg:grid-cols-[0.95fr_1.05fr] @lg:p-4">
      <MockCard className="flex flex-col">
        <MockLabel>New market search</MockLabel>
        <div className="mt-3 space-y-2.5">
          {inputs.map(({ icon: Icon, label, w }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 + i * 0.1 }}
              className="rounded-lg border border-line bg-ink-950/60 px-3 py-2"
            >
              <div className="flex items-center gap-2 text-[0.68rem] text-fg-muted">
                <Icon size={12} className="text-accent" />
                {label}
              </div>
              <div className="skeleton mt-2 h-1.5" style={{ width: w }} />
            </motion.div>
          ))}
        </div>
        <div className="mt-auto pt-3">
          <div className="mb-3 flex items-center justify-between border-t border-dashed border-line pt-3">
            <MockLabel>Output</MockLabel>
            <span className="flex items-center gap-1.5 text-[0.66rem] text-fg-muted">
              <FileText size={11} className="text-accent" /> Structured PDF report
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-lg bg-accent/90 py-2 text-[0.7rem] font-medium text-ink-950">
            Generate intelligence report <ArrowRight size={12} />
          </div>
        </div>
      </MockCard>

      <div className="hidden flex-col gap-3 @lg:flex">
        <MockCard>
          <MockLabel>Pipeline</MockLabel>
          <ol className="mt-3 space-y-2">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-2.5">
                <motion.span
                  className="grid size-4 shrink-0 place-items-center rounded-full border"
                  initial={{ borderColor: 'rgba(148,172,205,0.25)', backgroundColor: 'rgba(61,230,214,0)' }}
                  whileInView={{ borderColor: 'rgba(61,230,214,0.6)', backgroundColor: 'rgba(61,230,214,0.15)' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.3, duration: 0.4 }}
                >
                  <Check size={9} strokeWidth={3} className="text-accent" />
                </motion.span>
                <span className="flex-1 text-[0.68rem] text-fg-muted">{s}</span>
                <div className="h-1 w-14 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-accent/70"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.3, duration: 0.6, ease: EASE }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </MockCard>

        <MockCard className="flex flex-1 items-center gap-3">
          <div className="relative grid h-[88px] w-[66px] shrink-0 place-items-center rounded-md border border-line-strong bg-ink-950/80">
            <FileText size={20} className="text-accent" />
            <span className="absolute bottom-1.5 font-mono text-[0.5rem] tracking-widest text-fg-dim">PDF</span>
          </div>
          <div className="w-full space-y-2">
            <p className="text-[0.72rem] font-medium text-fg">Market intelligence report</p>
            <div className="skeleton h-1.5 w-[86%]" />
            <div className="skeleton h-1.5 w-[64%]" />
            <div className="flex gap-1.5 pt-1">
              {['Buyers', 'Market', 'Analysis'].map((t) => (
                <span key={t} className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.5rem] uppercase tracking-wider text-fg-dim">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </MockCard>
      </div>
    </div>
  );
}
