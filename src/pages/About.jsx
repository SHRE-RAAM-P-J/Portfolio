import { motion } from 'framer-motion';
import CTA from '../components/CTA';
import SectionHeading from '../components/ui/SectionHeading';

const strengths = [
  'Fast Learner',
  'Problem Solver',
  'Self Driven',
  'Builder Mindset',
  'Startup Oriented',
  'Consistent Learner',
];

const journeyStages = [
  {
    title: 'Exploration',
    text: 'Started with curiosity for technology and digital systems, testing different tools and learning how products are built.',
  },
  {
    title: 'Distraction',
    text: 'Experienced a phase of gaming addiction that reduced focus, then recognized the long-term cost of drifting away from meaningful goals.',
  },
  {
    title: 'Realization',
    text: 'Shifted mindset toward ownership, discipline, and future-oriented decisions with a stronger vision for personal and professional growth.',
  },
  {
    title: 'Discipline',
    text: 'Built consistent routines around study, coding, and self-improvement with measurable progress over short-term intensity.',
  },
  {
    title: 'Building',
    text: 'Focused on real-world software projects, practical engineering skills, and product thinking across web and AI-assisted workflows.',
  },
  {
    title: 'Future Vision',
    text: 'Working toward becoming a high-impact engineer and startup builder with a clear goal of financial independence through valuable products.',
  },
];

export default function About() {
  return (
    <div className="about-page">
      <SectionHeading
        title="About Me"
        subtitle="Disciplined engineering journey, product-first mindset, and long-term founder ambition."
      />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="about-story-card"
      >
        <p className="about-kicker">Founder-minded software engineer in progress</p>
        <h2>Building with consistency, clarity, and long-term intent.</h2>
        <p className="about-story-text">
          I am a passionate Computer Science Engineering student focused on becoming financially independent by building meaningful software products.
          My growth has come from consistency over shortcuts: learning new technologies, shipping practical projects, and improving every month through disciplined execution.
          I am especially interested in startup environments, product building, and real-world problem solving where engineering creates measurable value.
          A major personal turning point was moving from a gaming-addiction phase into focused self-development, and that shift now drives my work ethic, mindset, and ambition.
        </p>
      </motion.section>

      <section className="about-strengths">
        <h3>Strengths & Highlights</h3>
        <div className="about-strength-grid">
          {strengths.map((item, i) => (
            <motion.article
              key={item}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ delay: i * 0.05 }}
              className="about-strength-card"
            >
              <span className="about-strength-dot" aria-hidden="true" />
              <p>{item}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="journey-section">
        <div className="journey-header">
          <h3>My Journey</h3>
          <p>
            A focused progression from distraction to disciplined building, shaped by consistent learning and startup ambition.
          </p>
        </div>

        <div className="journey-timeline">
          <div className="journey-line" aria-hidden="true" />
          {journeyStages.map((stage, i) => (
            <motion.article
              key={stage.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="journey-stage-card"
            >
              <div className="journey-stage-head">
                <span className="journey-stage-index">0{i + 1}</span>
                <h4>{stage.title}</h4>
              </div>
              <p>{stage.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <CTA />
    </div>
  );
}
