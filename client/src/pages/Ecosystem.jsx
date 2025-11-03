// Ecosystem.jsx - Updated with accurate product information
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users, Brain, Book, Video, Cloud, MessageCircle, Briefcase, ArrowRight, Zap, Shield, Globe } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'

const Ecosystem = () => {
  const products = [
    {
      icon: Users,
      name: 'Riseup-Connect',
      category: 'Social & Learning',
      description: 'Social platform for students, developers, and creators to share knowledge, posts, projects, and ideas in a collaborative environment.',
      features: ['Posts & videos sharing', 'Comments & messaging', 'Friends/follow system', 'Project showcase'],
      status: 'In Development',
      launchDate: 'Q4 2025',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Brain,
      name: 'Riseup-AI',
      category: 'AI & Productivity',
      description: 'Personal AI assistant for learning, coding, and productivity with personalized recommendations and content guidance.',
      features: ['Personalized recommendations', 'AI chat assistant', 'Content guidance', 'Learning support'],
      status: 'In Development',
      launchDate: 'Q1 2026',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Book,
      name: 'Riseup-Learn',
      category: 'Education',
      description: 'AI-powered personalized learning platform for students and professionals with courses, tutorials, and progress tracking.',
      features: ['AI-powered courses', 'Progress tracking', 'Personalized recommendations', 'Skill development'],
      status: 'Planning',
      launchDate: 'Q2 2026',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Video,
      name: 'Riseup-Reels',
      category: 'Entertainment & Media',
      description: 'Short educational and creative videos platform integrated with learning content and creative expression tools.',
      features: ['Educational shorts', 'Creative videos', 'Learning content', 'Community sharing'],
      status: 'Coming Soon',
      launchDate: 'Q3 2026',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Cloud,
      name: 'Riseup-Drive',
      category: 'Cloud & Tools',
      description: 'File storage and collaboration workspace with seamless integration across the Riseup ecosystem.',
      features: ['File storage', 'Collaboration workspace', 'Cross-platform sync', 'Secure backup'],
      status: 'Planning',
      launchDate: 'Q4 2026',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: MessageCircle,
      name: 'Riseup-Chat',
      category: 'Communication',
      description: 'Messaging, video conferencing, and collaboration tools designed for students and professionals.',
      features: ['Instant messaging', 'Video conferencing', 'Group collaboration', 'File sharing'],
      status: 'Coming Soon',
      launchDate: 'Q1 2027',
      color: 'from-teal-500 to-blue-500',
    },
    {
      icon: Briefcase,
      name: 'Riseup-Business',
      category: 'Business & Freelancing',
      description: 'Tools for entrepreneurs and developers to manage projects, collaborate, and grow their ventures.',
      features: ['Project management', 'Freelancer tools', 'Business resources', 'Networking'],
      status: 'Planning',
      launchDate: 'Q2 2027',
      color: 'from-amber-500 to-orange-500',
    }
  ]

  const ecosystemFeatures = [
    {
      icon: Zap,
      title: 'Single Account Access',
      description: 'One Riseup account gives you access to all products and services across the ecosystem.',
    },
    {
      icon: Shield,
      title: 'Unified Security',
      description: 'Enterprise-grade security and privacy protection across all Riseup platforms.',
    },
    {
      icon: Globe,
      title: 'Seamless Integration',
      description: 'All products work together seamlessly, sharing data and functionality when needed.',
    },
  ]

  return (
    <AnimatedBackground>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The <span className="gradient-text">Riseup Ecosystem</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              A fully interconnected suite of digital products designed to provide seamless experiences 
              for learning, creativity, productivity, and personal growth.
            </p>
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-6 rounded-2xl max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Our Philosophy:</strong> We don't sell software - we create and operate our own digital products 
                that directly serve and empower users through an integrated ecosystem.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ecosystem Features */}
      <section className="py-20 bg-white/50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ecosystem <span className="gradient-text">Advantages</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Designed as a cohesive digital environment where every product enhances the others
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ecosystemFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-6 text-center"
              >
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-primary to-secondary mb-4">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              Our <span className="gradient-text">Product Suite</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover the interconnected tools that make up the Riseup ecosystem
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 h-full flex flex-col"
              >
                <div className="flex items-start mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${product.color} flex-shrink-0`}>
                    <product.icon className="text-white" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  {product.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {product.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-primary">
                      {product.status}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Est: {product.launchDate}
                    </span>
                  </div>
                  <ArrowRight className="text-gray-400" size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the Riseup Revolution
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Be part of Nepal's growing tech ecosystem and experience the future of integrated digital services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Early Access
              </Link>
              <Link to="/about" className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedBackground>
  )
}

export default Ecosystem