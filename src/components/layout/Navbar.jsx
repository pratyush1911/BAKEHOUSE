import React, { useState, useEffect, useContext } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu as MenuIcon, X } from 'lucide-react';
import Magnetic from '../animations/Magnetic';
import { CartContext } from '../../contexts/CartContext';

const Navbar = () => {
  const { totalItems } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const { scrollY } = useScroll();
  const [lastY, setLastY] = useState(0);

  // Transform opacity and scale based on scroll
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const navScale = useTransform(scrollY, [0, 100], [0.95, 1]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Experience', path: '/#experience' },
    { name: 'About', path: '/#about' },
  ];

  useEffect(() => {
    let timeout;
    if (visible && scrollY.get() > 100) {
      timeout = setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [visible, isScrolling]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastY;

    if (latest < 50) {
      setVisible(true);
    } else if (diff > 5) {
      setVisible(false);
    } else if (diff < -5) {
      setVisible(true);
    }

    setLastY(latest);
    setIsScrolling(true);

    const scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    return () => clearTimeout(scrollTimeout);
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e, path) => {
    setIsMobileMenuOpen(false);

    // Handle hash links like '/#experience' and '/#about'
    if (path.includes('#')) {
      e.preventDefault();
      const hash = path.split('#')[1];
      const basePath = path.split('#')[0] || '/';

      if (location.pathname === basePath) {
        // Already on the right page, just scroll to the section
        const target = document.getElementById(hash);
        if (target && window.lenis) {
          window.lenis.scrollTo(target, { offset: -100 });
        } else if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Navigate to the page first, then scroll
        navigate(basePath);
        setTimeout(() => {
          const target = document.getElementById(hash);
          if (target && window.lenis) {
            window.lenis.scrollTo(target, { offset: -100 });
          } else if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      }
    }
  };

  // Check if current path matches
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Ambient glow behind nav */}
          <motion.div
            style={{ opacity: navOpacity, scale: navScale }}
            className="fixed top-0 left-0 w-full h-[120px] bg-gradient-to-b from-gold-premium/5 to-transparent z-[95] pointer-events-none"
          />

          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
            className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-4 md:py-8"
          >
            <div className="max-w-7xl mx-auto flex justify-between items-center glass rounded-full px-6 md:px-8 py-3 md:py-4 relative">
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
                  className="w-[200px] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />
              </div>

              <Link
                to="/"
                className="relative z-10 text-xl md:text-2xl font-display font-bold tracking-tighter text-glow hover:text-gold-premium transition-colors"
              >
                THE CRUMB
              </Link>

              <div className="hidden md:flex items-center space-x-1 md:space-x-2 relative z-10">
                {navLinks.map((link) => (
                  <Magnetic key={link.name}>
                    <Link
                      to={link.path.includes('#') ? '#' : link.path}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className={`relative text-xs font-medium tracking-widest uppercase transition-all px-4 py-2 rounded-full ${
                        isActive(link.path)
                          ? 'text-gold-premium bg-gold-premium/10'
                          : 'opacity-60 hover:opacity-100 hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                      {isActive(link.path) && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute inset-0 rounded-full border border-gold-premium/30"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </Magnetic>
                ))}
              </div>

              <div className="flex items-center space-x-3 md:space-x-6 relative z-10">
                <div className="flex items-center space-x-3 md:space-x-6">
                  <Magnetic>
                    <Link to="/profile">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="opacity-60 hover:opacity-100 hover:text-gold-premium transition-all cursor-pointer"
                      >
                        <User size={20} />
                      </motion.div>
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link to="/cart" className="relative">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="opacity-60 hover:opacity-100 hover:text-gold-premium transition-all cursor-pointer"
                      >
                        <ShoppingBag size={20} />
                        <AnimatePresence mode="wait">
                          {totalItems > 0 && (
                            <motion.span
                              key={totalItems}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute -top-2 -right-2 w-5 h-5 bg-gold-premium text-onyx text-[10px] font-bold rounded-full flex items-center justify-center"
                            >
                              {totalItems}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </Link>
                  </Magnetic>
                </div>

                {/* Mobile Menu Toggle */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="md:hidden opacity-60 hover:opacity-100 transition-opacity"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-onyx/90 backdrop-blur-sm z-[99] md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />

                  {/* Menu content */}
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.6, 0.01, -0.05, 0.95] }}
                    className="absolute top-full left-4 right-4 mt-4 glass rounded-[2rem] p-8 flex flex-col space-y-6 md:hidden overflow-hidden z-[100]"
                  >
                    {navLinks.map((link, idx) => (
                      <motion.div
                        key={link.name}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Link
                          to={link.path.includes('#') ? '#' : link.path}
                          onClick={(e) => handleNavClick(e, link.path)}
                          className={`text-2xl md:text-3xl font-display font-medium block py-2 ${
                            isActive(link.path) ? 'text-gold-premium' : ''
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}

                    {/* Mobile actions */}
                    <div className="pt-6 mt-6 border-t border-white/10 flex gap-4">
                      <Link
                        to="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 text-lg opacity-60 hover:opacity-100"
                      >
                        <User size={24} />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/cart"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 text-lg opacity-60 hover:opacity-100"
                      >
                        <ShoppingBag size={24} />
                        <span>Cart {totalItems > 0 && `(${totalItems})`}</span>
                      </Link>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
