import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Clock, MapPin, Phone, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { useOrders } from '../contexts';
import { useState } from 'react';

export default function Orders() {
  const { id } = useParams();
  const { orders, getOrder } = useOrders();
  const [expandedOrder, setExpandedOrder] = useState(id);

  const order = id ? getOrder(id) : null;

  // If viewing single order
  if (order) {
    return (
      <OrderDetail order={order} onBack={() => setExpandedOrder(null)} />
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-cream-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-display font-bold text-brown-800">My Orders</h1>
            <p className="text-brown-500">Track and manage your orders</p>
          </motion.div>

          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <OrderCard
                    order={order}
                    isExpanded={expandedOrder === order.id}
                    onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-12 text-center"
            >
              <Package className="w-16 h-16 text-brown-200 mx-auto mb-4" />
              <h2 className="text-xl font-display font-semibold text-brown-800">
                No orders yet
              </h2>
              <p className="text-brown-500 mt-2">
                Browse our delicious menu and place your first order!
              </p>
              <Link to="/menu" className="btn-primary inline-block mt-6">
                Browse Menu
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function OrderCard({ order, isExpanded, onToggle }) {
  return (
    <div className="card overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-brown-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <p className="font-medium text-brown-800">{order.id}</p>
              <p className="text-sm text-brown-500">
                {new Date(order.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              order.status === 'Preparing'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {order.status}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-brown-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-brown-400" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-brown-100">
          <span className="text-sm text-brown-500">{order.items.length} items</span>
          <span className="text-lg font-display font-bold text-brown-800">₹{order.total}</span>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-brown-100"
        >
          <OrderDetailContent order={order} />
        </motion.div>
      )}
    </div>
  );
}

function OrderDetail({ order, onBack }) {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-2 text-brown-600 hover:text-brown-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Orders
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <OrderDetailContent order={order} showHeader />
      </motion.div>
    </div>
  );
}

function OrderDetailContent({ order, showHeader = false }) {
  return (
    <div className="p-6">
      {showHeader && (
        <div className="mb-6 pb-6 border-b border-brown-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-brown-800">{order.id}</h1>
              <p className="text-brown-500 mt-1">
                {new Date(order.date).toLocaleString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <span className={`px-4 py-2 text-sm font-medium rounded-full ${
              order.status === 'Preparing'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {order.status}
            </span>
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="font-display font-semibold text-brown-800 mb-4">Order Items</h3>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-brown-50 rounded-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-medium text-brown-800">{item.name}</p>
                <p className="text-sm text-brown-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-brown-700">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Details */}
      {order.customer && (
        <div className="mb-6">
          <h3 className="font-display font-semibold text-brown-800 mb-4">Delivery Details</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-brown-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-brown-500">Customer</p>
                <p className="font-medium text-brown-800">{order.customer.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-brown-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-brown-500">Phone</p>
                <p className="font-medium text-brown-800">{order.customer.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brown-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-brown-500">Address</p>
                <p className="font-medium text-brown-800">{order.customer.address}</p>
              </div>
            </div>
            {order.customer.note && (
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brown-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-brown-500">Delivery Note</p>
                  <p className="font-medium text-brown-800">{order.customer.note}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Method */}
      <div className="mb-6">
        <div className="flex items-center gap-3 p-3 bg-brown-50 rounded-xl">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            {order.paymentMethod === 'upi' ? '📱' : '💵'}
          </div>
          <div>
            <p className="text-sm text-brown-500">Payment Method</p>
            <p className="font-medium text-brown-800">
              {order.paymentMethod === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}
            </p>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-brown-100 pt-4">
        <div className="space-y-2">
          <div className="flex justify-between text-brown-600">
            <span>Subtotal</span>
            <span>₹{order.total - order.deliveryCharge}</span>
          </div>
          <div className="flex justify-between text-brown-600">
            <span>Delivery</span>
            <span>
              {order.deliveryCharge === 0 ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                `₹${order.deliveryCharge}`
              )}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-brown-100">
            <span className="font-medium text-brown-800">Total Paid</span>
            <span className="text-2xl font-display font-bold text-brown-800">
              ₹{order.total}
            </span>
          </div>
        </div>
      </div>

      {/* Reorder Button */}
      <Link to="/menu" className="btn-primary w-full mt-6 text-center block">
        Place Another Order
      </Link>
    </div>
  );
}

function User({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
