import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ArrowRight } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import Magnetic from '../components/animations/Magnetic';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="pt-40 pb-40 min-h-screen bg-onyx">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-24">
            <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs tracking-[0.5em] uppercase font-bold opacity-40 mb-4 block"
            >
                The Collection
            </motion.span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-display font-bold tracking-tighter"
                >
                    Artisan <br /> <span className="italic">Menu</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-md opacity-50 text-lg leading-relaxed"
                >
                    Explore our curated range of premium bakery products, each crafted with heritage techniques and the finest seasonal ingredients.
                </motion.p>
            </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-6 mb-20">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
            <input
              type="text"
              placeholder="Search our curations..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-charcoal/50 border border-white/10 rounded-full py-5 pl-14 pr-14 text-sm focus:outline-none focus:border-gold-premium transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-1 opacity-40 hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <Magnetic>
            <button
                onClick={() => setShowFilters(!showFilters)}
                className={`
                flex items-center justify-center gap-3 px-10 py-5 rounded-full
                text-xs font-bold tracking-widest uppercase glass transition-all
                ${showFilters ? 'bg-white text-onyx' : 'hover:bg-white/5'}
                `}
            >
                <SlidersHorizontal size={14} />
                Filters
            </button>
          </Magnetic>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
            {showFilters && (
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                className="glass rounded-3xl p-10 mb-20"
            >
                <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <label className="text-[10px] tracking-[0.3em] uppercase font-bold opacity-30 mb-6 block">
                    Collection Type
                    </label>
                    <div className="flex flex-wrap gap-3">
                    {categories.map(cat => (
                        <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`
                            px-6 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all
                            ${selectedCategory === cat.id
                            ? 'bg-gold-premium text-onyx'
                            : 'bg-white/5 hover:bg-white/10'}
                        `}
                        >
                        {cat.name}
                        </button>
                    ))}
                    </div>
                </div>

                <div>
                    <label className="text-[10px] tracking-[0.3em] uppercase font-bold opacity-30 mb-6 block">
                    Sort By
                    </label>
                    <div className="flex flex-wrap gap-3">
                    {[
                        { id: 'default', label: 'Featured' },
                        { id: 'popular', label: 'Popular' },
                        { id: 'price-low', label: 'Price ↓' },
                        { id: 'price-high', label: 'Price ↑' },
                    ].map(opt => (
                        <button
                        key={opt.id}
                        onClick={() => setSortBy(opt.id)}
                        className={`
                            px-6 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all
                            ${sortBy === opt.id
                            ? 'bg-gold-premium text-onyx'
                            : 'bg-white/5 hover:bg-white/10'}
                        `}
                        >
                        {opt.label}
                        </button>
                    ))}
                    </div>
                </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 glass rounded-3xl">
            <h3 className="text-3xl font-display italic opacity-40">
              Nothing matches your curation.
            </h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSortBy('default');
              }}
              className="mt-8 text-xs font-bold tracking-widest uppercase underline underline-offset-8 decoration-gold-premium/50 hover:decoration-gold-premium transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Feature Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 glass rounded-[3rem] p-16 md:p-24 text-center overflow-hidden relative"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold-premium/5 blur-[100px] pointer-events-none" />
            <span className="text-xs tracking-[0.5em] uppercase font-bold opacity-30 mb-8 block">Bespoke Orders</span>
            <h3 className="text-5xl md:text-7xl font-display font-medium italic mb-10 leading-tight">
                Crafting Your <br /> Perfect Celebration
            </h3>
            <p className="max-w-xl mx-auto opacity-50 text-lg mb-12">
                Elevate your unique moments with our bespoke cake design service. Each piece is a hand-crafted masterpiece tailored to your vision.
            </p>
            <Magnetic>
                <a
                    href={`https://wa.me/918318511982?text=Hi! I'm interested in a custom curation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 px-12 py-6 bg-white text-onyx rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gold-premium transition-colors"
                >
                    Inquire Now <ArrowRight size={14} />
                </a>
            </Magnetic>
        </motion.div>
      </div>
    </div>
  );
}
