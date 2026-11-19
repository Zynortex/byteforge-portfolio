import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Page } from '../components/layout/Page';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not found — ByteForge';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <Page>
      <section className="relative flex min-h-[80svh] items-center pt-24">
        <div aria-hidden className="hairline-grid fade-mask absolute inset-0 opacity-60" />
        <div className="container-x relative">
          <p className="eyebrow text-accent">404</p>
          <h1 className="mt-4 text-5xl font-medium tracking-[-0.04em] md:text-7xl">
            This page <em className="font-serif font-normal italic text-accent-soft">doesn't exist.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-fg-muted">The link may be outdated, or the page may have moved.</p>
          <Button to="/" icon={ArrowLeft} iconMotion="none" className="mt-10" size="lg">
            Back to ByteForge
          </Button>
        </div>
      </section>
    </Page>
  );
}
