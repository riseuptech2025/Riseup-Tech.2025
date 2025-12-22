import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Book,
  FileText,
  Shield,
  HelpCircle,
  RotateCcw,
} from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import AnimatedBackground from '../components/AnimatedBackground'
import SEO from '../components/SEO'

import Documentation from '../components/help/Documentation'
import FAQs from '../components/help/FAQs'
import TermsOfService from '../components/help/TermsOfService'
import PrivacyPolicy from '../components/help/PrivacyPolicy'
import RefundPolicy from '../components/help/RefundPolicy'

const tabs = [
  { id: 'docs', label: 'Membership Docs', icon: Book },
  { id: 'faq', label: 'FAQs', icon: HelpCircle },
  { id: 'terms', label: 'Terms & Conditions', icon: FileText },
  { id: 'privacy', label: 'Privacy Policy', icon: Shield },
  { id: 'refund', label: 'Refund Policy', icon: RotateCcw },
]

const HelpSupport = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const initialTab =
    searchParams.get('tab') ||
    localStorage.getItem('help-tab') ||
    'docs'

  const [activeTab, setActiveTab] = useState(initialTab)

  useEffect(() => {
    localStorage.setItem('help-tab', activeTab)
    setSearchParams({ tab: activeTab })
  }, [activeTab, setSearchParams])

  const renderContent = () => {
    switch (activeTab) {
      case 'docs':
        return <Documentation />
      case 'faq':
        return <FAQs />
      case 'terms':
        return <TermsOfService />
      case 'privacy':
        return <PrivacyPolicy />
      case 'refund':
        return <RefundPolicy />
      default:
        return null
    }
  }

  return (
    <AnimatedBackground>
      <SEO
        title="Help & Support | Riseup-Tech"
        description="Documentation, FAQs, Terms, Privacy Policy and Refund Policy for Riseup-Tech"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="text-5xl font-bold mb-4">
            Help & <span className="gradient-text">Support</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find answers, policies, and guides for all Riseup-Tech products
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="relative flex flex-wrap justify-center gap-4 mb-14">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-primary/10'
              }`}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="active-tab"
                  className="absolute inset-0 bg-primary rounded-xl -z-10"
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                  }}
                />
              )}
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto glass-card p-6 sm:p-8"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatedBackground>
  )
}

export default HelpSupport
