import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Parallax } from 'react-scroll-parallax'
import { 
  Zap, 
  Phone, 
  MessageSquare, 
  Mail, 
  Camera, 
  Video, 
  TrendingUp,
  ArrowRight,
  Star,
  Shield,
  Globe,
  Users
} from 'lucide-react'

const Home: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const features = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "AI Receptionist",
      description: "Never miss a call. Our AI handles inquiries, books appointments, and qualifies leads 24/7."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Smart SMS",
      description: "Automated follow-ups and instant responses that convert leads into customers."
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Newsletter Magic",
      description: "AI-generated content that engages your audience and drives repeat business."
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Amunet Create",
      description: "Generate stunning visuals for your marketing campaigns in seconds."
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Amunet Motion",
      description: "Create professional videos that captivate and convert your audience."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "ROI Tracking",
      description: "Real-time analytics showing exactly how much revenue AI is generating."
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      company: "Digital Marketing Agency",
      quote: "Amunet increased our lead conversion by 340% in just 30 days. The AI receptionist never sleeps!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      company: "Real Estate Firm",
      quote: "The automated follow-ups alone generated $50K in additional revenue last month.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      company: "E-commerce Store",
      quote: "I can't believe how much time I save. The AI handles everything while I focus on growth.",
      rating: 5
    }
  ]

  const stats = [
    { number: "340%", label: "Avg. Lead Increase" },
    { number: "24/7", label: "AI Availability" },
    { number: "2.3x", label: "Revenue Growth" },
    { number: "98%", label: "Customer Satisfaction" }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-20"
          >
            <source src="/videos/amunet_commercial.webm" type="video/webm" />
            <source src="/videos/amunet_commercial.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-dark-900/60"></div>
        </div>

        {/* Animated Background Elements */}
        <Parallax speed={-20} className="absolute inset-0 z-10">
          <div className="hero-gradient w-full h-full"></div>
        </Parallax>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="font-orbitron font-black text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Ancient Intelligence
              <br />
              <span className="text-gradient">Modern Results</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/80 mb-8 font-nunito"
            >
              Transform your business with AI that works like ancient wisdom—
              <br className="hidden md:block" />
              powerful, mysterious, and absolutely profitable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                Start Free Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/demo" className="btn-secondary text-lg px-8 py-4">
                Watch Demo
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-orbitron font-bold text-3xl md:text-4xl text-primary-500 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/60 font-nunito">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-primary-500 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark-800">
        <div className="container mx-auto px-4">
          <Parallax speed={-10}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-6">
                Six Pillars of <span className="text-gradient">Digital Dominance</span>
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto font-nunito">
                Each tool is designed to work together, creating a unified AI ecosystem 
                that transforms every aspect of your business.
              </p>
            </motion.div>
          </Parallax>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="glass p-8 rounded-xl hover:border-primary-500/30 transition-all duration-300 group"
              >
                <div className="text-primary-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-orbitron font-bold text-xl mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-white/70 font-nunito leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-dark-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-6">
              Real Results from <span className="text-gradient">Real Businesses</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-xl"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-white/80 mb-4 font-nunito italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-orbitron font-semibold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-primary-500 text-sm">
                    {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-500 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-orbitron font-black text-4xl md:text-6xl mb-6 text-white">
              Ready to Unleash Ancient Power?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-nunito">
              Join thousands of businesses already using Amunet AI to dominate their markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="bg-white text-primary-500 hover:bg-white/90 font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg text-lg"
              >
                Start Your Free Demo
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                Talk to Expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home