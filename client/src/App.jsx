import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Ecosystem from './pages/Ecosystem'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
// import News from './pages/News'
import HelpSupport from './pages/HelpSupport'
import JobApplication from './components/JobApplication'
import AppReview from './components/AppReview'
import ProtectedAdmin from './components/ProtectedAdmin'
import NotFound from './pages/NotFound' 
import Adminlogin from './pages/admin/AdminLogin'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark-bg transition-colors duration-300">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ecosystem" element={<Ecosystem />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/news" element={<News />} /> */}
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/careers/apply/:jobId" element={<JobApplication />} />
            <Route path="/review" element={<AppReview />} />
            <Route path="/admin" element={<ProtectedAdmin />} />
            <Route path="/admin/login" element={<Adminlogin />} />
            {/* Catch all route - 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App