import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export const ImageReveal = ({ src, alt, className = '', parallax = true }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  useEffect(() => {
    if (parallax && imageRef.current && containerRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(imageRef.current,
          { y: '-10%' },
          {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [parallax]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        ref={imageRef}
        className="w-full h-full"
        style={{ willChange: parallax ? 'transform' : 'auto' }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export const ParallaxImage = ({ src, alt, className = '', speed = 0.5 }) => {
  const ref = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { y: -50 * speed },
        {
          y: 50 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export const StaggeredReveal = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={containerRef}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const RevealItem = ({ children, className = '' }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { y: 40, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.8,
            ease: [0.6, 0.01, -0.05, 0.95],
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default ImageReveal;
