import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  // Github,
  // Youtube,
  // Mail,
} from 'lucide-react'

// For Discord/TikTok, use inline SVG or images if needed
const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/riseup.tech.2082', label: 'Facebook' },
    { icon: Twitter, href: 'https://x.com/csit_ramanand', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/riseup__tech/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/riseup-tech-2025/posts/?feedView=all', label: 'LinkedIn' },
  ]

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-300 border-t border-white/10">
      <div className="absolute inset-0 -z-10 opacity-30 blur-3xl bg-gradient-to-tr from-primary/20 via-purple-600/20 to-cyan-400/20"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        {/* Top Section: Company Info + Socials */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-5 group">
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="p-1 rounded-xl group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300"
              >
                {/* ✅ Your company logo instead of Rocket icon */}
                <img
                  src="/logo.jpg" // Make sure logo.png is inside public/
                  alt="Riseup-Tech Logo"
                  className="h-10 w-10 object-contain rounded-lg"
                />
              </motion.div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Riseup-Tech
              </span>
            </Link>

            <p className="text-gray-400 leading-relaxed mb-6">
              Building the future of AI, connection, and innovation — creating intelligent ecosystems that empower users and transform industries.
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-4 mt-2">
              {socialLinks.map(({ icon: Icon, href, label }, idx) => (
                <motion.a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-gradient-to-r from-primary to-secondary transition-all duration-300 text-gray-400 hover:text-white"
                  aria-label={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4 relative inline-block after:content-[''] after:block after:w-12 after:h-[2px] after:bg-gradient-to-r from-primary to-secondary after:mt-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['About', 'Ecosystem', 'Careers', 'News', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="hover:text-white transition-colors duration-300 text-gray-400 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4 relative inline-block after:content-[''] after:block after:w-12 after:h-[2px] after:bg-gradient-to-r from-primary to-secondary after:mt-2">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help-support" className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to="/review" className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block">
                  Give Review
                </Link>
              </li>
              <li>
                <a
                  href="mailto:riseuptech2025@gmail.com"
                  className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block"
                >
                  riseuptech2025@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>
            © {currentYear}{' '}
            <span className="text-white font-semibold">Riseup-Tech</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 mt-4 md:mt-0">
            <Link to="/help-support#privacy" className="hover:text-white transition-all">
              Privacy Policy
            </Link>
            <Link to="/help-support#terms" className="hover:text-white transition-all">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
