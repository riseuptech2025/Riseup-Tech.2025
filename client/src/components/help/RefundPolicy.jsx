import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Clock,
  CreditCard,
  FileText,
  Info,
  Mail,
  ShieldX,
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

const RefundPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-none"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-2">Refund Policy</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last Updated: 22 Dec 2025
        </p>
      </div>

      {/* Intro */}
      <div className="glass-card p-6 rounded-2xl mb-8 border-l-4 border-primary">
        <p className="text-gray-700 dark:text-gray-300">
          Thank you for choosing <strong>Riseup-Tech</strong>. This Refund Policy
          explains the conditions under which refunds may be issued for our
          software development and IT services. By using our services, you agree
          to this policy.
        </p>
      </div>

      {/* Sections */}
      <Section icon={Info} title="1. General Refund Policy">
        <p>
          Riseup-Tech provides custom software development and IT services that
          require significant time, planning, and technical effort. Therefore,
          refunds are limited and subject to the conditions outlined below.
        </p>
      </Section>

      <Section icon={ShieldX} title="2. Service-Based Refunds">
        <ul className="list-disc ml-6">
          <li>Once a project has started, payments are non-refundable.</li>
          <li>No refunds for completed or partially completed work.</li>
          <li>Project cancellations after work begins are not refundable.</li>
        </ul>
      </Section>

      <Section icon={CreditCard} title="3. Advance & Initial Payments">
        <ul className="list-disc ml-6">
          <li>Advance or initial payments are non-refundable.</li>
          <li>
            These payments cover planning, resource allocation, and development
            setup.
          </li>
        </ul>
      </Section>

      <Section icon={Clock} title="4. Monthly or Subscription Services">
        <p>Applicable to services such as:</p>
        <ul className="list-disc ml-6">
          <li>Maintenance</li>
          <li>Hosting</li>
          <li>Support plans</li>
        </ul>

        <div className="mt-4 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-sm">
            ⚠️ Refunds are not provided for the current or previous billing
            cycles or partial usage periods.
          </p>
        </div>

        <p className="mt-3">
          Clients may cancel future subscriptions by providing prior notice.
        </p>
      </Section>

      <Section icon={AlertTriangle} title="5. Delays & Client Responsibility">
        <p>Refunds will not be issued for delays caused by:</p>
        <ul className="list-disc ml-6">
          <li>Late content or feedback from the client</li>
          <li>Changes in project requirements</li>
          <li>Failure to provide approvals or required resources</li>
        </ul>
      </Section>

      <Section icon={FileText} title="6. Technical Issues">
        <ul className="list-disc ml-6">
          <li>Issues caused by Riseup-Tech will be fixed at no extra cost.</li>
          <li>
            Refunds will not be issued if the issue can be resolved via support.
          </li>
        </ul>
      </Section>

      <Section icon={ShieldX} title="7. Third-Party Services">
        <p>
          Riseup-Tech is not responsible for refunds related to third-party
          services, including:
        </p>
        <ul className="list-disc ml-6">
          <li>Domain registration</li>
          <li>Hosting services</li>
          <li>APIs, plugins, or licenses</li>
        </ul>
        <p>
          Refunds for these services are governed by the third party’s policies.
        </p>
      </Section>

      <Section icon={Info} title="8. Exceptional Cases">
        <p>Refunds may be considered only if:</p>
        <ul className="list-disc ml-6">
          <li>No work has been started on the project</li>
          <li>
            A written refund request is submitted within{' '}
            <strong>24 hours</strong> of payment
          </li>
        </ul>
        <p className="text-sm italic">
          Approval is at the sole discretion of Riseup-Tech.
        </p>
      </Section>

      <Section icon={CreditCard} title="9. Refund Method">
        <ul className="list-disc ml-6">
          <li>Refunds are processed via the original payment method.</li>
          <li>
            Processing time: <strong>7–14 business days</strong>.
          </li>
        </ul>
      </Section>

      <Section icon={FileText} title="10. Policy Changes">
        <p>
          Riseup-Tech reserves the right to modify this Refund Policy at any time.
          Updates are effective immediately upon publication.
        </p>
      </Section>

      <Section icon={Mail} title="11. Contact Information">
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

export default RefundPolicy
