import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'
import SEO from '../components/SEO'

const NotFound = () => {
  return (
    <AnimatedBackground>
        <SEO
        title="404 Not Found - Riseup-Tech"
        description="The page you are looking for does not exist. Return to the Riseup-Tech homepage or go back to the previous page."
        keywords="404 Not Found, Riseup-Tech, Page Not Found, Error 404"
      />
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="glass-card p-12 max-w-md mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl font-bold gradient-text mb-4"
            >
              404
            </motion.div>
            
            <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
            
            <p className="text-gray-400 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Home size={20} />
                <span>Go Home</span>
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <ArrowLeft size={20} />
                <span>Go Back</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedBackground>
  )
}

export default NotFound