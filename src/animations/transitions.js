/** Shared easing + timing for Framer Motion */

export const EASE_OUT = [0.22, 1, 0.36, 1];

export const springSnappy = { type: 'spring', stiffness: 380, damping: 32, mass: 0.6 };

export const springSoft = { type: 'spring', stiffness: 260, damping: 28 };

export const pageTransition = {
  duration: 0.4,
  ease: EASE_OUT,
};

export const fadeUp = {
  duration: 0.5,
  ease: EASE_OUT,
};
