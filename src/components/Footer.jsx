import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import pirateLogo from '../assets/priatelogo.png';

export default function Footer() {
  return (
    <footer style={{
      background: '#0a0a0a',
      borderTop: '1px solid rgba(200,16,46,0.2)',
      padding: '60px 40px 30px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48,
          marginBottom: 48,
        }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <img
                src={pirateLogo}
                alt="Raiders"
                style={{ height: 64, width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.7 }}
              />
            </div>
            <div style={{
              color: 'var(--cardinal-red)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              letterSpacing: '0.1em',
              marginBottom: 12,
            }}>CLASS OF 2007 · 20 YEAR REUNION</div>
            <p style={{ color: 'var(--silver)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Once a Raider, Always a Raider. Twenty years later, we're still one family.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <a href="#" style={{
                width: 36, height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--silver)',
                transition: 'all 0.2s',
              }}><FaInstagram /></a>
              <a href="#" style={{
                width: 36, height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--silver)',
                transition: 'all 0.2s',
              }}><FaFacebook /></a>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 16, color: 'var(--silver)', letterSpacing: '0.08em' }}>
              NAVIGATION
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['/', 'Home'],
                ['/about', 'About the Reunion'],
                ['/directory', 'Class Directory'],
                ['/then-and-now', 'Then & Now'],
                ['/memory-lane', 'Memory Lane'],
                ['/roll-call', 'Raider Roll Call'],
              ].map(([to, label]) => (
                <Link key={to} to={to} style={{
                  color: 'var(--silver)',
                  fontSize: '0.88rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--cardinal-red)'}
                onMouseLeave={e => e.target.style.color = 'var(--silver)'}
                >{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 16, color: 'var(--silver)', letterSpacing: '0.08em' }}>
              MORE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['/hall-of-raiders', 'Hall of Raiders'],
                ['/weekend', 'Reunion Weekend'],
                ['/in-memoriam', 'In Memoriam'],
                ['/superlatives', 'Senior Superlatives'],
                ['/submit', 'Register / Submit Info'],
              ].map(([to, label]) => (
                <Link key={to} to={to} style={{
                  color: 'var(--silver)',
                  fontSize: '0.88rem',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--cardinal-red)'}
                onMouseLeave={e => e.target.style.color = 'var(--silver)'}
                >{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 16, color: 'var(--silver)', letterSpacing: '0.08em' }}>
              REUNION WEEKEND
            </div>
            <p style={{ color: 'var(--silver)', fontSize: '0.88rem', lineHeight: 1.7 }}>
              July 18–20, 2027<br />
              Indianapolis, Indiana<br />
              Cardinal Ritter High School<br />
              <br />
              <span style={{ color: 'var(--cardinal-red)' }}>Details coming soon.</span>
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <span style={{ color: 'rgba(191,195,199,0.4)', fontSize: '0.8rem' }}>
            © 2027 Cardinal Ritter Class of 2007. All rights reserved.
          </span>
          <span style={{ color: 'rgba(191,195,199,0.4)', fontSize: '0.8rem' }}>
            Once a Raider, Always a Raider.
          </span>
        </div>
      </div>
    </footer>
  );
}
