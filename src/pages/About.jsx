import { motion } from 'framer-motion';
import CTA from '../components/CTA';
import SectionHeading from '../components/ui/SectionHeading';

const focusAreas = [
  { title: 'JavaScript & React', text: 'Building interactive interfaces and sharpening component-driven architecture.' },
  { title: 'Data Structures', text: 'Strengthening problem-solving fundamentals for technical interviews and robust code.' },
  { title: 'Real-world projects', text: 'Shipping ideas that matter — from local AI tools to vision systems on the edge.' },
];

export default function About() {
  return (
    <div style={{ padding: '3rem 0 4rem' }}>
      <SectionHeading
        title="About"
        subtitle="Computer Science Engineering student focused on impactful software and continuous learning."
      />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{
          marginBottom: '2.5rem',
          padding: '1.75rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          background: 'var(--glass)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, margin: 0, fontSize: '1.05rem' }}>
          I am a Computer Science Engineering student passionate about building real-world impactful projects. I focus on
          learning by doing, creating applications that solve practical problems. I am currently improving my skills in
          JavaScript, React, and Data Structures while aiming to become a strong software engineer and achieve a 20+ LPA
          role.
        </p>
      </motion.section>

      <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {focusAreas.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ delay: i * 0.06 }}
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: 'var(--glass)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', color: 'var(--accent)' }}>{item.title}</h2>
            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.65, fontSize: '0.95rem' }}>{item.text}</p>
          </motion.article>
        ))}
      </div>

      <CTA />
    </div>
  );
}
