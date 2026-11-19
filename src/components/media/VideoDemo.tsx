import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clapperboard, Play } from 'lucide-react';
import type { VideoSource } from '../../types';
import { autoPoster, embedUrl, parseVideoUrl } from '../../lib/video';

interface Props {
  video: VideoSource;
  projectName: string;
  /** "fill" stretches to the parent's height (used inside project stages). */
  fit?: 'aspect' | 'fill';
  className?: string;
}

/**
 * Click-to-play video with a thumbnail facade. Nothing loads from the provider
 * until the visitor presses play, and nothing autoplays on page load.
 */
export function VideoDemo({ video, projectName, fit = 'aspect', className = '' }: Props) {
  const parsed = useMemo(() => parseVideoUrl(video.url), [video.url]);
  const [playing, setPlaying] = useState(false);
  const frame = `relative overflow-hidden bg-ink-950 ${fit === 'aspect' ? 'aspect-video rounded-2xl border border-line-strong' : 'h-full w-full'} ${className}`;

  if (!parsed) {
    return (
      <div className={frame}>
        <div className="hairline-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgb(61_230_214/0.08),transparent_70%)]" aria-hidden />
        <div className="relative flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
          <div className="relative grid size-14 place-items-center rounded-full border border-line-strong bg-white/[0.03]">
            <span className="absolute inset-0 rounded-full border border-accent/20 [animation:ping_3s_cubic-bezier(0,0,0.2,1)_infinite] motion-reduce:hidden" />
            <Clapperboard size={20} className="text-fg-muted" />
          </div>
          <div>
            <p className="text-sm font-medium text-fg">Demo coming soon</p>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-fg-dim">
              A recorded walkthrough of {projectName} will appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const poster = video.poster ?? autoPoster(parsed);
  const src = embedUrl(parsed);

  return (
    <div className={frame}>
      <AnimatePresence mode="wait" initial={false}>
        {!playing ? (
          <motion.button
            key="facade"
            type="button"
            onClick={() => setPlaying(true)}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="group absolute inset-0 h-full w-full text-left"
            aria-label={`Play video: ${video.title}`}
          >
            {poster ? (
              <img
                src={poster}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="hairline-grid absolute inset-0" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-ink-950/10" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="relative grid size-16 place-items-center rounded-full bg-accent text-ink-950 shadow-[0_0_0_8px_rgb(61_230_214/0.15)] transition-transform duration-500 group-hover:scale-110">
                <Play size={22} fill="currentColor" className="ml-0.5" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 md:p-5">
              <span className="text-sm font-medium text-fg">{video.title}</span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fg-muted">Play demo</span>
            </div>
          </motion.button>
        ) : (
          <motion.div key="player" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
            {parsed.kind === 'file' ? (
              <video
                src={parsed.src}
                poster={poster}
                controls
                autoPlay
                playsInline
                className="h-full w-full bg-black object-contain"
              >
                <track kind="captions" />
              </video>
            ) : (
              <iframe
                src={src ?? undefined}
                title={video.title}
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
