import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Clock, DollarSign, Users, Rocket, BookOpen } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'
import SEO from '../components/SEO'

const Careers = () => {
  const jobOpenings = [
    {
      id: 'frontend-developer',
      title: 'Frontend Developer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Kathmandu, Nepal',
      salary: 'Competitive',
      description: 'Build beautiful, responsive user interfaces using React, Vite, and Tailwind CSS.',
      requirements: ['3+ years React experience', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      id: 'ai-researcher',
      title: 'AI Researcher',
      department: 'Research & Development',
      type: 'Full-time',
      location: 'Remote',
      salary: 'Competitive',
      description: 'Research and develop cutting-edge AI models and algorithms.',
      requirements: ['PhD in ML/AI', 'Python', 'TensorFlow/PyTorch', 'Research publications'],
    },
    {
      id: 'ui-ux-designer',
      title: 'UI/UX Designer',
      department: 'Design',
      type: 'Full-time',
      location: 'Kathmandu, Nepal',
      salary: 'Competitive',
      description: 'Design intuitive and beautiful user experiences for our products.',
      requirements: ['5+ years design experience', 'Figma', 'User research', 'Prototyping'],
    },
    {
      id: 'backend-engineer',
      title: 'Backend Engineer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      salary: 'Competitive',
      description: 'Build scalable backend systems and APIs for our platforms.',
      requirements: ['Node.js/Python', 'PostgreSQL', 'AWS/GCP', 'System design'],
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      department: 'Engineering',
      type: 'Full-time',
      location: 'Remote',
      salary: 'Competitive',
      description: 'Manage infrastructure and ensure smooth deployment and scaling.',
      requirements: ['Docker/Kubernetes', 'CI/CD', 'Monitoring', 'Cloud infrastructure'],
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      department: 'Product',
      type: 'Full-time',
      location: 'Kathmandu, Nepal',
      salary: 'Competitive',
      description: 'Lead product development and strategy for our AI tools.',
      requirements: ['Product management', 'Agile methodology', 'Data analysis', 'User research'],
    },
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Industry-leading compensation package',
    },
    {
      icon: Users,
      title: 'Great Team',
      description: 'Work with talented, passionate people',
    },
    {
      icon: Rocket,
      title: 'Growth Opportunities',
      description: 'Rapid career advancement and learning',
    },
    {
      icon: BookOpen,
      title: 'Learning Budget',
      description: 'Annual budget for courses and conferences',
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Work when you\'re most productive',
    },
    {
      icon: MapPin,
      title: 'Remote Friendly',
      description: 'Work from anywhere in the world',
    },
  ]

  return (
    <AnimatedBackground>
      <SEO 
        title="Careers at Riseup-Tech - Join Our Innovative Team"
        description="Explore exciting career opportunities at Riseup-Tech. Join us in building the future of AI and technology in Nepal and beyond."
        keywords="Riseup-Tech Careers, Jobs in Nepal, AI Jobs, Technology Careers, Join Riseup-Tech"
      />
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Join Our <span className="gradient-text">Mission</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Help us build the future of AI and technology. Your work will impact millions of users worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="#openings" className="btn-primary">
                View Open Positions
              </Link>
              <button className="btn-secondary">
                Learn About Culture
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white/50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              Why <span className="gradient-text">Riseup-Tech</span>?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              We take care of our team with amazing benefits and a great work environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-6 text-center"
              >
                <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-primary to-secondary mb-4">
                  <benefit.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="openings" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">
              Open <span className="gradient-text">Positions</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Find your perfect role and help us shape the future.
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <Clock size={16} />
                        <span>{job.type}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <DollarSign size={16} />
                        <span>{job.salary}</span>
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.slice(0, 3).map((req, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {req}
                        </span>
                      ))}
                      {job.requirements.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full">
                          +{job.requirements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <Link
                      to={`/careers/apply/${job.id}`}
                      className="btn-primary whitespace-nowrap"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedBackground>
  )
}

export default Careers