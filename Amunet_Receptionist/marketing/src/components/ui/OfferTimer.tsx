import React from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { useOfferTimer } from '../../hooks/useOfferTimer'

const OfferTimer: React.FC = () => {
  const { timeLeft, isExpired, hasStarted, formatTime } = useOfferTimer()

  if (!hasStarted || isExpired) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 px-4 rounded-lg"
    >
      <div className="flex items-center justify-center space-x-2 text-sm font-semibold">
        <Clock size={16} />
        <span>Limited Time: Setup Fee Waived!</span>
        <span className="font-mono">{formatTime()}</span>
      </div>
    </motion.div>
  )
}

export default OfferTimer