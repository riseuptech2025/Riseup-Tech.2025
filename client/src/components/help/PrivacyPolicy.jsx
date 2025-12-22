import { motion } from 'framer-motion'
import {
  Shield,
  Info,
  User,
  Globe,
  Lock,
  Cookie,
  Share2,
  Clock,
  Users,
  Link as LinkIcon,
  Mail,
  FileText,
} from 'lucide-react'

const Section = ({ icon: Icon, title, children }) => (
  <div className="glass-card p-6 rounded-2xl mb-6">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-primary" size={22} />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <div className="text-gray-700 dark:text-gray-300 space-y-3">
      {children}
    </div>
  </div>
)

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-none"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">Privacy Policy</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last Updated: 22 Dec 2025
        </p>
      </div>

      {/* Intro */}
      <div className="glass-card p-6 rounded-2xl mb-8 border-l-4 border-primary">
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Riseup-Tech</strong> (“we”, “our”, “us”) is committed to
          protecting your privacy. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our
          website, applications, and services.
        </p>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          By accessing or using our services, you agree to the terms of this
          Privacy Policy.
        </p>
      </div>

      {/* Sections */}
      <Section icon={Info} title="1. Company Information">
        <ul className="list-disc ml-6">
          <li><strong>Company Name:</strong> Riseup-Tech</li>
          <li><strong>Location:</strong> Basundhara, Kathmandu, Nepal</li>
          <li><strong>Business Type:</strong> Software Development & IT Services</li>
        </ul>
      </Section>

      <Section icon={User} title="2. Information We Collect">
        <p><strong>2.1 Personal Information</strong></p>
        <ul className="list-disc ml-6">
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Company Name</li>
          <li>Login credentials (encrypted)</li>
          <li>Any information you voluntarily provide</li>
        </ul>

        <p className="mt-4"><strong>2.2 Technical Information</strong></p>
        <ul className="list-disc ml-6">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device information</li>
          <li>Operating system</li>
          <li>Access time and pages visited</li>
        </ul>

        <p className="mt-4"><strong>2.3 Project & Communication Data</strong></p>
        <ul className="list-disc ml-6">
          <li>Project requirements</li>
          <li>Messages, emails, and support communications</li>
          <li>Files and documents shared with us</li>
        </ul>
      </Section>

      <Section icon={Info} title="3. How We Use Your Information">
        <ul className="list-disc ml-6">
          <li>Provide and manage our services</li>
          <li>Communicate regarding projects or inquiries</li>
          <li>Improve website functionality and user experience</li>
          <li>Process payments and invoices</li>
          <li>Ensure security and prevent fraud</li>
          <li>Comply with legal obligations</li>
        </ul>
      </Section>

      <Section icon={Cookie} title="4. Cookies & Tracking Technologies">
        <p>We use cookies and similar technologies to:</p>
        <ul className="list-disc ml-6">
          <li>Improve website performance</li>
          <li>Understand user behavior</li>
          <li>Remember user preferences</li>
        </ul>
        <p className="text-sm italic">
          You may disable cookies via browser settings; some features may not
          function properly.
        </p>
      </Section>

      <Section icon={Share2} title="5. Sharing of Information">
        <p>We do not sell or rent your personal information.</p>
        <p>Your information may be shared only:</p>
        <ul className="list-disc ml-6">
          <li>With trusted service providers (hosting, payments, analytics)</li>
          <li>To comply with legal requirements</li>
          <li>To protect our rights, property, or safety</li>
        </ul>
        <p className="text-sm italic">
          All third parties are required to maintain confidentiality.
        </p>
      </Section>

      <Section icon={Lock} title="6. Data Security">
        <p>
          We implement appropriate technical and organizational measures to
          protect your data from unauthorized access, loss, misuse, or
          alteration.
        </p>
        <p className="text-sm italic">
          However, no electronic transmission or storage system is 100% secure.
        </p>
      </Section>

      <Section icon={Clock} title="7. Data Retention">
        <ul className="list-disc ml-6">
          <li>As long as necessary to provide services</li>
          <li>As required by law</li>
          <li>For legitimate business purposes</li>
        </ul>
        <p>
          Once no longer required, data is securely deleted.
        </p>
      </Section>

      <Section icon={Users} title="8. User Rights">
        <p>You have the right to:</p>
        <ul className="list-disc ml-6">
          <li>Access your personal information</li>
          <li>Request correction or updates</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent where applicable</li>
        </ul>
        <p>
          Requests can be made by contacting us directly.
        </p>
      </Section>

      <Section icon={LinkIcon} title="9. Third-Party Links">
        <p>
          Our website may contain links to third-party websites. We are not
          responsible for their privacy practices or content.
        </p>
      </Section>

      <Section icon={Users} title="10. Children’s Privacy">
        <p>
          Our services are not intended for children under the age of 13. We do
          not knowingly collect personal information from children.
        </p>
      </Section>

      <Section icon={Globe} title="11. International Data Transfer">
        <p>
          If you access our services from outside Nepal, your information may be
          transferred to and processed in Nepal in accordance with this Privacy
          Policy.
        </p>
      </Section>

      <Section icon={FileText} title="12. Changes to This Privacy Policy">
        <p>
          We reserve the right to update this Privacy Policy at any time. Changes
          are effective immediately upon publication.
        </p>
      </Section>

      <Section icon={Mail} title="13. Contact Information">
        <p>
          <strong>Riseup-Tech</strong>
          <br />
          📍 Basundhara, Kathmandu, Nepal
          <br />
          📧{' '}
          <a
            href="mailto:riseuptech2025@gmail.com"
            className="text-primary underline"
          >
            riseuptech2025@gmail.com
          </a>
          <br />
          🌐{' '}
          <a
            href="https://riseup-tech.com.np"
            target="_blank"
            rel="noreferrer"
            className="text-primary underline"
          >
            riseup-tech.com.np
          </a>
        </p>
      </Section>
    </motion.div>
  )
}

export default PrivacyPolicy
