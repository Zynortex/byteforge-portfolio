import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface Props {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: 'left' | 'split';
}

/**
 * Editorial section heading. "split" puts the description in a right column on desktop.
 * Use <em> inside `title` for the serif-italic accent.
 */
export function SectionHeading({ index, eyebrow, title, description, className = '', align = 'split' }: Props) {
  return (
    <div
      className={`grid gap-6 ${align === 'split' ? 'lg:grid-cols-12 lg:items-end' : ''} ${className}`}
    >
      <Reveal className={align === 'split' ? 'lg:col-span-7' : ''}>
        <p className="eyebrow flex items-center gap-3">
          {index && <span className="text-accent">{index}</span>}
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          <span>{eyebrow}</span>
        </p>
        <h2 className="mt-5 text-balance text-[2.1rem] font-medium leading-[1.04] tracking-[-0.035em] text-fg sm:text-5xl lg:text-[3.6rem] [&_em]:font-serif [&_em]:font-normal [&_em]:italic [&_em]:tracking-[-0.01em] [&_em]:text-accent-soft">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1} className={align === 'split' ? 'lg:col-span-5 lg:pb-2' : 'max-w-2xl'}>
          <p className="text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
