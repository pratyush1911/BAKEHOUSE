import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart, useToast } from '../../contexts';

export default function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem, totalPrice } = useCart();
  const { success } = useToast();

  const handleRemove = (productId, productName) => {
    removeItem(productId);
    success(`Removed ${productName} from cart`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-strong z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brown-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-brown-600" />
                <h2 className="text-xl font-display font-semibold text-brown-800">
                  Your Cart
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-brown-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-brown-500" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-brown-200 mx-auto mb-4" />
                  <p className="text-brown-500 mb-4">Your cart is empty</p>
                  <Link
                    to="/menu"
                    onClick={closeCart}
                    className="text-gold-600 font-medium hover:text-gold-700"
                  >
                    Browse our menu →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-4 bg-brown-50 rounded-xl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-brown-800 truncate">{item.name}</h3>
                        <p className="text-gold-600 font-semibold mt-1">₹{item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-brown-200 rounded-full transition-colors"
                          >
                            <Minus className="w-4 h-4 text-brown-600" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-brown-200 rounded-full transition-colors"
                          >
                            <Plus className="w-4 h-4 text-brown-600" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id, item.name)}
                        className="p-2 h-fit hover:bg-red-100 rounded-full transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-brown-100 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-brown-600">Subtotal</span>
                  <span className="text-2xl font-display font-bold text-brown-800">
                    ₹{totalPrice}
                  </span>
                </div>
                <p className="text-xs text-brown-500 text-center">
                  Delivery charges calculated at checkout
                </p>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="block w-full btn-primary text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
