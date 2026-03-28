import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Mail, Edit2, Save, X, Package, LogOut } from 'lucide-react';
import { useUser, useOrders } from '../contexts';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Profile() {
  const { user, updateUser, logout } = useUser();
  const { orders } = useOrders();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
      email: user?.email || '',
      address: user?.address || '',
    });
    setIsEditing(false);
  };

  const userOrders = orders.slice(0, 3);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-cream-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-display font-bold text-brown-800">My Profile</h1>
            <p className="text-brown-500">Manage your account details</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6 text-center md:col-span-1"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-display font-semibold text-brown-800">
                {user?.name || 'Guest User'}
              </h2>
              <p className="text-brown-500 text-sm mt-1">
                {user?.phone || 'No phone added'}
              </p>
              <div className="mt-6 space-y-2">
                <Link
                  to="/orders"
                  className="block w-full px-4 py-2 bg-brown-100 text-brown-700 rounded-full font-medium hover:bg-brown-200 transition-colors"
                >
                  View All Orders
                </Link>
                {user && (
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 border border-red-200 text-red-600 rounded-full font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                )}
              </div>
            </motion.div>

            {/* Profile Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6 md:col-span-2"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold text-brown-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-gold-600" />
                  Personal Information
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 text-gold-600 hover:bg-gold-50 rounded-full transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    leftIcon={<User className="w-5 h-5" />}
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    leftIcon={<Phone className="w-5 h-5" />}
                  />
                  <Input
                    label="Email (Optional)"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    leftIcon={<Mail className="w-5 h-5" />}
                  />
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-brown-500" />
                        Address
                      </div>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      rows={3}
                      className="input-field resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSave} className="flex-1">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="flex-1">
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-brown-50 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-brown-600" />
                    </div>
                    <div>
                      <p className="text-sm text-brown-500">Name</p>
                      <p className="font-medium text-brown-800">{user?.name || 'Not added'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-brown-50 rounded-xl">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-brown-600" />
                    </div>
                    <div>
                      <p className="text-sm text-brown-500">Phone</p>
                      <p className="font-medium text-brown-800">{user?.phone || 'Not added'}</p>
                    </div>
                  </div>
                  {user?.email && (
                    <div className="flex items-start gap-4 p-4 bg-brown-50 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-brown-600" />
                      </div>
                      <div>
                        <p className="text-sm text-brown-500">Email</p>
                        <p className="font-medium text-brown-800">{user.email}</p>
                      </div>
                    </div>
                  )}
                  {user?.address && (
                    <div className="flex items-start gap-4 p-4 bg-brown-50 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-brown-600" />
                      </div>
                      <div>
                        <p className="text-sm text-brown-500">Address</p>
                        <p className="font-medium text-brown-800">{user.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-semibold text-brown-800 flex items-center gap-2">
                <Package className="w-5 h-5 text-gold-600" />
                Recent Orders
              </h2>
              <Link to="/orders" className="text-gold-600 font-medium hover:text-gold-700">
                View All →
              </Link>
            </div>

            {userOrders.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userOrders.map(order => (
                  <Link
                    key={order.id}
                    to={`/orders/${order.id}`}
                    className="card p-4 hover:shadow-medium transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-brown-600">{order.id}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'Preparing'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-brown-800 font-medium">{order.items.length} items</p>
                    <p className="text-gold-600 font-semibold mt-1">₹{order.total}</p>
                    <p className="text-xs text-brown-400 mt-2">
                      {new Date(order.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="card p-8 text-center">
                <Package className="w-12 h-12 text-brown-200 mx-auto mb-4" />
                <p className="text-brown-500">No orders yet</p>
                <Link to="/menu" className="text-gold-600 font-medium mt-2 inline-block">
                  Browse menu and place your first order →
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
