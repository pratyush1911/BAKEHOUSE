import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HorizontalGallery = () => {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const cardsRef = useRef([]);

  const items = [
    {
      title: "Sourdough Reserve",
      subtitle: "48-hour fermentation",
      description: "Our signature loaf with complex flavor profile and perfect crust",
      image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=800",
      accent: "rgba(212, 175, 55, 0.3)"
    },
    {
      title: "Pain au Chocolat",
      subtitle: "French technique",
      description: "Buttery layers enveloping rich Belgian chocolate",
      image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&q=80&w=800",
      accent: "rgba(139, 69, 19, 0.3)"
    },
    {
      title: "Artisan Brioche",
      subtitle: "Enriched dough",
      description: "Silky texture with golden crumb and subtle sweetness",
      image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80&w=800",
      accent: "rgba(255, 193, 37, 0.3)"
    },
    {
      title: "Rustico Wheat",
      subtitle: "Ancient grains",
      description: "Hearty whole wheat with seeds and honey notes",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800",
      accent: "rgba(101, 67, 33, 0.3)"
    },
    {
      title: "Croissant Nature",
      subtitle: "Pure butter",
      description: "Classic French laminated dough with 84 layers",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800",
      accent: "rgba(218, 165, 32, 0.3)"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalScroll = galleryRef.current.scrollWidth - window.innerWidth + galleryRef.current.offsetLeft * 2;

      gsap.to(galleryRef.current, {
        x: () => -(galleryRef.current.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      // Parallax effect on cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(card.querySelector('.card-image'),
          { scale: 1.1 },
          {
            scale: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getTweensOf(galleryRef.current)[0],
              start: 'left center',
              end: 'right center',
              scrub: true,
            }
          }
        );

        gsap.fromTo(card.querySelector('.card-content'),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getTweensOf(galleryRef.current)[0],
              start: 'left center',
              end: 'center center',
              scrub: true,
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-charcoal">
      {/* Section header */}
      <div className="absolute top-0 left-0 w-full z-10 p-8 md:p-16 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-40 block mb-4">
            Our Collection
          </span>
          <h2 className="text-4xl md:text-7xl font-display font-bold text-glow">
            Crafted Daily
          </h2>
        </motion.div>
      </div>

      {/* Horizontal gallery */}
      <div ref={galleryRef} className="flex h-full items-center pl-8 md:pl-16" style={{ width: 'max-content' }}>
        {items.map((item, i) => (
          <div
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="relative w-[85vw] md:w-[600px] h-[70vh] mx-4 md:mx-8 flex-shrink-0"
          >
            {/* Card container */}
            <div className="relative w-full h-full overflow-hidden rounded-3xl group">
              {/* Image with parallax */}
              <div
                className="card-image absolute inset-0 w-full h-full"
                style={{ willChange: 'transform' }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${item.accent}, transparent 60%)`
                  }}
                />
              </div>

              {/* Content */}
              <div
                className="card-content absolute bottom-0 left-0 w-full p-8 md:p-12"
                style={{ willChange: 'transform' }}
              >
                <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-60 block mb-3">
                  {item.subtitle}
                </span>
                <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base opacity-60 max-w-md mb-6">
                  {item.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass px-6 md:px-8 py-3 md:py-4 rounded-full text-xs md:text-sm tracking-widest uppercase flex items-center gap-3 hover:bg-gold-premium hover:text-onyx transition-colors"
                >
                  Discover
                  <ArrowRight size={16} />
                </motion.button>
              </div>

              {/* Number badge */}
              <div className="absolute top-6 right-6 w-12 h-12 md:w-16 md:h-16 rounded-full glass flex items-center justify-center">
                <span className="text-lg md:text-2xl font-display font-bold opacity-60">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* End card with CTA */}
        <div className="w-[85vw] md:w-[500px] h-[70vh] mx-4 md:mx-8 flex-shrink-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Explore Full Menu
            </h3>
            <motion.a
              href="/menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 glass px-8 md:px-12 py-4 md:py-5 rounded-full text-sm md:text-base tracking-widest uppercase hover:bg-gold-premium hover:text-onyx transition-colors"
            >
              View All Products
              <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <div
            key={i}
            className="w-12 h-[2px] bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gold-premium"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalGallery;
