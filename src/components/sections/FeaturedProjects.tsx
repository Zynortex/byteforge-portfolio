import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { projects } from '../../data/projects';
import type { FeaturedProject } from '../../types';
import { Button } from '../ui/Button';
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { StatusPill } from '../ui/StatusPill';
import { ProjectStage } from '../media/ProjectStage';

export function FeaturedProjects() {
  return (
    <section id="projects" className="relative pb-20 pt-24 md:pb-28 md:pt-36">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title={
            <>
              Three products. <em>Real problems.</em>
            </>
          }
          description="Each product started from a specific business workflow and was built into working software. Status is shown as it is: live, in client use, or running locally."
        />

        <div className="mt-20 space-y-28 md:mt-28 md:space-y-40">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project: p, flip }: { project: FeaturedProject; flip: boolean }) {
  const defs = p.homePoints.some((h) => h.text);

  return (
    <article className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14" aria-labelledby={`proj-${p.slug}`}>
      <div className={`lg:col-span-5 lg:pt-4 ${flip ? 'lg:order-2' : ''}`}>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="num-outline font-mono text-6xl font-medium leading-none tracking-tight md:text-7xl">{p.index}</span>
            <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
          </div>
          <p className="eyebrow mt-6 text-accent">{p.category}</p>
          <h3 id={`proj-${p.slug}`} className="mt-3 text-4xl font-medium tracking-[-0.035em] text-fg md:text-5xl">
            {p.name}
          </h3>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">{p.description}</p>
          <StatusPill tone={p.statusTone} label={p.statusLabel} className="mt-6" />
        </Reveal>

        {defs ? (
          <Stagger as="dl" className="mt-9 border-t border-line" gap={0.06}>
            {p.homePoints.map((h) => (
              <StaggerItem key={h.title} className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-4">
                <dt className="text-sm font-medium text-fg">{h.title}</dt>
                <dd className="text-sm leading-relaxed text-fg-muted">{h.text}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Stagger as="ul" className="mt-9 grid gap-x-6 gap-y-2.5 border-t border-line pt-6 sm:grid-cols-2" gap={0.04}>
            {p.homePoints.map((h) => (
              <StaggerItem as="li" key={h.title} className="flex items-start gap-2.5 text-sm text-fg-muted">
                <Check size={14} className="mt-0.5 shrink-0 text-accent" strokeWidth={2.5} />
                {h.title}
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {p.homeStack && (
          <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-1.5">
            {p.homeStack.map((s) => (
              <span key={s} className="rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[0.66rem] text-fg-muted">
                {s}
              </span>
            ))}
          </Reveal>
        )}

        <Reveal delay={0.15} className="mt-9 flex flex-wrap gap-3">
          {p.liveUrl && (
            <Button href={p.liveUrl} external icon={ArrowUpRight} iconMotion="diagonal">
              {p.liveLabel ?? 'View Live Product'}
            </Button>
          )}
          <Button to={`/projects/${p.slug}`} variant={p.liveUrl ? 'secondary' : 'primary'} icon={ArrowRight}>
            Explore Case Study
          </Button>
        </Reveal>
      </div>

      <Reveal className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`} y={40} delay={0.1}>
        <ProjectStage project={p} />
      </Reveal>
    </article>
  );
}
