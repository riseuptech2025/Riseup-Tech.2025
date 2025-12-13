import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import { Link } from 'react-router-dom'
import { ArrowRight, Brain, Users, Book, Video, Cloud } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'
import SEO from '../components/SEO'

const Home = () => {
  const products = [
    {
      icon: Users,
      name: 'Riseup-Connect',
      description: 'Social platform connecting people through intelligent networking',
      status: 'Coming Soon',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Brain,
      name: 'Riseup-AI',
      description: 'Advanced AI tools for creativity, productivity, and innovation',
      status: 'In Development',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Book,
      name: 'Riseup-Learn',
      description: 'Interactive learning platform with personalized education paths',
      status: 'Planning',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Video,
      name: 'Riseup-Reels',
      description: 'Short-form video platform with AI-powered content discovery',
      status: 'Coming Soon',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Cloud,
      name: 'Riseup-Drive',
      description: 'Secure cloud storage with intelligent file organization',
      status: 'Planning',
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  return (
    <AnimatedBackground>
      <Hero />
       <SEO 
        title="Riseup-Tech"
        description="Building the future of AI, connection, and innovation. We create intelligent platforms that empower people and transform industries worldwide."
        keywords="Riseup-Tech, AI Nepal, Technology Nepal, Software Development, Digital Innovation"
      />
      {/* Products Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The <span className="gradient-text">Riseup Ecosystem</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A suite of intelligent applications designed to connect, educate, and empower people through cutting-edge technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-6 group cursor-pointer"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${product.color} mb-4`}>
                  <product.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {product.status}
                  </span>
                  <ArrowRight className="text-gray-400 group-hover:text-primary transition-colors" size={20} />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/ecosystem" className="btn-primary">
              Explore Full Ecosystem
            </Link>
          </motion.div>
        </div>
      </section>
    </AnimatedBackground>
  )
}

export default Home