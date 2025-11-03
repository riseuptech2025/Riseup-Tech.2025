import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Book, FileText, Shield, HelpCircle, Mail } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'
import SEO from '../components/SEO'

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('docs')

  const docs = [
    {
      title: 'Getting Started with Riseup-Connect',
      description: 'Learn how to set up your account and start connecting',
      category: 'Riseup-Connect',
    },
    {
      title: 'AI Tools Guide',
      description: 'Complete guide to using Riseup-AI features',
      category: 'Riseup-AI',
    },
    {
      title: 'Learning Platform Tutorial',
      description: 'How to make the most of Riseup-Learn',
      category: 'Riseup-Learn',
    },
    {
      title: 'Cloud Storage Setup',
      description: 'Setting up and using Riseup-Drive',
      category: 'Riseup-Drive',
    },
  ]

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'You can create an account by downloading any of our apps and following the sign-up process. All Riseup-Tech apps use a unified account system.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we use industry-standard encryption and security practices to protect your data. Read our Privacy Policy for more details.',
    },
    {
      question: 'When will Riseup-Connect launch?',
      answer: 'Riseup-Connect is scheduled to launch on Mangsir 1, 2082. Stay tuned for updates!',
    },
    {
      question: 'Can I use multiple Riseup apps with one account?',
      answer: 'Yes, our ecosystem is designed to work seamlessly together with a single account across all platforms.',
    },
  ]

  return (
    <AnimatedBackground>
      <SEO
        title="Riseup-Tech Help & Support - Documentation, FAQs & Contact"
        description="Find answers, guides, and resources for all Riseup-Tech products. Access documentation, FAQs, and contact our support team."
        keywords="Riseup-Tech Help, Support, Documentation, FAQs, Contact Support, Riseup-Connect Help, Riseup-AI Support"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6">
            Help & <span className="gradient-text">Support</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Find answers, guides, and resources for all Riseup-Tech products.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search help articles, documentation, and FAQs..."
                className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'docs', label: 'Documentation', icon: Book },
            { id: 'faq', label: 'FAQs', icon: HelpCircle },
            { id: 'terms', label: 'Terms of Service', icon: FileText },
            { id: 'privacy', label: 'Privacy Policy', icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-white/50 dark:bg-black/20 text-gray-700 dark:text-gray-300 hover:bg-primary/10'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'docs' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-8">Documentation</h2>
              {docs.map((doc, index) => (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 cursor-pointer hover:shadow-lg transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <Book className="text-primary mt-1 flex-shrink-0" size={24} />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {doc.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {doc.description}
                      </p>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        {doc.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'terms' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose dark:prose-invert max-w-none"
            >
              <h2>Terms of Service</h2>
              <p><strong>Last updated: October 16, 2025</strong></p>
              
              <h3>1. Acceptance of Terms</h3>
              <p>
                By accessing and using Riseup-Tech products and services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h3>2. Use License</h3>
              <p>
                Permission is granted to temporarily use Riseup-Tech services for personal, non-commercial transitory viewing only.
              </p>

              <h3>3. User Account</h3>
              <p>
                You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.
              </p>

              <h3>4. Intellectual Property</h3>
              <p>
                All content included on this site, such as text, graphics, logos, images, and software, is the property of Riseup-Tech.
              </p>

              <h3>5. Termination</h3>
              <p>
                We may terminate or suspend access to our services immediately, without prior notice, for any reason whatsoever.
              </p>
            </motion.div>
          )}

          {activeTab === 'privacy' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose dark:prose-invert max-w-none"
            >
              <h2>Privacy Policy</h2>
              <p><strong>Last updated: October 16, 2025</strong></p>

              <h3>1. Information We Collect</h3>
              <p>
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us.
              </p>

              <h3>2. How We Use Your Information</h3>
              <p>
                We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Riseup-Tech and our users.
              </p>

              <h3>3. Information Sharing</h3>
              <p>
                We do not share personal information with companies, organizations, or individuals outside of Riseup-Tech except in certain circumstances.
              </p>

              <h3>4. Data Security</h3>
              <p>
                We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.
              </p>

              <h3>5. Your Rights</h3>
              <p>
                You have the right to access, correct, or delete your personal information. You can also object to our use of your information.
              </p>
            </motion.div>
          )}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16 p-8 glass-card max-w-2xl mx-auto"
        >
          <Mail className="mx-auto mb-4 text-primary" size={48} />
          <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our support team is here to help you with any questions or issues.
          </p>
          <a
            href="mailto:riseuptech2025@gmail.com"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Mail size={20} />
            <span>Contact Support</span>
          </a>
        </motion.div>
      </div>
    </AnimatedBackground>
  )
}

export default HelpSupport