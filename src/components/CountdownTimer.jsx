import { useState, useEffect } from 'react';

const REUNION_DATE = new Date('2027-07-19T18:00:00');

function getTimeLeft() {
  const diff = REUNION_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ large = false }) {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = ['days', 'hours', 'minutes', 'seconds'];
  const labels = ['Days', 'Hours', 'Min', 'Sec'];

  return (
    <div style={{
      display: 'flex',
      gap: large ? 24 : 16,
      justifyContent: 'center',
    }}>
      {units.map((unit, i) => (
        <div key={unit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(200,16,46,0.3)',
            borderRadius: large ? 8 : 6,
            padding: large ? '20px 28px' : '12px 16px',
            minWidth: large ? 100 : 64,
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: large ? '3.5rem' : '2rem',
            color: 'var(--off-white)',
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}>
            {String(time[unit]).padStart(2, '0')}
          </div>
          <span style={{
            fontSize: large ? '0.75rem' : '0.65rem',
            color: 'var(--silver)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            {labels[i]}
          </span>
        </div>
      ))}
    </div>
  );
}
