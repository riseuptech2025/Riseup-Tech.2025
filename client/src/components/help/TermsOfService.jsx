import { motion } from 'framer-motion'
import {
  FileText,
  Info,
  Building2,
  CheckCircle,
  Code,
  User,
  Shield,
  DollarSign,
  Lock,
  AlertTriangle,
  Link as LinkIcon,
  Power,
  Scale,
  RefreshCcw,
  Mail,
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

const TermsOfService = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-none"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">Terms & Conditions</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last Updated: 22 Dec 2026
        </p>
      </div>

      {/* Intro */}
      <div className="glass-card p-6 rounded-2xl mb-8 border-l-4 border-primary">
        <p>
          Welcome to <strong>Riseup-Tech</strong>. These Terms and Conditions
          (“Terms”) govern your access to and use of our website, software
          products, and services.
        </p>
        <p className="mt-3">
          By accessing or using our services, you agree to be bound by these
          Terms. If you do not agree with any part, please do not use our
          services.
        </p>
      </div>

      <Section icon={Building2} title="1. Company Information">
        <ul className="list-disc ml-6">
          <li><strong>Company Name:</strong> Riseup-Tech</li>
          <li><strong>Location:</strong> Kathmandu, Nepal</li>
          <li><strong>Business Type:</strong> Software Development & IT Services</li>
          <li><strong>Email:</strong> riseuptech2025@gmail.com</li>
          <li><strong>Website:</strong> riseup-tech.com.np</li>
        </ul>
      </Section>

      <Section icon={CheckCircle} title="2. Acceptance of Terms">
        <p>By using our services, you confirm that:</p>
        <ul className="list-disc ml-6">
          <li>You are at least 18 years old, or have parental/guardian consent</li>
          <li>You agree to comply with all applicable laws of Nepal</li>
        </ul>
      </Section>

      <Section icon={Code} title="3. Services Provided">
        <ul className="list-disc ml-6">
          <li>Website & web application development</li>
          <li>Mobile application development</li>
          <li>Custom software solutions</li>
          <li>UI/UX design</li>
          <li>Maintenance and technical support</li>
          <li>Other IT and digital services</li>
        </ul>
        <p className="italic text-sm">
          We reserve the right to modify, suspend, or discontinue services at any
          time.
        </p>
      </Section>

      <Section icon={User} title="4. User Responsibilities">
        <ul className="list-disc ml-6">
          <li>Provide accurate and complete information</li>
          <li>Use services only for lawful purposes</li>
          <li>Not hack, reverse-engineer, or exploit our systems</li>
          <li>Not upload viruses or malicious content</li>
        </ul>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials.
        </p>
      </Section>

      <Section icon={Shield} title="5. Intellectual Property Rights">
        <p>
          All content including source code, designs, logos, text, graphics, and
          media are the intellectual property of Riseup-Tech unless otherwise
          stated.
        </p>
        <p className="text-red-500 font-medium">
          ❌ Unauthorized copying, distribution, or resale is strictly
          prohibited.
        </p>
      </Section>

      <Section icon={FileText} title="6. Client Projects & Deliverables">
        <ul className="list-disc ml-6">
          <li>Ownership transfers only after full payment</li>
          <li>Completed projects may be showcased unless restricted by contract</li>
          <li>Third-party tools remain under their original licenses</li>
        </ul>
      </Section>

      <Section icon={DollarSign} title="7. Payments & Refund Policy">
        <ul className="list-disc ml-6">
          <li>Payments must follow agreed contracts or invoices</li>
          <li>Late payments may result in service suspension</li>
          <li>Refunds depend on project stage and agreement terms</li>
        </ul>
        <p>
          Custom development work is non-refundable once started, unless stated
          otherwise.
        </p>
      </Section>

      <Section icon={Lock} title="8. Confidentiality">
        <p>
          Both parties agree to keep all confidential information private,
          including business data, source code, project details, and client
          information.
        </p>
        <p className="italic text-sm">
          This obligation continues even after project completion.
        </p>
      </Section>

      <Section icon={AlertTriangle} title="9. Limitation of Liability">
        <ul className="list-disc ml-6">
          <li>No liability for indirect or consequential damages</li>
          <li>No liability for data loss or business interruption</li>
          <li>No liability for third-party or force majeure issues</li>
        </ul>
        <p>
          Liability is limited to the amount paid for the specific service.
        </p>
      </Section>

      <Section icon={LinkIcon} title="10. Third-Party Links & Services">
        <p>
          We are not responsible for third-party websites, services, content, or
          policies linked from our platform.
        </p>
      </Section>

      <Section icon={Power} title="11. Termination">
        <ul className="list-disc ml-6">
          <li>Suspension or termination for misuse or non-payment</li>
          <li>Immediate termination for legal violations</li>
        </ul>
        <p>
          Upon termination, all granted rights will immediately cease.
        </p>
      </Section>

      <Section icon={Info} title="12. Privacy Policy">
        <p>
          Your use of our services is also governed by our Privacy Policy, which
          explains how we collect and protect your data.
        </p>
      </Section>

      <Section icon={Scale} title="13. Governing Law">
        <p>
          These Terms are governed by the laws of Nepal. Any disputes shall fall
          under the jurisdiction of the courts of Kathmandu, Nepal.
        </p>
      </Section>

      <Section icon={RefreshCcw} title="14. Changes to Terms">
        <p>
          Riseup-Tech reserves the right to update or modify these Terms at any
          time. Changes are effective immediately upon posting.
        </p>
      </Section>

      <Section icon={Mail} title="15. Contact Us">
        <p>
          <strong>Riseup-Tech</strong>
          <br />
          📍 Kathmandu, Nepal
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

export default TermsOfService
