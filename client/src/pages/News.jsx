import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'
import SEO from '../components/SEO'

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: 'Riseup-Connect Launching on Mangsir 1, 2082',
      excerpt: 'Our revolutionary social platform is set to launch next month, featuring AI-powered connections and intelligent content discovery.',
      date: 'October 16, 2025',
      author: 'Riseup Team',
      category: 'Product Launch',
      readTime: '3 min read',
      image: '/api/placeholder/400/250',
    },
    {
      id: 2,
      title: 'Riseup-Tech Introduces Riseup-AI Suite',
      excerpt: 'Discover our comprehensive AI tools platform designed to enhance creativity, productivity, and innovation across various industries.',
      date: 'September 28, 2025',
      author: 'AI Research Team',
      category: 'Technology',
      readTime: '4 min read',
      image: '/api/placeholder/400/250',
    },
    {
      id: 3,
      title: 'Building the Future: Our Vision for 2026',
      excerpt: 'Learn about our ambitious plans for the coming year, including new product launches and expansion strategies.',
      date: 'August 15, 2025',
      author: 'CEO Office',
      category: 'Company News',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
    },
    {
      id: 4,
      title: 'Riseup-Learn: Transforming Education in Nepal',
      excerpt: 'How our learning platform aims to make quality education accessible to everyone through AI-powered personalized learning.',
      date: 'July 22, 2025',
      author: 'Education Team',
      category: 'Education',
      readTime: '4 min read',
      image: '/api/placeholder/400/250',
    },
    {
      id: 5,
      title: 'We\'re Hiring: Join Our Growing Team',
      excerpt: 'Explore career opportunities at Riseup-Tech and learn about our culture of innovation and collaboration.',
      date: 'June 30, 2025',
      author: 'HR Team',
      category: 'Careers',
      readTime: '2 min read',
      image: '/api/placeholder/400/250',
    },
    {
      id: 6,
      title: 'The Technology Behind Riseup Ecosystem',
      excerpt: 'A deep dive into the technical architecture and innovative solutions powering our interconnected product suite.',
      date: 'May 18, 2025',
      author: 'Engineering Team',
      category: 'Technology',
      readTime: '6 min read',
      image: '/api/placeholder/400/250',
    },
  ]

  const categories = ['All', 'Product Launch', 'Technology', 'Company News', 'Education', 'Careers']

  return (
    <AnimatedBackground>
      <SEO 
        title="Riseup-Tech News & Updates - Latest in AI & Technology"
        description="Stay updated with the latest news, product launches, and innovations from Riseup-Tech. Explore articles on AI, technology, education, and career opportunities."
        keywords="Riseup-Tech News, AI Innovations, Product Launches, Technology Updates, Careers at Riseup-Tech"
      />
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Riseup <span className="gradient-text">News</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Stay updated with the latest announcements, product launches, and insights from the Riseup-Tech team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white/50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-3 rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:border-primary hover:text-primary transition-all"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-primary/20 to-secondary/20 relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Tag className="text-primary" size={48} />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {article.author}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-primary group-hover:space-x-2 transition-all">
                      <span className="text-sm font-medium">Read More</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button className="btn-primary">
              Load More Articles
            </button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the latest news and updates from Riseup-Tech delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedBackground>
  )
}

export default News