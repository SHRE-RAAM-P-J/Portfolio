/**
 * tsParticles options — subtle motion, window-based pointer detection so UI stays clickable.
 * @param {boolean} isMobile
 * @param {boolean} isLight
 */
export function getTsParticlesOptions(isMobile, isLight) {
  const count = isMobile ? 32 : 55;
  const colors = isLight ? ['#ea580c', '#f59e0b', '#fb923c'] : ['#818cf8', '#c084fc', '#38bdf8'];
  return {
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: isMobile ? 45 : 60,
    detectRetina: true,
    particles: {
      number: { value: count, density: { enable: true, area: 900 } },
      color: { value: colors },
      opacity: { value: { min: isLight ? 0.12 : 0.10, max: isLight ? 0.38 : 0.40 } },
      size: { value: { min: 0.8, max: 2.6 } },
      links: {
        enable: true,
        distance: isMobile ? 100 : 125,
        color: isLight ? '#ea580c' : '#818cf8',
        opacity: isLight ? 0.14 : 0.10,
        width: 1,
      },
      move: {
        enable: true,
        speed: isMobile ? 0.22 : 0.40,
        direction: 'none',
        random: false,
        straight: false,
        outModes: { default: 'out' },
      },
    },
    interactivity: {
      detectsOn: 'window',
      events: {
        onHover: {
          enable: true,
          mode: 'grab',
          parallax: {
            enable: true,
            force: 50,
            smooth: 12
          }
        },
        onClick: { enable: true, mode: 'push' },
        resize: { enable: true },
      },
      modes: {
        grab: { distance: 140, links: { opacity: isLight ? 0.22 : 0.26 } },
        push: { quantity: 2 },
      },
    },
  };
}
