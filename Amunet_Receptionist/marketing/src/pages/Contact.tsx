import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'

interface FormData {
  name: string
  company: string
  email: string
  phone: string
  interest: string
  message: string
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const interests = [
    'AI Receptionist',
    'Content Creation',
    'Lead Generation',
    'Full AI Suite',
    'Enterprise Solution',
    'Partnership Opportunities'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          interest: '',
          message: ''
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (err) {
      setError('Failed to send message. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-orbitron font-bold text-3xl md:text-4xl mb-4 text-white">
            Message Sent Successfully!
          </h1>
          <p className="text-xl text-white/70 mb-8 font-nunito max-w-2xl">
            Thank you for reaching out. Our team will get back to you within 24 hours 
            with a personalized demo and recommendations.
          </p>
          <a
            href="/"
            className="btn-primary"
          >
            Return Home
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-orbitron font-black text-4xl md:text-6xl mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-nunito">
            Ready to transform your business with AI? Our team of experts is here 
            to help you build a custom solution that drives real results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h2 className="font-orbitron font-bold text-2xl md:text-3xl mb-8 text-white">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-orbitron font-semibold text-lg text-white mb-1">
                    Email Us
                  </h3>
                  <p className="text-white/70 font-nunito">
                    <a href="mailto:sales@amunet.ai" className="hover:text-primary-500 transition-colors">
                      sales@amunet.ai
                    </a>
                  </p>
                  <p className="text-white/70 font-nunito">
                    <a href="mailto:support@amunet.ai" className="hover:text-primary-500 transition-colors">
                      support@amunet.ai
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-orbitron font-semibold text-lg text-white mb-1">
                    Call Us
                  </h3>
                  <p className="text-white/70 font-nunito">
                    <a href="tel:+1-555-AMUNET" className="hover:text-primary-500 transition-colors">