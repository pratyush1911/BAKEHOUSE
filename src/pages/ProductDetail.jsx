import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Star, ShoppingBag, Check, Heart, Clock, Award, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { useCart, useToast } from '../contexts';
import { QuantitySelector } from '../components/ui';
import ProductCard from '../components/product/ProductCard';
import Magnetic from '../components/animations/Magnetic';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { success } = useToast();

  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-onyx flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold italic mb-8">Creation not found.</h1>
          <Magnetic>
            <Link to="/menu" className="text-xs font-bold tracking-widest uppercase underline underline-offset-8 decoration-gold-premium/40 hover:decoration-gold-premium transition-all">
                Browse Collection
            </Link>
          </Magnetic>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem(product, quantity);
      success(`Added ${quantity} x ${product.name} to cart`);
      setIsAdding(false);
    }, 800);
  };

  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="pt-40 pb-40 min-h-screen bg-onyx">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity mb-20"
        >
          <ArrowLeft size={14} />
          Back to Menu
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.6, 0.01, -0.05, 0.95] }}
            className="sticky top-40"
          >
            <div className="relative rounded-[2rem] overflow-hidden glass aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-8 left-8 flex flex-wrap gap-3">
                    {product.badges?.map((badge, i) => (
                    <span
                        key={i}
                        className="px-4 py-2 bg-onyx/40 backdrop-blur-md border border-white/10 text-[9px] font-bold tracking-widest uppercase rounded-full"
                    >
                        {badge}
                    </span>
                    ))}
                </div>
            </div>
          </motion.div>

          {/* Details */}
          <div className="flex flex-col">
            <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-40 mb-6 block"
            >
                {product.category}
            </motion.span>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-display font-bold tracking-tighter mb-8"
            >
              {product.name}
            </motion.h1>

            <div className="flex items-center gap-6 mb-10 opacity-60">
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-gold-premium text-gold-premium" />
                    ))}
                </div>
                <span className="text-xs font-bold tracking-widest uppercase">Premium Quality • 4.9</span>
            </div>

            <div className="text-4xl font-display font-medium text-gold-premium mb-10">
              ₹{product.price} <span className="text-lg opacity-40 font-normal italic">/ selection</span>
            </div>

            <p className="text-xl opacity-60 leading-relaxed mb-12 font-light">
              {product.description || "Experimental textures meet heritage baking techniques in this unique artisan creation. Hand-crafted daily using our house-made starters and the finest seasonal flours."}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mb-16 underline-none">
              {[
                { icon: Check, text: 'Artisan Crafted' },
                { icon: Award, text: 'Heritage Grains' },
                { icon: Heart, text: 'Plant Based' },
                { icon: Clock, text: 'Slow Fermented' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 p-5 glass rounded-2xl group hover:bg-white/5 transition-colors">
                  <feature.icon size={18} className="text-gold-premium opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Selection & Add */}
            <div className="pt-12 border-t border-white/10">
              <div className="flex items-center gap-12 mb-10">
                <div>
                  <label className="block text-[10px] tracking-widest uppercase font-bold opacity-30 mb-4">
                    Quantity
                  </label>
                  <QuantitySelector
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={20}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <Magnetic>
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="w-full py-8 bg-white text-onyx rounded-full text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-4 hover:bg-gold-premium transition-all duration-500 disabled:opacity-50"
                    >
                        {isAdding ? (
                            "Preparing..."
                        ) : (
                            <>
                                <ShoppingBag size={18} />
                                Add to Collection
                            </>
                        )}
                    </button>
                </Magnetic>
                
                <p className="text-center text-[10px] uppercase tracking-[0.2em] font-bold opacity-20">
                    Bespoke Crafting • 24h Advance Notice Required
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-16 p-10 glass rounded-[2rem] border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gold-premium/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-display font-medium italic text-3xl mb-4 relative z-10 flex items-center gap-3">
                    🎂 Bespoke Commission
                </h3>
                <p className="opacity-50 text-sm leading-relaxed mb-8 relative z-10">
                    Transform this creation into a unique masterpiece for your celebration. Our master bakers specialize in custom orders.
                </p>
                <Magnetic>
                    <a
                        href={`https://wa.me/918318511982?text=Hi! I'm interested in a custom version of ${product.name}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-xs font-bold tracking-widest uppercase underline underline-offset-8 decoration-gold-premium/40 hover:decoration-gold-premium transition-all relative z-10"
                    >
                        Commission Yours <ArrowRight size={12} />
                    </a>
                </Magnetic>
            </div>
          </div>
        </div>

        {/* Similar Curations */}
        {relatedProducts.length > 0 && (
          <div className="mt-60">
            <div className="flex items-end justify-between mb-20">
                <div>
                     <span className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-40 mb-4 block">Discovery</span>
                    <h2 className="text-5xl md:text-7xl font-display font-bold italic tracking-tighter">
                        Similar <br /> Curations
                    </h2>
                </div>
                <Magnetic>
                    <Link to="/menu" className="text-xs font-bold tracking-widest uppercase underline underline-offset-8">Explore All</Link>
                </Magnetic>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {relatedProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
