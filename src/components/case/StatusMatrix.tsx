import { CircleCheck, CircleDashed, CircleDot, CircleQuestionMark } from 'lucide-react';
import type { StatusItem, StatusLevel } from '../../types';
import { Stagger, StaggerItem } from '../ui/Reveal';

const levels: Record<StatusLevel, { icon: typeof CircleCheck; cls: string }> = {
  yes: { icon: CircleCheck, cls: 'text-accent' },
  partial: { icon: CircleDot, cls: 'text-azure' },
  no: { icon: CircleDashed, cls: 'text-fg-dim' },
  unknown: { icon: CircleQuestionMark, cls: 'text-fg-dim' },
};

/** Separates what is implemented, tested, publicly deployed, and used by real customers. */
export function StatusMatrix({ items }: { items: StatusItem[] }) {
  return (
    <Stagger
      className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
      gap={0.07}
    >
      {items.map((s) => {
        const L = levels[s.level];
        const Icon = L.icon;
        return (
          <StaggerItem key={s.label} className="bg-ink-900 p-5 md:p-6">
            <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-fg-dim">{s.label}</p>
            <p className={`mt-3 flex items-center gap-2 text-lg font-medium ${s.level === 'yes' ? 'text-fg' : 'text-fg-muted'}`}>
              <Icon size={18} className={L.cls} aria-hidden />
              {s.value}
            </p>
            <p className="mt-1.5 text-sm text-fg-muted">{s.note}</p>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
