import { useEffect, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Bot, Check, CircleDashed, Globe, Play } from 'lucide-react';
import { getProject, projects } from '../data/projects';
import { site } from '../data/site';
import type { FeaturedProject } from '../types';
import { Page } from '../components/layout/Page';
import { Button } from '../components/ui/Button';
import { GithubIcon } from '../components/ui/icons';
import { Pending } from '../components/ui/Pending';
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal';
import { StatusPill } from '../components/ui/StatusPill';
import { ProjectStage } from '../components/media/ProjectStage';
import { VideoDemo } from '../components/media/VideoDemo';
import { ScreenshotGallery } from '../components/media/ScreenshotGallery';
import { ArchitectureDiagram } from '../components/case/ArchitectureDiagram';
import { StatusMatrix } from '../components/case/StatusMatrix';
import { useActiveSection } from '../hooks/useSectionNav';
import { scrollToSection } from '../lib/scroll';
import { EASE } from '../lib/motion';
import NotFound from './NotFound';

const SECTIONS = [
  ['introduction', 'Introduction'],
  ['problem', 'Problem'],
  ['concept', 'Product concept'],
  ['functionality', 'Functionality'],
  ['architecture', 'Architecture'],
  ['stack', 'Technology stack'],
  ['process', 'Development process'],
  ['testing', 'Testing & validation'],
  ['contribution', 'My contribution'],
  ['demo', 'Demo & screenshots'],
  ['links', 'Links'],
] as const;

const SECTION_IDS = SECTIONS.map(([id]) => id);

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (project) document.title = `${project.name} — Case Study · ByteForge`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project]);

  if (!project) return <NotFound />;
  return <CaseStudyContent key={project.slug} project={project} />;
}

function CaseStudyContent({ project: p }: { project: FeaturedProject }) {
  const active = useActiveSection(SECTION_IDS, true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const deployed = p.status.find((s) => s.label === 'Publicly deployed')?.level === 'yes';

  return (
    <Page>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-azure via-accent to-accent-soft"
      />

      {/* ---------------- Hero ---------------- */}
      <header className="relative overflow-hidden pt-28 md:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="hairline-grid fade-mask absolute inset-0 opacity-60" />
          <div className="absolute right-[-10%] top-0 size-[620px] rounded-full bg-azure/[0.08] blur-[130px]" />
        </div>
        <div className="container-x">
          <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <Link
              to="/"
              state={{ scrollTo: 'projects' }}
              className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" /> All projects
            </Link>
          </motion.div>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              >
                <p className="eyebrow flex items-center gap-3">
                  <span className="text-accent">{p.index}</span>
                  <span aria-hidden className="h-px w-8 bg-line-strong" />
                  Case study · {p.category}
                </p>
                <h1 className="mt-5 text-5xl font-medium leading-[0.95] tracking-[-0.045em] md:text-7xl">{p.name}</h1>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-fg-muted md:text-xl">{p.description}</p>
                <StatusPill tone={p.statusTone} label={p.statusLabel} className="mt-7" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                {p.liveUrl && (
                  <Button href={p.liveUrl} external icon={ArrowUpRight} iconMotion="diagonal">
                    {p.liveLabel ?? 'View Live Product'}
                  </Button>
                )}
                <Button
                  href="#demo"
                  variant={p.liveUrl ? 'secondary' : 'primary'}
                  icon={Play}
                  iconMotion="none"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('demo');
                  }}
                >
                  Watch demo
                </Button>
              </motion.div>
            </div>
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            >
              <ProjectStage project={p} />
            </motion.div>
          </div>

          <div className="mt-16 md:mt-20">
            <p className="eyebrow mb-4">Status at a glance</p>
            <StatusMatrix items={p.status} />
          </div>
        </div>
      </header>

      {/* ---------------- Body ---------------- */}
      <div className="container-x mt-16 grid gap-10 pb-24 lg:mt-24 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label="Case study sections" className="sticky top-28">
            <p className="eyebrow mb-5">Contents</p>
            <ol className="space-y-1 border-l border-line">
              {SECTIONS.map(([id, label], i) => {
                const on = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(id);
                      }}
                      aria-current={on ? 'true' : undefined}
                      className={`relative -ml-px flex gap-3 border-l py-1.5 pl-4 text-sm transition-colors duration-300 ${
                        on ? 'border-accent text-fg' : 'border-transparent text-fg-dim hover:text-fg-muted'
                      }`}
                    >
                      <span className="font-mono text-[0.7rem] leading-5">{String(i + 1).padStart(2, '0')}</span>
                      {label}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        <article className="lg:col-span-9">
          <CaseSection id="introduction" n={1} title="Introduction">
            <div className="space-y-5">
              {p.intro.map((t, i) => (
                <p key={i} className={i === 0 ? 'text-xl leading-relaxed text-fg md:text-2xl md:leading-relaxed' : 'text-lg leading-relaxed text-fg-muted'}>
                  {t}
                </p>
              ))}
            </div>
          </CaseSection>

          <CaseSection id="problem" n={2} title="The problem">
            <div className="grid gap-6 md:grid-cols-[3px_1fr]">
              <span aria-hidden className="hidden rounded-full bg-gradient-to-b from-signal/70 to-transparent md:block" />
              <div className="space-y-5 text-lg leading-relaxed text-fg-muted">
                {p.problem.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            </div>
          </CaseSection>

          <CaseSection id="concept" n={3} title="Product concept">
            <div className="space-y-5 text-lg leading-relaxed text-fg-muted">
              {p.concept.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
            {p.workflow && (
              <div className="mt-10">
                <p className="eyebrow mb-4">Core workflow</p>
                <Stagger as="ol" className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
                  {p.workflow.map((step, i) => (
                    <StaggerItem as="li" key={step} className="relative bg-ink-900 p-5">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <p className="mt-3 leading-snug text-fg">{step}</p>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            )}
          </CaseSection>

          <CaseSection id="functionality" n={4} title="Main functionality">
            <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2" gap={0.04}>
              {p.features.map((f) => (
                <StaggerItem key={f.title} className="group flex gap-3.5 bg-ink-900 p-5 transition-colors hover:bg-ink-850">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/[0.07]">
                    <Check size={12} strokeWidth={2.5} className="text-accent" />
                  </span>
                  <div>
                    <h3 className="font-medium text-fg">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{f.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="mt-4 text-sm text-fg-dim">
              Implementation status for these features is summarised in the status overview above.
            </p>
          </CaseSection>

          <CaseSection id="architecture" n={5} title="Technical architecture">
            <ArchitectureDiagram layers={p.architecture.layers} caption={p.architecture.caption} />
          </CaseSection>

          <CaseSection id="stack" n={6} title="Technology stack">
            {p.stack ? (
              <dl className="divide-y divide-line border-y border-line">
                {p.stack.map((g) => (
                  <Reveal key={g.group} className="grid gap-2 py-4 sm:grid-cols-[12rem_1fr] sm:items-center">
                    <dt className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-dim">{g.group}</dt>
                    <dd className="flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <span key={it} className="rounded-lg border border-line-strong bg-white/[0.03] px-3 py-1.5 text-sm text-fg">
                          {it}
                        </span>
                      ))}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            ) : (
              <Pending>{p.stackPending ?? 'Technology stack details will be added here.'}</Pending>
            )}
          </CaseSection>

          <CaseSection id="process" n={7} title="Development process">
            <Stagger as="ol" className="relative space-y-0" gap={0.08}>
              {p.process.map((s, i) => (
                <StaggerItem as="li" key={s.title} className="relative grid grid-cols-[2.5rem_1fr] gap-4 pb-8 last:pb-0">
                  {i < p.process.length - 1 && (
                    <span aria-hidden className="absolute bottom-0 left-[1.2rem] top-9 w-px bg-gradient-to-b from-line-strong to-line" />
                  )}
                  <span className="grid size-10 place-items-center rounded-full border border-line-strong bg-ink-900 font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-lg font-medium text-fg">{s.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-fg-muted">{s.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </CaseSection>

          <CaseSection id="testing" n={8} title="Testing & validation">
            <Stagger as="ul" className="space-y-3" gap={0.06}>
              {p.testing.points.map((t) => (
                <StaggerItem as="li" key={t} className="flex gap-3 text-lg leading-relaxed text-fg-muted">
                  <span aria-hidden className="mt-3.5 h-px w-4 shrink-0 bg-accent" />
                  {t}
                </StaggerItem>
              ))}
            </Stagger>
            {p.testing.pending && (
              <div className="mt-6">
                <Pending>{p.testing.pending}</Pending>
              </div>
            )}
          </CaseSection>

          <CaseSection id="contribution" n={9} title="My contribution">
            <Stagger as="ul" className="grid gap-3 sm:grid-cols-2" gap={0.05}>
              {p.contribution.map((c) => (
                <StaggerItem as="li" key={c} className="flex items-start gap-3 rounded-xl border border-line bg-ink-900/50 p-4 text-fg">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" strokeWidth={2.4} />
                  <span className="text-[0.95rem]">{c}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="mt-6">
              <div className="flex gap-3 rounded-xl border border-line bg-white/[0.02] p-4 text-sm leading-relaxed text-fg-muted">
                <Bot size={18} className="mt-0.5 shrink-0 text-fg-dim" />
                <p>
                  AI coding agents, including Claude Code, did parts of the implementation. I set the product direction,
                  requirements and architecture, guided the agents, and reviewed, tested, debugged and validated the result.
                </p>
              </div>
            </Reveal>
          </CaseSection>

          <CaseSection id="demo" n={10} title="Demo & screenshots">
            <Reveal>
              <VideoDemo video={p.video} projectName={p.name} />
            </Reveal>
            <div className="mt-6">
              <ScreenshotGallery shots={p.screenshots} projectName={p.name} />
            </div>
          </CaseSection>

          <CaseSection id="links" n={11} title="Links">
            <div className="grid gap-3 sm:grid-cols-2">
              {p.links.map((l) => (
                <a
                  key={l.href + l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-line-strong bg-ink-900/60 p-5 transition-all duration-300 hover:border-accent/50 hover:bg-ink-850"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-white/[0.03] text-accent">
                    {l.kind === 'live' ? <Globe size={18} /> : <GithubIcon size={18} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-fg">{l.label}</span>
                    <span className="block truncate text-sm text-fg-muted">{l.description}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-fg-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              ))}
              {!deployed && (
                <div className="flex items-center gap-4 rounded-2xl border border-dashed border-line-strong p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-fg-dim">
                    <CircleDashed size={18} />
                  </span>
                  <span>
                    <span className="block font-medium text-fg-muted">No public deployment yet</span>
                    <span className="block text-sm text-fg-dim">{p.name} currently runs locally.</span>
                  </span>
                </div>
              )}
            </div>
            <p className="mt-5 text-sm text-fg-dim">
              Want a walkthrough?{' '}
              <a href={`mailto:${site.email}?subject=${encodeURIComponent(p.name)}`} className="text-fg-muted underline underline-offset-4 hover:text-accent-soft">
                Get in touch by email
              </a>
              .
            </p>
          </CaseSection>
        </article>
      </div>

      {/* ---------------- Next project ---------------- */}
      <Link
        to={`/projects/${next.slug}`}
        className="group relative block overflow-hidden border-t border-line"
        aria-label={`Next case study: ${next.name}`}
      >
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgb(61_230_214/0.08),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="container-x relative flex items-end justify-between gap-6 py-16 md:py-24">
          <div>
            <p className="eyebrow">Next case study · {next.index}</p>
            <p className="mt-4 text-4xl font-medium tracking-[-0.04em] text-fg transition-colors duration-500 group-hover:text-accent-soft md:text-7xl">
              {next.name}
            </p>
            <p className="mt-3 text-fg-muted">{next.category}</p>
          </div>
          <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong text-fg transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink-950 md:size-20">
            <ArrowRight size={22} className="transition-transform duration-500 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </Page>
  );
}

function CaseSection({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="border-t border-line py-12 first:border-t-0 first:pt-0 md:py-16">
      <Reveal className="mb-7 flex items-baseline gap-4">
        <span className="font-mono text-sm text-accent">{String(n).padStart(2, '0')}</span>
        <h2 id={`${id}-h`} className="text-2xl font-medium tracking-[-0.03em] text-fg md:text-[2rem]">
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
