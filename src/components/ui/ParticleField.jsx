import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

const ParticleField = ({ count = 50, speed = 0.3 }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    const particles = [];
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full';
      particle.style.cssText = `
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1});
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.1};
        box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(212, 175, 55, ${Math.random() * 0.3 + 0.1});
      `;
      container.appendChild(particle);
      particles.push(particle);
    }

    // Animate particles
    particles.forEach((particle, i) => {
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;

      gsap.to(particle, {
        y: -100 - Math.random() * 100,
        x: `+=${Math.random() * 100 - 50}`,
        opacity: 0,
        duration: duration,
        delay: delay,
        repeat: -1,
        ease: 'none',
        onComplete: () => {
          gsap.set(particle, {
            y: 100 + Math.random() * 100,
            x: Math.random() * 100 - 50,
            opacity: Math.random() * 0.5 + 0.1,
          });
        }
      });

      // Subtle floating motion
      gsap.to(particle, {
        x: `+=${Math.random() * 20 - 10}`,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    // Mouse interaction
    const handleMouseMove = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      particles.forEach((particle, i) => {
        const particleX = parseFloat(particle.style.left) / 100;
        const particleY = parseFloat(particle.style.top) / 100;

        const dx = mouseX - particleX;
        const dy = mouseY - particleY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 0.2) {
          gsap.to(particle, {
            x: dx * 50,
            y: dy * 50,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.innerHTML = '';
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [count, speed]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ willChange: 'transform' }}
    />
  );
};

export default ParticleField;
