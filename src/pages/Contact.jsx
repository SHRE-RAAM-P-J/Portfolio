import { AnimatePresence, motion } from 'framer-motion';
import CTA from '../components/CTA';
import SectionHeading from '../components/ui/SectionHeading';
import { useContactForm } from '../hooks/useContactForm';
import { playClick } from '../hooks/useSubtleSound';

export default function Contact() {
  const { values, setField, focused, setFocused, status, loading, submit } = useContactForm();

  function fieldStyle(id) {
    const isF = focused === id;
    return {
      width: '100%',
      padding: '14px 16px',
      borderRadius: 12,
      border: `1px solid ${isF ? 'var(--accent)' : 'var(--border)'}`,
      background: 'var(--surface)',
      color: 'var(--text)',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s',
      boxShadow: isF ? '0 0 0 3px var(--accent-glow)' : 'none',
    };
  }

  function onSubmit(e) {
    playClick();
    submit(e);
  }

  return (
    <div style={{ padding: '3rem 0 4rem' }}>
      <SectionHeading
        title="Contact"
        subtitle={
          <>
            Email me at{' '}
            <a href="mailto:shreraam007@gmail.com" style={{ color: 'var(--accent)' }}>
              shreraam007@gmail.com
            </a>{' '}
            or use the form below. I typically reply within a few days.
          </>
        }
      />

      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          maxWidth: 520,
          padding: '2rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          background: 'var(--glass)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <label htmlFor="name" style={{ display: 'block', marginBottom: '1.15rem' }}>
          <span style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.9rem' }}>Name</span>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            id="name"
            name="name"
            required
            value={values.name}
            onChange={(e) => setField('name', e.target.value)}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused((f) => (f === 'name' ? null : f))}
            style={fieldStyle('name')}
            placeholder="Your name"
          />
        </label>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '1.15rem' }}>
          <span style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.9rem' }}>Email</span>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            id="email"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={(e) => setField('email', e.target.value)}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused((f) => (f === 'email' ? null : f))}
            style={fieldStyle('email')}
            placeholder="you@example.com"
          />
        </label>
        <label htmlFor="message" style={{ display: 'block', marginBottom: '1.15rem' }}>
          <span style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.9rem' }}>Message</span>
          <motion.textarea
            whileFocus={{ scale: 1.005 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            id="message"
            name="message"
            required
            rows={5}
            value={values.message}
            onChange={(e) => setField('message', e.target.value)}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused((f) => (f === 'message' ? null : f))}
            style={{ ...fieldStyle('message'), resize: 'vertical', minHeight: 120 }}
            placeholder="Tell me about the opportunity…"
          />
        </label>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          style={{
            marginTop: 8,
            width: '100%',
            padding: '14px 20px',
            borderRadius: 999,
            border: 'none',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: loading ? 'wait' : 'pointer',
            background: loading ? 'var(--text-muted)' : 'linear-gradient(135deg, var(--accent), var(--accent-2))',
            color: 'var(--on-accent)',
          }}
        >
          {loading ? 'Sending…' : 'Send message'}
        </motion.button>

        <AnimatePresence mode="wait">
          {status && (
            <motion.p
              key={status.text}
              role="status"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              style={{
                marginTop: '1rem',
                marginBottom: 0,
                padding: '12px 14px',
                borderRadius: 12,
                fontSize: '0.9rem',
                background:
                  status.type === 'ok'
                    ? 'rgba(52, 211, 153, 0.12)'
                    : status.type === 'warn'
                      ? 'rgba(251, 191, 36, 0.12)'
                      : 'rgba(248, 113, 113, 0.12)',
                border: `1px solid ${
                  status.type === 'ok'
                    ? 'rgba(52, 211, 153, 0.35)'
                    : status.type === 'warn'
                      ? 'rgba(251, 191, 36, 0.45)'
                      : 'rgba(248, 113, 113, 0.35)'
                }`,
              }}
            >
              {status.text}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>

      <CTA />
    </div>
  );
}
