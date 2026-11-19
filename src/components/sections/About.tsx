import { aboutFacets, site } from '../../data/site';
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal';

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32" aria-labelledby="about-title">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="text-accent">04</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              About
            </p>
            <h2
              id="about-title"
              className="mt-5 text-balance text-[2.1rem] font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.4rem]"
            >
              The engineer <em className="font-serif font-normal italic text-accent-soft">behind</em> ByteForge.
            </h2>
            {site.ownerName && <p className="mt-4 text-lg text-fg">{site.ownerName}</p>}
          </Reveal>

          <Reveal delay={0.1} className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-fg-muted">
            <p>
              <span className="text-fg">I'm a founder and applied AI engineer.</span> I build software around real
              business problems, where a wrong number or an unclear report has consequences. My work sits where product
              thinking meets engineering: understand the workflow first, then design the system that serves it.
            </p>
            <p>
              I learn by building. Each product here took me somewhere new: financial statement parsing, credit scoring,
              buyer intelligence pipelines, multilingual interfaces. I took each one through to working software.
            </p>
            <p>
              Outside product work I build games and simulations, including a 3D strategy game in Godot and a
              browser-based multiplayer RTS prototype. Hard systems problems there make the rest of my work better.
            </p>
            <p>
              My products serve the Uzbek market today. My ambitions are international, and I want to work with teams and
              founders who need an engineer who thinks in products.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pt-16">
          <Stagger as="dl" className="border-t border-line" gap={0.07}>
            {aboutFacets.map((f, i) => (
              <StaggerItem key={f.title} className="group grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-5">
                <span className="pt-0.5 font-mono text-xs text-fg-dim transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <dt className="font-medium text-fg">{f.title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-fg-muted">{f.text}</dd>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-8">
            <div className="glass rounded-2xl p-5">
              <p className="eyebrow flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" /> Currently
              </p>
              <ul className="mt-4 space-y-2.5">
                {site.currently.map((c) => (
                  <li key={c} className="flex gap-3 text-sm text-fg-muted">
                    <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-accent/60" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
