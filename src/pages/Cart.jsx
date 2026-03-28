import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight } from 'lucide-react';
import { useCart, useToast } from '../contexts';
import Magnetic from '../components/animations/Magnetic';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const { success, error } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(null);
  const [discount, setDiscount] = useState(0);

  const handleRemove = (productId, productName) => {
    removeItem(productId);
    success(`Removed ${productName} from collection`);
  };

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (code === 'WELCOME10') {
      setCouponApplied(code);
      setDiscount(totalPrice * 0.1);
      success('Allocation adjusted. 10% reduction applied.');
    } else {
      error('Invalid collection code.');
    }
  };

  const finalTotal = totalPrice - discount;
  const deliveryCharge = finalTotal > 500 ? 0 : 50;
  const grandTotal = finalTotal + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-40 min-h-screen bg-onyx flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-32 h-32 glass rounded-full flex items-center justify-center mx-auto mb-10"
          >
            <ShoppingBag className="w-10 h-10 opacity-20" />
          </motion.div>
          <h1 className="text-4xl font-display font-medium italic mb-6">
            Your collection is <br /> empty.
          </h1>
          <p className="opacity-40 text-lg mb-12 font-light leading-relaxed">
            Begin your sensory journey by exploring our artisan curations.
          </p>
          <Magnetic>
            <Link to="/menu" className="inline-flex items-center gap-4 px-12 py-6 bg-white text-onyx rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gold-premium transition-colors">
              Explore Menu <ArrowRight size={14} />
            </Link>
          </Magnetic>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-40 min-h-screen bg-onyx">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
            <span className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-40 mb-4 block">Review</span>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter">
            Your <br /> <span className="italic">Collection</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-16 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="glass p-8 rounded-3xl flex flex-col md:flex-row gap-8 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-40 h-40 object-cover rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="flex-1 flex flex-col justify-between relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                        <span className="text-[9px] tracking-widest uppercase opacity-40 font-bold mb-2 block">{item.category}</span>
                        <h3 className="text-2xl font-display font-medium">
                            {item.name}
                        </h3>
                        <p className="text-sm opacity-40 mt-1 font-light italic">{item.tagline}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="p-3 opacity-20 hover:opacity-100 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-8">
                    <div className="inline-flex items-center glass rounded-full p-2 border border-white/5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-10 text-center text-xs font-bold tracking-widest">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest opacity-30 mb-1">Total</p>
                      <p className="text-3xl font-display font-medium text-gold-premium">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={() => {
                if (confirm('Clear entire collection?')) clearCart();
              }}
              className="text-[10px] tracking-widest uppercase font-bold opacity-30 hover:opacity-100 hover:text-red-500 transition-all pt-8"
            >
              Clear entire collection
            </button>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass p-10 rounded-[2.5rem] sticky top-40 border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-premium/5 blur-3xl pointer-events-none" />
                <h2 className="text-3xl font-display font-medium mb-10 italic">
                    Summary
                </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-40 uppercase tracking-widest font-bold text-[10px]">Subtotal</span>
                  <span className="text-xl">₹{totalPrice}</span>
                </div>

                {/* Coupon Section */}
                <div className="pt-6 border-t border-white/5">
                  <label className="flex items-center gap-3 text-[10px] tracking-widest uppercase font-bold opacity-30 mb-4">
                    <Tag size={12} />
                    Collection Code
                  </label>
                  {couponApplied ? (
                    <div className="flex items-center justify-between p-4 glass rounded-2xl border-gold-premium/30 bg-gold-premium/5">
                      <span className="text-xs font-bold tracking-widest text-gold-premium">{couponApplied}</span>
                      <button
                        onClick={() => {
                          setCouponApplied(null);
                          setDiscount(0);
                        }}
                        className="text-[9px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={e => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 bg-white/5 border border-white/5 rounded-full py-4 px-6 text-xs focus:outline-none focus:border-gold-premium transition-colors"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-6 py-4 bg-white/5 hover:bg-white/10 rounded-full text-[9px] font-bold tracking-widest uppercase transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-gold-premium font-bold italic">
                    <span className="text-[10px] tracking-widest uppercase">Reduction</span>
                    <span className="text-xl">-₹{discount.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-40 uppercase tracking-widest font-bold text-[10px]">Service</span>
                  <span className="text-lg">
                    {deliveryCharge === 0 ? "Complimentary" : `₹${deliveryCharge}`}
                  </span>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] tracking-widest uppercase font-bold opacity-40 pb-2">Grand Total</span>
                    <span className="text-5xl font-display font-medium text-gold-premium tracking-tighter">
                      ₹{grandTotal.toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              <Magnetic>
                <button
                    onClick={() => navigate('/checkout')}
                    className="w-full py-8 bg-white text-onyx rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gold-premium transition-all duration-500 mt-12"
                >
                    Proceed to Reserve
                </button>
              </Magnetic>

              <p className="text-center text-[9px] uppercase tracking-[0.2em] font-bold opacity-20 mt-8 leading-loose">
                  Artisan Notice • Please allow 24h <br /> for bespoke preparation
              </p>

              <Link
                to="/menu"
                className="block text-center text-[9px] tracking-widest uppercase font-bold opacity-30 hover:opacity-100 transition-all mt-8"
              >
                Continue Exploring →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
