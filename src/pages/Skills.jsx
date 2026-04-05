import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import CTA from '../components/CTA';
import SkillRing from '../components/SkillRing';
import SectionHeading from '../components/ui/SectionHeading';

const SkillsOrbit = lazy(() => import('../components/SkillsOrbit'));

const categories = [
  {
    name: 'Languages & foundations',
    color: '#818cf8',
    skills: [
      { label: 'JavaScript', value: 88 },
      { label: 'Python', value: 85 },
      { label: 'C++', value: 82 },
      { label: 'Data Structures', value: 80 },
    ],
  },
  {
    name: 'Web & apps',
    color: '#34d399',
    skills: [
      { label: 'React', value: 86 },
      { label: 'Flask', value: 78 },
      { label: 'Qt (desktop)', value: 75 },
    ],
  },
  {
    name: 'Systems & ML',
    color: '#f472b6',
    skills: [
      { label: 'YOLO / computer vision', value: 72 },
      { label: 'ESP32-CAM / edge', value: 70 },
      { label: 'Git & tooling', value: 85 },
    ],
  },
];

function Bar({ label, value, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      style={{ marginBottom: '1.1rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.9rem' }}>
        <span>{label}</span>
        <span style={{ color: 'var(--text-muted)' }}>{value}%</span>
      </div>
      <div
        style={{
          height: 8,
          borderRadius: 999,
          background: 'var(--surface)',
          overflow: 'hidden',
          border: '1px solid var(--border)',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%',
            borderRadius: 999,
            background: `linear-gradient(90deg, ${color}, rgba(200, 200, 255, 0.35))`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <div style={{ padding: '3rem 0 4rem' }}>
      <SectionHeading
        title="Skills"
        subtitle="Stack aligned with my projects and current learning: JavaScript, React, Python, C++, Qt, YOLO, and Flask."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          marginBottom: '2.5rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          background: 'var(--glass)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Suspense
          fallback={
            <div style={{ height: 260, display: 'grid', placeItems: 'center', color: 'var(--text-muted)' }}>
              Loading 3D scene…
            </div>
          }
        >
          <SkillsOrbit />
        </Suspense>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          marginBottom: '2.5rem',
          padding: '1.5rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          background: 'var(--glass)',
        }}
      >
        <SkillRing label="JavaScript" value={88} color="#818cf8" />
        <SkillRing label="React" value={86} color="#34d399" />
        <SkillRing label="Python" value={85} color="#f472b6" />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
        {categories.map((cat) => (
          <motion.section
            key={cat.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: 'var(--glass)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: '1.15rem', color: cat.color }}>{cat.name}</h2>
            {cat.skills.map((s) => (
              <Bar key={`${cat.name}-${s.label}`} label={s.label} value={s.value} color={cat.color} />
            ))}
          </motion.section>
        ))}
      </div>

      <CTA />
    </div>
  );
}
