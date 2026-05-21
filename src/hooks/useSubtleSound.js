import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-sounds';
let sharedCtx = null;

function getCtx() {
  try {
    if (sharedCtx?.state === 'closed') sharedCtx = null;
    if (!sharedCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      sharedCtx = new Ctx();
    }
    return sharedCtx;
  } catch {
    return null;
  }
}

export function getSoundEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * @param {number} freq
 * @param {number} duration
 * @param {number} gain
 * @param {'sine' | 'triangle'} type
 */
function playTone(freq, duration, gain, type = 'sine') {
  if (!getSoundEnabled()) return;
  const ctx = getCtx();
  if (!ctx) return;

  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  o.connect(g);
  g.connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + duration);
  ctx.resume?.();
}

export function useSoundToggle() {
  const [on, setOn] = useState(() => getSoundEnabled());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [on]);

  const toggle = useCallback(() => {
    setOn((v) => {
      const next = !v;
      try {
        localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
        window.dispatchEvent(new Event('portfolio-sounds-changed'));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const sync = () => setOn(getSoundEnabled());
    window.addEventListener('portfolio-sounds-changed', sync);
    return () => window.removeEventListener('portfolio-sounds-changed', sync);
  }, []);

  return [on, toggle];
}

export function playClick() {
  playTone(880, 0.045, 0.022);
}

export function playHover() {
  playTone(620, 0.03, 0.008, 'triangle');
}

export function playPop() {
  playTone(520, 0.05, 0.012, 'triangle');
}

export function playType() {
  playTone(740, 0.02, 0.006, 'triangle');
}

/**
 * Delegated hover ticks on interactive elements (throttled).
 */
export function useSoundHoverDelegate(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;

    let last = 0;
    const handler = (e) => {
      const el = e.target.closest(
        'a, button, [role="button"], .blog-card-hit, .blog-featured-hit, .project-card, .nav-link-pad, [data-sound-hover]'
      );
      if (!el) return;
      const now = Date.now();
      if (now - last < 380) return;
      last = now;
      playHover();
    };

    document.addEventListener('mouseover', handler, { passive: true });
    return () => document.removeEventListener('mouseover', handler);
  }, [enabled]);
}
