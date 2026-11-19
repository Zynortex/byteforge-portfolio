import { Fragment } from 'react';
import { motion } from 'framer-motion';
import type { ArchitectureLayer } from '../../types';
import { EASE, VIEWPORT } from '../../lib/motion';

function layerTone(label: string) {
  if (/engine/i.test(label)) return 'border-accent/40 bg-accent/[0.06]';
  if (/interpretation|analysis/i.test(label)) return 'border-azure/40 bg-azure/[0.06]';
  return 'border-line-strong bg-ink-850';
}

/** Vertical layered architecture diagram with animated data-flow connectors. */
export function ArchitectureDiagram({ layers, caption }: { layers: ArchitectureLayer[]; caption: string }) {
  return (
    <figure>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-ink-900/50 p-4 sm:p-6 md:p-8">
        <div aria-hidden className="hairline-grid absolute inset-0 opacity-40" />
        <div className="relative">
          {layers.map((layer, i) => (
            <Fragment key={layer.label}>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
                className="grid gap-2.5 md:grid-cols-[10rem_1fr] md:items-center md:gap-6"
              >
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-fg-dim">{layer.label}</p>
                <div className="flex flex-wrap gap-2.5">
                  {layer.nodes.map((n) => (
                    <div key={n.title} className={`min-w-[8.5rem] flex-1 rounded-xl border px-4 py-3 ${layerTone(layer.label)}`}>
                      <p className="text-sm font-medium text-fg">{n.title}</p>
                      {n.detail && <p className="mt-0.5 text-xs text-fg-muted">{n.detail}</p>}
                    </div>
                  ))}
                </div>
              </motion.div>
              {i < layers.length - 1 && (
                <div className="md:pl-[11.5rem]" aria-hidden>
                  <svg viewBox="0 0 16 34" className="mx-auto h-[34px] w-4">
                    <line x1="8" y1="2" x2="8" y2="26" stroke="var(--color-accent)" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="3 3" className="animate-dash" />
                    <path d="M4 25 L8 31 L12 25" fill="none" stroke="var(--color-accent)" strokeOpacity="0.7" strokeWidth="1.2" />
                  </svg>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-fg-dim">{caption}</figcaption>
    </figure>
  );
}
