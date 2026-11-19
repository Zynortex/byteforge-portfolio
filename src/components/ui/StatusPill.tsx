import type { FeaturedProject } from '../../types';

const tones: Record<FeaturedProject['statusTone'], { dot: string; ring: string; text: string; pulse: boolean }> = {
  live: { dot: 'bg-accent', ring: 'border-accent/35 bg-accent/[0.07]', text: 'text-accent-soft', pulse: true },
  active: { dot: 'bg-azure', ring: 'border-azure/35 bg-azure/[0.07]', text: 'text-[#a9c9ff]', pulse: false },
  local: { dot: 'bg-fg-dim', ring: 'border-line-strong bg-white/[0.03]', text: 'text-fg-muted', pulse: false },
};

export function StatusPill({ tone, label, className = '' }: { tone: FeaturedProject['statusTone']; label: string; className?: string }) {
  const t = tones[tone];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] ${t.ring} ${t.text} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${t.dot} ${t.pulse ? 'animate-pulse-dot' : ''}`} aria-hidden />
      {label}
    </span>
  );
}
