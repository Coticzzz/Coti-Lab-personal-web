import { useEffect, useState } from 'react';

interface LandingProps {
  onEnter: () => void;
}

export default function Landing({ onEnter }: LandingProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full">
        {/* Title */}
        <h1
          className="font-serif-display text-white text-center select-none"
          style={{
            fontSize: 'clamp(3.5rem, 12vw, 10rem)',
            lineHeight: 1.05,
            fontWeight: 300,
            letterSpacing: '0.06em',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          Coti Lab
        </h1>

        {/* Subtitle */}
        <p
          className="text-center"
          style={{
            fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)',
            letterSpacing: '0.35em',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.35)',
            marginTop: '20px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          AIGC Creator &amp; Digital Alchemist
        </p>

        {/* ===== ENTER BUTTON ===== */}
        <div
          style={{
            marginTop: '64px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
          }}
        >
          <button
            onClick={onEnter}
            type="button"
            style={{
              display: 'block',
              padding: '12px 40px',
              borderRadius: '2px',
              fontSize: '0.8rem',
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
            }}
          >
            Enter
          </button>
        </div>

        {/* Hint */}
        <p
          className="text-center"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.15)',
            marginTop: '32px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s',
          }}
        >
          click to explore
        </p>
      </div>
    </div>
  );
}
