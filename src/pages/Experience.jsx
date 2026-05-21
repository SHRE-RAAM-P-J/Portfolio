import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import CTA from '../components/CTA';
import SectionHeading from '../components/ui/SectionHeading';

const internships = [
  {
    company: 'INAMIGOS',
    role: 'AI & Web Development Intern',
    period: 'Internship',
    summary:
      'Recreated foundation web experiences, audited vulnerabilities, and delivered AI-assisted business website builds with practical deployment outcomes.',
    work: [
      'Recreated the foundation website with improved structure and consistent UI quality.',
      'Implemented redirects to original website pages for smooth continuity.',
      'Analyzed website vulnerabilities and documented findings professionally.',
      'Built a complete real estate business website using AI-assisted workflows.',
    ],
    tech: ['HTML', 'CSS', 'React', 'Vite'],
    links: [
      { label: 'Website 1', href: 'https://shre-raam-p-j.github.io/InAmigos-Intern/' },
      { label: 'Website 2', href: 'https://estatei.vercel.app' },
      { label: 'GitHub 1', href: 'https://github.com/SHRE-RAAM-P-J/InAmigos-Intern' },
      { label: 'GitHub 2', href: 'https://github.com/SHRE-RAAM-P-J/Estatein' },
    ],
    learnings: [
      'Balanced speed with quality during stakeholder-facing delivery.',
      'Improved security awareness through practical website auditing.',
      'Strengthened full-cycle product execution under real constraints.',
    ],
  },
  {
    company: 'SR NEXT',
    role: 'Software Developer Intern',
    period: 'Internship',
    summary:
      'Contributed to an Instagram Influencer Analytics Pipeline with data processing, automation workflows, and ML-assisted ranking systems for structured reporting.',
    work: [
      'Processed and cleaned large-scale influencer datasets for analysis readiness.',
      'Built analytics and visualization workflows for campaign intelligence.',
      'Automated repeated data operations to improve team efficiency.',
      'Supported ML-assisted ranking workflows and reporting/dashboard generation.',
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Excel', 'Google Sheets', 'Apify', 'Heepsy'],
    links: [{ label: 'GitHub', href: 'https://github.com/SHRE-RAAM-P-J/instagram-influencer-analytics' }],
    achievements: [
      'Improved dataset reliability through structured data cleaning and validation.',
      'Created repeatable analysis pipelines for faster decision support.',
      'Connected automation and analytics into a practical business workflow.',
    ],
    learnings: [
      'Learned to transform noisy data into usable product insights.',
      'Strengthened end-to-end thinking across data, automation, and reporting.',
      'Gained experience in scalable analytics for startup growth use cases.',
    ],
  },
];

function TimelineStep({ internship, index, reduce }) {
  const stepRef = useRef(null);
  const inView = useInView(stepRef, {
    once: true,
    amount: 0.2,
    margin: '0px 0px -48px 0px',
  });
  const visible = reduce || inView;

  return (
    <div ref={stepRef} className="experience-step">
      <div className={`experience-node-wrap${visible ? ' is-active' : ''}`}>
        <span className="experience-node-aura experience-node-aura--far" aria-hidden="true" />
        <span className="experience-node-aura experience-node-aura--mid" aria-hidden="true" />
        <div className="experience-node" aria-hidden="true">
          <span className="experience-node-pulse" aria-hidden="true" />
          <span className="experience-node-number">{index + 1}</span>
        </div>
      </div>

      <motion.article
        className="experience-card-pro"
        initial={false}
        animate={{ opacity: 1, y: visible ? 0 : 14 }}
        transition={{ duration: 0.45, delay: reduce ? 0 : index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="experience-top-row">
          <div>
            <p className="experience-company">{internship.company}</p>
            <h3>{internship.role}</h3>
          </div>
          <span className="experience-period">{internship.period}</span>
        </div>

        <p className="experience-summary">{internship.summary}</p>

        <div className="experience-split-grid">
          <div>
            <h4>Work Completed</h4>
            <ul>
              {internship.work.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Key Learnings</h4>
            <ul>
              {(internship.learnings || []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {internship.achievements && (
          <div className="experience-achievements">
            {internship.achievements.map((item) => (
              <div key={item} className="achievement-chip">
                {item}
              </div>
            ))}
          </div>
        )}

        <div className="experience-tech-row">
          {internship.tech.map((tag) => (
            <span key={tag} className="experience-tech-badge">
              {tag}
            </span>
          ))}
        </div>

        <div className="experience-link-row">
          {internship.links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="experience-link-btn"
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </motion.article>
    </div>
  );
}

export default function Experience() {
  const reduce = useReducedMotion();
  const timelineRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.08 });

  return (
    <div className="experience-page">
      <SectionHeading
        title="Work Experience"
        subtitle="Internship execution across product engineering, web delivery, and analytics workflows."
      />

      <section className="experience-timeline" aria-label="Internship timeline">
        <div ref={timelineRef} className="experience-timeline-inner">
          <motion.div
            className="experience-line"
            aria-hidden="true"
            initial={false}
            animate={
              reduce || timelineInView ? { scaleY: 1, opacity: 1 } : { scaleY: 0.15, opacity: 0.5 }
            }
            transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top center' }}
          />

          {internships.map((internship, index) => (
            <TimelineStep key={internship.company} internship={internship} index={index} reduce={reduce} />
          ))}
        </div>
      </section>

      <CTA />
    </div>
  );
}
