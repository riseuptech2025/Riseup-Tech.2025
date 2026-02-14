import React from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Heart, Calendar, Users, Award, Cpu, Globe, Shield, Code, Zap, BookOpen, Rocket, Briefcase, BarChart } from 'lucide-react'
import AnimatedBackground from '../components/AnimatedBackground'
import { ContinuousSection, ContinuousCard, GradientText, GlassPanel } from '../components/SharedStyles'
import SEO from '../components/SEO'

// Import the images
import RamanandMandalImage from '../assets/members/ramanand.png'
import DipakKumarMandalKhatweImage from '../assets/members/dipak.jpeg'
// import GajanandMandalImage from '../assets/members/gajanand.jpg'
// Note: You'll need to add these images to your assets folder
import PlaceholderImage1 from '../assets/members/sarik.jpeg'
import PlaceholderImage2 from '../assets/members/ujjwal.jpeg'
import PlaceholderImage3 from '../assets/members/dhiraj.jpeg'
import PlaceholderImage4 from '../assets/members/swarnim.jpeg'

const About = () => {
  const timeline = [
    { year: '2025', title: 'Company Founded', description: 'Riseup-Tech was established with a vision to transform technology in Nepal and build an integrated digital ecosystem.' },
    { year: '2026', title: 'Core Platform Launch', description: 'School Management System, Student Information System, and Teacher Management System were launched, setting the foundation for Riseup-Tech' },
    { year: '2027', title: 'Ecosystem Expansion', description: 'Launch of Riseup-Learn, Riseup-Drive, and additional AI-powered tools.' },
    { year: '2028', title: 'Platform Maturity', description: 'Full ecosystem integration with unified Riseup Account across all services.' },
  ]

  const values = [
    { icon: Cpu, title: 'Innovation', description: 'Building next-generation digital solutions and AI-driven platforms.' },
    { icon: Users, title: 'Empowerment', description: 'Technology that educates, connects, and enables user growth.' },
    { icon: Shield, title: 'Integrity', description: 'Transparent, ethical, and user-first approach in everything we do.' },
    { icon: Globe, title: 'Community', description: 'Fostering collaboration and digital learning communities.' },
  ]

  const leadership = [
    {
      name: 'Ramanand Mandal',
      position: 'CEO & Founder',
      description: 'Visionary leader overseeing company strategy, product design, and ecosystem growth. Driving innovation in Nepal\'s tech landscape.',
      image: RamanandMandalImage,
      alt: 'Ramanand Mandal - CEO & Founder of Riseup-Tech',
      expertise: ['Strategic Leadership & Visionary Mindset', 'Product Design', 'Decision-Making & Problem-Solving', 'Business Development']
    },
    {
      name: 'Dipak Kumar Mandal Khatwe',
      position: 'COO & Co-Founder',
      description: 'Expert in AI and technology, leading the development of Riseup\'s cutting-edge solutions. Sustaining growth and scalability.',
      image: DipakKumarMandalKhatweImage,
      alt: 'Dipak Kumar Mandal Khatwe - COO & Co-Founder of Riseup-Tech',
      expertise: ['Cross-Functional Leadership', 'System Architecture', 'Data Analysis', 'Tech Strategy']
    },
    {
      name: 'Gajanand Mandal',
      position: 'HR Manager',
      description: 'Innovative tech leader, driving the development of Riseup\'s core technologies. Ensuring seamless integration and performance.',
      // image: GajanandMandalImage,
      alt: 'Gajanand Mandal - HR Manager',
      expertise: ['Strategic HR Planning', 'Performance & Development', 'Conflict Resolution & Negotiation', 'Employee Engagement & Retention']
    },
  ]

  // New team members
  const teamMembers = [
    {
      name: 'Sarik Adhikari',
      position: 'Head of Product',
      department: 'Product Management',
      description: 'Leading product strategy and user experience across all Riseup platforms. Passionate about creating intuitive digital solutions.',
      image: PlaceholderImage1,
      alt: 'Sarik Adhikari - Head of Product at Riseup-Tech',
      expertise: ['Product Strategy', 'Python', 'AI/ML', 'Data Science'],
      icon: Rocket,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      name: 'Ujjawal Shah',
      position: 'Lead AI Engineer',
      department: 'Engineering',
      description: 'Architecting AI-powered features for Riseup ecosystem. Specializes in machine learning and natural language processing.',
      image: PlaceholderImage2,
      alt: 'Ujjawal Shah - Lead AI Engineer at Riseup-Tech',
      expertise: ['Machine Learning', 'NLP', 'Python'],
      icon: Cpu,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Dhiraj Dahal',
      position: 'UI/UX , Mobile App Designer',
      department: 'Riseup-Learn',
      description: 'Designs intuitive, visually engaging, and user-centered digital experiences. Transforms complex ideas into simple, elegant interfaces by combining user research, usability principles, and modern design trends.',
      image: PlaceholderImage3,
      alt: 'Dhiraj Dahal - UI/UX Designer at Riseup-Tech',
      expertise: ['Figma Designing', 'Mobile App Designing', 'Website Designing'],
      icon: BookOpen,
      color: 'from-green-400 to-emerald-400'
    },
    {
      name: 'Swarnim Bastola',
      position: 'Lead Full Stack Developer',
      department: 'Engineering',
      description: 'Building scalable web applications and Mobile App Development. Leads the development of core platform features.',
      image: PlaceholderImage4,
      alt: 'Swarnim Bastola - Lead Full Stack Developer at Riseup-Tech',
      expertise: ['React', 'Node.js', 'UI/UX', 'Rapid Prototyping'],
      icon: Code,
      color: 'from-orange-400 to-red-400'
    }
  ]

  // Additional team members for future expansion
  const futureTeamMembers = [
    {
      name: 'Sunita Rai',
      position: 'Marketing Director',
      department: 'Marketing',
      description: 'Driving brand awareness and user acquisition across all Riseup products.',
      expertise: ['Digital Marketing', 'Brand Strategy', 'Growth Hacking'],
      icon: BarChart,
      color: 'from-yellow-400 to-orange-400'
    },
    {
      name: 'Bikram Gurung',
      position: 'DevOps Lead',
      department: 'Infrastructure',
      description: 'Ensuring platform reliability and scalability through robust infrastructure.',
      expertise: ['Cloud Infrastructure', 'CI/CD', 'System Security'],
      icon: Shield,
      color: 'from-indigo-500 to-blue-500'
    }
  ]

  const locations = [
    {
      type: 'Headquarters',
      address: 'Basundhara, Kathmandu, Nepal',
      description: 'Main operational center with development labs and innovation facilities'
    },
    {
      type: 'Registered Office', 
      address: 'Tilathi-Koiladi Rural Municipality-2, Launiya, Saptari, Nepal',
      description: 'Official registered location supporting regional operations'
    },
    {
      type: 'Branch Office',
      address: 'Biratnagar, Morang, Nepal',
      description: 'Expanding our presence in Eastern Nepal to better serve our users '
    }
  ]

  return (
    <AnimatedBackground>
       <SEO 
        title="About Riseup-Tech - Our Mission, Vision & Team"
        description="Learn about Riseup-Tech's mission to revolutionize technology in Nepal. Discover our vision for AI-powered digital ecosystems and meet our leadership team."
        keywords="About Riseup-Tech, Nepal Tech Company, AI Innovation, Company Mission, Technology Vision"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 py-24">

        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About <GradientText>Riseup-Tech</GradientText></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're building Nepal's next big tech ecosystem - creating innovative digital products that empower people to learn, innovate, and connect in a seamless digital world.
          </p>
        </motion.div>

        {/* Mission / Vision / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { 
              icon: Target, 
              title: 'Mission', 
              description: 'To rise up technology and innovation in Nepal by building smart, user-friendly digital solutions that empower individuals.', 
              color: 'from-blue-500 to-cyan-400' 
            },
            { 
              icon: Eye, 
              title: 'Vision', 
              description: 'Create a fully interconnected ecosystem of apps and AI-driven platforms for seamless digital experiences.', 
              color: 'from-purple-500 to-pink-500' 
            },
            { 
              icon: Heart, 
              title: 'Approach', 
              description: 'We don\'t sell technology - we create it for people, enabling growth, learning, and innovation.', 
              color: 'from-green-400 to-emerald-400' 
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <GlassPanel className="h-full transition-all hover:translate-y-[-4px]">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${item.color} mb-6`}>
                  <item.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* Core Values */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-12 gradient-text">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-gray-700/20 backdrop-blur-md cursor-pointer hover:shadow-lg"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-primary to-secondary mb-4 text-white">
                  <value.icon size={24} />
                </div>
                <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leadership Section */}
<div className="text-center">
  <h2 className="text-4xl font-bold mb-12 gradient-text">
    Founders & Leadership
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {leadership.map((leader, index) => (
      <motion.div
        key={leader.name}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -6 }}
        className="p-8 rounded-3xl border border-gray-700/20 backdrop-blur-md 
                   text-center hover:shadow-2xl transition-all duration-300"
      >
        {/* Profile Image */}
        <div className="w-36 h-36 mx-auto mb-6">
          <motion.img
            src={leader.image}
            alt={leader.alt}
            className="w-full h-full object-cover rounded-full 
                       border-4 border-transparent 
                       bg-gradient-to-r from-primary to-secondary p-1"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>

        {/* Name & Role */}
        <h3 className="text-2xl font-bold text-primary mb-1">
          {leader.name}
        </h3>
        <p className="text-lg text-gray-300 mb-3">
          {leader.position}
        </p>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4">
          {leader.description}
        </p>

        {/* Expertise */}
        <div className="flex flex-wrap gap-2 justify-center">
          {leader.expertise.map(skill => (
            <span
              key={skill}
              className="px-3 py-1 text-xs rounded-full 
                         bg-gray-800/70 text-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    ))}
  </div>
</div>


        {/* Team Section - Core Team */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-12 gradient-text">Meet Our Team</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Passionate experts dedicated to building Nepal's most innovative tech ecosystem
          </p>
          
          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="p-6 rounded-3xl border border-gray-700/20 backdrop-blur-md text-center hover:shadow-2xl transition-all duration-300">
                  {/* Member Image */}
                  <div className="relative mb-6">
                    <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${member.color} p-1`}>
                      <img
                        src={member.image}
                        alt={member.alt}
                        className="w-full h-full object-cover rounded-full border-2 border-gray-800"
                      />
                    </div>
                    
                    {/* Department Icon */}
                    <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center text-white shadow-lg`}>
                      <member.icon size={18} />
                    </div>
                  </div>

                  {/* Member Info */}
                  <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                  <p className="text-base text-gray-300 mb-1">{member.position}</p>
                  <p className="text-sm text-gray-400 mb-3">{member.department}</p>
                  
                  {/* Description (hidden on hover for cleaner look, can be toggled) */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                    {member.description}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((skill) => (
                      <span key={skill} className="px-2 py-1 text-xs rounded-full bg-gray-800/50 text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Team Members Preview */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Join Our Growing Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {futureTeamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-gray-700/20 backdrop-blur-md text-left hover:border-primary/50 transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center text-white mr-4`}>
                    <member.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-400">{member.position}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3">{member.description}</p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105">
              Join Our Team
            </button>
            <p className="text-sm text-gray-400 mt-4">
              We're always looking for passionate individuals to join our mission
            </p>
          </motion.div>
        </div>

        {/* Locations Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-12 gradient-text">Our Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-gray-700/20 backdrop-blur-md text-center"
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-primary to-secondary mb-4 text-white">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{location.type}</h3>
                <p className="text-gray-300 mb-3">{location.address}</p>
                <p className="text-gray-400 text-sm">{location.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto space-y-16">
          <h2 className="text-4xl font-bold text-center gradient-text mb-12">Our Journey</h2>

          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary -translate-x-1/2"></div>

          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex items-start"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                <Calendar className="text-white" size={24} />
              </div>
              <div className="ml-8 p-6 flex-1 rounded-3xl border border-gray-700/20 backdrop-blur-md">
                <div className="text-2xl font-bold text-primary mb-2">{item.year}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Unique Approach */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-8 gradient-text">Why We're Different</h2>
          <div className="max-w-4xl mx-auto">
            <GlassPanel className="p-8">
              <p className="text-lg text-gray-300 mb-4">
                Unlike traditional software companies, we operate our own digital products and services - we don't sell software to others.
              </p>
              <p className="text-gray-400">
                Our ecosystem-based approach focuses on education, creativity, and personal growth through AI-powered tools and community-driven platforms.
              </p>
            </GlassPanel>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center pt-16"
        >
          <h2 className="text-4xl font-bold mb-12 gradient-text">Building Nepal's Tech Future</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Custom Websites' },
              { number: '6+', label: 'Digital Products' },
              { number: '3', label: 'Strategic Locations' },
              { number: '8+', label: 'Team Members' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-3xl bg-gradient-to-r from-primary to-secondary text-center shadow-lg"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </AnimatedBackground>
  )
}

export default About