import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SEO = ({ title, description, keywords, image }) => {
  const location = useLocation()
  
  const defaultTitle = "Riseup-Tech - Building the Future of AI & Innovation in Nepal"
  const defaultDescription = "Building the future of AI, connection, and innovation. We create intelligent platforms that empower people and transform industries worldwide."
  const defaultKeywords = "Riseup-Tech, AI Nepal, Technology Nepal, Software Development, Riseup-Connect, Riseup-AI, Nepal Tech Company"
  const defaultImage = "https://riseup-tech-2025.vercel.app/og-image.jpg"
  
  useEffect(() => {
    // Update document title
    document.title = title || defaultTitle
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]')
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    const ogImage = document.querySelector('meta[property="og:image"]')
    const ogUrl = document.querySelector('meta[property="og:url"]')
    const twitterTitle = document.querySelector('meta[property="twitter:title"]')
    const twitterDescription = document.querySelector('meta[property="twitter:description"]')
    const twitterImage = document.querySelector('meta[property="twitter:image"]')
    const canonical = document.querySelector('link[rel="canonical"]')
    
    const currentUrl = `https://riseup-tech-2025.vercel.app${location.pathname}`
    
    if (metaDescription) metaDescription.setAttribute('content', description || defaultDescription)
    if (metaKeywords) metaKeywords.setAttribute('content', keywords || defaultKeywords)
    if (ogTitle) ogTitle.setAttribute('content', title || defaultTitle)
    if (ogDescription) ogDescription.setAttribute('content', description || defaultDescription)
    if (ogImage) ogImage.setAttribute('content', image || defaultImage)
    if (ogUrl) ogUrl.setAttribute('content', currentUrl)
    if (twitterTitle) twitterTitle.setAttribute('content', title || defaultTitle)
    if (twitterDescription) twitterDescription.setAttribute('content', description || defaultDescription)
    if (twitterImage) twitterImage.setAttribute('content', image || defaultImage)
    if (canonical) canonical.setAttribute('href', currentUrl)
  }, [title, description, keywords, image, location])
  
  return null
}

export default SEO