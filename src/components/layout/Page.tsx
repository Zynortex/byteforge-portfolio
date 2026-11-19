import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';

/**
 * Route-level wrapper providing the page entrance transition.
 * There is deliberately no exit phase: the next page mounts immediately,
 * so navigation never waits on an animation.
 */
export function Page({ children }: { children: ReactNode }) {
  return (
    <motion.main
      id="main"
      tabIndex={-1}
      className="outline-none"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </motion.main>
  );
}
