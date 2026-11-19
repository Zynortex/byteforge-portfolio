import { Bot, UserRound } from 'lucide-react';
import { aiRole, principles } from '../../data/site';
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal';

export function Philosophy() {
  return (
    <section id="approach" className="relative pb-20 pt-6 md:pb-28 md:pt-10" aria-labelledby="approach-title">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-accent">03</span>
                <span aria-hidden className="h-px w-8 bg-line-strong" />
                Engineering philosophy
              </p>
              <h2
                id="approach-title"
                className="mt-5 text-balance text-[2.1rem] font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.4rem]"
              >
                How I <em className="font-serif font-normal italic text-accent-soft">build.</em>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
                Working software comes from understanding the problem, keeping systems modular, and checking every result.
                Writing code is only part of the job.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <div className="glass relative overflow-hidden rounded-2xl p-6">
                <div aria-hidden className="absolute -right-16 -top-16 size-40 rounded-full bg-accent/10 blur-3xl" />
                <p className="eyebrow text-accent">Transparency</p>
                <h3 className="mt-3 text-lg font-medium tracking-[-0.01em] text-fg">Built with AI coding agents, openly.</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  AI coding agents, including Claude Code, wrote parts of the code in these products. I don't claim to
                  have written every line by hand. I take responsibility for what ships.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-accent/25 bg-accent/[0.05] p-4">
                    <p className="flex items-center gap-2 text-xs font-medium text-accent-soft">
                      <UserRound size={14} /> My role
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {aiRole.map((r) => (
                        <li key={r} className="text-[0.8rem] text-fg">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-line bg-white/[0.02] p-4">
                    <p className="flex items-center gap-2 text-xs font-medium text-fg-muted">
                      <Bot size={14} /> AI coding agents
                    </p>
                    <ul className="mt-3 space-y-1.5 text-[0.8rem] text-fg-muted">
                      <li>Speed up implementation</li>
                      <li>Draft code from my specifications</li>
                      <li>Help explore solutions</li>
                    </ul>
                    <p className="mt-3 border-t border-line pt-3 text-[0.72rem] leading-relaxed text-fg-dim">
                      Their output is reviewed, tested and validated before it ships.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Stagger as="ol" className="lg:col-span-7" gap={0.06}>
          {principles.map((p, i) => (
            <StaggerItem
              as="li"
              key={p.title}
              className="group relative grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-7 last:border-b md:grid-cols-[4.5rem_1fr] md:py-8"
            >
              <span
                aria-hidden
                className="absolute left-0 top-[-1px] h-px w-0 bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
              />
              <span className="pt-1 font-mono text-sm text-fg-dim transition-colors duration-300 group-hover:text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-xl font-medium tracking-[-0.02em] text-fg md:text-2xl">{p.title}</h3>
                <p className="mt-2.5 max-w-xl leading-relaxed text-fg-muted">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
