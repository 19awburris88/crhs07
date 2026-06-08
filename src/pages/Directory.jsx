import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaInstagram, FaMapMarkerAlt, FaBriefcase, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { mockClassmates } from '../lib/mockData';

function ClassmateCard({ person, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <div className="card" style={{ padding: 24, height: '100%' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
          {person.photo_url ? (
            <img
              src={person.photo_url}
              alt={person.name}
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'top center',
                flexShrink: 0,
                border: `2px solid ${person.color}40`,
              }}
            />
          ) : (
            <div
              className="avatar"
              style={{ background: person.color, flexShrink: 0 }}
            >
              {person.initials}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 2 }}>{person.name}</div>
            {person.maiden_name && (
              <div style={{ color: 'var(--silver)', fontSize: '0.78rem', marginBottom: 4 }}>
                née {person.maiden_name}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--silver)', fontSize: '0.82rem' }}>
              <FaMapMarkerAlt style={{ color: 'var(--cardinal-red)', fontSize: '0.7rem', flexShrink: 0 }} />
              {person.city}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.85rem' }}>
            <FaBriefcase style={{ color: 'var(--cardinal-red)', marginTop: 2, flexShrink: 0, fontSize: '0.75rem' }} />
            <span style={{ color: 'var(--silver)', lineHeight: 1.4 }}>{person.occupation}</span>
          </div>
          {person.family && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.85rem' }}>
              <FaUsers style={{ color: 'var(--cardinal-red)', marginTop: 2, flexShrink: 0, fontSize: '0.75rem' }} />
              <span style={{ color: 'var(--silver)' }}>{person.family}</span>
            </div>
          )}
        </div>

        {person.fun_fact && (
          <div style={{
            background: 'rgba(200,16,46,0.06)',
            border: '1px solid rgba(200,16,46,0.15)',
            borderRadius: 6,
            padding: '8px 12px',
            fontSize: '0.8rem',
            color: 'var(--silver)',
            fontStyle: 'italic',
            marginBottom: 16,
            lineHeight: 1.4,
          }}>
            "{person.fun_fact}"
          </div>
        )}

        {(person.linkedin || person.instagram) && (
          <div style={{ display: 'flex', gap: 8 }}>
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '5px 10px',
                  borderRadius: 4,
                  background: 'rgba(10,102,194,0.1)',
                  border: '1px solid rgba(10,102,194,0.2)',
                  color: '#0a66c2',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                <FaLinkedin /> LinkedIn
              </a>
            )}
            {person.instagram && (
              <a
                href={person.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '5px 10px',
                  borderRadius: 4,
                  background: 'rgba(193,53,132,0.1)',
                  border: '1px solid rgba(193,53,132,0.2)',
                  color: '#c13584',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                <FaInstagram /> Instagram
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Directory() {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('All');

  const cities = ['All', ...new Set(mockClassmates.map(c => c.city.split(',')[1]?.trim() || c.city))];

  const filtered = mockClassmates.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.occupation.toLowerCase().includes(q);
    const matchCity = cityFilter === 'All' || c.city.includes(cityFilter);
    return matchSearch && matchCity;
  });

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="page-header">
        <div className="badge badge-red" style={{ marginBottom: 20 }}>✦ Class of 2007 ✦</div>
        <h1>CLASS <span>DIRECTORY</span></h1>
        <p>Classmates who have registered for the reunion. Find old friends, see where life took everyone.</p>
        <div className="red-line" />
      </div>

      {/* Filters */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '24px 40px',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        position: 'sticky',
        top: 'var(--nav-height)',
        zIndex: 100,
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 280px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by name, city, or occupation..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                padding: '10px 16px',
                color: 'var(--off-white)',
                fontSize: '0.9rem',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {cities.slice(0, 6).map(city => (
              <button
                key={city}
                onClick={() => setCityFilter(city)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 20,
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  background: cityFilter === city ? 'var(--cardinal-red)' : 'rgba(255,255,255,0.05)',
                  color: cityFilter === city ? '#fff' : 'var(--silver)',
                  border: cityFilter === city ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
              >
                {city}
              </button>
            ))}
          </div>

          <span style={{ color: 'var(--silver)', fontSize: '0.82rem', marginLeft: 'auto' }}>
            {filtered.length} classmate{filtered.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      <section className="section">
        {filtered.length > 0 ? (
          <div className="grid-3">
            {filtered.map((person, i) => (
              <ClassmateCard key={person.id} person={person} index={i} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--silver)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 8 }}>No results found</h3>
            <p>Try a different search or filter.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '60px 40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: 12 }}>
          DON'T SEE YOURSELF?
        </h3>
        <p style={{ color: 'var(--silver)', marginBottom: 28, fontSize: '0.95rem' }}>
          Register for the reunion and add yourself to the directory.
        </p>
        <Link to="/submit" className="btn btn-red">Add Your Info →</Link>
      </div>
    </div>
  );
}
