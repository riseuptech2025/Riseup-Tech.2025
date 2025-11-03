import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 relative overflow-hidden">
      {/* Base gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#111111] -z-10"></div>
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-20 bg-gradient-to-r from-primary to-purple-600 blur-3xl -z-10"
        animate={{
          x: [-200, 200, -200],
          y: [-200, 100, -200],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 bg-gradient-to-r from-secondary to-blue-600 blur-3xl -z-10"
        animate={{
          x: [200, -200, 200],
          y: [200, -100, 200],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full opacity-20 bg-gradient-to-r from-emerald-500 to-cyan-500 blur-3xl -z-10"
        animate={{
          x: [-300, 300, -300],
          y: [-150, 150, -150],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Optional mesh gradient overlay for texture */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] -z-10"></div>

      {/* Content */}
      {children}
    </div>
  );
};

export default AnimatedBackground;