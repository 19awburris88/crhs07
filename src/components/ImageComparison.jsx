import { useState, useRef, useCallback } from 'react';

export default function ImageComparison({
  thenSrc,
  nowSrc,
  thenLabel = 'THEN · 2007',
  nowLabel = 'NOW · 2027',
  height = 400,
  thenPosition = 'top center',
  nowPosition = 'top center',
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const move = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e) => { if (dragging.current) move(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = (e) => { move(e.touches[0].clientX); };

  const labelStyle = (side) => ({
    position: 'absolute',
    bottom: 12,
    [side]: 12,
    background: 'rgba(17,17,17,0.88)',
    border: `1px solid ${side === 'left' ? 'rgba(200,16,46,0.5)' : 'rgba(201,164,74,0.5)'}`,
    borderRadius: 4,
    padding: '4px 10px',
    fontFamily: 'var(--font-display)',
    fontSize: '0.82rem',
    letterSpacing: '0.1em',
    color: side === 'left' ? 'var(--silver)' : 'var(--gold)',
    pointerEvents: 'none',
    zIndex: 2,
  });

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      style={{
        position: 'relative',
        height,
        borderRadius: 10,
        overflow: 'hidden',
        cursor: 'col-resize',
        userSelect: 'none',
        background: '#1a1a1a',
      }}
    >
      {/* THEN — full width base layer */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {thenSrc ? (
          <img
            src={thenSrc}
            alt="Then"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: thenPosition,
              display: 'block',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #2a0a0f 0%, #C8102E 40%, #8B0000 100%)' }} />
        )}
        <div style={labelStyle('left')}>{thenLabel}</div>
      </div>

      {/* NOW — clipped overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        clipPath: `inset(0 0 0 ${position}%)`,
      }}>
        {nowSrc ? (
          <img
            src={nowSrc}
            alt="Now"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: nowPosition,
              display: 'block',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0a1a2a 0%, #1a3a6b 40%, #0a0a0a 100%)' }} />
        )}
        <div style={labelStyle('right')}>{nowLabel}</div>
      </div>

      {/* Divider */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: `${position}%`,
        transform: 'translateX(-50%)',
        width: 3,
        background: '#fff',
        boxShadow: '0 0 12px rgba(255,255,255,0.5)',
        pointerEvents: 'none',
        zIndex: 3,
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
          fontSize: '0.7rem',
          color: '#111',
          fontWeight: 700,
          letterSpacing: '-2px',
        }}>◀▶</div>
      </div>
    </div>
  );
}
