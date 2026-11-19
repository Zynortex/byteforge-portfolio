import { Link } from 'react-router-dom';
import { navItems, site } from '../../data/site';
import { projects } from '../../data/projects';
import { useSectionNav } from '../../hooks/useSectionNav';
import { GithubIcon, LogoMark } from '../ui/icons';

export function Footer() {
  const goTo = useSectionNav();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="container-x grid gap-12 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <LogoMark size={26} className="text-fg" />
            <span className="font-mono text-[0.8rem] font-medium tracking-[0.28em]">{site.brand}</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">{site.supporting}</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 text-sm md:col-span-7 md:grid-cols-3">
          <div>
            <p className="eyebrow mb-4">Site</p>
            <ul className="space-y-2.5">
              {navItems.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.id === 'home' ? '/' : `/#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(n.id);
                    }}
                    className="text-fg-muted transition-colors hover:text-fg"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Case studies</p>
            <ul className="space-y-2.5">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link to={`/projects/${p.slug}`} className="text-fg-muted transition-colors hover:text-fg">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-2.5">
              <li>
                <a href={`mailto:${site.email}`} className="text-fg-muted transition-colors hover:text-fg">
                  Email
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg"
                >
                  <GithubIcon size={14} /> GitHub
                </a>
              </li>
              {site.linkedin && (
                <li>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-fg-muted hover:text-fg">
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-xs text-fg-dim sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} ByteForge{site.ownerName ? ` · ${site.ownerName}` : ''}
        </p>
        <p className="font-mono tracking-wide">React · TypeScript · Tailwind CSS · Framer Motion</p>
      </div>
    </footer>
  );
}
