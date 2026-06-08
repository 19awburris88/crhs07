import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { memoryCategories, mockMemories } from '../lib/mockData';

function MemoryCard({ memory, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card"
      style={{ overflow: 'hidden' }}
    >
      <div style={{
        height: 200,
        background: memory.gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.2)',
        }} />
        <div style={{
          position: 'relative',
          textAlign: 'center',
          padding: '0 20px',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            color: '#fff',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            lineHeight: 1.2,
          }}>{memory.title}</div>
        </div>
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
        }}>
          <span className="badge badge-red" style={{ fontSize: '0.65rem' }}>
            {memory.category}
          </span>
        </div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
          padding: '20px 14px 12px',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>{memory.caption}</p>
        </div>
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--silver)', fontSize: '0.78rem' }}>Class of 2007 Archive</span>
        <Link
          to="/submit"
          style={{
            color: 'var(--cardinal-red)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}
        >
          Add Photo +
        </Link>
      </div>
    </motion.div>
  );
}

export default function MemoryLane() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? mockMemories : mockMemories.filter(m => m.category === active);

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="page-header">
        <div className="badge badge-red" style={{ marginBottom: 20 }}>✦ Archive ✦</div>
        <h1>MEMORY <span>LANE</span></h1>
        <p>Sports, homecoming, prom, spirit week, senior trip, graduation. It all happened.</p>
        <div className="red-line" />
      </div>

      {/* Category Filter */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '20px 40px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        position: 'sticky',
        top: 'var(--nav-height)',
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {memoryCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: 20,
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                background: active === cat ? 'var(--cardinal-red)' : 'rgba(255,255,255,0.05)',
                color: active === cat ? '#fff' : 'var(--silver)',
                border: active === cat ? 'none' : '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.2s',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="section">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((memory, i) => (
              <MemoryCard key={memory.id} memory={memory} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Upload CTA */}
      <div style={{
        background: 'linear-gradient(135deg, var(--charcoal) 0%, rgba(200,16,46,0.08) 100%)',
        border: '1px solid rgba(200,16,46,0.2)',
        margin: '0 40px 60px',
        borderRadius: 12,
        padding: '48px 40px',
        textAlign: 'center',
        maxWidth: 900,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>📷</div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          marginBottom: 12,
        }}>
          GOT PHOTOS FROM BACK IN THE DAY?
        </h3>
        <p style={{ color: 'var(--silver)', fontSize: '0.95rem', marginBottom: 28, maxWidth: 500, margin: '0 auto 28px', lineHeight: 1.7 }}>
          Submit your photos through the registration form. Homecoming, prom, sports, graduation —
          everything gets a home here in the Memory Lane gallery.
        </p>
        <Link to="/submit" className="btn btn-red">Submit Photos →</Link>
      </div>
    </div>
  );
}
