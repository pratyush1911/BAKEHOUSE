import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts';

export default function FloatingCartButton() {
  const { totalItems, openCart } = useCart();

  if (totalItems === 0) return null;

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={openCart}
      className="fixed bottom-6 right-6 z-30 flex items-center gap-3 px-6 py-4 bg-brown-600 text-white rounded-full shadow-strong hover:bg-brown-700 transition-colors"
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6" />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-5 h-5 bg-gold-500 text-brown-900 text-xs font-bold rounded-full flex items-center justify-center"
        >
          {totalItems}
        </motion.span>
      </div>
      <span className="font-medium">View Cart</span>
    </motion.button>
  );
}
