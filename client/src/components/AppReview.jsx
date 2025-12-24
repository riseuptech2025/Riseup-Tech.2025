import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Send, CheckCircle } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import { ContinuousSection, GlassPanel, GradientText } from './SharedStyles'

const AppReview = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [formData, setFormData] = useState({
    app: '', // Make sure this is included
    name: '',
    email: '',
    review: '',
  })

  const apps = [
    'School Management System',
    'Library Management System',
    'Office Management System',
    'Other'
  ]

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all required fields
    if (!formData.app || !formData.name || !formData.email || !formData.review || rating === 0) {
      alert('Please fill all required fields and select a rating')
      return
    }

    const reviewData = {
      app: formData.app,
      name: formData.name,
      email: formData.email,
      review: formData.review,
      rating: rating
    }

    try {
      const response = await fetch('https://riseup-tech-2025-1.onrender.com/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Show validation errors if any
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(err => `${err.field}: ${err.message}`).join('\n');
          throw new Error(errorMessages);
        }
        throw new Error(data.message || 'Failed to submit review');
      }

      // Also save to localStorage as fallback
      const existingReviews = JSON.parse(localStorage.getItem('riseupTech_reviews') || '[]')
      const updatedReviews = [...existingReviews, {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...reviewData
      }]
      localStorage.setItem('riseupTech_reviews', JSON.stringify(updatedReviews))

      setIsSubmitted(true);
      
      // Reset form
      setRating(0);
      setFormData({
        app: '',
        name: '',
        email: '',
        review: '',
      });
      
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(error.message || 'Failed to submit review. Please try again.');
    }
  }

  if (isSubmitted) {
    return (
      <AnimatedBackground>
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <GlassPanel className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mb-6"
              >
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white dark:text-white mb-4">
                Review Submitted!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Thank you for your feedback. We appreciate you helping us improve our products.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary"
              >
                Submit Another Review
              </button>
            </GlassPanel>
          </div>
        </div>
      </AnimatedBackground>
    )
  }

  return (
    <AnimatedBackground>
      <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassPanel className="p-8">
              <h1 className="text-3xl font-bold text-white dark:text-white mb-2">
                Share Your <GradientText>Experience</GradientText>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                We value your feedback. Tell us about your experience with our apps.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* App Selection Field - ADD THIS */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select App *
                  </label>
                  <select
                    name="app"
                    required
                    value={formData.app}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Choose an app...</option>
                    {apps.map((app) => (
                      <option key={app} value={app}>
                        {app}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-500 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Rating *
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          size={32}
                          className={`${
                            star <= (hoverRating || rating)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white dark:text-gray-300 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    name="review"
                    required
                    rows={6}
                    value={formData.review}
                    onChange={handleChange}
                    placeholder="What do you like about the app? What could be improved?"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={rating === 0 || !formData.app}
                  className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Submit Review</span>
                </button>
              </form>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  )
}

export default AppReview