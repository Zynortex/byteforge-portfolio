import { Clock3 } from 'lucide-react';

/** Clearly-marked placeholder for information that has not been provided yet. */
export function Pending({ children }: { children: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-dashed border-line-strong bg-white/[0.015] px-4 py-3.5">
      <Clock3 size={16} className="mt-0.5 shrink-0 text-fg-dim" aria-hidden />
      <p className="text-sm leading-relaxed text-fg-dim">
        <span className="mr-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-muted">To be documented</span>
        {children}
      </p>
    </div>
  );
}
