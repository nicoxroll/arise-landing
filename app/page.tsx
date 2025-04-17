"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check, ChevronRight, Github, Instagram, Linkedin, Twitter } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import "./fonts.css"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Smooth scroll function
  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement>) => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop - 80, // Offset for header
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Parallax effect for hero section
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"])
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0])

  // Parallax effects for other sections
  const { scrollYProgress: featuresScrollProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"],
  })

  const featuresY = useTransform(featuresScrollProgress, [0, 1], ["5%", "-5%"])

  const { scrollYProgress: portfolioScrollProgress } = useScroll({
    target: portfolioRef,
    offset: ["start end", "end start"],
  })

  const portfolioY = useTransform(portfolioScrollProgress, [0, 1], ["5%", "-5%"])

  const { scrollYProgress: testimonialsScrollProgress } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "end start"],
  })

  const testimonialsY = useTransform(testimonialsScrollProgress, [0, 1], ["5%", "-5%"])

  // Particle effect
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.1,
        })
      }
      setParticles(newParticles)
    }
    generateParticles()
  }, [])

  useEffect(() => {
    const moveParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          y: particle.y > 100 ? 0 : particle.y + particle.speed,
        })),
      )
    }

    const interval = setInterval(moveParticles, 50)
    return () => clearInterval(interval)
  }, [])

  // Portfolio timeline data
  const portfolioItems = [
    {
      year: "2023",
      title: "Global Enterprise Solution",
      client: "Fortune 500 Tech Company",
      description:
        "Implemented a comprehensive workflow management system that increased productivity by 35% across 12 international offices.",
      image: "/images/portfolio-1.jpg",
      tags: ["Enterprise", "Global", "Workflow"],
    },
    {
      year: "2022",
      title: "Healthcare Management Platform",
      client: "National Healthcare Provider",
      description:
        "Developed a secure, HIPAA-compliant platform that streamlined patient care coordination and reduced administrative overhead by 42%.",
      image: "/images/portfolio-2.jpg",
      tags: ["Healthcare", "Security", "Compliance"],
    },
    {
      year: "2021",
      title: "Financial Services Dashboard",
      client: "International Banking Group",
      description:
        "Created an intuitive analytics dashboard that processes over 1 million transactions daily with real-time insights and reporting.",
      image: "/images/portfolio-3.jpg",
      tags: ["Finance", "Analytics", "Real-time"],
    },
    {
      year: "2020",
      title: "E-commerce Transformation",
      client: "Retail Conglomerate",
      description:
        "Redesigned the entire digital shopping experience, resulting in a 78% increase in mobile conversions and 45% higher average order value.",
      image: "/images/portfolio-4.jpg",
      tags: ["E-commerce", "Mobile", "UX Design"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-black text-white overflow-hidden">
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-hiperion text-3xl tracking-wider text-white">ARISE</h2>
              <button onClick={() => setIsMenuOpen(false)} className="text-white p-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-xl">
              <button
                onClick={() => scrollToSection(featuresRef)}
                className="text-white hover:text-gray-300 transition-colors py-2 border-b border-gray-800 text-left"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection(portfolioRef)}
                className="text-white hover:text-gray-300 transition-colors py-2 border-b border-gray-800 text-left"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection(testimonialsRef)}
                className="text-white hover:text-gray-300 transition-colors py-2 border-b border-gray-800 text-left"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection(pricingRef)}
                className="text-white hover:text-gray-300 transition-colors py-2 border-b border-gray-800 text-left"
              >
                Pricing
              </button>
            </nav>
            <div className="mt-auto">
              <Button className="w-full bg-white text-black hover:bg-gray-200 mb-4">Get Started</Button>
              <Button variant="outline" className="w-full border-gray-600 text-white hover:bg-gray-800">
                Log in
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-800/30 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-hiperion text-xl tracking-wider text-white">ARISE</h2>
          </div>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection(portfolioRef)}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection(testimonialsRef)}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              Testimonials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection(pricingRef)}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#" className="hidden sm:block text-sm font-medium text-gray-400 hover:text-white">
              Log in
            </Link>
            <Button className="hidden sm:flex bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              Get Started
            </Button>
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 12H21M3 6H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section ref={heroRef} className="w-full h-screen relative overflow-hidden flex items-center">
          {/* Particle effect */}
          <div className="absolute inset-0 z-0">
            {particles.map((particle, index) => (
              <div
                key={index}
                className="absolute rounded-full bg-white opacity-70"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                }}
              />
            ))}
          </div>

          {/* Background image with parallax */}
          <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>

            {/* Watermark image */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
              <div className="w-full h-[40vh] md:h-[30vh] relative">
                <Image src="/images/watermark.jpg" alt="Watermark" fill className="object-cover opacity-80" />
              </div>
            </div>
          </motion.div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black z-10"></div>

          {/* Content */}
          <motion.div className="container px-4 md:px-6 relative z-20" style={{ opacity: heroOpacity }}>
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6"
              >
                <h1 className="font-hiperion text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider text-white mb-4 relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
                    ARISE
                  </span>
                </h1>
                <div className="h-px w-40 bg-gradient-to-r from-transparent via-white to-transparent mx-auto my-8"></div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-2xl mx-auto text-gray-300 text-xl md:text-2xl mb-8"
              >
                Elevate your workflow, amplify your productivity. The platform that helps teams rise above challenges.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  onClick={() => scrollToSection(featuresRef)}
                  className="bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 text-lg px-8 py-6"
                >
                  Start for free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-500 text-white hover:bg-white/10 transition-all duration-300 text-lg px-8 py-6"
                >
                  Book a demo
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          >
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-400 mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  className="w-1.5 h-1.5 bg-white rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" ref={featuresRef} className="w-full py-20 md:py-32 lg:py-40 bg-black relative">
          {/* Gradient background with parallax */}
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-gray-900/50 to-black"
            style={{ y: featuresY }}
          ></motion.div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-1.5 text-sm text-gray-300 mb-4">
                  Features
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
                    Everything you need to succeed
                  </span>
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl mt-6">
                  Our platform provides all the tools you need to manage your projects efficiently and collaborate with
                  your team seamlessly.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-12 md:grid-cols-3">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  ),
                  title: "Lightning Fast",
                  description:
                    "Our platform is optimized for speed, ensuring that you can work without any delays or interruptions.",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M16 18l6-6-6-6" />
                      <path d="M8 6l-6 6 6 6" />
                    </svg>
                  ),
                  title: "Customizable",
                  description: "Tailor the platform to your specific needs with our extensive customization options.",
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                  title: "Time-Saving",
                  description:
                    "Automate repetitive tasks and focus on what matters most with our time-saving features.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 p-8 h-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:translate-y-[-5px]">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                    <div className="flex flex-col h-full">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-gray-300 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                          {feature.description}
                        </p>
                      </div>
                      <div className="mt-6 pt-6 border-t border-gray-800">
                        <div className="flex items-center text-sm text-gray-400 group-hover:text-white transition-colors">
                          <span>Learn more</span>
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Timeline Section */}
        <section id="portfolio" ref={portfolioRef} className="w-full py-20 md:py-32 lg:py-40 bg-black relative">
          {/* Gradient background with parallax */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"
            style={{ y: portfolioY }}
          ></motion.div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-1.5 text-sm text-gray-300 mb-4">
                  Portfolio
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
                    Our success stories
                  </span>
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl mt-6">
                  Explore our portfolio of transformative projects that have helped businesses achieve their goals.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-white/5 via-white/20 to-white/5"></div>

              {/* Timeline items */}
              <div className="space-y-24">
                {portfolioItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 50,
                    }}
                    className={`relative flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-8 md:gap-16`}
                  >
                    {/* Year marker */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="absolute left-1/2 transform -translate-x-1/2 z-10"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                          {item.year}
                        </div>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <motion.div
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                        className="space-y-4"
                      >
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.client}</p>
                        <p className="text-gray-300">{item.description}</p>
                        <div className={`flex gap-2 flex-wrap ${index % 2 === 0 ? "md:justify-end" : "justify-start"}`}>
                          {item.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-block px-3 py-1 text-xs rounded-full bg-white/10 text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Image with parallax */}
                    <div className="w-full md:w-1/2">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: index % 2 === 0 ? 20 : -20 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                        whileHover={{ scale: 1.03 }}
                        className="relative overflow-hidden rounded-xl aspect-video"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/30"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" ref={testimonialsRef} className="w-full py-20 md:py-32 lg:py-40 bg-black relative">
          {/* Gradient background with parallax */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/30 to-black"
            style={{ y: testimonialsY }}
          ></motion.div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-1.5 text-sm text-gray-300 mb-4">
                  Testimonials
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
                    Loved by businesses worldwide
                  </span>
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl mt-6">
                  Don't just take our word for it. Here's what our customers have to say about ARISE.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO, TechStart",
                  content:
                    "ARISE has completely transformed how our team collaborates. We've seen a 40% increase in productivity since implementing it.",
                },
                {
                  name: "Mark Thompson",
                  role: "CTO, GrowthLabs",
                  content:
                    "The automation features in ARISE have saved us countless hours. It's the best investment we've made for our team.",
                },
                {
                  name: "Emily Chen",
                  role: "Product Manager, Innovate",
                  content:
                    "The intuitive interface and powerful features make ARISE a joy to use. Our team adopted it within days.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-full">
                    {/* Glassmorphism card */}
                    <div className="relative h-full overflow-hidden rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative z-10">
                        <div className="mb-6 text-4xl text-white/20">"</div>
                        <p className="text-gray-300 mb-6 text-lg">{testimonial.content}</p>
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
                          <div className="ml-4">
                            <p className="text-white font-medium">{testimonial.name}</p>
                            <p className="text-gray-400 text-sm">{testimonial.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" ref={pricingRef} className="w-full py-20 md:py-32 lg:py-40 bg-black relative">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-1.5 text-sm text-gray-300 mb-4">
                  Pricing
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
                    Simple, transparent pricing
                  </span>
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl mt-6">
                  Choose the plan that's right for you and start elevating your workflow today.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Starter",
                  price: "$9",
                  description: "Perfect for individuals and small teams.",
                  features: ["5 projects", "2 team members", "Basic automation", "24/7 support"],
                  popular: false,
                },
                {
                  title: "Professional",
                  price: "$29",
                  description: "Ideal for growing teams and businesses.",
                  features: [
                    "Unlimited projects",
                    "10 team members",
                    "Advanced automation",
                    "Priority support",
                    "Custom integrations",
                  ],
                  popular: true,
                },
                {
                  title: "Enterprise",
                  price: "$99",
                  description: "For large organizations with complex needs.",
                  features: [
                    "Unlimited everything",
                    "Dedicated account manager",
                    "Custom development",
                    "SLA guarantees",
                    "Advanced security",
                  ],
                  popular: false,
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group"
                >
                  <div
                    className={`relative h-full overflow-hidden rounded-xl backdrop-blur-xl bg-white/5 border ${
                      plan.popular ? "border-white/30" : "border-white/10"
                    } p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:translate-y-[-5px]`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-white text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                          Most Popular
                        </div>
                      </div>
                    )}

                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-2">{plan.title}</h3>
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        <span className="text-sm font-normal text-gray-400 ml-1">/month</span>
                      </div>
                      <p className="text-gray-400 mt-2">{plan.description}</p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-white" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${plan.popular ? "bg-white text-black hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20"} transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
                    >
                      {plan.title === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section ref={ctaRef} className="w-full py-20 md:py-32 lg:py-40 bg-black relative">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/30 to-black"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
                    Ready to rise above?
                  </span>
                </h2>
                <p className="max-w-[600px] mx-auto text-gray-400 md:text-xl mt-6">
                  Join thousands of teams that are already using ARISE to boost their productivity.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 mt-8"
              >
                <Button
                  onClick={() => scrollToSection(featuresRef)}
                  className="bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-300 text-lg px-8 py-6"
                >
                  Get started for free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-500 text-white hover:bg-white/10 transition-all duration-300 text-lg px-8 py-6"
                >
                  Schedule a demo
                </Button>
              </motion.div>

              <p className="text-xs text-gray-500 mt-6">No credit card required. 14-day free trial.</p>
            </motion.div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="w-full py-20 md:py-32 lg:py-40 bg-black relative">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/20 to-black"></div>

          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-1.5 text-sm text-gray-300 mb-4">
                  Contact Us
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
                    Get in touch
                  </span>
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl mt-6">
                  Have questions or ready to elevate your workflow? Reach out to our team.
                </p>
              </div>
            </motion.div>

            <div className="grid gap-10 lg:grid-cols-2">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                  <form className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-300">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          className="w-full rounded-md border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="Your email"
                          className="w-full rounded-md border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        placeholder="How can we help?"
                        className="w-full rounded-md border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-300">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Your message"
                        className="w-full rounded-md border border-gray-700 bg-gray-800/50 px-4 py-3 text-white placeholder-gray-500 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                      Send Message
                    </Button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Map or Image */}
                <div className="relative h-[300px] overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
                  <Image src="/images/map-dark.jpg" alt="Location" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  {[
                    {
                      title: "Visit Us",
                      description: "100 Innovation Drive, Tech District, San Francisco, CA 94107",
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      ),
                    },
                    {
                      title: "Call Us",
                      description: "+1 (555) 123-4567",
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      ),
                    },
                    {
                      title: "Email Us",
                      description: "hello@ariseplatform.com",
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      ),
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 text-white">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-12 md:py-16 lg:py-20 bg-black">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="font-hiperion text-xl tracking-wider text-white">ARISE</h2>
              </div>
              <p className="text-sm text-gray-400">
                Elevate your workflow, amplify your productivity. The platform that helps teams rise above challenges.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Product</h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Integrations", "Changelog", "Roadmap"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Company</h3>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Press", "Partners"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Legal</h3>
              <ul className="space-y-2">
                {["Terms", "Privacy", "Cookies", "Licenses", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ARISE. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
