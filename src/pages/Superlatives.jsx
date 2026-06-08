import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { superlatives } from '../lib/mockData';

function SuperlativeCard({ item, index }) {
  const [voted, setVoted] = useState(false);
  const [nomineeInput, setNomineeInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNominate = () => {
    if (nomineeInput.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <div className="card" style={{ padding: 28 }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>{item.icon}</div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          letterSpacing: '0.04em',
          marginBottom: 6,
        }}>{item.title}</h3>
        <p style={{
          color: 'var(--silver)',
          fontSize: '0.85rem',
          lineHeight: 1.5,
          marginBottom: 20,
        }}>{item.description}</p>

        {/* Nominees area */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: 6,
          padding: 14,
          marginBottom: 16,
          minHeight: 60,
        }}>
          {item.nominees.length === 0 ? (
            <p style={{ color: 'rgba(191,195,199,0.3)', fontSize: '0.8rem', textAlign: 'center', margin: 0 }}>
              No nominees yet — be the first
            </p>
          ) : (
            item.nominees.map((n, i) => (
              <div key={i} style={{ fontSize: '0.85rem', color: 'var(--silver)', marginBottom: 4 }}>{n}</div>
            ))
          )}
        </div>

        {/* Nominate form */}
        {!submitted ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="text"
              placeholder="Nominate someone..."
              value={nomineeInput}
              onChange={e => setNomineeInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleNominate()}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                padding: '8px 12px',
                color: 'var(--off-white)',
                fontSize: '0.82rem',
              }}
            />
            <button
              onClick={handleNominate}
              style={{
                background: 'var(--cardinal-red)',
                color: '#fff',
                borderRadius: 6,
                padding: '8px 14px',
                fontSize: '0.82rem',
                fontWeight: 600,
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#a50d24'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--cardinal-red)'}
            >
              Nominate
            </button>
          </div>
        ) : (
          <div style={{
            background: 'rgba(200,16,46,0.08)',
            border: '1px solid rgba(200,16,46,0.2)',
            borderRadius: 6,
            padding: '10px 14px',
            textAlign: 'center',
            fontSize: '0.82rem',
            color: 'var(--cardinal-red)',
          }}>
            ✓ Nomination submitted! Full voting opens at the reunion.
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Superlatives() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="page-header">
        <div className="badge badge-gold" style={{ marginBottom: 20 }}>✦ Vote Again ✦</div>
        <h1>SENIOR <span>SUPERLATIVES</span></h1>
        <p>We voted once in 2007. Time to do it again. Nominate classmates now — official voting opens at the reunion.</p>
        <div className="red-line" />
      </div>

      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--charcoal) 0%, rgba(200,16,46,0.08) 100%)',
        border: '1px solid rgba(200,16,46,0.2)',
        margin: '40px 40px 0',
        maxWidth: 900,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 10,
        padding: '28px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>
        <div style={{ fontSize: '2rem', flexShrink: 0 }}>🗳️</div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 4 }}>
            VOTING OPENS JULY 18, 2027
          </div>
          <p style={{ color: 'var(--silver)', fontSize: '0.88rem', lineHeight: 1.5 }}>
            Nominations are open now. Submit your picks below — official voting and live results happen at the reunion.
            Gala winners announced Saturday night.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="grid-3">
          {superlatives.map((item, i) => (
            <SuperlativeCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Old school favorites */}
      <section style={{ background: 'var(--charcoal)', padding: '60px 40px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: 12 }}>
            FROM THE <span style={{ color: 'var(--cardinal-red)' }}>2007 YEARBOOK</span>
          </h2>
          <p style={{ color: 'var(--silver)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            The OG superlatives were voted on by the class. Winners were announced at senior banquet.
            How do those predictions hold up 20 years later? We'll find out at the reunion.
          </p>
        </div>
      </section>
    </div>
  );
}
