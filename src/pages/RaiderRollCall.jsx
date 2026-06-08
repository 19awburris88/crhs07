import { useState } from 'react';
import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { mapMarkers } from '../lib/mockData';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

const cityStats = [
  { city: 'Indianapolis, IN', count: 3, flag: '🏡' },
  { city: 'Dallas, TX', count: 2, flag: '⭐' },
  { city: 'Chicago, IL', count: 2, flag: '🏙️' },
  { city: 'Atlanta, GA', count: 1, flag: '🍑' },
  { city: 'Charlotte, NC', count: 1, flag: '🔵' },
  { city: 'Los Angeles, CA', count: 2, flag: '🎬' },
  { city: 'Houston, TX', count: 1, flag: '🚀' },
  { city: 'New York, NY', count: 3, flag: '🗽' },
  { city: 'Washington, DC', count: 2, flag: '🏛️' },
  { city: 'Columbus, OH', count: 2, flag: '🌰' },
  { city: 'Detroit, MI', count: 1, flag: '🚗' },
  { city: 'Memphis, TN', count: 1, flag: '🎸' },
];

export default function RaiderRollCall() {
  const [tooltip, setTooltip] = useState(null);

  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="page-header">
        <div className="badge badge-red" style={{ marginBottom: 20 }}>✦ We're Everywhere ✦</div>
        <h1>RAIDER <span>ROLL CALL</span></h1>
        <p>From Indianapolis to LA, Ritter Raiders are spread all across the country. Here's where we landed.</p>
        <div className="red-line" />
      </div>

      {/* Map */}
      <section style={{ padding: '40px', background: 'var(--charcoal)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
          }}>
            {tooltip && (
              <div style={{
                position: 'absolute',
                top: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(17,17,17,0.95)',
                border: '1px solid rgba(200,16,46,0.4)',
                borderRadius: 6,
                padding: '8px 16px',
                zIndex: 10,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}>
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{tooltip.city}</span>
                <span style={{ color: 'var(--cardinal-red)', marginLeft: 8, fontSize: '0.8rem' }}>
                  {tooltip.count} Raider{tooltip.count !== 1 ? 's' : ''}
                </span>
              </div>
            )}

            <ComposableMap
              projection="geoAlbersUsa"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1a1a1a"
                      stroke="#2a2a2a"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { fill: '#222', outline: 'none' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  ))
                }
              </Geographies>

              {mapMarkers.map((marker, i) => (
                <Marker
                  key={i}
                  coordinates={marker.coordinates}
                  onMouseEnter={() => setTooltip(marker)}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <motion.circle
                    r={marker.count > 2 ? 8 : 6}
                    fill="var(--cardinal-red)"
                    fillOpacity={0.85}
                    stroke="#fff"
                    strokeWidth={1.5}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.08, type: 'spring' }}
                    style={{ cursor: 'pointer' }}
                  />
                  {marker.count > 1 && (
                    <text
                      textAnchor="middle"
                      y={4}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 8,
                        fill: '#fff',
                        fontWeight: 700,
                        pointerEvents: 'none',
                      }}
                    >
                      {marker.count}
                    </text>
                  )}
                </Marker>
              ))}
            </ComposableMap>
          </div>

          <div style={{
            display: 'flex',
            gap: 16,
            justifyContent: 'center',
            marginTop: 20,
            flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--silver)' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--cardinal-red)', border: '1.5px solid #fff' }} />
              Raider location
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--silver)' }}>
              <div style={{
                width: 16, height: 16, borderRadius: '50%', background: 'var(--cardinal-red)', border: '1.5px solid #fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#fff', fontWeight: 700,
              }}>3</div>
              Multiple Raiders
            </div>
          </div>
        </div>
      </section>

      {/* City breakdown */}
      <section className="section">
        <h2 className="section-title" style={{ marginBottom: 8 }}>
          WHERE ARE RAIDERS <span style={{ color: 'var(--cardinal-red)' }}>NOW?</span>
        </h2>
        <p className="section-sub">A breakdown of where registered classmates currently live.</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
        }}>
          {cityStats.map((c, i) => (
            <motion.div
              key={c.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              style={{
                background: 'var(--charcoal)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 8,
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{c.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {c.city}
                </div>
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                color: 'var(--cardinal-red)',
                flexShrink: 0,
              }}>{c.count}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Register CTA */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '60px 40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: 12 }}>
          PUT YOUR PIN ON THE MAP
        </h3>
        <p style={{ color: 'var(--silver)', marginBottom: 28, fontSize: '0.95rem' }}>
          Register for the reunion and your city will appear on the Roll Call map.
        </p>
        <a href="/submit" className="btn btn-red">Register Now →</a>
      </div>
    </div>
  );
}
