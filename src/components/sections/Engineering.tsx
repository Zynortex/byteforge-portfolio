import type { PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Boxes, BrainCircuit, ChartLine, Network, Server } from 'lucide-react';
import { engineeringAreas } from '../../data/site';
import { projectName } from '../../data/projects';
import type { EngineeringArea } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';

const icons: Record<EngineeringArea['icon'], typeof Bot> = {
  brain: BrainCircuit,
  server: Server,
  chart: ChartLine,
  network: Network,
  boxes: Boxes,
  bot: Bot,
};

function trackPointer(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export function Engineering() {
  return (
    <section id="engineering" className="relative py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Engineering"
          title={
            <>
              Where I work: <em>AI, data</em> and the systems around them.
            </>
          }
          description="Six areas I work across, each tied to the products where I have applied it."
        />

        <Stagger className="mt-16 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {engineeringAreas.map((area, i) => {
            const Icon = icons[area.icon];
            return (
              <StaggerItem key={area.title} className="border-b border-r border-line">
                <div className="spotlight group flex h-full flex-col p-7 md:p-8" onPointerMove={trackPointer}>
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-white/[0.02] text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:bg-accent/[0.08] group-hover:shadow-[0_0_30px_-6px_rgb(61_230_214/0.45)]">
                      <Icon size={19} strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-xs text-fg-dim">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-7 text-xl font-medium tracking-[-0.02em] text-fg">{area.title}</h3>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-fg-muted">{area.text}</p>

                  <div className="mt-auto space-y-3 pt-7">
                    {area.tools && (
                      <div className="flex flex-wrap gap-1.5">
                        {area.tools.map((t) => (
                          <span key={t} className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[0.64rem] text-fg-muted">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-fg-dim">
                      <span className="font-mono uppercase tracking-[0.14em]">Applied in </span>
                      {area.appliedIn.map((slug, j) => (
                        <span key={slug}>
                          {j > 0 && <span className="text-fg-dim"> · </span>}
                          <Link
                            to={`/projects/${slug}`}
                            className="text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-soft hover:decoration-accent/60"
                          >
                            {projectName(slug)}
                          </Link>
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
