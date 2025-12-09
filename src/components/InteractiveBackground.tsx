import { useEffect, useRef } from 'react';

export default function InteractiveBackground() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const orbsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // CSS-based floating animations (more reliable than Motion in Astro)
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float1 {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        25% { transform: translate(30px, -30px) scale(1.1); }
        50% { transform: translate(-20px, 20px) scale(0.9); }
        75% { transform: translate(15px, -10px) scale(1.05); }
      }
      @keyframes float2 {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        25% { transform: translate(-25px, 25px) scale(0.9); }
        50% { transform: translate(35px, -15px) scale(1.2); }
        75% { transform: translate(-10px, 30px) scale(0.95); }
      }
      @keyframes float3 {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        25% { transform: translate(20px, -20px) scale(1.15); }
        50% { transform: translate(-30px, 25px) scale(0.85); }
        75% { transform: translate(25px, -5px) scale(1.1); }
      }
      @keyframes float4 {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        25% { transform: translate(-15px, 35px) scale(0.95); }
        50% { transform: translate(25px, -25px) scale(1.1); }
        75% { transform: translate(-20px, 15px) scale(1.05); }
      }
      @keyframes particleFloat {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.3); }
      }
      .floating-orb-1 { animation: float1 12s ease-in-out infinite; }
      .floating-orb-2 { animation: float2 14s ease-in-out infinite 2s; }
      .floating-orb-3 { animation: float3 16s ease-in-out infinite 4s; }
      .floating-orb-4 { animation: float4 18s ease-in-out infinite 6s; }
      .particle { animation: particleFloat 4s ease-in-out infinite; }
    `;
    document.head.appendChild(style);

    // Mouse movement interaction with CSS transforms
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };

      const orbs = document.querySelectorAll('.floating-orb');
      orbs.forEach((orb: any, index) => {
        const rect = orb.getBoundingClientRect();
        const orbX = rect.left + rect.width / 2;
        const orbY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - orbX) * 0.03;
        const deltaY = (e.clientY - orbY) * 0.03;

        orb.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        orb.style.transition = 'transform 0.3s ease-out';
      });

      // Interactive particles
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle: any, index) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - particleX) * 0.01;
        const deltaY = (e.clientY - particleY) * 0.01;

        particle.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.2)`;
        particle.style.transition = 'transform 0.2s ease-out';
      });
    };

    // Scroll parallax effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const orbs = document.querySelectorAll('.floating-orb');
      orbs.forEach((orb: any, index) => {
        const speed = 0.1 + (index * 0.05);
        orb.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    // Click ripple effect
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'fixed rounded-full pointer-events-none z-10';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.animation = 'ripple 1.5s ease-out forwards';

      // Add ripple animation
      if (!document.querySelector('#ripple-style')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.id = 'ripple-style';
        rippleStyle.textContent = `
          @keyframes ripple {
            to {
              transform: translate(-50%, -50%) scale(15);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(rippleStyle);
      }

      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
      document.head.removeChild(style);
    };

  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Animated gradient orbs - scattered positions */}
      <div className="floating-orb floating-orb-1 absolute top-20 left-1/4 w-80 h-80 bg-purple-500/20 dark:bg-purple-500/40 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"></div>
      <div className="floating-orb floating-orb-2 absolute top-32 right-1/3 w-96 h-96 bg-pink-500/15 dark:bg-pink-500/35 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"></div>
      <div className="floating-orb floating-orb-3 absolute bottom-20 left-1/2 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/40 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"></div>
      <div className="floating-orb floating-orb-4 absolute top-1/2 right-20 w-88 h-88 bg-yellow-500/15 dark:bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none"></div>

      {/* Floating particles - scattered randomly */}
      <div className="particle absolute top-[15%] left-[20%] w-3 h-3 bg-purple-400/40 dark:bg-purple-400/80 rounded-full pointer-events-none"></div>
      <div className="particle absolute top-[65%] right-[25%] w-2 h-2 bg-pink-400/40 dark:bg-pink-400/80 rounded-full pointer-events-none"></div>
      <div className="particle absolute top-[45%] left-[70%] w-2.5 h-2.5 bg-blue-400/40 dark:bg-blue-400/80 rounded-full pointer-events-none"></div>
      <div className="particle absolute top-[25%] right-[35%] w-2 h-2 bg-yellow-400/35 dark:bg-yellow-400/70 rounded-full pointer-events-none"></div>
      <div className="particle absolute bottom-[30%] left-[15%] w-3 h-3 bg-emerald-400/35 dark:bg-emerald-400/70 rounded-full pointer-events-none"></div>
      <div className="particle absolute top-[80%] left-[60%] w-1.5 h-1.5 bg-cyan-400/35 dark:bg-cyan-400/70 rounded-full pointer-events-none"></div>
      <div className="particle absolute top-[35%] right-[15%] w-2 h-2 bg-orange-400/35 dark:bg-orange-400/70 rounded-full pointer-events-none"></div>

      {/* Grid pattern overlay - using CSS pattern instead */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.8) 1px, transparent 0)`,
        backgroundSize: '30px 30px'
      }}></div>
    </div>
  );
}