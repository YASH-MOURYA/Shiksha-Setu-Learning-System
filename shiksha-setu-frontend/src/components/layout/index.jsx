import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-pattern">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`flex-grow ${isDashboard ? 'w-full' : 'max-w-7xl mx-auto w-full px-4 py-8'}`}
      >
        {children}
      </motion.main>
      {!isDashboard && <Footer />}
    </div>
  );
};

export { Navbar, Footer };
