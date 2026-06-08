import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function InMemoriam() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--raider-black)',
        padding: '140px 40px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(191,195,199,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            width: 1,
            height: 60,
            background: 'var(--silver)',
            margin: '0 auto 32px',
            opacity: 0.3,
          }} />
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            letterSpacing: '0.06em',
            color: 'var(--off-white)',
            marginBottom: 16,
          }}>
            IN MEMORIAM
          </h1>
          <p style={{
            color: 'var(--silver)',
            fontSize: '1.1rem',
            maxWidth: 550,
            margin: '0 auto',
            lineHeight: 1.8,
          }}>
            Honoring those from our Ritter family who are no longer with us.
            Their memory lives in us.
          </p>
          <div style={{
            width: 1,
            height: 60,
            background: 'var(--silver)',
            margin: '32px auto 0',
            opacity: 0.3,
          }} />
        </motion.div>
      </div>

      {/* Empty state / Placeholder */}
      <section style={{ padding: '80px 40px', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(191,195,199,0.08)',
            border: '1px solid rgba(191,195,199,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            fontSize: '2rem',
          }}>
            🕊️
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: 20,
            color: 'var(--off-white)',
          }}>
            A PLACE OF REMEMBRANCE
          </h2>

          <p style={{
            color: 'var(--silver)',
            fontSize: '1rem',
            lineHeight: 1.9,
            marginBottom: 20,
          }}>
            This page is dedicated to the members of our Ritter family — classmates, teachers,
            coaches, and staff — who have passed away since we walked the halls together.
          </p>

          <p style={{
            color: 'var(--silver)',
            fontSize: '1rem',
            lineHeight: 1.9,
            marginBottom: 40,
          }}>
            If you know of someone who should be honored here, please reach out to the reunion
            committee through the registration form. We want to make sure no one is forgotten.
          </p>

          <div style={{
            background: 'rgba(191,195,199,0.04)',
            border: '1px solid rgba(191,195,199,0.1)',
            borderRadius: 8,
            padding: '32px',
            marginBottom: 40,
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              color: 'var(--silver)',
              lineHeight: 1.4,
              fontStyle: 'italic',
            }}>
              "To live in hearts we leave behind is not to die."
            </div>
            <div style={{ color: 'rgba(191,195,199,0.4)', fontSize: '0.8rem', marginTop: 12 }}>
              — Thomas Campbell
            </div>
          </div>

          <Link to="/submit" className="btn btn-outline">
            Submit a Name to Honor →
          </Link>
        </motion.div>
      </section>

      {/* During reunion */}
      <section style={{
        background: 'var(--charcoal)',
        padding: '60px 40px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: 16,
          }}>
            REUNION MEMORIAL MOMENT
          </h3>
          <p style={{ color: 'var(--silver)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 24 }}>
            During the Saturday Gala on July 19, 2027, we will hold a dedicated moment of
            remembrance to honor those we have lost. A slide presentation will be shown with
            photos and names of those we want to remember.
          </p>
          <p style={{ color: 'rgba(191,195,199,0.5)', fontSize: '0.85rem', lineHeight: 1.7 }}>
            Families who have lost a classmate or faculty member are welcome and encouraged to attend.
          </p>
        </div>
      </section>
    </div>
  );
}
