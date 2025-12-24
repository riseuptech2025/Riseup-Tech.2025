import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Ecosystem', href: '/ecosystem' },
    { name: 'Careers', href: '/careers' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-gradient-to-r from-gray-950/80 via-gray-900/80 to-gray-950/80 shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="p-1 rounded-xl group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300"
            >
              <img
                src="/logo.png"
                alt="Riseup-Tech Logo"
                className="h-9 w-9 object-contain rounded-lg"
              />
            </motion.div>

            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent tracking-wide">
                Riseup-Tech
              </span>
              <div className="text-[11px] text-gray-400 -mt-0.5">
                Let's Rise Together
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="relative">
                      {/* Glowing underline */}
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_10px_2px_rgba(59,130,246,0.7)]"
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      />
                      {/* Glowing pulse effect */}
                      <motion.div
                        initial={{ opacity: 0.5, scale: 0.8 }}
                        animate={{ 
                          opacity: [0.5, 1, 0.5],
                          scale: [0.8, 1.1, 0.8]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 rounded-full blur-sm"
                      />
                    </div>
                  )}
                  {/* Hover glow effect */}
                  {!isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-300 hover:bg-white/10 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute w-full bg-gradient-to-b from-gray-950/95 to-gray-900/90 backdrop-blur-xl border-t border-white/10 shadow-xl"
          >
            <div className="px-4 py-3 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative"
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`relative block px-4 py-3 rounded-lg text-base font-medium transition-all z-10 ${
                        isActive
                          ? 'text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                      {/* Mobile active glow effect */}
                      {isActive && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-30 blur-sm" />
                          <div className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_10px_2px_rgba(59,130,246,0.7)]" />
                          <motion.div
                            animate={{
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400/70 to-blue-500/70 rounded-full blur-sm"
                          />
                        </>
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar