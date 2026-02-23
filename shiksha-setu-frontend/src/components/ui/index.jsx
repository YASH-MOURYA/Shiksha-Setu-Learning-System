import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  onClick,
  disabled = false,
  loading = false,
  icon: Icon,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 font-display relative overflow-hidden group';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white hover:shadow-2xl hover:shadow-primary-500/25 hover:scale-105 active:scale-95',
    secondary: 'bg-white border-2 border-primary-500 text-primary-600 hover:bg-gradient-to-r hover:from-primary-500 hover:to-secondary-500 hover:text-white hover:border-transparent hover:shadow-xl',
    ghost: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/25',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-xl hover:shadow-green-500/25',
    outline: 'bg-transparent border-2 border-gray-200 text-gray-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50',
    glass: 'bg-white bg-opacity-20 backdrop-blur-xl border border-white border-opacity-30 text-gray-800 hover:bg-opacity-30 hover:shadow-xl',
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer effect for primary buttons */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shimmer" />
      )}
      
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            {Icon && <Icon className="w-4 h-4" />}
            {children}
          </>
        )}
      </span>
    </motion.button>
  );
};

export const Input = ({ 
  label, 
  error, 
  icon: Icon,
  className = '',
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: 'border-gray-200 focus:border-primary-500 focus:ring-primary-500',
    glass: 'bg-white bg-opacity-50 backdrop-blur-sm border-white border-opacity-30 focus:bg-opacity-80',
    minimal: 'border-0 border-b-2 border-gray-200 rounded-none focus:border-primary-500 bg-transparent',
  };

  return (
    <div className="w-full">
      {label && (
        <motion.label 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          {label}
        </motion.label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary-500 transition-colors duration-300" />
        )}
        <motion.input
          whileFocus={{ scale: 1.01 }}
          className={`input-base ${Icon ? 'pl-10' : ''} ${variants[variant]} ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''} ${className}`}
          {...props}
        />
        {/* Focus ring effect */}
        <div className="absolute inset-0 rounded-xl border-2 border-primary-500 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1 flex items-center gap-1"
        >
          <span className="w-1 h-1 bg-red-500 rounded-full" />
          {error}
        </motion.p>
      )}
    </div>
  );
};

export const Card = ({ 
  children, 
  className = '',
  variant = 'default',
  hoverEffect = true,
  glowEffect = false,
  ...props 
}) => {
  const variants = {
    default: 'glass',
    elevated: 'bg-white shadow-xl border border-gray-100',
    minimal: 'bg-white border border-gray-200',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-200',
    dark: 'glass-dark text-white',
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -8, scale: 1.02 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${variants[variant]} rounded-2xl p-6 transition-all duration-500 ${glowEffect ? 'card-glow' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const Badge = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
    neutral: 'bg-gray-100 text-gray-800',
    outline: 'border-2 border-primary-500 text-primary-600 bg-transparent',
    glass: 'bg-white bg-opacity-20 backdrop-blur-sm text-gray-800 border border-white border-opacity-30',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <motion.span 
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center rounded-full font-semibold ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.span>
  );
};

export const LoadingSpinner = ({ size = 'md', variant = 'primary' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const variants = {
    primary: 'border-primary-500',
    secondary: 'border-secondary-500',
    white: 'border-white',
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizes[size]} border-4 border-gray-200 border-t-transparent rounded-full ${variants[variant]}`}
      />
    </div>
  );
};

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  size = 'md',
  ...props 
}) => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full mx-4',
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`bg-white rounded-3xl shadow-2xl ${sizes[size]} w-full overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {title && (
          <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-primary-50 to-secondary-50">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              ×
            </motion.button>
          </div>
        )}
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Skeleton = ({ className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-200',
    circle: 'bg-gray-200 rounded-full',
    text: 'bg-gray-200 rounded h-4',
    button: 'bg-gray-200 rounded-lg h-10',
  };

  return (
    <div className={`animate-pulse ${variants[variant]} ${className}`} />
  );
};

export const Toast = ({ message, type = 'info', isVisible, onClose }) => {
  const types = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      className={`fixed top-4 right-4 px-6 py-3 rounded-xl shadow-lg z-50 ${types[type]}`}
    >
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-white hover:text-gray-200">
          ×
        </button>
      </div>
    </motion.div>
  );
};

export const ProgressBar = ({ progress = 0, className = '', showLabel = true }) => {
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
        />
      </div>
    </div>
  );
};
