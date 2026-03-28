import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, MapPin, Phone, User, Mail, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart, useOrders, useToast, useUser } from '../contexts';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Magnetic from '../components/animations/Magnetic';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user, updateUser } = useUser();
  const { success, error } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    note: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryCharge = totalPrice > 500 ? 0 : 50;
  const grandTotal = totalPrice + deliveryCharge;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter valid 10-digit number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    updateUser({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
    });

    const order = createOrder({
      items,
      total: grandTotal,
      deliveryCharge,
      customer: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        note: formData.note,
      },
      paymentMethod: formData.paymentMethod,
    });

    // Build WhatsApp message
    const orderNumber = order.id;
    const itemsList = items.map(item => `- ${item.name} x ${item.quantity} (₹${item.price * item.quantity})`).join('\n');
    const message = encodeURIComponent(
      `*New Order from THE CRUMB*\n\n` +
      `*Order ID:* ${orderNumber}\n` +
      `*Customer:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Address:* ${formData.address}\n` +
      `*Note:* ${formData.note || 'None'}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Subtotal:* ₹${totalPrice}\n` +
      `*Curation Service:* ${deliveryCharge === 0 ? "Complimentary" : "₹" + deliveryCharge}\n` +
      `*Grand Total:* *₹${grandTotal}*\n\n` +
      `*Payment Method:* ${formData.paymentMethod.toUpperCase()}\n\n` +
      `_Automated message from Bakehouse by the Crumb_`
    );

    const whatsappUrl = `https://wa.me/918318511982?text=${message}`;
    window.open(whatsappUrl, '_blank');

    clearCart();
    success('Reservation completed. Opening WhatsApp...');
    navigate(`/orders/${order.id}`);
    setIsProcessing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-40 min-h-screen bg-onyx flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold italic mb-8">Your collection is empty.</h1>
          <Magnetic>
             <Link to="/menu" className="text-xs font-bold tracking-widest uppercase underline underline-offset-8">
                Explore Collection
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
            <span className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-40 mb-4 block">Reservation</span>
          <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter">
            Final <br /> <span className="italic">Details</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-24 items-start">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="lg:col-span-2 space-y-12"
          >
            {/* Contact Information */}
            <div className="glass p-10 rounded-[2.5rem] border-white/5">
                <h2 className="text-2xl font-display font-medium mb-10 italic flex items-center gap-4">
                    <User size={20} className="text-gold-premium opacity-60" />
                    Delivery Profile
                </h2>

              <div className="space-y-8">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="The name for individual recognition"
                  leftIcon={<User size={16} />}
                />

                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="10-digit primary contact"
                  leftIcon={<Phone size={16} />}
                />

                <div>
                  <label className="block text-[10px] tracking-widest uppercase font-bold opacity-30 mb-3 ml-1">
                    Complete Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-6 top-6 opacity-30" size={16} />
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Detailed delivery coordinates"
                        rows={4}
                        className={`w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-14 pr-6 text-sm focus:outline-none focus:border-gold-premium focus:bg-white/10 resize-none transition-all ${errors.address ? 'border-red-500/50' : ''}`}
                    />
                  </div>
                  {errors.address && (
                    <p className="mt-2 text-[10px] uppercase tracking-widest font-bold text-red-500/60">{errors.address}</p>
                  )}
                </div>

                <Input
                    label="Artisan Note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Specific requests for the master baker (Optional)"
                    leftIcon={<MessageSquare size={16} />}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="glass p-10 rounded-[2.5rem] border-white/5">
                <h2 className="text-2xl font-display font-medium mb-10 italic flex items-center gap-4">
                    <CreditCard size={20} className="text-gold-premium opacity-60" />
                    Preferred Method
                </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <label
                  className={`
                    flex flex-col gap-6 p-8 rounded-3xl border transition-all cursor-pointer bg-white/5
                    ${formData.paymentMethod === 'cod'
                      ? 'border-gold-premium bg-white/10'
                      : 'border-white/5 hover:bg-white/10 hover:border-white/20'}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="w-4 h-4 accent-gold-premium"
                    />
                    <Truck size={24} className="opacity-20" />
                  </div>
                  <div>
                    <p className="font-bold tracking-widest uppercase text-xs">At Reception</p>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest mt-2">Cash on completion</p>
                  </div>
                </label>

                <label
                  className={`
                    flex flex-col gap-6 p-8 rounded-3xl border transition-all cursor-pointer bg-white/5
                    ${formData.paymentMethod === 'upi'
                      ? 'border-gold-premium bg-white/10'
                      : 'border-white/5 hover:bg-white/10 hover:border-white/20'}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleChange}
                        className="w-4 h-4 accent-gold-premium"
                    />
                    <div className="text-xl opacity-20">📱</div>
                  </div>
                  <div>
                    <p className="font-bold tracking-widest uppercase text-xs">Digital Transfer</p>
                    <p className="text-[10px] opacity-40 uppercase tracking-widest mt-2">GPay, PhonePe, UPI</p>
                  </div>
                </label>
              </div>

              <AnimatePresence>
                {formData.paymentMethod === 'upi' && (
                    <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-8 p-6 glass rounded-2xl bg-gold-premium/5 border-gold-premium/20 text-center"
                    >
                    <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gold-premium">
                        UPI ID: bakehouse@paytm
                    </p>
                    </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          {/* Side Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="glass p-10 rounded-[3rem] sticky top-40 border-white/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-premium/10 blur-[100px] pointer-events-none" />
              <h2 className="text-3xl font-display font-medium mb-12 italic">
                Curation
              </h2>

              <div className="space-y-6 mb-12">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase">{item.name}</p>
                      <p className="text-[9px] uppercase tracking-tighter opacity-30 mt-1 italic">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium opacity-60">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-8 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-widest uppercase font-bold opacity-30">Subtotal</span>
                  <span className="text-sm">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-widest uppercase font-bold opacity-30">Curation Service</span>
                  <span className="text-sm">
                    {deliveryCharge === 0 ? "Complimentary" : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="border-t border-white/20 pt-8 flex justify-between items-end">
                  <span className="text-[10px] tracking-widest uppercase font-bold opacity-30 pb-2">Grand Total</span>
                  <span className="text-5xl font-display font-medium text-gold-premium tracking-tighter">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>

              <Magnetic>
                <Button
                    type="submit"
                    fullWidth
                    loading={isProcessing}
                    className="mt-12 py-8"
                    onClick={handleSubmit}
                >
                    Complete Reservation
                </Button>
              </Magnetic>

              <Link
                to="/cart"
                className="block text-center text-[9px] tracking-widest uppercase font-bold opacity-30 hover:opacity-100 transition-all mt-8"
              >
                ← Back to Cart
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
