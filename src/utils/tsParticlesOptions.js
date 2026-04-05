/**
 * tsParticles options — subtle motion, window-based pointer detection so UI stays clickable.
 * @param {boolean} isMobile
 * @param {boolean} isLight
 */
export function getTsParticlesOptions(isMobile, isLight) {
  const count = isMobile ? 28 : 48;
  const colors = isLight ? ['#4338ca', '#6d28d9', '#0369a1'] : ['#818cf8', '#c084fc', '#38bdf8'];
  return {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: isMobile ? 45 : 60,
    detectRetina: true,
    particles: {
      number: { value: count, density: { enable: true, area: 900 } },
      color: { value: colors },
      opacity: { value: { min: isLight ? 0.18 : 0.15, max: isLight ? 0.42 : 0.45 } },
      size: { value: { min: 1, max: 2.8 } },
      links: {
        enable: true,
        distance: isMobile ? 110 : 130,
        color: isLight ? '#6366f1' : '#818cf8',
        opacity: isLight ? 0.16 : 0.12,
        width: 1,
      },
      move: {
        enable: true,
        speed: isMobile ? 0.45 : 0.75,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' },
        resize: { enable: true },
      },
      modes: {
        grab: { distance: 150, links: { opacity: isLight ? 0.28 : 0.32 } },
        push: { quantity: 2 },
      },
    },
  };
}
