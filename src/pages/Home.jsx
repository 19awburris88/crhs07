import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CountdownTimer from '../components/CountdownTimer';
import TimeCapsule from '../components/TimeCapsule';
import pirateLogo from '../assets/priatelogo.png';

const sections = [
  { to: '/directory', emoji: '🎓', label: 'Class Directory', desc: 'Find your classmates, see where everyone landed.' },
  { to: '/then-and-now', emoji: '📸', label: 'Then & Now', desc: 'Senior photo meets 20 years later. The glow-ups are real.' },
  { to: '/roll-call', emoji: '\u{1F5FA}', label: 'Raider Roll Call', desc: "Live map of where Raiders are now. We're everywhere." },
  { to: '/memory-lane', emoji: '\u{1F3C6}', label: 'Memory Lane', desc: 'Sports, prom, homecoming, graduation — it all lives here.' },
  { to: '/hall-of-raiders', emoji: '⭐', label: 'Hall of Raiders', desc: 'Celebrating classmates doing extraordinary things.' },
  { to: '/superlatives', emoji: '\u{1F5F3}', label: 'Senior Superlatives', desc: 'Most Likely to Succeed? Class Clown? Vote again in 2027.' },
];

const stats = [
  { value: '400+', label: 'Classmates' },
  { value: '20', label: 'Years' },
  { value: '3', label: 'Days' },
  { value: '1', label: 'Raider Family' },
];

export default function Home() {
  return (
    <div style={{ paddingTop: 0 }}>
      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '100px 40px 80px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--raider-black)',
      }}>
        {/* Background gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 30%, rgba(200,16,46,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(200,16,46,0.08) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }} />

        {/* Grid lines texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        {/* Pirate mascot — right side watermark */}
        <div style={{
          position: 'absolute',
          right: '-2%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(260px, 32vw, 460px)',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          <img
            src={pirateLogo}
            alt=""
            style={{ width: '100%', filter: 'brightness(0) invert(1)' }}
          />
        </div>

        {/* Pirate mascot — left side mirror (subtle) */}
        <div style={{
          position: 'absolute',
          left: '-4%',
          bottom: '8%',
          width: 'clamp(160px, 18vw, 280px)',
          opacity: 0.05,
          pointerEvents: 'none',
          zIndex: 0,
          transform: 'scaleX(-1)',
        }}>
          <img
            src={pirateLogo}
            alt=""
            style={{ width: '100%', filter: 'brightness(0) invert(1)' }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="badge badge-red" style={{ marginBottom: 24, fontSize: '0.72rem' }}>
              ✦ Once a Raider, Always a Raider ✦
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 12vw, 9rem)',
              letterSpacing: '0.04em',
              lineHeight: 0.95,
              color: 'var(--off-white)',
              marginBottom: 8,
            }}
          >
            CARDINAL
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 12vw, 9rem)',
              letterSpacing: '0.04em',
              lineHeight: 0.95,
              color: 'var(--cardinal-red)',
              marginBottom: 20,
            }}
          >
            RITTER
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{
              width: 80,
              height: 2,
              background: 'var(--cardinal-red)',
              margin: '0 auto 20px',
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
              color: 'var(--silver)',
              letterSpacing: '0.2em',
              marginBottom: 8,
            }}>
              CLASS OF 2007
            </h2>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
              color: 'var(--off-white)',
              letterSpacing: '0.1em',
              marginBottom: 32,
            }}>
              20 YEAR REUNION
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ marginBottom: 40 }}
          >
            <div style={{
              display: 'inline-block',
              color: 'var(--silver)',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}>
              — July 18–20, 2027 · Indianapolis, Indiana —
            </div>
            <CountdownTimer large />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              color: 'var(--silver)',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              marginBottom: 40,
              lineHeight: 1.6,
              maxWidth: 550,
              margin: '0 auto 40px',
            }}
          >
            20 Years. Hundreds of Stories. One Raider Family.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link to="/submit" className="btn btn-red" style={{ fontSize: '1rem', padding: '16px 40px' }}>
              RSVP Now →
            </Link>
            <Link to="/about" className="btn btn-outline" style={{ fontSize: '1rem', padding: '16px 40px' }}>
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            color: 'var(--silver)',
          }}
        >
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ width: 1, height: 28, background: 'var(--cardinal-red)', opacity: 0.6 }}
          />
        </motion.div>
      </section>

      {/* STATS */}
      <section style={{
        background: 'var(--cardinal-red)',
        padding: '40px',
      }}>
        <div style={{
          maxWidth: 900,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          textAlign: 'center',
        }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#fff',
                lineHeight: 1,
              }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        <style>{`@media(max-width:600px){ .stats-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
      </section>

      {/* ABOUT PREVIEW */}
      <section style={{
        padding: '80px 40px',
        maxWidth: 900,
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            marginBottom: 24,
            lineHeight: 1.05,
          }}>
            IN 2007 WE WALKED ACROSS THE STAGE.<br />
            <span style={{ color: 'var(--cardinal-red)' }}>TWENTY YEARS LATER</span>, WE'RE COMING BACK.
          </h2>
          <p style={{
            color: 'var(--silver)',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            maxWidth: 700,
            margin: '0 auto 32px',
          }}>
            We were the Class of 2007 — Cardinals, Raiders, family. We came up together,
            graduated together, and went out into the world. Twenty years later, we're
            reconnecting to celebrate, remember those we've lost, and create new memories.
          </p>
          <Link to="/about" className="btn btn-ghost">Read the Full Story</Link>
        </motion.div>
      </section>

      {/* TIME CAPSULE */}
      <TimeCapsule />

      {/* SECTIONS GRID */}
      <section style={{ padding: '80px 40px', background: 'var(--raider-black)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">EXPLORE THE SITE</h2>
            <p className="section-sub">Everything you need to reconnect with your Ritter family.</p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {sections.map((s, i) => (
              <motion.div
                key={s.to}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={s.to} style={{ display: 'block' }}>
                  <div className="card" style={{ padding: 28 }}>
                    <div style={{ fontSize: '2rem', marginBottom: 14 }}>{s.emoji}</div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      marginBottom: 8,
                      color: 'var(--off-white)',
                    }}>{s.label}</div>
                    <p style={{ color: 'var(--silver)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</p>
                    <div style={{
                      marginTop: 20,
                      color: 'var(--cardinal-red)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                    }}>Explore →</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        background: `linear-gradient(135deg, var(--red-dark) 0%, var(--cardinal-red) 50%, #e01535 100%)`,
        padding: '80px 40px',
        textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            color: '#fff',
            marginBottom: 16,
          }}>
            ARE YOU COMING?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            Register now. Tell us who you are, where you've been, and submit your photos.
            Let's make this a reunion to remember.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/submit" className="btn" style={{
              background: '#fff',
              color: 'var(--cardinal-red)',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '16px 40px',
            }}>
              Register for Reunion →
            </Link>
            <Link to="/directory" className="btn" style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid rgba(255,255,255,0.6)',
              fontSize: '1rem',
              padding: '16px 40px',
            }}>
              Find Classmates
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
