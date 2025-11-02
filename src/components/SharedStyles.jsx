import { motion } from 'framer-motion';

// Shared motion variants for consistent animations
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

// Continuous card style without borders
export const ContinuousCard = ({ children, className = '' }) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    variants={fadeIn}
    className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/10 transition-all ${className}`}
  >
    {children}
  </motion.div>
);

// Continuous section style
export const ContinuousSection = ({ children, className = '', noPadding }) => (
  <section className={`py-20 ${!noPadding ? 'px-4 sm:px-6 lg:px-8' : ''} ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

// Gradient text wrapper
export const GradientText = ({ children, className = '' }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary ${className}`}>
    {children}
  </span>
);

// Continuous button style
export const ContinuousButton = ({ children, primary, className = '', ...props }) => (
  <button
    className={`
      px-6 py-3 rounded-xl transition-all
      ${primary 
        ? 'bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90' 
        : 'bg-white/10 hover:bg-white/20 text-gray-200'}
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
);

// Glass panel without borders
export const GlassPanel = ({ children, className = '' }) => (
  <div className={`bg-white/5 backdrop-blur-lg rounded-3xl p-8 ${className}`}>
    {children}
  </div>
);