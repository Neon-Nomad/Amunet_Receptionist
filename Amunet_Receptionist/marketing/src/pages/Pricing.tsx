import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Zap, Crown, Star } from 'lucide-react'
import OfferTimer from '../components/ui/OfferTimer'

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Core',
      price: '$997',
      period: '/month',
      description: 'Perfect for growing businesses ready to automate',
      features: [
        'AI Receptionist (500 calls/month)',
        'Smart SMS (1,000 messages/month)',
        'Newsletter Magic (unlimited)',
        'Amunet Create (100 images/month)',
        'Basic ROI tracking',
        'Email support',
        'Shared integrations'
      ],
      cta: 'Start Core Plan',
      popular: false,
      icon: <Zap className="w-6 h-6" />
    },
    {
      name: 'Growth',
      price: '$1,997',
      period: '/month',
      description: 'For businesses serious about scaling with AI',
      features: [
        'AI Receptionist (unlimited calls)',
        'Smart SMS (unlimited messages)',
        'Newsletter Magic (unlimited)',
        'Amunet Create (500 images/month)',
        'Amunet Motion (50 videos/month)',
        'Advanced ROI tracking',
        'Priority support',
        'Custom integrations',
        'Social media automation',
        'Advanced lead scoring'
      ],
      cta: 'Start Growth Plan',
      popular: true,
      icon: <Crown className="w-6 h-6" />
    },
    {
      name: 'Elite',
      price: 'Custom',
      period: '',
      description: 'Enterprise solution with unlimited everything',
      features: [
        'Everything in Growth',
        'Unlimited everything',
        'Premium Sora video generation',
        'Dedicated AI trainer',
        'Custom voice cloning',
        'White-label options',
        'Dedicated success manager',
        'Custom integrations',
        'SLA guarantees',
        'On-site training'
      ],
      cta: 'Contact Sales',
      popular: false,
      icon: <Star className="w-6 h-6" />
    }
  ]

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
            Choose Your <span className="text-gradient">Power Level</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-nunito">
            Every plan includes our complete AI suite. Scale up as your business grows and 
            your ambitions expand.
          </p>
        </motion.div>

        {/* Offer Timer */}
        <div className="flex justify-center mb-12">
          <OfferTimer />
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative glass rounded-2xl p-8 ${