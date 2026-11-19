/**
 * Scroll to a section id. "home" scrolls to the very top.
 * `instant` is used when arriving from another page, so the visitor lands
 * on the section directly instead of watching the page scroll past.
 */
export function scrollToSection(id: string, instant = false) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = instant || reduce ? 'instant' : 'smooth';
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior, block: 'start' });
}
