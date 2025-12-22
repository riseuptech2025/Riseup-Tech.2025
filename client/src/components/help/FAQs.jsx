import { useState } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, MessageSquare } from 'lucide-react'

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-primary" size={22} />
          <h3 className="text-lg font-semibold">{question}</h3>
        </div>
        <span className="text-primary font-bold">{open ? '-' : '+'}</span>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 text-gray-700 dark:text-gray-300"
        >
          {answer}
        </motion.div>
      )}
    </motion.div>
  )
}

const FAQs = () => {
  const faqs = [
    {
      question: 'How do I create an account?',
      answer:
        'You can create an account by downloading any of our apps and following the sign-up process. All Riseup-Tech apps use a unified account system.',
    },
    {
      question: 'Can I use one account for multiple Riseup apps?',
      answer:
        'Yes, a single Riseup-Tech account works across all apps and services within our ecosystem.',
    },
    {
      question: 'Is my data secure with Riseup-Tech?',
      answer:
        'Yes, we use industry-standard encryption and security practices. For more details, please refer to our Privacy Policy.',
    },
    {
      question: 'When will Riseup-Connect launch?',
      answer:
        'Riseup-Connect is scheduled to launch on Mangsir 1, 2082. Keep an eye on our official announcements for updates.',
    },
    {
      question: 'Do you provide refunds for services?',
      answer:
        'Refunds are limited and subject to conditions described in our Refund Policy. Custom development work is non-refundable once started.',
    },
    {
      question: 'How can I upgrade to a Pro or Enterprise membership?',
      answer:
        'You can contact our support team to discuss your membership upgrade, pricing, and benefits. Upgrades are processed after confirmation of payment.',
    },
    {
      question: 'What should I do if I forget my password?',
      answer:
        'Use the "Forgot Password" link on the login page to reset your password via your registered email address.',
    },
    {
      question: 'Does Riseup-Tech provide training or tutorials?',
      answer:
        'Yes, we provide official documentation, tutorials, and guides for all our apps, including Riseup-AI, Riseup-Learn, and Riseup-Drive.',
    },
    {
      question: 'Can I collaborate as an intern or associate member?',
      answer:
        'Yes, Riseup-Tech accepts Intern and Associate members who meet eligibility criteria. Refer to the Membership Document for roles and responsibilities.',
    },
    {
      question: 'What support channels are available?',
      answer:
        'You can reach our support team via email at riseuptech2025@gmail.com or through the support/contact section in our apps.',
    },
    {
      question: 'Are there any hidden fees for subscriptions or services?',
      answer:
        'No, all fees are clearly mentioned in your invoices and contracts. There are no hidden charges.',
    },
    {
      question: 'How can I report bugs or issues in the apps?',
      answer:
        'You can report bugs directly via the support email or the in-app feedback form. Our technical team will respond promptly.',
    },
    {
      question: 'Does Riseup-Tech provide custom software development?',
      answer:
        'Yes, we provide custom software solutions for businesses and individuals. Details of scope, timeline, and pricing are agreed via contract.',
    },
    {
      question: 'Are third-party services included in Riseup-Tech plans?',
      answer:
        'Third-party services like domain registration, hosting, APIs, or plugins are not included and follow their respective policies.',
    },
    {
      question: 'How can I stay updated about Riseup-Tech products?',
      answer:
        'Subscribe to our newsletter, follow us on social media, or regularly check our website for news and updates.',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-4"
    >
      <div className="text-center mb-8">
        <HelpCircle className="mx-auto text-primary" size={48} />
        <h2 className="text-3xl font-bold mt-4">Frequently Asked Questions</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Find answers to common questions about Riseup-Tech products, memberships, and services.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <FaqItem key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </motion.div>
  )
}

export default FAQs
