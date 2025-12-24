// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLogin from './AdminLogin'
import { 
  Star, LogOut, Download, Search, Trash2,
  Eye, CheckCircle, XCircle, RefreshCw, Home,
  Users, Mail, Briefcase, ChevronDown, ChevronUp,
  AlertCircle
} from 'lucide-react'

const API_BASE_URL = 'https://riseup-tech-2025-1.onrender.com/api'

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('reviews')
  const [reviews, setReviews] = useState([])
  const [jobApplications, setJobApplications] = useState([])
  const [contacts, setContacts] = useState([])
  const [memberships, setMemberships] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedRows, setExpandedRows] = useState({})
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuthenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      fetchAllData()
    }
  }, [])

  const fetchAllData = async () => {
    setLoading(true)
    setError('')
    try {
      await Promise.all([
        fetchReviews(),
        fetchJobApplications(),
        fetchContacts(),
        fetchMemberships()
      ])
    } catch (error) {
      console.error('Error fetching all data:', error)
      setError('Failed to fetch data. Please check your API server.')
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Reviews API Response:', data) // Debug log
      if (data.success) {
        setReviews(data.reviews || data.data || [])
      } else {
        setReviews([])
        setError(data.message || 'Failed to fetch reviews')
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
      setReviews([])
      setError(`Reviews: ${error.message}`)
    }
  }

  const fetchJobApplications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/jobapplications`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Job Applications API Response:', data) // Debug log
      if (data.success) {
        setJobApplications(data.applications || data.data || [])
      } else {
        setJobApplications([])
      }
    } catch (error) {
      console.error('Error fetching job applications:', error)
      setJobApplications([])
    }
  }

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Contacts API Response:', data) // Debug log
      if (data.success) {
        setContacts(data.contacts || data.data || [])
      } else {
        setContacts([])
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
      setContacts([])
    }
  }

  const fetchMemberships = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log('Memberships API Response:', data) // Debug log
      if (data.success) {
        setMemberships(data.applications || data.memberships || data.data || [])
      } else {
        setMemberships([])
      }
    } catch (error) {
      console.error('Error fetching memberships:', error)
      setMemberships([])
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    setIsAuthenticated(false)
    navigate('/')
  }

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return

    try {
      let endpoint = ''
      switch(type) {
        case 'reviews': endpoint = 'reviews'; break
        case 'jobapplications': endpoint = 'jobapplications'; break
        case 'contacts': endpoint = 'contact'; break
        case 'memberships': endpoint = 'applications'; break
        default: endpoint = type;
      }

      const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      
      if (data.success) {
        // Refresh the data
        switch(type) {
          case 'reviews': fetchReviews(); break
          case 'jobapplications': fetchJobApplications(); break
          case 'contacts': fetchContacts(); break
          case 'memberships': fetchMemberships(); break
        }
      }
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Failed to delete item. Please try again.')
    }
  }

  const updateMembershipStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ status })
      })
      const data = await response.json()
      if (data.success) {
        fetchMemberships()
      } else {
        alert(data.message || 'Failed to update status')
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status. Please check your API server.')
    }
  }

  const toggleRow = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const exportToCSV = (data, filename) => {
    if (data.length === 0) {
      alert('No data to export')
      return
    }
    
    // Create CSV content
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(item => 
      Object.values(item).map(val => {
        // Handle null/undefined values
        if (val === null || val === undefined) return '""'
        // Escape quotes in strings
        if (typeof val === 'string') return `"${val.replace(/"/g, '""')}"`
        // Convert other types to string
        return String(val)
      }).join(',')
    ).join('\n')
    
    const csv = `${headers}\n${rows}`
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const getStats = () => {
    const totalReviews = reviews.length
    const totalJobs = jobApplications.length
    const totalContacts = contacts.length
    const totalMemberships = memberships.length
    
    const avgRating = totalReviews > 0 
      ? (reviews.reduce((sum, r) => {
          const rating = r.rating || r.stars || 0
          return sum + Number(rating)
        }, 0) / totalReviews).toFixed(1)
      : '0.0'

    return {
      totalReviews,
      totalJobs,
      totalContacts,
      totalMemberships,
      avgRating
    }
  }

  const filteredData = () => {
    let data = []
    switch(activeTab) {
      case 'reviews': data = reviews; break
      case 'jobs': data = jobApplications; break
      case 'contacts': data = contacts; break
      case 'memberships': data = memberships; break
      default: data = []
    }

    if (searchTerm) {
      return data.filter(item => 
        Object.values(item).some(val => 
          val !== null && 
          val !== undefined && 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
    return data
  }

  const renderStars = (rating) => {
    const numericRating = Number(rating) || 0
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            size={16}
            className={i < numericRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    )
  }

  const renderTable = () => {
    const data = filteredData()

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <RefreshCw className="animate-spin text-blue-500" size={32} />
          <span className="ml-3 text-gray-600">Loading data...</span>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-red-600">
          <AlertCircle size={48} className="mb-4" />
          <p className="text-lg font-semibold">Error Loading Data</p>
          <p className="text-sm mt-2">{error}</p>
          <button
            onClick={fetchAllData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      )
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500">No data found for {activeTab}</p>
          <button
            onClick={fetchAllData}
            className="mt-2 px-4 py-2 text-blue-500 hover:text-blue-700"
          >
            Refresh Data
          </button>
        </div>
      )
    }

    switch(activeTab) {
      case 'reviews':
        return (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-3 font-semibold">App</th>
                  <th className="text-left p-3 font-semibold">Name</th>
                  <th className="text-left p-3 font-semibold">Email</th>
                  <th className="text-left p-3 font-semibold">Rating</th>
                  <th className="text-left p-3 font-semibold">Date</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((review) => (
                  <React.Fragment key={review._id || review.id}>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-3">{review.app || 'N/A'}</td>
                      <td className="p-3">{review.name || 'N/A'}</td>
                      <td className="p-3">{review.email || 'N/A'}</td>
                      <td className="p-3">{renderStars(review.rating || review.stars)}</td>
                      <td className="p-3">
                        {review.createdAt 
                          ? new Date(review.createdAt).toLocaleDateString()
                          : new Date(review.date || review.created).toLocaleDateString()
                        }
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleRow(review._id || review.id)}
                            className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
                            title="View details"
                          >
                            {expandedRows[review._id || review.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                          <button
                            onClick={() => handleDelete('reviews', review._id || review.id)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRows[review._id || review.id] && (
                      <tr className="bg-gray-50">
                        <td colSpan="6" className="p-4">
                          <div className="bg-white p-4 rounded-lg shadow-inner">
                            <p className="text-gray-700">
                              <strong className="text-gray-900">Review:</strong>{' '}
                              {review.review || review.comment || review.message || 'No review text provided'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )

      case 'jobs':
        return (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-3 font-semibold">Name</th>
                  <th className="text-left p-3 font-semibold">Email</th>
                  <th className="text-left p-3 font-semibold">Position</th>
                  <th className="text-left p-3 font-semibold">Phone</th>
                  <th className="text-left p-3 font-semibold">Date</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((job) => (
                  <React.Fragment key={job._id || job.id}>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-3">{job.fullName || job.name || 'N/A'}</td>
                      <td className="p-3">{job.email || 'N/A'}</td>
                      <td className="p-3">{job.position || 'N/A'}</td>
                      <td className="p-3">{job.phone || job.phoneNumber || 'N/A'}</td>
                      <td className="p-3">
                        {job.createdAt 
                          ? new Date(job.createdAt).toLocaleDateString()
                          : new Date(job.date || job.appliedDate).toLocaleDateString()
                        }
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleRow(job._id || job.id)}
                            className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
                            title="View details"
                          >
                            {expandedRows[job._id || job.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                          <button
                            onClick={() => handleDelete('jobapplications', job._id || job.id)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRows[job._id || job.id] && (
                      <tr className="bg-gray-50">
                        <td colSpan="6" className="p-4">
                          <div className="bg-white p-4 rounded-lg shadow-inner space-y-3">
                            <p className="text-gray-700">
                              <strong className="text-gray-900">Cover Letter:</strong>{' '}
                              {job.coverLetter || job.message || 'No cover letter provided'}
                            </p>
                            {job.resume && (
                              <p>
                                <a 
                                  href={job.resume.startsWith('http') ? job.resume : `${API_BASE_URL.replace('/api', '')}/${job.resume}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="inline-flex items-center space-x-1 text-blue-500 hover:text-blue-700"
                                >
                                  <Eye size={16} />
                                  <span>View Resume</span>
                                </a>
                              </p>
                            )}
                            {job.experience && (
                              <p className="text-gray-700">
                                <strong className="text-gray-900">Experience:</strong> {job.experience}
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )

      case 'contacts':
        return (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-3 font-semibold">Name</th>
                  <th className="text-left p-3 font-semibold">Email</th>
                  <th className="text-left p-3 font-semibold">Subject</th>
                  <th className="text-left p-3 font-semibold">Interest</th>
                  <th className="text-left p-3 font-semibold">Date</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((contact) => (
                  <React.Fragment key={contact._id || contact.id}>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-3">{contact.name || contact.fullName || 'N/A'}</td>
                      <td className="p-3">{contact.email || 'N/A'}</td>
                      <td className="p-3">{contact.subject || 'No Subject'}</td>
                      <td className="p-3">{contact.interest || contact.service || 'N/A'}</td>
                      <td className="p-3">
                        {contact.createdAt 
                          ? new Date(contact.createdAt).toLocaleDateString()
                          : new Date(contact.date || contact.created).toLocaleDateString()
                        }
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleRow(contact._id || contact.id)}
                            className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
                            title="View details"
                          >
                            {expandedRows[contact._id || contact.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                          <button
                            onClick={() => handleDelete('contacts', contact._id || contact.id)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRows[contact._id || contact.id] && (
                      <tr className="bg-gray-50">
                        <td colSpan="6" className="p-4">
                          <div className="bg-white p-4 rounded-lg shadow-inner">
                            <p className="text-gray-700">
                              <strong className="text-gray-900">Message:</strong>{' '}
                              {contact.message || contact.content || 'No message provided'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )

      case 'memberships':
        return (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-3 font-semibold">Name</th>
                  <th className="text-left p-3 font-semibold">Email</th>
                  <th className="text-left p-3 font-semibold">Type</th>
                  <th className="text-left p-3 font-semibold">Date</th>
                  <th className="text-left p-3 font-semibold">Status</th>
                  <th className="text-left p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((app) => (
                  <React.Fragment key={app._id || app.id}>
                    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-3">{app.fullName || app.name || 'N/A'}</td>
                      <td className="p-3">{app.email || 'N/A'}</td>
                      <td className="p-3">{app.membershipType || app.type || 'N/A'}</td>
                      <td className="p-3">
                        {app.createdAt 
                          ? new Date(app.createdAt).toLocaleDateString()
                          : new Date(app.date || app.applicationDate).toLocaleDateString()
                        }
                      </td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          app.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : app.status === 'rejected' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {app.status || 'pending'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleRow(app._id || app.id)}
                            className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded"
                            title="View details"
                          >
                            {expandedRows[app._id || app.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                          <button
                            onClick={() => updateMembershipStatus(app._id || app.id, 'approved')}
                            className="p-1 text-green-500 hover:text-green-700 hover:bg-green-50 rounded"
                            title="Approve"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button
                            onClick={() => updateMembershipStatus(app._id || app.id, 'rejected')}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Reject"
                          >
                            <XCircle size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete('memberships', app._id || app.id)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRows[app._id || app.id] && (
                      <tr className="bg-gray-50">
                        <td colSpan="6" className="p-4">
                          <div className="bg-white p-4 rounded-lg shadow-inner">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-gray-700 mb-2">
                                  <strong className="text-gray-900">Phone:</strong> {app.phone || app.phoneNumber || 'N/A'}
                                </p>
                                <p className="text-gray-700 mb-2">
                                  <strong className="text-gray-900">Location:</strong> {app.province || app.state || 'N/A'}, {app.district || app.city || 'N/A'}
                                </p>
                                <p className="text-gray-700">
                                  <strong className="text-gray-900">Education:</strong> {app.education || app.qualification || 'N/A'}
                                </p>
                              </div>
                              <div>
                                {app.skills && (
                                  <>
                                    <p className="text-gray-700 mb-2">
                                      <strong className="text-gray-900">Skills:</strong>
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                      {Array.isArray(app.skills) 
                                        ? app.skills.map((skill, i) => (
                                            <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                              {skill}
                                            </span>
                                          ))
                                        : typeof app.skills === 'string'
                                        ? app.skills.split(',').map((skill, i) => (
                                            <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                              {skill.trim()}
                                            </span>
                                          ))
                                        : null
                                      }
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            {app.motivation && (
                              <p className="mt-4 text-gray-700">
                                <strong className="text-gray-900">Motivation:</strong>{' '}
                                {app.motivation}
                              </p>
                            )}
                            {app.experience && (
                              <p className="mt-2 text-gray-700">
                                <strong className="text-gray-900">Experience:</strong> {app.experience}
                              </p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )
    }
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => {
      setIsAuthenticated(true)
      fetchAllData()
    }} />
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage all submissions and applications</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Home size={20} />
                <span>Home</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Reviews</p>
                <p className="text-3xl font-bold mt-1">{stats.totalReviews}</p>
                <p className="text-sm text-gray-500 mt-2">Avg Rating: {stats.avgRating}★</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <Star className="text-yellow-500" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Job Applications</p>
                <p className="text-3xl font-bold mt-1">{stats.totalJobs}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Briefcase className="text-blue-500" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Contact Messages</p>
                <p className="text-3xl font-bold mt-1">{stats.totalContacts}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <Mail className="text-green-500" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Memberships</p>
                <p className="text-3xl font-bold mt-1">{stats.totalMemberships}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <Users className="text-purple-500" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Controls */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'reviews', label: 'Reviews', icon: Star, count: stats.totalReviews },
                { id: 'jobs', label: 'Job Applications', icon: Briefcase, count: stats.totalJobs },
                { id: 'contacts', label: 'Contact Messages', icon: Mail, count: stats.totalContacts },
                { id: 'memberships', label: 'Memberships', icon: Users, count: stats.totalMemberships }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    <Icon size={20} />
                    <span>{tab.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Search and Export */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
              <div className="flex space-x-3 w-full sm:w-auto">
                <button
                  onClick={() => exportToCSV(filteredData(), activeTab)}
                  disabled={filteredData().length === 0}
                  className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg transition w-full sm:w-auto ${filteredData().length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
                >
                  <Download size={20} />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={fetchAllData}
                  className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
                >
                  <RefreshCw size={20} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="text-red-500 mr-3" size={20} />
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Data Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {renderTable()}
            </div>

            {/* Summary */}
            <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Showing <span className="font-semibold">{filteredData().length}</span> of{' '}
                <span className="font-semibold">{
                  activeTab === 'reviews' ? stats.totalReviews :
                  activeTab === 'jobs' ? stats.totalJobs :
                  activeTab === 'contacts' ? stats.totalContacts :
                  stats.totalMemberships
                }</span> entries
                {searchTerm && (
                  <span className="text-blue-600 ml-2">
                    (filtered by "{searchTerm}")
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard