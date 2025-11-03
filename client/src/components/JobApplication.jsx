import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import { ContinuousSection, GlassPanel, GradientText } from './SharedStyles'

const JobApplication = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: jobId || '',
    coverLetter: '',
    resume: null,
  })

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'resume') {
      setFormData(prev => ({ ...prev, resume: files[0] }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  // Update your JobApplication.jsx form submission handler
const handleSubmit = (e) => {
  e.preventDefault()
  
  const applicationData = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...formData
  }

  // Save to localStorage
  const existingApplications = JSON.parse(localStorage.getItem('riseupTech_applications') || '[]')
  const updatedApplications = [...existingApplications, applicationData]
  localStorage.setItem('riseupTech_applications', JSON.stringify(updatedApplications))

  setIsSubmitted(true)
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
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Application Submitted!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Thank you for applying to Riseup-Tech. We'll review your application and get back to you soon.
              </p>
              <button
                onClick={() => navigate('/careers')}
                className="btn-primary"
              >
                Back to Careers
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
        <button
          onClick={() => navigate('/careers')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Careers</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassPanel className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Apply for <GradientText>{jobId ? jobId.replace(/-/g, ' ') : 'Position'}</GradientText>
            </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join our team and help build the future of technology.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  name="position"
                  required
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cover Letter *
              </label>
              <textarea
                name="coverLetter"
                required
                rows={6}
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-card focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Resume *
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-500" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formData.resume ? formData.resume.name : 'Click to upload your resume (PDF, DOC, DOCX)'}
                    </p>
                  </div>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-4"
            >
              Submit Application
            </button>
            </form>
          </GlassPanel>
        </motion.div>
      </div>
      </div>
    </AnimatedBackground>
  )
}

export default JobApplication