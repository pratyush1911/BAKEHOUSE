import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorState, setCursorState] = useState('default');

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const followerX = useSpring(0, { damping: 35, stiffness: 200 });
  const followerY = useSpring(0, { damping: 35, stiffness: 200 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Follower with slight delay
      setTimeout(() => {
        followerX.set(e.clientX);
        followerY.set(e.clientY);
      }, 30);
    };

    const handleHover = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, [role="button"], .group, input, textarea');
      const isText = target.closest('h1, h2, h3, h4, p, span, .text-element');

      if (isInteractive) {
        setIsHovering(true);
        setCursorState('hover');
      } else if (isText) {
        setIsHovering(false);
        setCursorState('text');
      } else {
        setIsHovering(false);
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY, followerX, followerY]);

  return (
    <>
      {/* Trail dots - using Framer Motion for smooth animation */}
      {[...Array(6)].map((_, i) => (
        <TrailDot
          key={i}
          cursorX={cursorX}
          cursorY={cursorY}
          index={i}
          delay={i * 0.05}
        />
      ))}

      {/* Main cursor dot */}
      <motion.div
        className="fixed z-[9998] rounded-full mix-blend-difference pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          left: -4,
          top: -4,
          width: 8,
          height: 8,
          backgroundColor: cursorState === 'text' ? 'rgba(255,255,255,0.5)' : 'white',
          scale: isHovering ? 0 : 1,
        }}
      />

      {/* Follower ring */}
      <motion.div
        className="fixed z-[9996] rounded-full border pointer-events-none mix-blend-difference"
        style={{
          x: followerX,
          y: followerY,
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          borderColor: isHovering ? 'rgba(212, 175, 55, 0.8)' : 'rgba(255,255,255,0.3)',
          borderWidth: isHovering ? 2 : 1,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
        }}
      />

      {/* Expanding hover circle */}
      <motion.div
        className="fixed z-[9995] rounded-full pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          left: -30,
          top: -30,
          width: 60,
          height: 60,
          border: '1px dashed rgba(255,255,255,0.2)',
          scale: isHovering ? 1 : 0,
          rotate: isHovering ? 0 : 0,
        }}
        animate={isHovering ? { rotate: 360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </>
  );
};

// Trail dot component with spring physics
const TrailDot = ({ cursorX, cursorY, index, delay }) => {
  const springConfig = { damping: 20 + index * 5, stiffness: 300 - index * 30 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const scale = useTransform(() => 1 - index * 0.12);
  const opacity = useTransform(() => 0.4 - index * 0.05);

  useEffect(() => {
    const unsubscribeX = cursorX.on('change', (value) => {
      setTimeout(() => x.set(value), delay);
    });
    const unsubscribeY = cursorY.on('change', (value) => {
      setTimeout(() => y.set(value), delay);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [cursorX, cursorY, x, y, delay]);

  return (
    <motion.div
      className="fixed rounded-full bg-gold-premium/40 pointer-events-none"
      style={{
        x,
        y,
        left: -4,
        top: -4,
        width: 8,
        height: 8,
        scale,
        opacity,
        zIndex: 9997 - index,
      }}
    />
  );
};

export default CustomCursor;
