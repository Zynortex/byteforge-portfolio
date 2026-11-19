import { secondaryProjects } from '../../data/site';
import type { SecondaryProject } from '../../types';
import { Reveal, Stagger, StaggerItem } from '../ui/Reveal';

export function OtherProjects() {
  return (
    <section id="lab" className="relative py-20 md:py-28" aria-labelledby="lab-title">
      <div className="container-x">
        <Reveal className="flex flex-col justify-between gap-4 border-t border-line pt-10 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Experiments</p>
            <h2 id="lab-title" className="mt-3 text-2xl font-medium tracking-[-0.03em] text-fg md:text-3xl">
              Beyond products: <span className="font-serif font-normal italic text-fg-muted">game systems & simulation.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fg-dim">
            Side projects where I work on real-time systems, AI behaviour and simulation.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 md:grid-cols-2" gap={0.1}>
          {secondaryProjects.map((p) => (
            <StaggerItem as="article" key={p.name}>
              <SecondaryCard project={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function SecondaryCard({ project: p }: { project: SecondaryProject }) {
  return (
    <div className="group flex h-full gap-5 rounded-2xl border border-line bg-ink-900/50 p-5 transition-colors duration-500 hover:border-line-strong hover:bg-ink-900">
      <div className="relative hidden size-28 shrink-0 overflow-hidden rounded-xl border border-line bg-ink-950 sm:block" aria-hidden>
        {p.visual === 'warfare' ? <WarfareGlyph /> : <VoxelGlyph />}
      </div>
      <div className="flex min-w-0 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-medium tracking-[-0.02em] text-fg">{p.name}</h3>
          {p.status && (
            <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-fg-dim">
              {p.status}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{p.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {p.focus.map((f) => (
            <span key={f} className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[0.62rem] text-fg-dim">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Abstract hex-grid battlefield with two formations. */
function WarfareGlyph() {
  const hexes: [number, number][] = [];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) hexes.push([c * 20 + (r % 2) * 10, r * 17]);
  return (
    <svg viewBox="0 0 120 100" className="h-full w-full transition-transform duration-700 group-hover:scale-105">
      {hexes.map(([x, y], i) => (
        <polygon
          key={i}
          points="10,0 19,5 19,15 10,20 1,15 1,5"
          transform={`translate(${x - 4},${y - 2})`}
          fill="none"
          stroke="rgba(148,172,205,0.14)"
          strokeWidth="0.8"
        />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={`a${i}`} x={18 + i * 8} y={30} width="5" height="5" fill="#3de6d6" opacity={0.85 - i * 0.15} />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={`b${i}`} x={70 + i * 8} y={62} width="5" height="5" fill="#ff7a6b" opacity={0.8 - i * 0.15} />
      ))}
      <path d="M34 34 Q 55 40 68 62" stroke="#3de6d6" strokeOpacity="0.5" strokeDasharray="2 3" fill="none" className="animate-dash" />
    </svg>
  );
}

/** Abstract isometric voxel cluster. */
function VoxelGlyph() {
  const cubes: [number, number, number][] = [
    [0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 0, 2],
  ];
  const iso = (x: number, y: number, z: number) => [60 + (x - y) * 13, 52 + (x + y) * 7.5 - z * 15] as const;
  return (
    <svg viewBox="0 0 120 100" className="h-full w-full transition-transform duration-700 group-hover:scale-105">
      {cubes
        .sort((a, b) => a[2] - b[2] || a[0] + a[1] - (b[0] + b[1]))
        .map(([x, y, z], i) => {
          const [cx, cy] = iso(x, y, z);
          return (
            <g key={i} transform={`translate(${cx},${cy})`}>
              <polygon points="0,-15 13,-7.5 0,0 -13,-7.5" fill="#1d2a44" stroke="rgba(148,172,205,0.3)" strokeWidth="0.6" />
              <polygon points="-13,-7.5 0,0 0,15 -13,7.5" fill="#121b2e" stroke="rgba(148,172,205,0.2)" strokeWidth="0.6" />
              <polygon points="13,-7.5 0,0 0,15 13,7.5" fill="#0d1424" stroke="rgba(148,172,205,0.2)" strokeWidth="0.6" />
            </g>
          );
        })}
      <circle cx="60" cy="16" r="2" fill="#3de6d6" />
      <circle cx="60" cy="16" r="6" fill="#3de6d6" opacity="0.15" />
    </svg>
  );
}
