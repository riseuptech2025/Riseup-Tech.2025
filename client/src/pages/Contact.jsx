// Contact.jsx - Fixed and Clean Version
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, MessageCircle, Briefcase } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'
import { useWebsiteData } from '../hooks/useWebsiteData'
import SEO from '../components/SEO'

const Contact = () => {
  const websiteData = useWebsiteData()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    interest: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // ✅ CORRECTED: Single handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('https://riseup-tech-2025-moph.vercel.app/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          interest: ''
        })

        alert(
          'Thank you for your message! We will get back to you soon. Please check your email for confirmation.'
        )
      } else {
        if (result.errors) {
          const errorMessages = result.errors.map(err => err.msg).join('\n')
          alert(`Please fix the following errors:\n${errorMessages}`)
        } else {
          alert(result.message || 'Failed to submit form')
        }
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Network error. Please try again later.')
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'riseuptech2025@gmail.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+977-9827399860',
      description: 'Mon to Fri, 9AM to 6PM'
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      details: 'Basundhara-7, Kathmandu',
      description: 'Nepal'
    },
    {
      icon: MapPin,
      title: 'Registered Office',
      details: 'Tilathi-Koiladi, Saptari',
      description: 'Nepal'
    }
  ]

  const interestOptions = [
    'General Inquiry',
    'Product Development',
    'Partnership Opportunity',
    'Career Opportunities',
    'Technical Support',
    'Investment Inquiry'
  ]

  return (
    <AnimatedBackground>
      <SEO 
        title="Contact Riseup-Tech - Get in Touch with Us"
        description="Have questions or want to collaborate? Contact Riseup-Tech for inquiries about our AI products, partnerships, careers, and more."
        keywords="Contact Riseup-Tech, AI Inquiries, Technology Collaboration, Careers at Riseup-Tech, Partnership Opportunities"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Ready to collaborate or learn more about our ecosystem? We'd love to hear from you. 
            Reach out and let's build the future together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6 gradient-text">Let's Start a Conversation</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Whether you're interested in our products, want to collaborate, or just have questions 
                about what we're building, we're here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-primary to-secondary mb-4">
                    <item.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-white dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white dark:text-white font-medium mb-1">
                    {item.details}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold text-white dark:text-white mb-4">
                About Riseup-Tech
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <p><strong>Founded:</strong> October 16, 2025</p>
                <p><strong>Company Type:</strong> Private Technology & Software Development</p>
                <p><strong>Core Focus:</strong> Building integrated digital ecosystems</p>
                <p><strong>Mission:</strong> Empowering through technology and innovation</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Area of Interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="">Select an option</option>
                  {interestOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                  <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-white dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
              >
                <Send size={20} />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-8 gradient-text">Other Ways to Connect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-6">
              <MessageCircle className="text-primary mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Join Our Community</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with other developers, students, and innovators in our growing community.
              </p>
            </div>
            <div className="glass-card p-6">
              <Briefcase className="text-secondary mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-3">Partnership Opportunities</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Interested in collaborating? We're always open to discussing partnership opportunities.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedBackground>
  )
}

export default Contact