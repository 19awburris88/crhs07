import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { hallOfRaiders } from '../lib/mockData';

const categoryColors = {
  Technology: 'var(--cardinal-red)',
  Education: '#1a8b6b',
  Military: '#3d6b1a',
  Ministry: '#1a3d8b',
  Healthcare: '#6b4a1a',
  Entertainment: '#8b1a6b',
  Business: '#b85c1a',
  'Community Service': '#6b1a8b',
};

const categories = ['Technology', 'Education', 'Military', 'Ministry', 'Healthcare', 'Entertainment', 'Business', 'Community Service'];

export default function HallOfRaiders() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="page-header">
        <div className="badge badge-gold" style={{ marginBottom: 20 }}>✦ Class of 2007 ✦</div>
        <h1>HALL OF <span>RAIDERS</span></h1>
        <p>Classmates doing extraordinary things. Business owners, educators, military, ministry, healthcare, and community leaders.</p>
        <div className="red-line" />
      </div>

      {/* Category legend */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '20px 40px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {categories.map(cat => (
            <span
              key={cat}
              style={{
                padding: '5px 12px',
                borderRadius: 20,
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                background: `${categoryColors[cat]}15`,
                color: categoryColors[cat] || 'var(--silver)',
                border: `1px solid ${categoryColors[cat]}30`,
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Raiders grid */}
      <section className="section">
        <div className="grid-3">
          {hallOfRaiders.map((raider, i) => (
            <motion.div
              key={raider.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {/* Top banner */}
                <div style={{
                  height: 6,
                  background: categoryColors[raider.category] || 'var(--cardinal-red)',
                }} />

                <div style={{ padding: 28 }}>
                  {/* Avatar & category */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                    <div style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: raider.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      color: '#fff',
                      border: `2px solid ${categoryColors[raider.category] || 'var(--cardinal-red)'}40`,
                    }}>
                      {raider.initials}
                    </div>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: 20,
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      background: `${categoryColors[raider.category]}15`,
                      color: categoryColors[raider.category] || 'var(--silver)',
                      border: `1px solid ${categoryColors[raider.category]}30`,
                    }}>
                      {raider.category}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    letterSpacing: '0.04em',
                    marginBottom: 8,
                  }}>{raider.name}</h3>

                  <p style={{
                    color: categoryColors[raider.category] || 'var(--cardinal-red)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    fontStyle: 'italic',
                    marginBottom: 14,
                    lineHeight: 1.4,
                  }}>"{raider.tagline}"</p>

                  <p style={{
                    color: 'var(--silver)',
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                  }}>{raider.description}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Submit card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: hallOfRaiders.length * 0.1 }}
          >
            <Link to="/submit" style={{ display: 'block', height: '100%' }}>
              <div style={{
                height: '100%',
                minHeight: 280,
                border: '2px dashed rgba(200,16,46,0.3)',
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 28,
                textAlign: 'center',
                transition: 'all 0.25s ease',
                background: 'rgba(200,16,46,0.03)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--cardinal-red)';
                e.currentTarget.style.background = 'rgba(200,16,46,0.06)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(200,16,46,0.3)';
                e.currentTarget.style.background = 'rgba(200,16,46,0.03)';
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>⭐</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 12, color: 'var(--cardinal-red)' }}>
                  NOMINATE A RAIDER
                </h3>
                <p style={{ color: 'var(--silver)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 20 }}>
                  Know a classmate doing incredible things? Submit their story and they could be featured here.
                </p>
                <span style={{
                  color: 'var(--cardinal-red)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>Submit a Nomination →</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to action */}
      <section style={{
        background: 'var(--charcoal)',
        padding: '60px 40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: 12 }}>
          DOING <span style={{ color: 'var(--cardinal-red)' }}>AMAZING THINGS?</span>
        </h3>
        <p style={{ color: 'var(--silver)', fontSize: '0.95rem', maxWidth: 550, margin: '0 auto 28px', lineHeight: 1.7 }}>
          The Hall of Raiders is for every Ritter graduate making an impact — big or small.
          Business owners, teachers, first responders, parents, leaders. We see you.
        </p>
        <Link to="/submit" className="btn btn-red">Tell Us Your Story →</Link>
      </section>
    </div>
  );
}
