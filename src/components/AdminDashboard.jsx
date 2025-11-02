// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Users, 
  MessageSquare, 
  Mail, 
  FileText, 
  BarChart3,
  Eye,
  Edit,
  Save,
  X,
  LogOut,
  Shield
} from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [websiteData, setWebsiteData] = useState({})
  const [reviews, setReviews] = useState([])
  const [contacts, setContacts] = useState([])
  const [users, setUsers] = useState([])

  // Load data from localStorage on component mount
  useEffect(() => {
    loadWebsiteData()
    loadReviews()
    loadContacts()
    loadUsers()
  }, [])

  const loadWebsiteData = () => {
    const savedData = localStorage.getItem('riseupTech_websiteData')
    if (savedData) {
      setWebsiteData(JSON.parse(savedData))
    } else {
      // Initialize with default data
      const defaultData = {
        company: {
          name: 'Riseup-Tech',
          email: 'riseuptech2025@gmail.com',
          phone: '+977-9827399860',
          address: 'Basundhara-7, Kathmandu, Nepal',
          registeredOffice: 'Tilathi-Koiladi Rural Municipality-2, Launiya, Saptari, Nepal'
        },
        hero: {
          title: "Let's Rise Together with Technology",
          subtitle: "Building the future of AI, connection, and innovation. We create intelligent platforms that empower people and transform industries worldwide.",
          badge: "Building the Future of AI & Innovation"
        },
        about: {
          mission: "To rise up technology and innovation in Nepal by building smart, user-friendly digital solutions that empower individuals.",
          vision: "Create a fully interconnected ecosystem of apps and AI-driven platforms for seamless digital experiences.",
          approach: "We don't sell technology - we create it for people, enabling growth, learning, and innovation."
        },
        social: {
          facebook: 'https://www.facebook.com/riseup.tech.2082',
          twitter: 'https://x.com/csit_ramanand',
          instagram: 'https://www.instagram.com/riseup__tech/',
          linkedin: 'https://www.linkedin.com/company/riseup-tech-2025'
        }
      }
      setWebsiteData(defaultData)
      localStorage.setItem('riseupTech_websiteData', JSON.stringify(defaultData))
    }
  }

  const loadReviews = () => {
    const savedReviews = localStorage.getItem('riseupTech_reviews') || '[]'
    setReviews(JSON.parse(savedReviews))
  }

  const loadContacts = () => {
    const savedContacts = localStorage.getItem('riseupTech_contacts') || '[]'
    setContacts(JSON.parse(savedContacts))
  }

  const loadUsers = () => {
    const savedUsers = localStorage.getItem('riseupTech_users') || '[]'
    setUsers(JSON.parse(savedUsers))
  }

  const saveWebsiteData = () => {
    localStorage.setItem('riseupTech_websiteData', JSON.stringify(websiteData))
    setIsEditing(false)
    // Trigger a custom event to notify other components about the update
    window.dispatchEvent(new Event('websiteDataUpdated'))
  }

  const deleteReview = (reviewId) => {
    const updatedReviews = reviews.filter(review => review.id !== reviewId)
    setReviews(updatedReviews)
    localStorage.setItem('riseupTech_reviews', JSON.stringify(updatedReviews))
  }

  const deleteContact = (contactId) => {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId)
    setContacts(updatedContacts)
    localStorage.setItem('riseupTech_contacts', JSON.stringify(updatedContacts))
  }

  const updateField = (section, field, value) => {
    setWebsiteData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'content', label: 'Website Content', icon: Edit },
    { id: 'reviews', label: 'User Reviews', icon: MessageSquare },
    { id: 'contacts', label: 'Contact Forms', icon: Mail },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <AnimatedBackground>
      <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Admin <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-gray-400">Manage your website content and user data</p>
            </div>
            <div className="flex items-center space-x-4">
              {isEditing && (
                <>
                  <button
                    onClick={saveWebsiteData}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save size={20} />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <X size={20} />
                    <span>Cancel</span>
                  </button>
                </>
              )}
              {!isEditing && activeTab === 'content' && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Edit size={20} />
                  <span>Edit Content</span>
                </button>
              )}
              <button className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="glass-card mb-8">
            <div className="flex space-x-1 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="glass-card p-6">
            {activeTab === 'overview' && <OverviewTab data={{ reviews, contacts, users }} />}
            {activeTab === 'content' && (
              <ContentTab 
                data={websiteData} 
                isEditing={isEditing}
                onUpdate={updateField}
              />
            )}
            {activeTab === 'reviews' && (
              <ReviewsTab reviews={reviews} onDelete={deleteReview} />
            )}
            {activeTab === 'contacts' && (
              <ContactsTab contacts={contacts} onDelete={deleteContact} />
            )}
            {activeTab === 'users' && <UsersTab users={users} />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </AnimatedBackground>
  )
}

// Overview Tab Component
const OverviewTab = ({ data }) => {
  const stats = [
    { label: 'Total Reviews', value: data.reviews.length, color: 'from-blue-500 to-cyan-500' },
    { label: 'Contact Forms', value: data.contacts.length, color: 'from-green-500 to-emerald-500' },
    { label: 'Registered Users', value: data.users.length, color: 'from-purple-500 to-pink-500' },
    { label: 'Avg. Rating', value: '4.8', color: 'from-orange-500 to-red-500' }
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${stat.color} p-6 rounded-2xl text-white`}
          >
            <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
            <p className="text-blue-100">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Reviews</h3>
          <div className="space-y-4">
            {data.reviews.slice(0, 3).map((review) => (
              <div key={review.id} className="border-b border-gray-700 pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{review.app}</h4>
                  <span className="text-yellow-400">⭐ {review.rating}/5</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">{review.review}</p>
                <p className="text-gray-500 text-xs mt-2">By {review.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Contacts</h3>
          <div className="space-y-4">
            {data.contacts.slice(0, 3).map((contact) => (
              <div key={contact.id} className="border-b border-gray-700 pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{contact.name}</h4>
                  <span className="text-primary text-sm">{contact.interest}</span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">{contact.message}</p>
                <p className="text-gray-500 text-xs mt-2">{contact.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Content Tab Component
const ContentTab = ({ data, isEditing, onUpdate }) => {
  const sections = [
    {
      title: 'Company Information',
      fields: [
        { key: 'name', label: 'Company Name', section: 'company' },
        { key: 'email', label: 'Email', section: 'company' },
        { key: 'phone', label: 'Phone', section: 'company' },
        { key: 'address', label: 'Headquarters Address', section: 'company' },
        { key: 'registeredOffice', label: 'Registered Office', section: 'company' }
      ]
    },
    {
      title: 'Hero Section',
      fields: [
        { key: 'title', label: 'Main Title', section: 'hero', type: 'textarea' },
        { key: 'subtitle', label: 'Subtitle', section: 'hero', type: 'textarea' },
        { key: 'badge', label: 'Badge Text', section: 'hero' }
      ]
    },
    {
      title: 'About Section',
      fields: [
        { key: 'mission', label: 'Mission', section: 'about', type: 'textarea' },
        { key: 'vision', label: 'Vision', section: 'about', type: 'textarea' },
        { key: 'approach', label: 'Approach', section: 'about', type: 'textarea' }
      ]
    },
    {
      title: 'Social Links',
      fields: [
        { key: 'facebook', label: 'Facebook URL', section: 'social' },
        { key: 'twitter', label: 'Twitter URL', section: 'social' },
        { key: 'instagram', label: 'Instagram URL', section: 'social' },
        { key: 'linkedin', label: 'LinkedIn URL', section: 'social' }
      ]
    }
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Website Content Management</h2>
      
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={data[field.section]?.[field.key] || ''}
                      onChange={(e) => onUpdate(field.section, field.key, e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-dark-card text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      rows="3"
                    />
                  ) : (
                    <input
                      type="text"
                      value={data[field.section]?.[field.key] || ''}
                      onChange={(e) => onUpdate(field.section, field.key, e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-dark-card text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Reviews Tab Component
const ReviewsTab = ({ reviews, onDelete }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">User Reviews ({reviews.length})</h2>
      
      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-400">No reviews yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border border-gray-700 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{review.app}</h3>
                  <p className="text-gray-400">By {review.name} ({review.email})</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-yellow-400 flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{review.rating}/5</span>
                  </div>
                  <button
                    onClick={() => onDelete(review.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{review.review}</p>
              <div className="text-sm text-gray-500">
                Submitted on {new Date(review.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Contacts Tab Component
const ContactsTab = ({ contacts, onDelete }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Contact Forms ({contacts.length})</h2>
      
      {contacts.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-400">No contact forms yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="border border-gray-700 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                  <p className="text-gray-400">{contact.email} • {contact.phone}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                    {contact.interest}
                  </span>
                  <button
                    onClick={() => onDelete(contact.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              <h4 className="text-white font-medium mb-2">{contact.subject}</h4>
              <p className="text-gray-300 mb-4">{contact.message}</p>
              <div className="text-sm text-gray-500">
                Submitted on {new Date(contact.timestamp).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Users Tab Component
const UsersTab = ({ users }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Registered Users ({users.length})</h2>
      
      {users.length === 0 ? (
        <div className="text-center py-12">
          <Users className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-400">No registered users yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 text-gray-400">Name</th>
                <th className="text-left py-3 text-gray-400">Email</th>
                <th className="text-left py-3 text-gray-400">Phone</th>
                <th className="text-left py-3 text-gray-400">Registered</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800">
                  <td className="py-3 text-white">{user.name}</td>
                  <td className="py-3 text-gray-400">{user.email}</td>
                  <td className="py-3 text-gray-400">{user.phone}</td>
                  <td className="py-3 text-gray-400">
                    {new Date(user.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// Settings Tab Component
const SettingsTab = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Admin Settings</h2>
      
      <div className="space-y-6">
        <div className="border border-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Export Data</h3>
          <div className="flex space-x-4">
            <button className="btn-primary">Export Reviews</button>
            <button className="btn-primary">Export Contacts</button>
            <button className="btn-primary">Export Users</button>
          </div>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Backup & Restore</h3>
          <div className="flex space-x-4">
            <button className="btn-primary">Backup All Data</button>
            <button className="btn-secondary">Restore Backup</button>
          </div>
        </div>

        <div className="border border-gray-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Danger Zone</h3>
          <div className="space-y-4">
            <button className="w-full bg-red-500/20 text-red-400 py-3 rounded-lg hover:bg-red-500/30 transition-colors">
              Clear All Reviews
            </button>
            <button className="w-full bg-red-500/20 text-red-400 py-3 rounded-lg hover:bg-red-500/30 transition-colors">
              Clear All Contacts
            </button>
            <button className="w-full bg-red-500/20 text-red-400 py-3 rounded-lg hover:bg-red-500/30 transition-colors">
              Reset Website Content
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard