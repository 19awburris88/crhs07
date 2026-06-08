import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const milestones = [
  { year: '2003', label: 'We became Raiders', desc: 'Freshman year. New school. New city. Finding our people.' },
  { year: '2004', label: 'Finding our groove', desc: 'Sophomore year. Sports, friendships, drama — all of it.' },
  { year: '2005', label: 'Junior year hustle', desc: 'Homecoming, ACTs, college visits. Growing up fast.' },
  { year: '2006', label: 'Senior year begins', desc: 'Last first day. We knew it, even if we pretended we didn\'t.' },
  { year: '2007', label: 'We walked across the stage', desc: 'Cardinal Ritter Class of 2007. Diplomas in hand. Futures ahead.' },
  { year: '2027', label: 'We come back home', desc: 'Twenty years later. Same Raiders. More stories. One reunion.' },
];

export default function About() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="page-header">
        <div className="badge badge-red" style={{ marginBottom: 20 }}>✦ Our Story ✦</div>
        <h1>ABOUT THE <span>REUNION</span></h1>
        <p>Twenty years since we walked across the stage. Here's why this reunion is different.</p>
        <div className="red-line" />
      </div>

      {/* The Story */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              marginBottom: 32,
              lineHeight: 1.1,
            }}>
              IN 2007 WE WERE JUST GETTING <span style={{ color: 'var(--cardinal-red)' }}>STARTED.</span>
            </h2>

            {[
              `We were freshmen in 2003, figuring out what it meant to be a Raider. We shuffled through hallways, showed up at Friday night games, sat through classes that shaped us more than we realized. We were a group of young people becoming something — becoming ourselves.`,

              `By senior year, we had a rhythm. We knew each other's names, faces, stories. We'd been through homecomings and heartbreaks, state championships and senior trips, late nights at each other's houses and early mornings before the bell rang. We built something real.`,

              `On graduation day in 2007, we walked across that stage with diplomas in hand and the whole world ahead of us. Some of us went to college across the country. Some stayed close to home. Some went into the military. Some went to work. Some went after dreams we hadn't told anyone about yet.`,

              `Twenty years later, we've lived entire lives. Careers. Families. Losses. Wins. Reinventions. Some of us look exactly the same. Most of us don't — and that's a good thing.`,

              `The Class of 2007 Reunion is a weekend to reconnect, to celebrate who we've become, to remember those we've lost, and to create a few new memories together. Not just a party. A homecoming.`,
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  color: 'var(--silver)',
                  fontSize: '1.05rem',
                  lineHeight: 1.9,
                  marginBottom: 24,
                }}
              >
                {para}
              </motion.p>
            ))}

            <div style={{
              borderLeft: '3px solid var(--cardinal-red)',
              paddingLeft: 24,
              margin: '40px 0',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                lineHeight: 1.3,
                color: 'var(--off-white)',
              }}>
                "Once a Raider, Always a Raider."<br />
                <span style={{ color: 'var(--cardinal-red)', fontSize: '0.7em' }}>— Cardinal Ritter Class of 2007</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{
        background: 'var(--charcoal)',
        padding: '80px 40px',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 className="section-title" style={{ marginBottom: 60 }}>
            THE <span style={{ color: 'var(--cardinal-red)' }}>TIMELINE</span>
          </h2>

          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 2,
              background: 'rgba(200,16,46,0.2)',
              transform: 'translateX(-50%)',
            }} />

            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  display: 'flex',
                  justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start',
                  paddingRight: i % 2 === 0 ? 'calc(50% + 32px)' : 0,
                  paddingLeft: i % 2 === 0 ? 0 : 'calc(50% + 32px)',
                  marginBottom: 48,
                  position: 'relative',
                }}
              >
                {/* Center dot */}
                <div style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: m.year === '2027' ? 'var(--cardinal-red)' : 'var(--charcoal)',
                  border: '2px solid var(--cardinal-red)',
                  boxShadow: m.year === '2027' ? '0 0 12px rgba(200,16,46,0.5)' : 'none',
                }} />

                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8,
                  padding: '20px 24px',
                  maxWidth: 360,
                  width: '100%',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    color: 'var(--cardinal-red)',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>{m.year}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 6 }}>{m.label}</div>
                  <p style={{ color: 'var(--silver)', fontSize: '0.85rem', lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 600px) {
            .timeline-item { padding-right: 0 !important; padding-left: 0 !important; justify-content: flex-start !important; }
            .timeline-line { left: 16px !important; }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 40px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 20 }}>
            READY TO <span style={{ color: 'var(--cardinal-red)' }}>COME HOME?</span>
          </h2>
          <p style={{ color: 'var(--silver)', fontSize: '1rem', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Register for the reunion, submit your info for the class directory, and let us know you're coming.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/submit" className="btn btn-red">Register Now →</Link>
            <Link to="/weekend" className="btn btn-outline">Reunion Schedule</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
