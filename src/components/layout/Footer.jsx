import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, Send, Camera } from 'lucide-react';
import Magnetic from '../animations/Magnetic';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'Home', path: '/' },
      { name: 'Menu', path: '/menu' },
      { name: 'About', path: '/#about' },
      { name: 'Experience', path: '/#experience' },
    ],
    account: [
      { name: 'Profile', path: '/profile' },
      { name: 'Orders', path: '/orders' },
      { name: 'Cart', path: '/cart' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Refund Policy', path: '#' },
    ],
  };

  const socialLinks = [
    { icon: Camera, href: '#', label: 'Instagram' },
    { icon: Send, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="relative bg-onyx pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-premium/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-16 mb-16 md:mb-24">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="inline-block mb-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tighter text-glow">
                  THE CRUMB
                </h2>
              </Link>
              <p className="text-sm md:text-base opacity-50 leading-relaxed mb-8 max-w-sm">
                Artisan bakery crafting exceptional breads and pastries since 1994.
                Every creation is a testament to patience, heritage, and the alchemy of fire.
              </p>

              {/* Contact info */}
              <div className="space-y-4">
                <motion.a
                  href="tel:+918318511982"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-sm opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Phone size={16} />
                  <span>+91 8318511982</span>
                </motion.a>
                <motion.a
                  href="mailto:hello@thecrumb.in"
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 text-sm opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Mail size={16} />
                  <span>hello@thecrumb.in</span>
                </motion.a>
                <div className="flex items-center gap-3 text-sm opacity-60">
                  <MapPin size={16} />
                  <span>Jhansi, Uttar Pradesh</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-4 mt-8">
                {socialLinks.map((social, i) => (
                  <Magnetic key={social.label}>
                    <motion.a
                      href={social.href}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center opacity-60 hover:opacity-100 hover:bg-gold-premium hover:text-onyx transition-all"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Link columns */}
          {[
            { title: 'Explore', links: footerLinks.explore },
            { title: 'Account', links: footerLinks.account },
            { title: 'Legal', links: footerLinks.legal },
          ].map((column, colIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: colIndex * 0.1 }}
            >
              <h3 className="text-xs tracking-[0.2em] uppercase opacity-40 mb-6">
                {column.title}
              </h3>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: colIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className="text-sm opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 group"
                    >
                      <span className="group-hover:text-gold-premium transition-colors">
                        {link.name}
                      </span>
                      {link.path.startsWith('/') && !link.path.startsWith('/#') && (
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-40">
          <p>© {currentYear} The Crumb. All rights reserved.</p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span>Crafted with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-gold-premium"
            >
              ♥
            </motion.span>
            <span>in Jhansi</span>
          </motion.p>
          <p>Designed for Awwwards</p>
        </div>
      </div>

      {/* Animated background lines */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 1 }}
          className="w-[200px] h-full bg-gradient-to-r from-transparent via-gold-premium/50 to-transparent"
        />
      </div>
    </footer>
  );
};

export default Footer;
