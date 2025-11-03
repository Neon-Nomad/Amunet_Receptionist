import { useState, useEffect, useCallback } from 'react'

const OFFER_DURATION = 72 * 60 * 60 * 1000 // 72 hours in milliseconds
const STORAGE_KEY = 'amunet_offer_expiry'

export interface OfferTimer {
  timeLeft: number
  isExpired: boolean
  hasStarted: boolean
  formatTime: () => string
}

export const useOfferTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isExpired, setIsExpired] = useState<boolean>(false)
  const [hasStarted, setHasStarted] = useState<boolean>(false)

  const initializeTimer = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const now = Date.now()

    if (stored) {
      const expiry = parseInt(stored, 10)
      const remaining = expiry - now
      
      if (remaining > 0) {
        setTimeLeft(remaining)
        setHasStarted(true)
        setIsExpired(false)
      } else {
        setTimeLeft(0)
        setIsExpired(true)
        setHasStarted(true)
      }
    } else {
      // First visit - start timer
      const expiry = now + OFFER_DURATION
      localStorage.setItem(STORAGE_KEY, expiry.toString())
      setTimeLeft(OFFER_DURATION)
      setHasStarted(true)
      setIsExpired(false)
    }
  }, [])

  const formatTime = useCallback(() => {
    if (timeLeft <= 0) return '00:00:00'
    
    const hours = Math.floor(timeLeft / (60 * 60 * 1000))
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))
    const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000)
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [timeLeft])

  useEffect(() => {
    if (!hasStarted || isExpired) return

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1000
        if (newTime <= 0) {
          setIsExpired(true)
          return 0
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [hasStarted, isExpired])

  return {
    timeLeft,
    isExpired,
    hasStarted,
    formatTime,
    initializeTimer
  }
}