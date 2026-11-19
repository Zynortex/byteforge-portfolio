import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '../lib/scroll';

/** Navigates to a homepage section from anywhere in the app. */
export function useSectionNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  return useCallback(
    (id: string) => {
      if (isHome) scrollToSection(id);
      else navigate('/', { state: { scrollTo: id } });
    },
    [isHome, navigate],
  );
}

/** Tracks which section crosses the upper-middle of the viewport. */
export function useActiveSection(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.38;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // Bottom of page: last section wins
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1] ?? current;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids, enabled]);

  return active;
}
