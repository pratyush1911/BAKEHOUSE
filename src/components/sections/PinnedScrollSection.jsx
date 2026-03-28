import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { motion } from 'framer-motion';

const PinnedScrollSection = () => {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const textRefs = useRef([]);
  const glowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Phase 1: Orb emerges and pulses
      tl.fromTo(orbRef.current,
        { scale: 0.3, opacity: 0, rotation: 0 },
        { scale: 1, opacity: 1, rotation: 180, duration: 2, ease: 'power2.inOut' }
      )
      .fromTo([ring1Ref.current, ring2Ref.current, ring3Ref.current],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, stagger: 0.2 },
        '-=1.5'
      )
      .to(glowRef.current, {
        scale: 1.5,
        opacity: 0.3,
        duration: 2,
      }, '-=2');

      // Phase 2: Orb splits and rotates
      tl.to(orbRef.current, {
        scale: 1.3,
        rotation: 360,
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        duration: 2,
        ease: 'power1.inOut'
      })
      .to(ring1Ref.current, {
        rotation: 90,
        scale: 1.2,
        duration: 2,
      }, '-=2')
      .to(ring2Ref.current, {
        rotation: -90,
        scale: 1.4,
        duration: 2,
      }, '-=2')
      .to(glowRef.current, {
        backgroundColor: 'rgba(212, 175, 55, 0.4)',
        duration: 2,
      }, '-=2');

      // Phase 3: Maximum expansion
      tl.to(orbRef.current, {
        scale: 2,
        borderRadius: '50%',
        duration: 2,
        ease: 'power2.inOut'
      })
      .to(ring1Ref.current, {
        scale: 1.5,
        rotation: 180,
        duration: 2,
      }, '-=2')
      .to(ring2Ref.current, {
        scale: 1.8,
        rotation: -180,
        duration: 2,
      }, '-=2')
      .to(ring3Ref.current, {
        scale: 2.2,
        rotation: 270,
        duration: 2,
      }, '-=2')
      .to(glowRef.current, {
        scale: 2.5,
        opacity: 0.5,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        duration: 2,
      }, '-=2');

      // Phase 4: Compression and intensity
      tl.to(orbRef.current, {
        scale: 0.5,
        rotation: 540,
        duration: 2,
        ease: 'power3.inOut'
      })
      .to([ring1Ref.current, ring2Ref.current, ring3Ref.current], {
        scale: 0.3,
        opacity: 0.3,
        duration: 2,
      }, '-=2')
      .to(glowRef.current, {
        scale: 1,
        opacity: 0.8,
        backgroundColor: 'rgba(212, 175, 55, 0.6)',
        duration: 2,
      }, '-=2');

      // Phase 5: Final bloom
      tl.to(orbRef.current, {
        scale: 3,
        opacity: 0.8,
        rotation: 720,
        duration: 2,
        ease: 'power1.inOut'
      })
      .to([ring1Ref.current, ring2Ref.current, ring3Ref.current], {
        scale: 4,
        opacity: 0,
        duration: 2,
      }, '-=2')
      .to(glowRef.current, {
        scale: 4,
        opacity: 0,
        duration: 2,
      }, '-=2');

      // Text reveals for each phase
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
        }
      });

      textTl
        .to(textRefs.current[0], { opacity: 1, y: 0, duration: 1 })
        .to(textRefs.current[0], { opacity: 0, y: -20, duration: 1 }, '+=0.5')
        .to(textRefs.current[1], { opacity: 1, y: 0, duration: 1 })
        .to(textRefs.current[1], { opacity: 0, y: -20, duration: 1 }, '+=0.5')
        .to(textRefs.current[2], { opacity: 1, y: 0, duration: 1 })
        .to(textRefs.current[2], { opacity: 0, y: -20, duration: 1 }, '+=0.5')
        .to(textRefs.current[3], { opacity: 1, y: 0, duration: 1 })
        .to(textRefs.current[3], { opacity: 0, y: -20, duration: 1 }, '+=0.5')
        .to(textRefs.current[4], { opacity: 1, y: 0, duration: 1 });

      // Background color shifts
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: true,
        }
      })
      .to(sectionRef.current, {
        backgroundColor: '#0f0f0f',
        duration: 2,
      })
      .to(sectionRef.current, {
        backgroundColor: '#1a1a1a',
        duration: 2,
      })
      .to(sectionRef.current, {
        backgroundColor: '#0a0a0a',
        duration: 2,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const phases = [
    "The Grain Awakens",
    "Water Meets Fire",
    "Time's Invisible Dance",
    "The Golden Transformation",
    "Pure Artistry"
  ];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-onyx"
    >
      {/* Central pinned element */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Glow background */}
        <motion.div
          ref={glowRef}
          initial={{ scale: 0, opacity: 0 }}
          className="absolute w-96 h-96 rounded-full blur-[80px]"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Outer rings */}
        <div ref={ring3Ref} className="absolute w-[600px] h-[600px] border border-white/5 rounded-full" />

        {/* Concentric rings */}
        <motion.div
          ref={ring2Ref}
          className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(212,175,55,0.1), transparent)',
            willChange: 'transform',
          }}
        />

        <motion.div
          ref={ring1Ref}
          className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-gold-premium/20"
          style={{ willChange: 'transform' }}
        />

        {/* Central orb */}
        <motion.div
          ref={orbRef}
          className="relative w-32 h-32 md:w-48 md:h-48 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), rgba(212,175,55,0.3), rgba(0,0,0,0.8))',
            boxShadow: '0 0 60px rgba(212,175,55,0.3), inset 0 0 40px rgba(212,175,55,0.1)',
            willChange: 'transform, border-radius',
          }}
        >
          {/* Inner core */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-white/20 to-gold-premium/10 blur-sm" />
        </motion.div>
      </div>

      {/* Phase texts */}
      <div className="absolute bottom-20 md:bottom-32 left-0 right-0 flex flex-col items-center justify-center px-4">
        {phases.map((phase, i) => (
          <motion.div
            key={i}
            ref={el => textRefs.current[i] = el}
            initial={{ opacity: 0, y: 40 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-5xl font-display font-light italic text-gold-premium/80 mb-2">
              {phase}
            </h2>
            <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-40">
              Phase {i + 1}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase opacity-40">Scroll to Transform</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-12 bg-gradient-to-b from-gold-premium/50 to-transparent"
        />
      </motion.div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-white/5" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-white/5" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l border-b border-white/5" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-white/5" />
    </section>
  );
};

export default PinnedScrollSection;
