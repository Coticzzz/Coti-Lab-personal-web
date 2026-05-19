import { useState, useCallback } from 'react';
import Landing from './pages/Landing';
import Home from './pages/Home';

export default function App() {
  const [page, setPage] = useState<'landing' | 'home'>('landing');

  const goHome = useCallback(() => {
    setPage('home');
    window.scrollTo(0, 0);
  }, []);

  const goLanding = useCallback(() => {
    setPage('landing');
    window.scrollTo(0, 0);
  }, []);

  const isHome = page === 'home';

  return (
    <>
      {/* ===== BACKGROUND LAYER - persistent, never changes ===== */}
      {isHome ? (
        <>
          <video
            className="fixed inset-0 z-0 w-full h-full"
            style={{ objectFit: 'cover' }}
            src="/videos/milkyway.webm"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="fixed inset-0 z-[1]" style={{ background: 'rgba(0, 0, 0, 0.42)' }} />
        </>
      ) : (
        <video
          className="fixed inset-0 z-0 w-full h-full"
          style={{ objectFit: 'cover' }}
          src="/videos/blackhole.webm"
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* ===== PAGE CONTENT ===== */}
      <div
        key={page}
        className="animate-fade-in"
        onAnimationEnd={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; }}
        style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}
      >
        {page === 'landing' && <Landing onEnter={goHome} />}
        {page === 'home' && <Home onLogoClick={goLanding} />}
      </div>

      {/* Slow zoom keyframe */}
      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1); }
          to { transform: scale(1.06); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </>
  );
}
