import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, BookOpen, Home, Grid3X3 } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Courses', path: '/courses', icon: BookOpen },
    { label: 'Categories', path: '/categories', icon: Grid3X3 },
    isAuthenticated && { label: 'Dashboard', path: '/dashboard', icon: User },
    isAuthenticated && user?.role === 'Mentor' && { label: 'Manage Courses', path: '/course-management', icon: BookOpen },
  ].filter(Boolean);

  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="sticky top-0 z-50 glass border-b border-white border-opacity-30 backdrop-blur-2xl shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-lg">S</span>
            </motion.div>
            <div className="hidden sm:block">
              <span className="gradient-text text-xl font-bold font-display">Shiksha Setu</span>
              <p className="text-xs text-gray-500 -mt-1">Learn • Grow • Succeed</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActivePath(item.path)
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 px-4 py-2 bg-white bg-opacity-50 rounded-xl backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {(user?.firstName || user?.userName || 'U')?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.userName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 text-primary-600 border-2 border-primary-500 rounded-xl hover:bg-primary-500 hover:text-white transition-all duration-300 font-semibold"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white rounded-xl hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 font-semibold relative overflow-hidden group"
                  >
                    <span className="relative z-10">Student</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </motion.button>
                </Link>
                <Link to="/mentor-register">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 font-semibold relative overflow-hidden group"
                  >
                    <span className="relative z-10">Mentor</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-white bg-opacity-50 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isOpen ? 1 : 0, 
            height: isOpen ? 'auto' : 0,
            y: isOpen ? 0 : -10
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="md:hidden overflow-hidden"
        >
          <div className="flex flex-col gap-2 py-4 border-t border-white border-opacity-30">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActivePath(item.path)
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="pt-4 border-t border-white border-opacity-30">
                <div className="flex items-center gap-3 px-4 py-3 bg-white bg-opacity-50 rounded-xl mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {(user?.firstName || user?.userName || 'U')?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.userName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-4 border-t border-white border-opacity-30">
                <Link 
                  to="/login" 
                  className="px-4 py-3 text-center border-2 border-primary-500 text-primary-600 rounded-xl font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-3 text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Register as Student
                </Link>
                <Link 
                  to="/mentor-register" 
                  className="px-4 py-3 text-center bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Become a Mentor
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};
