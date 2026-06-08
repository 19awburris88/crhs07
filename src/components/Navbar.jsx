import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import pirateLogo from '../assets/priatelogo.png';

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/directory', label: 'Directory' },
  { to: '/then-and-now', label: 'Then & Now' },
  { to: '/memory-lane', label: 'Memory Lane' },
  { to: '/roll-call', label: 'Roll Call' },
  { to: '/hall-of-raiders', label: 'Hall of Raiders' },
  { to: '/weekend', label: 'Weekend' },
  { to: '/in-memoriam', label: 'In Memoriam' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: 'var(--nav-height)',
      background: scrolled || open ? 'rgba(17,17,17,0.97)' : 'rgba(17,17,17,0.6)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid rgba(200,16,46,0.2)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      padding: '0 32px',
      gap: '32px',
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <div style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: 'var(--cardinal-red)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          <img
            src={pirateLogo}
            alt="Raiders"
            style={{ width: 30, height: 30, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
        </div>
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', letterSpacing: '0.08em', color: 'var(--off-white)' }}>
            RITTER <span style={{ color: 'var(--cardinal-red)' }}>'07</span>
          </div>
          <div style={{ fontSize: '0.6rem', color: 'var(--silver)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 1 }}>
            20 Year Reunion
          </div>
        </div>
      </Link>

      {/* Desktop nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        flex: 1,
        flexWrap: 'nowrap',
        overflow: 'hidden',
      }} className="desktop-nav">
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              padding: '6px 10px',
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: isActive ? 'var(--cardinal-red)' : 'var(--silver)',
              borderRadius: 4,
              transition: 'color 0.2s',
              whiteSpace: 'nowrap',
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto', flexShrink: 0 }}>
        <Link to="/submit" className="btn btn-red" style={{ padding: '8px 20px', fontSize: '0.78rem' }}>
          Register
        </Link>

        <button
          onClick={() => setOpen(o => !o)}
          className="hamburger"
          style={{
            background: 'none',
            color: 'var(--off-white)',
            fontSize: '1.2rem',
            display: 'none',
            padding: 8,
          }}
          aria-label="Toggle menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'fixed',
          top: 'var(--nav-height)',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(17,17,17,0.98)',
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 32px',
          gap: '8px',
          overflowY: 'auto',
          zIndex: 999,
        }}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                letterSpacing: '0.06em',
                color: isActive ? 'var(--cardinal-red)' : 'var(--off-white)',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/submit" className="btn btn-red" style={{ marginTop: 24, textAlign: 'center', justifyContent: 'center' }}>
            Register for Reunion
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
