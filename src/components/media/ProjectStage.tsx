import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FeaturedProject } from '../../types';
import { EASE } from '../../lib/motion';
import { ProductVisual } from '../visuals/ProductVisual';
import { VideoDemo } from './VideoDemo';

type Tab = 'interface' | 'demo';

/**
 * Framed "product window" that switches between the interface view and the
 * video demo. Uses a real screenshot when `project.cover` is set.
 */
export function ProjectStage({ project, className = '' }: { project: FeaturedProject; className?: string }) {
  const [tab, setTab] = useState<Tab>('interface');

  return (
    <div className={`group/stage relative ${className}`}>
      <div
        aria-hidden
        className="absolute -inset-px rounded-[1.4rem] bg-gradient-to-b from-accent/25 via-transparent to-azure/10 opacity-60 transition-opacity duration-700 group-hover/stage:opacity-100"
      />
      <div className="relative overflow-hidden rounded-[1.35rem] border border-line-strong bg-ink-850 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]">
        {/* Window chrome */}
        <div className="flex items-center justify-between gap-3 border-b border-line bg-ink-900/80 px-4 py-2.5">
          <div className="flex min-w-0 items-center gap-3">
            <span className="hidden gap-1.5 sm:flex" aria-hidden>
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="size-2.5 rounded-full bg-white/10" />
              <span className="size-2.5 rounded-full bg-white/10" />
            </span>
            <span className="truncate font-mono text-[0.68rem] tracking-wide text-fg-dim">
              {project.name.toLowerCase().replace(/\s+/g, '-')}
            </span>
          </div>
          <div role="tablist" aria-label={`${project.name} media`} className="flex rounded-full border border-line p-0.5">
            {(['interface', 'demo'] as Tab[]).map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`relative rounded-full px-3 py-1 text-[0.7rem] transition-colors ${
                  tab === t ? 'text-fg' : 'text-fg-dim hover:text-fg-muted'
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId={`stage-tab-${project.slug}`}
                    className="absolute inset-0 rounded-full bg-white/[0.07]"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{t === 'interface' ? 'Interface' : 'Demo video'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="@container relative aspect-[4/4.2] bg-[radial-gradient(ellipse_at_top,rgb(30_50_90/0.35),transparent_70%)] sm:aspect-[16/11]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              role="tabpanel"
              initial={{ opacity: 0, scale: 0.985, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.01, filter: 'blur(6px)' }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-0"
            >
              {tab === 'interface' ? (
                project.cover ? (
                  <img
                    src={project.cover.src}
                    alt={project.cover.alt}
                    width={project.cover.width}
                    height={project.cover.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <ProductVisual kind={project.visual} />
                )
              ) : (
                <VideoDemo video={project.video} projectName={project.name} fit="fill" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {tab === 'interface' && !project.cover && (
        <p className="mt-3 text-right font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fg-dim">
          Illustrative interface · Not real data
        </p>
      )}
    </div>
  );
}
