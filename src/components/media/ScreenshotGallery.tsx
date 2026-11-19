import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import type { Screenshot } from '../../types';
import { EASE } from '../../lib/motion';

/** Crossfading gallery. Shows an honest empty state when no screenshots exist yet. */
export function ScreenshotGallery({ shots, projectName }: { shots: Screenshot[]; projectName: string }) {
  const [active, setActive] = useState(0);

  if (shots.length === 0) {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-dashed border-line-strong px-5 py-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-white/[0.02]">
          <ImageIcon size={16} className="text-fg-dim" />
        </span>
        <div>
          <p className="text-sm text-fg">Screenshots in preparation</p>
          <p className="mt-0.5 text-xs text-fg-dim">Product screenshots of {projectName} will be added here.</p>
        </div>
      </div>
    );
  }

  const shot = shots[active];
  return (
    <figure>
      <div
        className="relative overflow-hidden rounded-2xl border border-line-strong bg-ink-900"
        style={{ aspectRatio: `${shot.width} / ${shot.height}` }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={shot.src}
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>
      {shot.caption && <figcaption className="mt-3 text-sm text-fg-muted">{shot.caption}</figcaption>}
      {shots.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show screenshot ${i + 1}: ${s.alt}`}
              aria-pressed={i === active}
              className={`relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border transition-all ${
                i === active ? 'border-accent/70 opacity-100' : 'border-line opacity-50 hover:opacity-80'
              }`}
            >
              <img src={s.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}
