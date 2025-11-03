import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-800 border-t border-white/10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/images/amunet_logo_master.png" 
              alt="Amunet AI" 
              className="h-6 w-6 opacity-70"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%239D00FF' opacity='0.7'/%3E%3Ctext x='12' y='15' text-anchor='middle' fill='white' font-family='Arial' font-size='10'%3EA%3C/text%3E%3C/svg%3E"
              }}
            />
            <span className="font-orbitron font-medium text-white/70">
              Amunet AI
            </span>
          </div>

          {/* Copyright */}
          <div className="text-sm text-white/50">
            © {currentYear} Amunet AI. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-white/70 hover:text-primary-500 transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-white/70 hover:text-primary-500 transition-colors duration-300"
            >
              Terms
            </Link>
            <a 
              href="mailto:sales@amunet.ai" 
              className="text-white/70 hover:text-primary-500 transition-colors duration-300"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer