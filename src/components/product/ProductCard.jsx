import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, ArrowUpRight } from 'lucide-react';
import { useCart, useToast } from '../../contexts';
import Magnetic from '../animations/Magnetic';

export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { success } = useToast();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product, 1);
    success(`Added ${product.name} to cart`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.6, 0.01, -0.05, 0.95] }}
      className="group relative cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-charcoal glass">
        <motion.img
          src={product.image}
          alt={product.name}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.2, ease: [0.6, 0.01, -0.05, 0.95] }}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
          loading="lazy"
        />
        
        {/* Overlay Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
            <Magnetic>
                <button 
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-white text-onyx rounded-full text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gold-premium transition-colors"
                >
                    <ShoppingBag size={14} />
                    Add to Cart
                </button>
            </Magnetic>
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {product.badges?.map((badge, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-onyx/40 backdrop-blur-md border border-white/10 text-[9px] font-bold tracking-widest uppercase rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={20} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 flex justify-between items-start">
        <div>
          <span className="text-[10px] tracking-[0.2em] uppercase opacity-40 mb-2 block font-bold">{product.category}</span>
          <h3 className="text-xl font-display font-medium group-hover:text-gold-premium transition-colors">
            {product.name}
          </h3>
        </div>
        <div className="text-right">
            <span className="text-lg font-medium opacity-80 block">
                ₹{product.price}
            </span>
            <div className="flex items-center gap-1 mt-1 justify-end opacity-40">
                <Star className="w-3 h-3 fill-white text-white" />
                <span className="text-[10px] font-bold">4.9</span>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
