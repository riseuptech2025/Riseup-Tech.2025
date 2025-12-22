import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Send, Loader2, User, Mail, Phone, Briefcase, GraduationCap, 
  Check, ChevronLeft, ChevronRight, Camera, FileText, Award, 
  Upload, Image as ImageIcon 
} from 'lucide-react'

const membershipTypes = [
  { id: 'intern', label: 'Intern Member', description: 'Students or freshers undergoing training' },
  { id: 'associate', label: 'Associate Member', description: 'Junior-level contributors or trainees' },
  { id: 'professional', label: 'Professional Member', description: 'Full-time developers and professionals' },
  { id: 'other', label: 'Other', description: 'Specify your interest' }
]

const skillsList = [
  'React.js', 'Node.js', 'Python', 'UI/UX Design', 'Mobile Development',
  'DevOps', 'Machine Learning', 'Project Management', 'Digital Marketing',
  'Content Writing', 'Quality Assurance', 'Business Analysis'
]

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Education & Skills', icon: GraduationCap },
  { id: 3, title: 'Membership & Photo', icon: Camera },
  { id: 4, title: 'Motivation & Links', icon: FileText },
  { id: 5, title: 'Review & Submit', icon: Award }
]

const MembershipForm = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    
    // Step 2
    education: '',
    experience: '',
    skills: [],
    otherSkills: '',
    
    // Step 3
    membershipType: '',
    profilePhoto: null,
    photoPreview: '',
    
    // Step 4
    motivation: '',
    availability: '',
    linkedin: '',
    github: '',
    portfolio: '',
    
    // Additional
    resume: null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    
    if (type === 'file') {
      const file = files[0]
      if (file) {
        if (name === 'profilePhoto') {
          // Validate image file
          if (!file.type.startsWith('image/')) {
            setErrors(prev => ({ ...prev, profilePhoto: 'Please upload an image file' }))
            return
          }
          if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setErrors(prev => ({ ...prev, profilePhoto: 'Image size should be less than 5MB' }))
            return
          }
          
          const reader = new FileReader()
          reader.onloadend = () => {
            setFormData(prev => ({
              ...prev,
              [name]: file,
              photoPreview: reader.result
            }))
          }
          reader.readAsDataURL(file)
          
          // Clear error
          if (errors.profilePhoto) {
            setErrors(prev => ({ ...prev, profilePhoto: '' }))
          }
        } else {
          setFormData(prev => ({ ...prev, [name]: file }))
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      profilePhoto: null,
      photoPreview: ''
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}
    
    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format'
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
        break
        
      case 2:
        if (!formData.education.trim()) newErrors.education = 'Education information is required'
        break
        
      case 3:
        if (!formData.membershipType) newErrors.membershipType = 'Please select membership type'
        if (!formData.profilePhoto) newErrors.profilePhoto = 'Profile photo is required'
        break
        
      case 4:
        if (!formData.motivation.trim()) newErrors.motivation = 'Please tell us why you want to join'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(currentStep)) return
    
    setIsSubmitting(true)
    
    try {
      // In a real application, you would send this data to your backend
      // Create FormData for file upload
      const formDataToSend = new FormData()
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        if (key === 'profilePhoto' || key === 'resume') {
          if (formData[key]) {
            formDataToSend.append(key, formData[key])
          }
        } else if (Array.isArray(formData[key])) {
          formDataToSend.append(key, JSON.stringify(formData[key]))
        } else {
          formDataToSend.append(key, formData[key])
        }
      })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Form submitted with files:', formData)
      
      setIsSubmitted(true)
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          dateOfBirth: '',
          education: '',
          experience: '',
          skills: [],
          otherSkills: '',
          membershipType: '',
          profilePhoto: null,
          photoPreview: '',
          motivation: '',
          availability: '',
          linkedin: '',
          github: '',
          portfolio: '',
          resume: null
        })
        setCurrentStep(1)
      }, 3000)
      
    } catch (error) {
      console.error('Submission error:', error)
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <User size={24} />
                Personal Information
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please provide your basic information
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none`}
                  placeholder="+977 98XXXXXXXX"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <GraduationCap size={24} />
                Education & Skills
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your background and expertise
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Education / Qualifications *
              </label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                rows="3"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.education ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none`}
                placeholder="Your educational background, degrees, certifications..."
              />
              {errors.education && (
                <p className="text-red-500 text-sm mt-1">{errors.education}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Previous Experience (if any)
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="Describe your previous work experience, projects, internships..."
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select your skills:
              </label>
              <div className="flex flex-wrap gap-2">
                {skillsList.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      formData.skills.includes(skill)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Other Skills (comma separated)
                </label>
                <input
                  type="text"
                  name="otherSkills"
                  value={formData.otherSkills}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="e.g., Figma, AWS, MongoDB"
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <Camera size={24} />
                Membership & Profile Photo
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose your membership type and upload a profile photo
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <Briefcase size={20} />
                Membership Type *
              </h4>
              {errors.membershipType && (
                <p className="text-red-500 text-sm">{errors.membershipType}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {membershipTypes.map(type => (
                  <label
                    key={type.id}
                    className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      formData.membershipType === type.id
                        ? 'border-primary bg-primary/10 dark:bg-primary/20'
                        : 'border-gray-300 dark:border-gray-700 hover:border-primary/50 bg-white dark:bg-gray-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="membershipType"
                      value={type.id}
                      checked={formData.membershipType === type.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="font-medium text-gray-900 dark:text-white">{type.label}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {type.description}
                    </div>
                    {formData.membershipType === type.id && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <ImageIcon size={20} />
                Profile Photo *
              </h4>
              
              <div className="space-y-4">
                {formData.photoPreview ? (
                  <div className="space-y-3">
                    <div className="relative w-32 h-32 mx-auto">
                      <img
                        src={formData.photoPreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-center text-sm text-green-600 dark:text-green-400">
                      ✓ Photo uploaded successfully
                    </p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      Upload a clear profile photo (max 5MB)
                    </p>
                    <label className="cursor-pointer">
                      <div className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                        <Camera size={20} />
                        Choose Photo
                      </div>
                      <input
                        type="file"
                        name="profilePhoto"
                        onChange={handleChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
                
                {errors.profilePhoto && (
                  <p className="text-red-500 text-sm text-center">{errors.profilePhoto}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Resume / CV (Optional)
                </label>
                <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
                  <label className="cursor-pointer flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-gray-400" />
                      <div>
                        <p className="text-gray-900 dark:text-white">
                          {formData.resume ? formData.resume.name : 'Upload your resume'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          PDF, DOC, DOCX (max 10MB)
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                      Browse
                    </div>
                    <input
                      type="file"
                      name="resume"
                      onChange={handleChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <FileText size={24} />
                Motivation & Links
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us why you want to join and share your online presence
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Why do you want to join Riseup-Tech? *
              </label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                rows="4"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.motivation ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none`}
                placeholder="Tell us about your motivation, goals, and what you hope to achieve with Riseup-Tech..."
              />
              {errors.motivation && (
                <p className="text-red-500 text-sm mt-1">{errors.motivation}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Availability (Hours per week)
              </label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                placeholder="e.g., 20 hours/week, Full-time, Weekends only"
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Online Profiles</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    placeholder="https://github.com/username"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Portfolio / Website
                  </label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <Award size={24} />
                Review Your Application
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please review all information before submitting
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Personal Info Summary */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Personal Information</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Name:</span>
                    <p className="font-medium">{formData.fullName || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Email:</span>
                    <p className="font-medium">{formData.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                    <p className="font-medium">{formData.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Date of Birth:</span>
                    <p className="font-medium">{formData.dateOfBirth || 'Not provided'}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500 dark:text-gray-400">Address:</span>
                    <p className="font-medium">{formData.address || 'Not provided'}</p>
                  </div>
                </div>
              </div>
              
              {/* Education & Skills Summary */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Education & Skills</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Education:</span>
                    <p className="font-medium">{formData.education || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Experience:</span>
                    <p className="font-medium">{formData.experience || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                      {formData.otherSkills && (
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                          {formData.otherSkills}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Membership & Photo Summary */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Membership & Files</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Membership Type:</span>
                    <p className="font-medium">
                      {membershipTypes.find(t => t.id === formData.membershipType)?.label || 'Not selected'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Profile Photo:</span>
                    <p className="font-medium">
                      {formData.profilePhoto ? '✓ Uploaded' : 'Not uploaded'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Resume:</span>
                    <p className="font-medium">
                      {formData.resume ? formData.resume.name : 'Not uploaded'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Motivation & Links Summary */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Motivation & Links</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Motivation:</span>
                    <p className="font-medium">{formData.motivation || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Availability:</span>
                    <p className="font-medium">{formData.availability || 'Not specified'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">LinkedIn:</span>
                      <p className="font-medium truncate">{formData.linkedin || 'Not provided'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">GitHub:</span>
                      <p className="font-medium truncate">{formData.github || 'Not provided'}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500 dark:text-gray-400">Portfolio:</span>
                      <p className="font-medium truncate">{formData.portfolio || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        <div className="absolute inset-0 bg-black/70" onClick={onClose} />
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-green-600 dark:text-green-400" size={32} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your interest in joining Riseup-Tech. We'll review your application and get back to you soon.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
    >
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <motion.div
        initial={{ y: 20, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        className="relative bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-white dark:bg-gray-900 py-2 z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Membership Application</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Step {currentStep} of {steps.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep
              
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-primary text-white scale-110' 
                      : isCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <Check size={20} />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    isActive 
                      ? 'text-primary' 
                      : isCompleted 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 mt-6 border-t border-gray-300 dark:border-gray-700">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Next
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            Step {currentStep} of {steps.length}
          </p>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default MembershipForm