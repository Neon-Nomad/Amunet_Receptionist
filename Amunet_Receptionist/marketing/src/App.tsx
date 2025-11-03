import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'

// Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ChatWidget from './components/ui/ChatWidget'
import BackgroundAudio from './components/ui/BackgroundAudio'

// Pages
import Home from './pages/Home'
import Features from './pages/Features'
import Demo from './pages/Demo'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

// Hooks
import { useOfferTimer } from './hooks/useOfferTimer'

function App() {
  const { initializeTimer } = useOfferTimer()

  useEffect(() => {
    initializeTimer()
  }, [initializeTimer])

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
      <BackgroundAudio />
    </div>
  )
}

export default App