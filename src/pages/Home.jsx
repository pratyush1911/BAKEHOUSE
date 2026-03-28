import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Clock, Heart, Wheat, Flame, Droplets } from 'lucide-react';
import Magnetic from '../components/animations/Magnetic';
import PinnedScrollSection from '../components/sections/PinnedScrollSection';
import HorizontalGallery from '../components/sections/HorizontalGallery';
import ParticleField from '../components/ui/ParticleField';
import { FadeIn, StaggerContainer, StaggerItem, ScaleReveal, TextReveal } from '../components/ui/PageTransition';
import { gsap, ScrollTrigger } from '../lib/gsap';

// Enhanced Hero with kinetic typography and ambient effects
const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered letter reveal
      if (titleRef.current) {
        const letters = titleRef.current.querySelectorAll('.letter');
        gsap.fromTo(letters,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.05,
            duration: 1.2,
            ease: 'power4.out',
            delay: 0.5,
          }
        );
      }

      // Subtitle fade in
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 0.6, y: 0, duration: 1.5, delay: 1.5, ease: 'power3.out' }
      );
    }, titleRef);

    return () => ctx.revert();
  }, []);

  const title = "THE ALCHEMICAL";
  const subtitle = "CRAFTSMANSHIP";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 gradient-animated opacity-50" />

      {/* Floating orbs */}
      <motion.div
        style={{ y: y1, x: useTransform(scrollY, [0, 1000], [0, 100]) }}
        className="absolute top-1/4 left-1/4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-gold-premium/10 rounded-full blur-[80px] md:blur-[120px]"
      />
      <motion.div
        style={{ y: y2, x: useTransform(scrollY, [0, 1000], [0, -100]) }}
        className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] md:w-[300px] md:h-[300px] bg-white/5 rounded-full blur-[60px] md:blur-[100px]"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4" style={{ opacity }}>
        <motion.span
          ref={subtitleRef}
          initial={{ opacity: 0, y: 20 }}
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase font-medium opacity-60 mb-6 block"
        >
          Artisan Bakery • Since 1994
        </motion.span>

        <div className="flex justify-center overflow-hidden mb-8">
          <h1 ref={titleRef} className="text-5xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter text-glow flex">
            {title.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="letter inline-block"
                style={{ transformOrigin: 'center center' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>
        </div>

        <div className="flex justify-center overflow-hidden mb-12">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: [0.6, 0.01, -0.05, 0.95] }}
            className="text-4xl md:text-7xl lg:text-8xl font-display font-bold italic text-gradient"
          >
            {subtitle}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <Magnetic>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-8 md:px-12 py-4 md:py-5 rounded-full text-[10px] md:text-sm font-medium tracking-widest uppercase hover:bg-gold-premium hover:text-onyx transition-all duration-500 shimmer"
            >
              Explore Curations
            </motion.button>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase opacity-40">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-16 bg-gradient-to-b from-gold-premium/50 via-gold-premium/80 to-transparent"
        />
      </motion.div>
    </section>
  );
};

// Enhanced About with better reveals
const About = () => {
  const text = "Every loaf tells a story of patience, heat, and heritage. We don't just bake; we orchestrate a symphony of textures and aromas that awaken the soul. From the first spark of the oven to the final golden crust, we celebrate the timeless alchemy of bread.";
  const words = text.split(" ");
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });

  return (
    <section id="about" ref={container} className="section-padding bg-charcoal relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-premium/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 mb-20 md:mb-32 relative z-10">
        <div className="flex flex-wrap">
          {words.map((word, i) => (
            <Word key={i} range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress}>
              {word}
            </Word>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { title: "Patience", desc: "Our 48-hour slow fermentation process ensures deep flavor and perfect aeration.", icon: Clock, accent: "from-gold-premium/20 to-transparent" },
            { title: "Heritage", desc: "Using ancient grains and traditional wood-fired techniques passed down through generations.", icon: Star, accent: "from-amber-500/20 to-transparent" },
            { title: "Intent", desc: "Every scoring pattern is a unique signature of the baker's hand and heart.", icon: Heart, accent: "from-yellow-500/20 to-transparent" }
          ].map((item, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="relative z-10">
                  <div className="mb-6 p-3 w-fit rounded-2xl glass bg-white/5">
                    <item.icon className="text-gold-premium" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold mb-4">{item.title}</h3>
                  <p className="opacity-50 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

const Word = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const scale = useTransform(progress, range, [0.95, 1]);
  const color = useTransform(progress, range, [
    'rgba(255,255,255,0.2)',
    'rgba(212,175,55,0.8)'
  ]);

  return (
    <motion.span
      style={{ opacity, scale }}
      className="text-2xl md:text-3xl lg:text-5xl font-display font-medium mr-2 md:mr-3 mb-1 md:mb-2 leading-tight inline-block"
    >
      <span style={{ color }}>{children}</span>
    </motion.span>
  );
};

// Values section with icons
const Values = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-onyx relative overflow-hidden">
      <motion.div
        style={{ scale, rotate }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-40 block mb-4">
              Our Philosophy
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-glow">
              The Four Elements
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { icon: Wheat, title: "Earth", desc: "Ancient grains" },
            { icon: Droplets, title: "Water", desc: "Pure hydration" },
            { icon: Flame, title: "Fire", desc: "Wood-fired heat" },
            { icon: Clock, title: "Time", desc: "Slow fermentation" },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center p-8 glass rounded-3xl group cursor-pointer"
              >
                <div className="mb-4 flex justify-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-4 rounded-full glass bg-gold-premium/10"
                  >
                    <item.icon className="text-gold-premium" size={28} />
                  </motion.div>
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold mb-2">{item.title}</h3>
                <p className="text-xs opacity-40 tracking-widest uppercase">{item.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Showcase = () => {
  const items = [
    { name: "Sourdough Reserve", price: "₹450", category: "Signature", image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=800" },
    { name: "Pain au Chocolat", price: "₹280", category: "Viennoiserie", image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=800" },
    { name: "Artisan Brioche", price: "₹520", category: "Specialty", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=800" },
    { name: "Rustico Wheat", price: "₹380", category: "Classic", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <section className="section-padding bg-onyx relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-premium/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <FadeIn>
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Our Curations</h2>
              <p className="opacity-50 tracking-widest uppercase text-[10px] md:text-xs">A selection of our finest creations</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Magnetic>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs md:text-sm tracking-widest uppercase underline underline-offset-8 hover:text-gold-premium transition-colors flex items-center gap-2"
              >
                View All <ArrowRight size={16} />
              </motion.button>
            </Magnetic>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {items.map((item, idx) => (
            <Card key={idx} {...item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ name, price, category, image, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative cursor-pointer"
    >
      <div className="overflow-hidden rounded-2xl aspect-[4/5] bg-charcoal relative">
        {/* Image with ken burns effect */}
        <motion.img
          src={image}
          alt={name}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 1.5, ease: [0.6, 0.01, -0.05, 0.95] }}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 ken-burns"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>
      <div className="mt-6 md:mt-8 flex justify-between items-start pr-4">
        <div>
          <span className="text-[10px] tracking-widest uppercase opacity-40 mb-2 block">{category}</span>
          <h3 className="text-xl md:text-2xl font-display font-bold">{name}</h3>
        </div>
        <span className="text-lg md:text-xl font-medium opacity-80 text-gold-premium">{price}</span>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="relative min-h-screen bg-charcoal overflow-hidden flex flex-col items-center py-20 md:py-32">
      {/* Parallax background */}
      <div className="absolute inset-0 z-0 h-full">
        <motion.div
          style={{
            y: useTransform(useScroll().scrollYProgress, [0, 1], [0, -200]),
            scale: useTransform(useScroll().scrollYProgress, [0, 1], [1.1, 1])
          }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-15 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/80 to-charcoal" />
        </motion.div>
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6 mb-20 md:mb-32">
        <ScaleReveal>
          <h2 className="text-5xl md:text-9xl font-display font-bold italic mb-8 md:mb-12 text-glow">
            Texture <br /> & Aroma
          </h2>
        </ScaleReveal>

        <FadeIn delay={0.3}>
          <p className="opacity-70 leading-relaxed text-lg md:text-xl mb-12 md:mb-16 max-w-2xl mx-auto">
            Immerse yourself in the sensory journey of the Crumb. We believe that the best bread is a multisensory experience — the crackle of the crust, the softness of the interior, and the intoxicating scent of yeast and heat.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { label: "Smoky Nut", val: "85%" },
            { label: "Earthy Rye", val: "92%" },
            { label: "Sweet Yeast", val: "78%" }
          ].map((item, i) => (
            <StaggerItem key={i}>
              <div className="glass p-6 md:p-8 rounded-2xl text-center group hover:bg-white/5 transition-colors">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: i * 0.1 }}
                  className="text-2xl md:text-3xl font-display font-bold text-gold-premium mb-2"
                >
                  {item.val}
                </motion.div>
                <div className="text-[10px] tracking-widest uppercase opacity-50">{item.label}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* CTA Card */}
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-6">
        <FadeIn delay={0.5}>
          <div className="glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative text-center lg:text-left">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-premium/10 rounded-full blur-[100px] -mr-48 -mt-48" />

            <div className="max-w-xl relative z-10">
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 italic">The Masterclass Experience</h3>
              <p className="opacity-60 mb-10 leading-relaxed text-sm md:text-base">
                Join our head baker for an exclusive midnight session. Learn the ancient secrets of sourdough management, local grain selection, and the art of the perfect crust.
              </p>
              <Magnetic>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gold-premium text-onyx px-8 md:px-10 py-4 md:py-5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-500"
                >
                  Reserve Your Spot
                </motion.button>
              </Magnetic>
            </div>

            <div className="flex-shrink-0 relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full border border-white/10 p-4"
              >
                <div className="w-full h-full rounded-full border border-white/20 flex items-center justify-center p-6 md:p-8 text-center text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 italic">
                  Crafted With Passion
                </div>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

// Stats section with animated counters
const Stats = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end center'] });

  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-onyx relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(212,175,55,0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: "30+", label: "Years of Craft" },
            { value: "50K+", label: "Loaves Baked" },
            { value: "12", label: "Master Bakers" },
            { value: "100%", label: "Organic Grains" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              style={{ scale, opacity }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: i * 0.1 }}
                className="text-4xl md:text-6xl font-display font-bold text-gold-premium mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-[10px] tracking-widest uppercase opacity-40">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            exit={{ opacity: 0, duration: 0.8 }}
            onAnimationComplete={() => setShowPreloader(false)}
          >
            {/* Preloader would go here if we add it to the page */}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-onyx page-transition">
        <ParticleField count={30} />
        <Hero />
        <About />
        <PinnedScrollSection />
        <Values />
        <HorizontalGallery />
        <Showcase />
        <Stats />
        <Experience />
      </div>
    </>
  );
};

export default Home;
