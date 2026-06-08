import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { reunionSchedule } from '../lib/mockData';

const dayColors = {
  Friday: { bg: '#1a1a2e', accent: '#4a4aff' },
  Saturday: { bg: '#1a0a0a', accent: 'var(--cardinal-red)' },
  Sunday: { bg: '#0a1a0a', accent: '#2a8b4a' },
};

export default function ReunionWeekend() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="page-header">
        <div className="badge badge-red" style={{ marginBottom: 20 }}>✦ July 18–20, 2027 ✦</div>
        <h1>REUNION <span>WEEKEND</span></h1>
        <p>Three days. Packed schedule. One unforgettable Ritter reunion.</p>
        <div className="red-line" />
      </div>

      {/* Schedule */}
      <section style={{ padding: '60px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {reunionSchedule.map((day, dayIdx) => {
            const colors = dayColors[day.day];
            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: dayIdx * 0.15, duration: 0.5 }}
                style={{ marginBottom: 48 }}
              >
                {/* Day Header */}
                <div style={{
                  background: `linear-gradient(135deg, ${colors.bg} 0%, rgba(34,34,34,0.8) 100%)`,
                  border: `1px solid ${colors.accent}30`,
                  borderRadius: '10px 10px 0 0',
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: colors.accent,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    color: '#fff',
                    flexShrink: 0,
                  }}>
                    {dayIdx + 1}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      letterSpacing: '0.06em',
                      color: 'var(--off-white)',
                    }}>{day.day.toUpperCase()}</div>
                    <div style={{
                      color: 'var(--silver)',
                      fontSize: '0.85rem',
                      letterSpacing: '0.06em',
                      marginTop: 2,
                    }}>{day.date}</div>
                  </div>
                </div>

                {/* Events */}
                <div style={{
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderTop: 'none',
                  borderRadius: '0 0 10px 10px',
                  overflow: 'hidden',
                }}>
                  {day.events.map((event, eventIdx) => (
                    <motion.div
                      key={event.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: dayIdx * 0.15 + eventIdx * 0.08 }}
                      style={{
                        display: 'flex',
                        gap: 24,
                        padding: '24px 32px',
                        background: 'var(--charcoal)',
                        borderBottom: eventIdx < day.events.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      }}
                    >
                      <div style={{
                        flexShrink: 0,
                        width: 80,
                        paddingTop: 2,
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          color: colors.accent,
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}>
                          <FaClock style={{ fontSize: '0.65rem' }} />
                          {event.time}
                        </div>
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.4rem',
                          letterSpacing: '0.04em',
                          marginBottom: 4,
                        }}>
                          {event.title}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 5,
                          color: 'var(--silver)',
                          fontSize: '0.78rem',
                          marginBottom: 8,
                        }}>
                          <FaMapMarkerAlt style={{ color: 'var(--cardinal-red)', fontSize: '0.65rem' }} />
                          {event.location}
                        </div>
                        <p style={{ color: 'var(--silver)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Details */}
      <section style={{
        background: 'var(--charcoal)',
        padding: '60px 40px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: 40 }}>
            NEED TO <span style={{ color: 'var(--cardinal-red)' }}>KNOW</span>
          </h2>

          <div className="grid-3">
            {[
              { emoji: '🏨', title: 'Hotel Block', body: 'A room block is being arranged at a nearby hotel. Details will be sent to registered attendees.' },
              { emoji: '👔', title: 'Dress Code', body: 'Mixer & brunch: casual. Gala: semi-formal to formal. Come fresh — you\'ve had 20 years to plan the outfit.' },
              { emoji: '👨‍👩‍👧', title: 'Families Welcome', body: 'Saturday\'s cookout is family-friendly. Kids are welcome. The Friday mixer and Saturday Gala are adults only.' },
              { emoji: '🎟️', title: 'Tickets', body: 'Gala tickets are included with full registration. Individual event tickets will be available closer to the date.' },
              { emoji: '📸', title: 'Photography', body: 'Professional photographers will be on site for the Gala. A reunion photo package will be available.' },
              { emoji: '✈️', title: 'Getting There', body: 'Indianapolis International Airport (IND) is the closest airport. Car rental and rideshare are available.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8,
                  padding: '24px',
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{item.emoji}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 8, letterSpacing: '0.04em' }}>
                  {item.title}
                </div>
                <p style={{ color: 'var(--silver)', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section style={{ padding: '80px 40px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 16 }}>
            LOCK IN YOUR <span style={{ color: 'var(--cardinal-red)' }}>SPOT</span>
          </h2>
          <p style={{ color: 'var(--silver)', fontSize: '1rem', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Space is limited for the Saturday Gala. Register early to make sure you're in.
          </p>
          <Link to="/submit" className="btn btn-red" style={{ fontSize: '1rem', padding: '16px 40px' }}>
            Register Now →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
