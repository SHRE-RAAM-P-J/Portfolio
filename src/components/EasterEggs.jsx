import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { playPop } from '../hooks/useSubtleSound';

const MESSAGES = [
  'You found the builder terminal.',
  'Currently: shipping projects > collecting shortcuts.',
  'Tip: consistency compounds faster than motivation.',
];

export default function EasterEggs() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const toggle = useCallback(() => {
    setOpen((v) => {
      if (!v) {
        playPop();
      }
      return !v;
    });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = document.activeElement?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle]);

  function runCommand(cmd) {
    const c = cmd.trim().toLowerCase();
    if (c === 'help') {
      setOutput('Commands: help · about · build · clear · exit');
    } else if (c === 'about') {
      setOutput('SHRE RAAM P J — CSE student building real software products.');
    } else if (c === 'build') {
      setOutput('Status: Building meaningful software. Momentum > perfection.');
    } else if (c === 'clear') {
      setOutput('');
    } else if (c === 'exit') {
      setOpen(false);
      setOutput('');
    } else if (c) {
      setOutput(`Unknown: ${cmd}. Type "help".`);
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="secret-terminal-root"
          role="dialog"
          aria-label="Developer terminal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="secret-terminal-backdrop" aria-label="Close" onClick={() => setOpen(false)} />
          <motion.div
            className="secret-terminal-panel"
            initial={reduce ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
          >
            <div className="secret-terminal-bar">
              <span>builder@portfolio</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close terminal">
                ✕
              </button>
            </div>
            <p className="secret-terminal-hint">{MESSAGES[msgIndex]}</p>
            {output ? <pre className="secret-terminal-out">{output}</pre> : null}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runCommand(input);
                setInput('');
                setMsgIndex((i) => (i + 1) % MESSAGES.length);
              }}
            >
              <span className="secret-terminal-prompt">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='try "build" or "help"'
                autoFocus
                spellCheck={false}
              />
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
