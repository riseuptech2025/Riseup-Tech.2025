// src/hooks/useWebsiteData.js
import { useState, useEffect } from 'react'

export const useWebsiteData = () => {
  const [websiteData, setWebsiteData] = useState(null)

  useEffect(() => {
    const loadData = () => {
      const savedData = localStorage.getItem('riseupTech_websiteData')
      if (savedData) {
        setWebsiteData(JSON.parse(savedData))
      }
    }

    loadData()

    // Listen for updates from admin panel
    const handleDataUpdate = () => {
      loadData()
    }

    window.addEventListener('websiteDataUpdated', handleDataUpdate)
    return () => window.removeEventListener('websiteDataUpdated', handleDataUpdate)
  }, [])

  return websiteData
}