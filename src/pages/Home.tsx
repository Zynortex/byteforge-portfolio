import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Page } from '../components/layout/Page';
import { Hero } from '../components/hero/Hero';
import { FeaturedProjects } from '../components/sections/FeaturedProjects';
import { Engineering } from '../components/sections/Engineering';
import { Philosophy } from '../components/sections/Philosophy';
import { OtherProjects } from '../components/sections/OtherProjects';
import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { scrollToSection } from '../lib/scroll';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'ByteForge — Applied AI Engineering';
    const fromState = (location.state as { scrollTo?: string } | null)?.scrollTo;
    const target = fromState ?? (location.hash ? decodeURIComponent(location.hash.slice(1)) : null);
    if (target) {
      const t = window.setTimeout(() => scrollToSection(target, true), 30);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Runs once per navigation entry (location.key), not on every state change.
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Page>
      <Hero />
      <FeaturedProjects />
      <Engineering />
      <Philosophy />
      <OtherProjects />
      <About />
      <Contact />
    </Page>
  );
}
