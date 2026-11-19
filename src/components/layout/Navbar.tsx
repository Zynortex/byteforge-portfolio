import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Mail, Menu, X } from 'lucide-react';
import { navItems, site } from '../../data/site';
import { useActiveSection, useSectionNav } from '../../hooks/useSectionNav';
import { EASE } from '../../lib/motion';
import { Button } from '../ui/Button';
import { GithubIcon, LogoMark } from '../ui/icons';

const ids = navItems.map((n) => n.id);

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const goTo = useSectionNav();
  const active = useActiveSection(ids, isHome);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handle = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    goTo(id);
  };

  const elevated = scrolled || open || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          elevated
            ? 'border-b border-line bg-ink-950/75 backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className={`container-x flex items-center justify-between transition-[height] duration-500 ${scrolled ? 'h-16' : 'h-[4.5rem] md:h-20'}`}
        >
          <Link
            to="/"
            onClick={(e) => {
              if (isHome) handle('home')(e);
            }}
            className="group flex items-center gap-2.5 text-fg"
            aria-label="ByteForge home"
          >
            <LogoMark size={28} className="transition-transform duration-500 group-hover:rotate-[30deg]" />
            <span className="font-mono text-[0.82rem] font-medium tracking-[0.28em]">{site.brand}</span>
          </Link>

          <ul className="hidden items-center gap-1 rounded-full border border-line bg-white/[0.02] p-1 md:flex">
            {navItems.map((item) => {
              const isActive = isHome && active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.id === 'home' ? '/' : `/#${item.id}`}
                    onClick={handle(item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-full px-4 py-1.5 text-[0.84rem] transition-colors duration-300 ${
                      isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-line-strong bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Button href="/#contact" onClick={handle('contact')} variant="secondary" icon={ArrowUpRight} iconMotion="diagonal">
                Get in touch
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-full border border-line-strong bg-white/[0.03] text-fg md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-ink-950/96 backdrop-blur-xl md:hidden"
          >
            <div className="hairline-grid fade-mask pointer-events-none absolute inset-0 opacity-60" aria-hidden />
            <div className="container-x relative flex h-full flex-col pb-10 pt-24">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.05 + i * 0.05 }}
                    className="border-b border-line"
                  >
                    <a
                      href={item.id === 'home' ? '/' : `/#${item.id}`}
                      onClick={handle(item.id)}
                      className="flex items-baseline justify-between py-4 text-3xl font-medium tracking-[-0.03em] text-fg"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-fg-dim">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-auto flex flex-col gap-3 text-sm text-fg-muted"
              >
                <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-fg">
                  <Mail size={16} /> {site.email}
                </a>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-fg">
                  <GithubIcon size={16} /> github.com/{site.githubHandle}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
