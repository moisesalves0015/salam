import { useState, useEffect } from 'react';

const STORAGE_KEY = 'trail_motion_reduced';

export function useMotionPreferences() {
  const [motionReduced, setMotionReduced] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) return stored === 'true';
    } catch { /* ignore */ }
    // fallback: check OS preference
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      // Only override if user hasn't manually set a preference
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === null) setMotionReduced(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleMotion = () => {
    setMotionReduced(prev => {
      const next = !prev;
      try { localStorage.setItem(STORAGE_KEY, String(next)); } catch { /* ignore */ }
      return next;
    });
  };

  return { motionReduced, toggleMotion };
}
