import { useState } from 'react';
import { FaSpotify, FaTimes, FaMusic } from 'react-icons/fa';

const PLAYLIST_ID = '5c9RdCUpdfwUyO9UjLr0ID';
const EMBED_SRC = `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`;

export default function MusicPlayer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        title={open ? 'Close player' : 'Open 2007 playlist'}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: open ? 'var(--charcoal)' : '#1DB954',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          boxShadow: open
            ? '0 4px 20px rgba(0,0,0,0.5)'
            : '0 4px 20px rgba(29,185,84,0.45)',
          zIndex: 1000,
          transition: 'all 0.25s ease',
          border: 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        {open ? <FaTimes /> : <FaSpotify />}
      </button>

      {/* Player panel */}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: 84,
          right: 24,
          width: 340,
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
          zIndex: 999,
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          {/* Header */}
          <div style={{
            background: '#1DB954',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <FaSpotify style={{ fontSize: '1rem' }} />
            <div style={{ lineHeight: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', letterSpacing: '0.08em' }}>
                RAIDER SOUNDTRACK
              </div>
              <div style={{ fontSize: '0.65rem', opacity: 0.85, marginTop: 1 }}>
                Hottest Songs of 2007
              </div>
            </div>
          </div>

          {/* Spotify embed */}
          <iframe
            src={EMBED_SRC}
            width="340"
            height="380"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: 'block' }}
            title="Raider Soundtrack 2007"
          />
        </div>
      )}
    </>
  );
}
