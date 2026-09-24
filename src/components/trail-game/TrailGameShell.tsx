import React, { useEffect, useRef, useCallback } from 'react';
import { Student } from '../../types';
import { TrailHud } from './TrailHud';
import { useMotionPreferences } from './useMotionPreferences';

interface TrailGameShellProps {
  children: React.ReactNode;
  student: Student;
  worldLabel: string;
  worldIcon: React.ComponentType<{ className?: string }>;
  worldGradient: string;
  completedCount: number;
  totalCount: number;
  progressPercent: number;
  nextMissionTitle?: string;
  onExit: () => void;
  /** ref to the button that opened the trail, for focus restoration */
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const TrailGameShell: React.FC<TrailGameShellProps> = ({
  children,
  student,
  worldLabel,
  worldIcon,
  worldGradient,
  completedCount,
  totalCount,
  progressPercent,
  nextMissionTitle,
  onExit,
  triggerRef,
}) => {
  const { motionReduced, toggleMotion } = useMotionPreferences();

  const handleExit = useCallback(() => {
    onExit();
    // Restore focus to the element that opened the trail
    requestAnimationFrame(() => {
      triggerRef?.current?.focus();
    });
  }, [onExit, triggerRef]);

  // Escape key to exit
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleExit();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleExit]);

  // Add class to body for chrome hiding CSS and update theme-color
  useEffect(() => {
    document.documentElement.classList.add('trail-game-active');
    
    // Update theme-color to match HUD
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    const originalTheme = metaTheme?.getAttribute('content');
    metaTheme?.setAttribute('content', '#020617');

    if (motionReduced) {
      document.documentElement.classList.add('motion-reduced');
    } else {
      document.documentElement.classList.remove('motion-reduced');
    }
    return () => {
      document.documentElement.classList.remove('trail-game-active');
      if (originalTheme) {
        metaTheme?.setAttribute('content', originalTheme);
      }
    };
  }, [motionReduced]);

  // Update motion-reduced class on body when preference changes
  useEffect(() => {
    if (motionReduced) {
      document.documentElement.classList.add('motion-reduced');
    } else {
      document.documentElement.classList.remove('motion-reduced');
    }
  }, [motionReduced]);

  return (
    <div
      className={`fixed inset-0 z-[80] flex flex-col overflow-hidden ${motionReduced ? '' : 'animate-trail-enter'}`}
      role="main"
      aria-label="Modo Trilheiro"
    >
      {/* Background image layer */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/assets/trilhas/fundo-trilhas-vertical.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Scrim for legibility */}
      <div className="trail-scrim absolute inset-0 z-[1]" aria-hidden="true" />

      {/* HUD — sticky top */}
      <div className="relative z-[10] safe-pt">
        <TrailHud
          student={student}
          worldLabel={worldLabel}
          worldIcon={worldIcon}
          worldGradient={worldGradient}
          completedCount={completedCount}
          totalCount={totalCount}
          progressPercent={progressPercent}
          nextMissionTitle={nextMissionTitle}
          motionReduced={motionReduced}
          onToggleMotion={toggleMotion}
          onExit={handleExit}
        />
      </div>

      {/* Scrollable content */}
      <div
        className="relative z-[5] flex-1 overflow-y-auto overflow-x-hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="max-w-3xl mx-auto px-3 sm:px-5 py-4 pb-16 safe-pb space-y-4">
          {children}
        </div>
      </div>

      {/* Live region for announcements */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only" id="trail-announcer" />
    </div>
  );
};
