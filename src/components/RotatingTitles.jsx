import { useState, useEffect } from 'react';

const titles = [
  'Creative Engineer',
  'Startup Builder',
  'Problem Solver',
  'AI Explorer',
  'Future Founder'
];

export default function RotatingTitles() {
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setBlink((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorBlink);
  }, []);

  // Typing logic
  useEffect(() => {
    // If we finished typing the current title, pause before starting deletion
    if (subIndex === titles[index].length + 1 && !isDeleting) {
      const pauseTimeout = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(pauseTimeout);
    }

    // If we finished deleting the current title, switch to the next one
    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    // Determine typing speed (slower for typing, faster for deleting)
    const speed = isDeleting ? 45 : 95;

    const typeTimeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      setCurrentText(titles[index].substring(0, subIndex + (isDeleting ? -1 : 1)));
    }, speed);

    return () => clearTimeout(typeTimeout);
  }, [subIndex, isDeleting, index]);

  return (
    <span
      style={{
        color: 'var(--accent-2)',
        fontWeight: 700,
        textShadow: 'var(--title-glow)',
        display: 'inline-block',
        position: 'relative'
      }}
    >
      {currentText}
      <span
        style={{
          opacity: blink ? 1 : 0,
          color: 'var(--accent)',
          marginLeft: '2px',
          fontWeight: 300,
          transition: 'opacity 0.15s ease'
        }}
      >
        |
      </span>
    </span>
  );
}
