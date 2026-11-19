import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Download, Mail } from 'lucide-react';
import { site } from '../../data/site';
import { Button } from '../ui/Button';
import { GithubIcon } from '../ui/icons';
import { Reveal } from '../ui/Reveal';

function legacyCopy(text: string): boolean {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  ta.remove();
  return ok;
}

type CopyState = 'idle' | 'copied' | 'failed';

export function Contact() {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(site.email);
      ok = true;
    } catch {
      ok = legacyCopy(site.email);
    }
    setCopyState(ok ? 'copied' : 'failed');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopyState('idle'), 2400);
  };

  const copyLabel = { idle: 'Copy email', copied: 'Copied', failed: 'Copy unavailable' }[copyState];

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36" aria-labelledby="contact-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hairline-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000_20%,transparent_80%)]" />
        <div className="absolute bottom-[-30%] left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/[0.09] blur-[120px]" />
      </div>

      <div className="container-x">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">05</span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            Contact
          </p>
          <h2
            id="contact-title"
            className="mt-6 max-w-4xl text-balance text-[2.6rem] font-medium leading-[1] tracking-[-0.045em] sm:text-6xl lg:text-[5rem]"
          >
            Have a problem worth <em className="font-serif font-normal italic text-accent-gradient">building for?</em>
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted">
            I'm open to conversations with AI teams, startups and founders. Email is the fastest way to reach me.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-14">
          <div className="flex flex-col gap-4 border-y border-line py-6 md:flex-row md:items-center md:justify-between">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex min-w-0 items-center gap-4 text-fg"
              aria-label={`Send an email to ${site.email}`}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong text-accent transition-colors duration-300 group-hover:border-accent/60 group-hover:bg-accent/10">
                <Mail size={18} />
              </span>
              <span className="truncate text-xl font-medium tracking-[-0.02em] transition-colors group-hover:text-accent-soft sm:text-2xl md:text-3xl">
                {site.email}
              </span>
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-10 items-center gap-2 self-start rounded-full border border-line-strong px-4 text-sm text-fg-muted transition-colors hover:border-accent/50 hover:text-fg md:self-auto"
              aria-live="polite"
            >
              <motion.span
                key={copyState}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-2"
              >
                {copyState === 'copied' ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
                {copyLabel}
              </motion.span>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${site.email}`} size="lg" icon={ArrowUpRight} iconMotion="diagonal">
              Send an email
            </Button>
            <Button href={site.github} external size="lg" variant="secondary" icon={GithubIcon} iconMotion="none">
              GitHub
            </Button>
            {site.linkedin && (
              <Button href={site.linkedin} external size="lg" variant="secondary" icon={ArrowUpRight} iconMotion="diagonal">
                LinkedIn
              </Button>
            )}
            {site.cvUrl && (
              <Button href={site.cvUrl} external size="lg" variant="ghost" icon={Download} iconMotion="none">
                Download CV
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
