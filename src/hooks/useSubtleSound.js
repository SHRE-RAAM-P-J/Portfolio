import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-sounds';

export function useSoundToggle() {
  const [on, setOn] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [on]);

  const toggle = useCallback(() => setOn((v) => !v), []);
  return [on, toggle];
}

export function playClick() {
  try {
    if (localStorage.getItem(STORAGE_KEY) !== '1') return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = 880;
    g.gain.value = 0.02;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.04);
    ctx.resume?.();
  } catch {
    /* ignore */
  }
}
