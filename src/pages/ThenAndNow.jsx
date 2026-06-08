import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ImageComparison from '../components/ImageComparison';
import { mockClassmates } from '../lib/mockData';
import austinThen from '../assets/austinthen.jpg';
import austinNow from '../assets/austinnow.jpg';
import trentThen from '../assets/trentthen.jpg';
import trentNow from '../assets/trentnow.jpg';

const examples = mockClassmates.slice(1, 5);

export default function ThenAndNow() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="page-header">
        <div className="badge badge-red" style={{ marginBottom: 20 }}>✦ Glow-Up Alert ✦</div>
        <h1>THEN <span>&</span> NOW</h1>
        <p>Senior photo meets 2027. Drag the slider to reveal the transformation. The glow-ups are real.</p>
        <div className="red-line" />
      </div>

      {/* Instructions */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '20px 40px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: 'var(--silver)', fontSize: '0.88rem' }}>
            👆 Drag the slider left and right to compare Then & Now. Submit your photos via the registration form.
          </p>
        </div>
      </div>

      {/* Demo Comparison */}
      <section style={{ padding: '60px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              textAlign: 'center',
              marginBottom: 8,
            }}>
              THE CLASS OF 2007 <span style={{ color: 'var(--cardinal-red)' }}>TRANSFORMATION</span>
            </h2>
            <p style={{ color: 'var(--silver)', textAlign: 'center', marginBottom: 40, fontSize: '0.9rem' }}>
              Drag the slider to see the before and after
            </p>

            <ImageComparison
              thenSrc={austinThen}
              nowSrc={austinNow}
              height={480}
              thenLabel="THEN · 2007"
              nowLabel="NOW · 2027"
            />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 14,
              flexWrap: 'wrap',
              gap: 8,
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>Austin Burris</div>
                <div style={{ color: 'var(--silver)', fontSize: '0.82rem', marginTop: 2 }}>
                  Dallas, TX · Software Engineer & Entrepreneur
                </div>
              </div>
              <p style={{
                color: 'rgba(191,195,199,0.4)',
                fontSize: '0.75rem',
                fontStyle: 'italic',
                margin: 0,
              }}>
                Drag the slider ◀▶
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Classmate cards */}
      <section style={{ background: 'var(--charcoal)', padding: '60px 40px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: 8 }}>
            CLASSMATE <span style={{ color: 'var(--cardinal-red)' }}>COMPARISONS</span>
          </h2>
          <p className="section-sub">
            More comparisons will appear as classmates submit their photos.
          </p>

          <div className="grid-2">
            {/* Austin's card with real photos */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="card">
                <ImageComparison thenSrc={austinThen} nowSrc={austinNow} height={320} />
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Austin Burris</div>
                  <div style={{ color: 'var(--silver)', fontSize: '0.8rem', marginTop: 2 }}>
                    Dallas, TX · Software Engineer & Entrepreneur
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trent Barnes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className="card">
                <ImageComparison thenSrc={trentThen} nowSrc={trentNow} height={320} />
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Trent Barnes</div>
                  <div style={{ color: 'var(--silver)', fontSize: '0.8rem', marginTop: 2 }}>
                    Indianapolis, IN · Therapist
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Placeholder cards for other classmates */}
            {examples.map((person, i) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i + 1) * 0.1, duration: 0.4 }}
              >
                <div className="card">
                  <ImageComparison height={320} />
                  <div style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{person.name}</div>
                    <div style={{ color: 'var(--silver)', fontSize: '0.8rem', marginTop: 2 }}>
                      {person.city} · {person.occupation}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit CTA */}
      <section style={{ padding: '80px 40px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>📸</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 16 }}>
            SUBMIT YOUR <span style={{ color: 'var(--cardinal-red)' }}>PHOTOS</span>
          </h2>
          <p style={{ color: 'var(--silver)', fontSize: '1rem', maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Upload your senior photo and a recent photo through the registration form.
            We'll create your personal Then & Now slider.
          </p>
          <Link to="/submit" className="btn btn-red">Submit Your Photos →</Link>
        </motion.div>
      </section>
    </div>
  );
}
