import { motion } from 'framer-motion';
import { timeCapsule } from '../lib/mockData';

export default function TimeCapsule() {
  return (
    <section style={{
      background: 'var(--charcoal)',
      padding: '80px 40px',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(200,16,46,0.1)',
            border: '1px solid rgba(200,16,46,0.25)',
            borderRadius: 20,
            padding: '6px 16px',
            marginBottom: 16,
          }}>
            <span style={{ fontSize: '0.95rem' }}>🕰️</span>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--cardinal-red)', textTransform: 'uppercase' }}>
              Time Capsule
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 8 }}>
            THE WORLD IN <span style={{ color: 'var(--cardinal-red)' }}>2007</span>
          </h2>
          <p style={{ color: 'var(--silver)', fontSize: '0.95rem' }}>
            Remember what the world looked like the year we graduated?
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}>
          {timeCapsule.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 10,
                padding: '24px 20px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>{item.icon}</div>
              <div style={{
                color: 'var(--silver)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}>{item.label}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'var(--off-white)',
                letterSpacing: '0.04em',
                lineHeight: 1.2,
              }}>{item.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
