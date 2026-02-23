import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-dark to-gray-800 text-white mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">Shiksha Setu</h3>
            <p className="text-gray-300">Empowering learners worldwide with quality education</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Courses', path: '/courses' },
                { label: 'Categories', path: '/categories' },
                { label: 'About', path: '/about' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-300 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {[
                { label: 'Help Center', path: '#' },
                { label: 'Privacy Policy', path: '#' },
                { label: 'Terms of Service', path: '#' },
                { label: 'Contact Us', path: '#' },
              ].map((link) => (
                <li key={link.path}>
                  <a href={link.path} className="text-gray-300 hover:text-primary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-primary" />
                <a href="mailto:info@shiksha-setu.com" className="text-gray-300 hover:text-primary">
                  info@shiksha-setu.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-primary" />
                <a href="tel:+919876543210" className="text-gray-300 hover:text-primary">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                <span className="text-gray-300">India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Shiksha Setu. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {[
              { icon: Facebook, url: '#' },
              { icon: Twitter, url: '#' },
              { icon: Instagram, url: '#' },
              { icon: Linkedin, url: '#' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                whileHover={{ scale: 1.2, color: '#6366f1' }}
                className="text-gray-300 transition-colors"
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
