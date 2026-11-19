import type { ReactNode } from 'react';

export function MockCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-line bg-ink-900/70 p-3 ${className}`}>{children}</div>;
}

export function MockLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[0.58rem] uppercase tracking-[0.16em] text-fg-dim ${className}`}>{children}</p>
  );
}
