import { motion } from 'framer-motion'
import {
  Info,
  User,
  Users,
  Shield,
  Lock,
  FileText,
  Award,
  Calendar,
  Gift,
  Edit3,
  CheckCircle,
} from 'lucide-react'

const Section = ({ icon: Icon, title, children }) => (
  <div className="glass-card p-6 rounded-2xl mb-6">
    <div className="flex items-center gap-3 mb-4">
      <Icon className="text-primary" size={22} />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <div className="text-gray-700 dark:text-gray-300 space-y-2">{children}</div>
  </div>
)

const Documentation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-none"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">Riseup-Tech Membership Document</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Company Name: Riseup-Tech Pvt. Ltd. | Location: Kathmandu, Nepal
        </p>
      </div>

      <Section icon={Info} title="1. Introduction">
        <p>
          This Membership Document outlines the terms, conditions, roles, and responsibilities of individuals who become members of Riseup-Tech Pvt. Ltd. The purpose is to ensure transparency, professionalism, and mutual understanding.
        </p>
      </Section>

      <Section icon={User} title="2. Membership Eligibility">
        <ul className="list-disc ml-6">
          <li>Be at least 18 years old</li>
          <li>Possess relevant skills, qualifications, or interest in technology/software</li>
          <li>Agree to comply with company rules, policies, and ethical standards</li>
          <li>Successfully complete the registration or selection process defined by the company</li>
        </ul>
      </Section>

      <Section icon={Users} title="3. Types of Membership">
        <ul className="list-disc ml-6">
          <li>Intern Member – Students or freshers undergoing training or internship</li>
          <li>Associate Member – Junior-level contributors or trainees</li>
          <li>Professional Member – Full-time or part-time developers and professionals</li>
          <li>Admin/Core Member – Founders, managers, or administrative staff</li>
        </ul>
        <p className="italic text-sm">
          Membership type is assigned based on skills, experience, and company requirements.
        </p>
      </Section>

      <Section icon={Shield} title="4. Member Responsibilities">
        <ul className="list-disc ml-6">
          <li>Follow company policies, rules, and guidelines</li>
          <li>Maintain confidentiality of company data, projects, and client information</li>
          <li>Work honestly, responsibly, and professionally</li>
          <li>Respect team members, clients, and management</li>
          <li>Meet deadlines and maintain quality standards</li>
        </ul>
      </Section>

      <Section icon={Lock} title="5. Code of Conduct">
        <ul className="list-disc ml-6">
          <li>Avoid any form of misconduct, harassment, or unethical behavior</li>
          <li>Not engage in activities that may harm the company’s reputation</li>
          <li>Not use company resources for illegal or personal misuse</li>
          <li>Maintain discipline and professional behavior at all times</li>
        </ul>
        <p className="text-red-500 font-medium">
          Violation may lead to termination of membership.
        </p>
      </Section>

      <Section icon={FileText} title="6. Confidentiality Agreement">
        <ul className="list-disc ml-6">
          <li>All data, source code, designs, documents, or client info shared during membership is confidential</li>
          <li>Confidential info must not be disclosed to third parties during or after membership</li>
          <li>Breach of confidentiality may result in legal action</li>
        </ul>
      </Section>

      <Section icon={Award} title="7. Intellectual Property">
        <ul className="list-disc ml-6">
          <li>All work, code, designs, and materials created during membership remain the intellectual property of Riseup-Tech</li>
          <li>Members may not reuse or distribute company work without written permission</li>
        </ul>
      </Section>

      <Section icon={Calendar} title="8. Duration and Termination">
        <ul className="list-disc ml-6">
          <li>Membership duration defined at joining</li>
          <li>Riseup-Tech may terminate membership for misconduct, poor performance, or policy violations</li>
          <li>Members may voluntarily resign by providing prior notice</li>
        </ul>
      </Section>

      <Section icon={Gift} title="9. Benefits of Membership">
        <ul className="list-disc ml-6">
          <li>Hands-on experience in real-world projects</li>
          <li>Skill development and learning opportunities</li>
          <li>Certificates or recommendation letters (if applicable)</li>
          <li>Career growth and networking opportunities</li>
        </ul>
        <p className="italic text-sm">
          Benefits depend on membership type and performance.
        </p>
      </Section>

      <Section icon={Edit3} title="10. Amendment of Terms">
        <p>
          Riseup-Tech reserves the right to modify or update this membership document at any time. Members will be notified of significant changes.
        </p>
      </Section>

      <Section icon={CheckCircle} title="11. Acceptance">
        <p>
          By signing below, the member confirms that they have read, understood, and agreed to all terms and conditions mentioned in this document.
        </p>

        <div className="mt-4 space-y-2">
          <p><strong>Member Details:</strong></p>
          <p>Full Name: ___________________________</p>
          <p>Email: ______________________________</p>
          <p>Role/Membership Type: _______________</p>
          <p>Signature: ___________________________</p>
          <p>Date: _______________________________</p>
        </div>

        <div className="mt-4 space-y-2">
          <p><strong>Authorized by Riseup-Tech:</strong></p>
          <p>Name: _______________________________</p>
          <p>Designation: _________________________</p>
          <p>Signature & Seal: ___________________</p>
          <p>Date: _______________________________</p>
        </div>
      </Section>

      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        <p>This document is the official membership agreement of Riseup-Tech Pvt. Ltd., Kathmandu, Nepal.</p>
      </div>
    </motion.div>
  )
}

export default Documentation
