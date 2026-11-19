import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react';
import { site } from '../../data/site';
import { projects } from '../../data/projects';
import { useSectionNav } from '../../hooks/useSectionNav';
import { EASE } from '../../lib/motion';
import { Button } from '../ui/Button';
import { GithubIcon } from '../ui/icons';
import { HeroPanels } from './HeroPanels';
import { NetworkCanvas } from './NetworkCanvas';

const lead = ['Building', 'intelligent', 'products', 'for'];
const accent = ['real-world', 'impact.'];

const toneDot = { live: 'bg-accent animate-pulse-dot', active: 'bg-azure', local: 'bg-fg-dim' } as const;

export function Hero() {
  const goTo = useSectionNav();

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-24 md:pt-28">
      {/* Background composition */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_20%,rgb(36_70_140/0.28),transparent_70%)]" />
        <div className="absolute -left-40 top-1/3 size-[520px] rounded-full bg-accent/[0.06] blur-[120px]" />
        <div className="hairline-grid fade-mask absolute inset-0 opacity-70" />
        <NetworkCanvas className="absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_75%_70%_at_60%_45%,#000_30%,transparent_85%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      <div className="container-x grid flex-1 items-center gap-10 py-10 lg:grid-cols-12 lg:py-0">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] py-1.5 pl-2 pr-4 text-[0.78rem] text-fg-muted backdrop-blur"
          >
            <span className="grid size-5 place-items-center rounded-full bg-accent/15">
              <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
            </span>
            {site.role}
          </motion.p>

          <h1 className="mt-7 text-balance text-[2.75rem] font-medium leading-[0.98] tracking-[-0.045em] text-fg sm:text-6xl md:text-7xl xl:text-[5.6rem]">
            <span className="sr-only">{site.headline}</span>
            <span aria-hidden>
              {lead.map((word, i) => (
                <Word key={word} delay={0.3 + i * 0.07}>
                  {word}
                </Word>
              ))}
              {accent.map((word, i) => (
                <Word key={word} delay={0.3 + (lead.length + i) * 0.07}>
                  <span className="font-serif font-normal italic tracking-[-0.02em] text-accent-gradient pr-[0.06em]">{word}</span>
                </Word>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
            className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted md:text-xl"
          >
            {site.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button
              href="/#projects"
              size="lg"
              icon={ArrowDown}
              iconMotion="none"
              onClick={(e) => {
                e.preventDefault();
                goTo('projects');
              }}
            >
              Explore Projects
            </Button>
            <Button
              href="/#contact"
              size="lg"
              variant="secondary"
              icon={ArrowUpRight}
              iconMotion="diagonal"
              onClick={(e) => {
                e.preventDefault();
                goTo('contact');
              }}
            >
              Get in Touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-fg-muted"
          >
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-fg"
            >
              <GithubIcon size={15} /> github.com/{site.githubHandle}
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-fg">
              <Mail size={15} /> {site.email}
            </a>
          </motion.div>
        </div>

        <div className="hidden lg:col-span-5 lg:block">
          <HeroPanels />
        </div>
      </div>

      {/* Product status strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.35 }}
        className="container-x pb-8"
      >
        <div className="grid border-t border-line lg:grid-cols-3">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className={`group flex items-center justify-between gap-4 border-line py-4 transition-colors lg:py-5 ${
                i > 0 ? 'border-t lg:border-l lg:border-t-0 lg:pl-6' : ''
              }`}
            >
              <span className="min-w-0">
                <span className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-fg-dim">
                  <span className={`size-1.5 rounded-full ${toneDot[p.statusTone]}`} />
                  {p.statusLabel}
                </span>
                <span className="mt-1.5 block truncate text-[0.95rem] text-fg transition-colors group-hover:text-accent-soft">
                  {p.name} <span className="text-fg-dim">· {p.category}</span>
                </span>
              </span>
              <ArrowUpRight
                size={16}
                className="shrink-0 text-fg-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Word({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <>
      <span className="inline-block overflow-hidden pb-[0.12em] align-top">
        <motion.span
          className="inline-block"
          initial={{ y: '105%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1, ease: EASE, delay }}
        >
          {children}
        </motion.span>
      </span>{' '}
    </>
  );
}
