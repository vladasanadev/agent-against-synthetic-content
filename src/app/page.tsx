'use client';

import { useState, useEffect } from 'react';
import { ChevronDownIcon, StarIcon, ShieldCheckIcon, EyeIcon } from '@heroicons/react/24/solid';
import { CurrencyDollarIcon, ChartBarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// Video background - no additional imports needed

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isSolutionVideoMuted, setIsSolutionVideoMuted] = useState(true);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Scroll detection for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Scroll animations - Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section');
          if (sectionId) {
            setVisibleSections(prev => new Set([...prev, sectionId]));
          }
        }
      });
    }, observerOptions);

    // Observe all sections with data-section attributes
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // Particle animation removed - keeping background fully black

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Email submission handler
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Send email to your address
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        setShowSuccessModal(true);
        setEmail('');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ThumbsUp SVG Component
  const ThumbsUpIcon = () => (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="thumbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#6B7280", stopOpacity:1}} />
          <stop offset="30%" style={{stopColor:"#4B5563", stopOpacity:1}} />
          <stop offset="70%" style={{stopColor:"#374151", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#1F2937", stopOpacity:1}} />
        </linearGradient>
        <linearGradient id="cuffGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#F59E0B", stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:"#F1CA3A", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#D97706", stopOpacity:1}} />
        </linearGradient>
        <filter id="thumbShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="4" dy="4" stdDeviation="6" floodColor="rgba(0, 0, 0, 0.3)"/>
        </filter>
      </defs>
      
      {/* Thumb Shadow */}
      <path d="M25 35C25 30 28 25 35 25C38 25 40 27 42 30L45 35H60C65 35 70 40 70 45V55C70 60 65 65 60 65H45L35 75C30 80 20 75 20 65V45C20 40 22 35 25 35Z" fill="rgba(0,0,0,0.2)" transform="translate(2, 2)"/>
      
      {/* Main Thumb */}
      <path d="M25 35C25 30 28 25 35 25C38 25 40 27 42 30L45 35H60C65 35 70 40 70 45V55C70 60 65 65 60 65H45L35 75C30 80 20 75 20 65V45C20 40 22 35 25 35Z" fill="url(#thumbGradient)" filter="url(#thumbShadow)"/>
      
      {/* Thumb Highlight */}
      <path d="M27 37C27 32 30 27 35 27C37 27 39 28 41 31L44 37H58C62 37 66 41 66 45V53C66 57 62 61 58 61H44L36 71C32 75 24 71 24 63V47C24 42 25 37 27 37Z" fill="none" stroke="rgba(156, 163, 175, 0.3)" strokeWidth="1"/>
      
      {/* Golden Cuff */}
      <ellipse cx="25" cy="65" rx="8" ry="12" fill="url(#cuffGradient)" filter="url(#thumbShadow)"/>
      
      {/* Cuff Highlight */}
      <ellipse cx="25" cy="63" rx="6" ry="9" fill="none" stroke="rgba(255, 215, 0, 0.4)" strokeWidth="0.5"/>
      
      {/* Cuff Details */}
      <rect x="20" y="58" width="10" height="2" rx="1" fill="rgba(255, 215, 0, 0.6)"/>
      <rect x="20" y="62" width="10" height="2" rx="1" fill="rgba(255, 215, 0, 0.6)"/>
      <rect x="20" y="66" width="10" height="2" rx="1" fill="rgba(255, 215, 0, 0.6)"/>
    </svg>
  );







  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white overflow-hidden relative">
      {/* Video Background - Full Page */}
      <div className="fixed inset-0 z-0">
        <video
          ref={(video) => {
            if (video) {
              video.playbackRate = 0.5; // Set playback speed to 0.5x
            }
          }}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.3) contrast(1.1)',
            zIndex: -1
          }}
        >
          <source src="/background-video.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-[#0B0B0B]"></div>
        </video>
      </div>
      
      {/* Background kept fully black - particles removed */}
      
      {/* Navigation */}
      <nav className={`nav-wrapper ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className={`nav-container ${isScrolled ? 'nav-expanded' : ''} flex items-center justify-between w-full ${isScrolled ? 'max-w-full' : 'max-w-[800px]'}`}>
          <div className="flex items-center space-x-3">
            <div className="shield-logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:"#6B7280", stopOpacity:1}} />
                    <stop offset="30%" style={{stopColor:"#4B5563", stopOpacity:1}} />
                    <stop offset="70%" style={{stopColor:"#374151", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#1F2937", stopOpacity:1}} />
                  </linearGradient>
                  <linearGradient id="metalBevel" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:"#9CA3AF", stopOpacity:1}} />
                    <stop offset="50%" style={{stopColor:"#6B7280", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#374151", stopOpacity:1}} />
                  </linearGradient>
                  <linearGradient id="checkmarkGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor:"#F59E0B", stopOpacity:1}} />
                    <stop offset="50%" style={{stopColor:"#F1CA3A", stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor:"#D97706", stopOpacity:1}} />
                  </linearGradient>
                  <filter id="metalShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="rgba(0, 0, 0, 0.6)"/>
                  </filter>
                  <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0, 0, 0, 0.3)"/>
                  </filter>
                </defs>
                
                {/* Outer Shield Shadow */}
                <path d="M20 1L3 7V19C3 29 7 36 20 39C33 36 37 29 37 19V7L20 1Z" fill="rgba(0,0,0,0.3)" transform="translate(2, 2)"/>
                
                {/* Main Shield Body */}
                <path d="M20 1L3 7V19C3 29 7 36 20 39C33 36 37 29 37 19V7L20 1Z" fill="url(#metalGradient)" filter="url(#metalShadow)"/>
                
                {/* Shield Bevel Edge */}
                <path d="M20 2L4 7V19C4 28 8 34 20 37C32 34 36 28 36 19V7L20 2Z" fill="none" stroke="url(#metalBevel)" strokeWidth="0.5"/>
                
                {/* Inner Shield Highlight */}
                <path d="M20 3L5 8V19C5 27 9 32 20 35C31 32 35 27 35 19V8L20 3Z" fill="none" stroke="rgba(156, 163, 175, 0.3)" strokeWidth="0.5"/>
                
                {/* Checkmark Base Shadow */}
                <path d="M13 20L17 24L27 14" stroke="rgba(0, 0, 0, 0.4)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(1, 1)"/>
                
                {/* Main Checkmark */}
                <path d="M13 20L17 24L27 14" stroke="url(#checkmarkGold)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#innerShadow)"/>
                
                {/* Checkmark Highlight */}
                <path d="M13 20L17 24L27 14" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <Link href="/" className="mirage-logo-link cursor-pointer">
              <span className="text-2xl font-bold text-glow">AskMira</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <div className="flex items-center justify-evenly w-full max-w-md mx-8">
              <a href="#features" className="nav-link">
                <span>Features</span>
                <div className="nav-hover-line"></div>
              </a>
              <a href="#use-cases" className="nav-link">
                <span>Use Cases</span>
                <div className="nav-hover-line"></div>
              </a>
              <a href="#verification" className="nav-link">
                <span>Verification</span>
                <div className="nav-hover-line"></div>
              </a>
              <a href="#roadmap" className="nav-link">
                <span>Roadmap</span>
                <div className="nav-hover-line"></div>
              </a>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden hamburger-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <div className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-1-open' : ''}`}></div>
            <div className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-2-open' : ''}`}></div>
            <div className={`hamburger-line ${isMobileMenuOpen ? 'hamburger-line-3-open' : ''}`}></div>
          </button>
          
          {/* Desktop Connect Button */}
          <button 
            onClick={scrollToFooter}
            className="hidden md:block connect-btn px-6 py-2 rounded-full font-medium text-sm transition-all duration-300"
          >
            Connect
          </button>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay">
            <div className="mobile-menu">
              <a href="#features" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Features
              </a>
              <a href="#use-cases" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Use Cases
              </a>
              <a href="#verification" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Verification
              </a>
              <a href="#roadmap" className="mobile-nav-link" onClick={toggleMobileMenu}>
                Roadmap
              </a>
              <button 
                onClick={scrollToFooter}
                className="connect-btn px-6 py-3 rounded-full font-medium text-sm mt-4"
              >
                Connect
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center pb-24 pt-32">
        
        {/* Hero gradient removed - keeping background fully black */}
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="keeping-it-real-badge cursor-pointer mb-12">
              <span className="webzi-yellow font-semibold tracking-wider uppercase text-sm">
                Keeping it Real
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              The future of<br/>
              <span className="gradient-text">verification</span> is here
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              The Oracle of authentic vs synthetic content. Multi-layered AI detection combining proprietary models, forensic metadata analysis, and immutable blockchain verification.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                <input 
                  type="email" 
                  placeholder="Business email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800/50 border border-gray-600 rounded-lg px-6 py-3 w-full sm:w-80 focus:outline-none focus:border-cyan-400 transition-all duration-300"
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary px-8 py-3 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Get Early Access'}
                </button>
              </form>
            </div>
            
            <div className="text-sm text-gray-500">
              Start monitoring for free or <a href="https://telegram.me/vladasanadev" target="_blank" rel="noopener noreferrer" className="webzi-yellow underline cursor-pointer hover:text-yellow-300 transition-colors">msg us!</a>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section - Animated Logos */}
      <section className="py-16 relative overflow-hidden">
        <div className="partners-carousel">
          <div className="partners-track">
            {/* First set of logos */}
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>4am Global</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>CreatorBid</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>ME3 Labs</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>Amplifi</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>Arbus</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>Max Planck Institute</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>SheCodes</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>DFKI</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>Epic Web3</span>
              </div>
            </div>
            <div className="partner-logo whaleinte-logo">
              <div className="whale-logo">
                <div className="whale-icon">W</div>
                <span>WhaleIntelAI</span>
              </div>
            </div>
            
            {/* Duplicate set for seamless loop */}
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>4am Global</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>CreatorBid</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>ME3 Labs</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>Amplifi</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>Arbus</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>Max Planck Institute</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>SheCodes</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>DFKI</span>
              </div>
            </div>
            <div className="partner-logo">
              <div className="logo-placeholder">
                <span>Epic Web3</span>
              </div>
            </div>
            <div className="partner-logo whaleinte-logo">
              <div className="whale-logo">
                <div className="whale-icon">W</div>
                <span>WhaleIntelAI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 relative" data-section="features">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${visibleSections.has('features') ? 'visible' : ''}`}>
            <div className="webzi-yellow text-sm font-semibold tracking-wider uppercase mb-3">
              Accessible for Everyone
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Feature Showcase</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Advanced AI technology for real-time content verification and authenticity detection
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <EyeIcon className="w-8 h-8" />,
                title: "Deepfake Detection",
                description: "Automated identity verification and anti-money laundering compliance tools."
              },
              {
                icon: <CurrencyDollarIcon className="w-8 h-8" />,
                title: "Fact-Checking bot on X",
                description: "Deploy a public-facing bot to analyze content tagged by users and reply with authenticity scores. Serves as both utility and viral awareness tool."
              },
              {
                icon: <ChartBarIcon className="w-8 h-8" />,
                title: "Real-time Data",
                description: "Global reach with content available in multiple languages."
              },
              {
                icon: <GlobeAltIcon className="w-8 h-8" />,
                title: "Detection Models Image&Video",
                description: "Train and deploy foundational deepfake detection models using internal datasets and verified public examples."
              },
              {
                icon: <ShieldCheckIcon className="w-8 h-8" />,
                title: "Blockchain Compliance",
                description: "Exportable reports for tax and accounting purposes."
              },
              {
                icon: <StarIcon className="w-8 h-8" />,
                title: "Exchange Availability",
                description: "AI-powered tools to detect and prevent fraudulent activities."
              }
            ].map((feature, index) => (
              <div key={index} className={`feature-card-hover card-gradient p-6 rounded-xl transition-all duration-500 group scroll-reveal-stagger ${visibleSections.has('features') ? 'visible' : ''}`}>
                <div className="feature-card-content">
                  <div className="feature-card-main">
                    <div className="webzi-yellow mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-3 text-white text-center">{feature.title}</h3>
                  </div>
                  <div className="feature-description">
                    <p className="text-gray-400 leading-relaxed text-sm text-center">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Verification Platform Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-gray-900/5 to-yellow-900/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="webzi-yellow text-sm font-semibold tracking-wider uppercase mb-3">
            Accessible for Everyone
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Verification Platform of the Future!</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
            AskMira unleashes the power of AI agents to revolutionize content verification. From social media fact-checking to enterprise-grade verification APIs, our intelligent agents work 24/7 to protect against deepfakes and misinformation in real-time.
          </p>
          
          <div className="mb-16">
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
              <input 
                type="email" 
                placeholder="Business email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                                  className="bg-gray-800/50 border border-gray-600 rounded-lg px-6 py-3 w-full sm:w-80 focus:outline-none focus:border-cyan-400 transition-all duration-300"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn-primary px-8 py-3 rounded-lg font-semibold flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Get Early Access'}
              </button>
            </form>
          </div>

          {/* Deepfake Statistics Section */}
          <div className="card-gradient p-10 rounded-2xl max-w-3xl mx-auto border border-gray-700/50">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2 transition-all duration-300 hover:scale-105 hover:text-gray-100 cursor-pointer">The Deepfake Crisis</h3>
              <p className="text-gray-400 text-sm transition-all duration-300 hover:text-gray-300 hover:scale-105 cursor-pointer">Understanding the scope of synthetic media threats</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Deepfake videos online", value: "15M+", color: "text-red-400" },
                { label: "Growth rate (YoY)", value: "550%", color: "text-red-400" },
                { label: "Detection accuracy", value: "67%", color: "text-orange-400" },
                { label: "Economic loss", value: "$25B", color: "text-red-400" }
              ].map((item, index) => (
                <div key={index} className="text-center bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 transition-all duration-300 hover:scale-105 hover:bg-gray-800/50 hover:border-gray-600/50 cursor-pointer">
                  <div className={`text-3xl font-bold ${item.color} mb-2 transition-all duration-300 hover:scale-110`}>{item.value}</div>
                  <div className="text-xs text-gray-400 font-medium leading-tight transition-all duration-300 hover:text-gray-300">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Our Solution Section */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2 transition-all duration-300 hover:scale-105 hover:text-gray-100 cursor-pointer">OUR SOLUTION</h3>
            </div>
            
            <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/30 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/60 hover:border-gray-600/50">
              <div className="relative">
                <video
                  autoPlay
                  loop
                  muted={isSolutionVideoMuted}
                  playsInline
                  className="w-full rounded-lg"
                  style={{
                    maxHeight: '600px',
                    objectFit: 'cover'
                  }}
                >
                  <source src="/solution-video.mp4" type="video/mp4" />
                  <div className="w-full h-64 bg-gray-700/50 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Video not supported</span>
                  </div>
                </video>
                
                {/* Sound Toggle Button */}
                <button
                  onClick={() => setIsSolutionVideoMuted(!isSolutionVideoMuted)}
                  className="absolute bottom-4 right-4 bg-gray-800/80 hover:bg-gray-700/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-gray-600/50 hover:border-gray-500"
                  aria-label={isSolutionVideoMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isSolutionVideoMuted ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                      <path d="M23 9l-6 6"/>
                      <path d="M17 9l6 6"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 px-6" data-section="use-cases">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${visibleSections.has('use-cases') ? 'visible' : ''}`}>
            <div className="webzi-yellow text-sm font-semibold tracking-wider uppercase mb-3 hover-underline cursor-pointer">
              Real-World Applications
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Use Cases</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              AskMira transforms content verification across consumer and enterprise markets
            </p>
          </div>

            {/* B2C Section */}
            <div className={`mb-16 scroll-reveal ${visibleSections.has('use-cases') ? 'visible' : ''}`}>
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-black font-bold text-lg mr-4">
                  B2C
                </div>
                <h3 className="text-2xl font-bold text-white">Consumer Applications</h3>
                <div className="ml-3">
                  <svg width="48" height="48" viewBox="0 0 48 48" className="circular-icon">
                    <defs>
                      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <circle cx="24" cy="24" r="22" fill="none" stroke="#00FF7F" strokeWidth="2" filter="url(#glow)"/>
                    <g transform="translate(24, 24)" fill="none" stroke="#00FF7F" strokeWidth="1.5" filter="url(#glow)">
                      {/* Head profile */}
                      <path d="M-8 -4 C-8 -8, -4 -12, 0 -12 C4 -12, 8 -8, 8 -4 L8 2 C8 6, 4 10, 0 10 C-4 10, -8 6, -8 2 Z"/>
                      {/* Inner head details */}
                      <path d="M-6 -2 C-6 -5, -3 -8, 0 -8 C3 -8, 6 -5, 6 -2 L6 1 C6 4, 3 7, 0 7 C-3 7, -6 4, -6 1 Z"/>
                      {/* Brain pattern */}
                      <path d="M-4 -1 C-4 -3, -2 -5, 0 -5 C2 -5, 4 -3, 4 -1 L4 0 C4 2, 2 4, 0 4 C-2 4, -4 2, -4 0 Z"/>
                      {/* Central spiral */}
                      <path d="M-2 0 C-2 -1, -1 -2, 0 -2 C1 -2, 2 -1, 2 0 C2 1, 1 2, 0 2 C-1 2, -2 1, -2 0"/>
                      <circle cx="0" cy="0" r="0.5"/>
                      {/* Neck */}
                      <path d="M-2 10 L-2 14 L2 14 L2 10"/>
                      {/* Decorative elements */}
                      <path d="M-10 -6 C-12 -8, -10 -10, -8 -8"/>
                      <path d="M8 -6 C10 -8, 12 -10, 10 -8"/>
                    </g>
                  </svg>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`usecase-card-hover card-gradient p-6 rounded-xl scroll-reveal-stagger ${visibleSections.has('use-cases') ? 'visible' : ''}`}>
                  <div className="usecase-card-content">
                    <div className="usecase-card-main">
                      <h4 className="text-xl font-semibold text-white mb-4 text-center">Social Media Fact-Checking Bot</h4>
                    </div>
                    <div className="usecase-description">
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 text-center">
                        Deploy bots on X/Twitter, Reddit, and Discord that analyze tagged content and reply with authenticity scores. Boosts awareness and directly engages users.
                      </p>
                      <p className="text-gray-400 text-xs text-center">
                        Supports public fact-checking and can extend across multiple social platforms.
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`usecase-card-hover card-gradient p-6 rounded-xl scroll-reveal-stagger ${visibleSections.has('use-cases') ? 'visible' : ''}`}>
                  <div className="usecase-card-content">
                    <div className="usecase-card-main">
                      <h4 className="text-xl font-semibold text-white mb-4 text-center">Community Verification Market</h4>
                    </div>
                    <div className="usecase-description">
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 text-center">
                        Users wager crypto on content authenticity. After analysis, outcomes are resolved and winners are paid out. VGuard takes a commission.
                      </p>
                      <p className="text-gray-400 text-xs text-center">
                        Drives engagement, crowdsources verification, and generates valuable training data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* B2B Section */}
            <div className={`mb-16 scroll-reveal ${visibleSections.has('use-cases') ? 'visible' : ''}`}>
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-black font-bold text-lg mr-4">
                  B2B
                </div>
                <h3 className="text-2xl font-bold text-white">Enterprise Solutions</h3>
                <div className="ml-3">
                  <svg width="48" height="48" viewBox="0 0 48 48" className="circular-icon">
                    <defs>
                      <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <circle cx="24" cy="24" r="22" fill="none" stroke="#00FF7F" strokeWidth="2" filter="url(#glow2)"/>
                    <g transform="translate(24, 24)" fill="none" stroke="#00FF7F" strokeWidth="1.5" filter="url(#glow2)">
                      {/* Head profile */}
                      <path d="M-8 -4 C-8 -8, -4 -12, 0 -12 C4 -12, 8 -8, 8 -4 L8 2 C8 6, 4 10, 0 10 C-4 10, -8 6, -8 2 Z"/>
                      {/* Inner head details */}
                      <path d="M-6 -2 C-6 -5, -3 -8, 0 -8 C3 -8, 6 -5, 6 -2 L6 1 C6 4, 3 7, 0 7 C-3 7, -6 4, -6 1 Z"/>
                      {/* Brain pattern */}
                      <path d="M-4 -1 C-4 -3, -2 -5, 0 -5 C2 -5, 4 -3, 4 -1 L4 0 C4 2, 2 4, 0 4 C-2 4, -4 2, -4 0 Z"/>
                      {/* Central spiral */}
                      <path d="M-2 0 C-2 -1, -1 -2, 0 -2 C1 -2, 2 -1, 2 0 C2 1, 1 2, 0 2 C-1 2, -2 1, -2 0"/>
                      <circle cx="0" cy="0" r="0.5"/>
                      {/* Neck */}
                      <path d="M-2 10 L-2 14 L2 14 L2 10"/>
                      {/* Decorative elements */}
                      <path d="M-10 -6 C-12 -8, -10 -10, -8 -8"/>
                      <path d="M8 -6 C10 -8, 12 -10, 10 -8"/>
                    </g>
                  </svg>
                </div>
              </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="usecase-card-hover card-gradient p-6 rounded-xl">
                <div className="usecase-card-content">
                  <div className="usecase-card-main">
                    <h4 className="text-lg font-semibold text-white mb-3 text-center">Newsroom & Journalism</h4>
                  </div>
                  <div className="usecase-description">
                    <p className="text-gray-300 text-sm leading-relaxed text-center">
                      Journalists verify content before publishing via web dashboard or CMS API. Flags manipulated media and prevents misinformation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="usecase-card-hover card-gradient p-6 rounded-xl">
                <div className="usecase-card-content">
                  <div className="usecase-card-main">
                    <h4 className="text-lg font-semibold text-white mb-3 text-center">Content Moderation</h4>
                  </div>
                  <div className="usecase-description">
                    <p className="text-gray-300 text-sm leading-relaxed text-center">
                      Social platforms integrate VGuard into moderation pipelines. Scans uploads, flags deepfakes, and triggers review processes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="usecase-card-hover card-gradient p-6 rounded-xl">
                <div className="usecase-card-content">
                  <div className="usecase-card-main">
                    <h4 className="text-lg font-semibold text-white mb-3 text-center">Financial Services & KYC</h4>
                  </div>
                  <div className="usecase-description">
                    <p className="text-gray-300 text-sm leading-relaxed text-center">
                      Banks and exchanges detect deepfake fraud in ID verification. Analyzes selfies, videos, and voice inputs in real-time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="usecase-card-hover card-gradient p-6 rounded-xl">
                <div className="usecase-card-content">
                  <div className="usecase-card-main">
                    <h4 className="text-lg font-semibold text-white mb-3 text-center">Government & Law Enforcement</h4>
                  </div>
                  <div className="usecase-description">
                    <p className="text-gray-300 text-sm leading-relaxed text-center">
                      Forensic analysis of digital evidence and public content. On-chain logging provides legal transparency and auditability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="usecase-card-hover card-gradient p-6 rounded-xl">
                <div className="usecase-card-content">
                  <div className="usecase-card-main">
                    <h4 className="text-lg font-semibold text-white mb-3 text-center">Content Creators & Platforms</h4>
                  </div>
                  <div className="usecase-description">
                    <p className="text-gray-300 text-sm leading-relaxed text-center">
                      Authenticity badges for verified content. Stock photo sites and social platforms build audience trust through verification.
                    </p>
                  </div>
                </div>
              </div>

              <div className="usecase-card-hover card-gradient p-6 rounded-xl border border-cyan-400/20">
                <div className="usecase-card-content">
                  <div className="usecase-card-main">
                    <h4 className="text-lg font-semibold text-white mb-3 text-center">Enterprise Suite</h4>
                  </div>
                  <div className="usecase-description">
                    <p className="text-gray-300 text-sm leading-relaxed text-center">
                      Unified platform combining all solutions. Enterprise-grade security and scalability for comprehensive content verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 px-6" data-section="roadmap">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${visibleSections.has('roadmap') ? 'visible' : ''}`}>
            <div className="webzi-yellow text-sm font-semibold tracking-wider uppercase mb-3">
              Our Journey
            </div>
            <div className="flex items-center justify-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold">Roadmap</h2>
              <div className="ml-4">
                <svg width="48" height="48" viewBox="0 0 48 48" className="circular-icon">
                  <defs>
                    <filter id="roadmapGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <circle cx="24" cy="24" r="22" fill="none" stroke="#00FF7F" strokeWidth="2" filter="url(#roadmapGlow)" className="animate-pulse"/>
                  <g transform="translate(24, 24)" fill="none" stroke="#00FF7F" strokeWidth="1.5" filter="url(#roadmapGlow)">
                    {/* Central Circle */}
                    <circle cx="0" cy="0" r="8" strokeWidth="2"/>
                    {/* Clock Numbers */}
                    <circle cx="0" cy="-6" r="1" fill="#00FF7F"/>
                    <circle cx="4" cy="-4" r="1" fill="#00FF7F"/>
                    <circle cx="6" cy="0" r="1" fill="#00FF7F"/>
                    <circle cx="4" cy="4" r="1" fill="#00FF7F"/>
                    <circle cx="0" cy="6" r="1" fill="#00FF7F"/>
                    <circle cx="-4" cy="4" r="1" fill="#00FF7F"/>
                    <circle cx="-6" cy="0" r="1" fill="#00FF7F"/>
                    <circle cx="-4" cy="-4" r="1" fill="#00FF7F"/>
                    {/* Clock Hands */}
                    <path d="M0 0 L0 -4" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M0 0 L3 2" strokeWidth="2" strokeLinecap="round"/>
                    {/* Center Dot */}
                    <circle cx="0" cy="0" r="1" fill="#00FF7F"/>
                  </g>
                </svg>
              </div>
            </div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Strategic development phases for the future of content verification
            </p>
          </div>

          {/* Phase 1 */}
          <div className={`mb-16 scroll-reveal ${visibleSections.has('roadmap') ? 'visible' : ''}`}>
            <div className="card-gradient p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-black font-bold text-lg mr-4 animate-pulse">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white">Phase 1 – Core Infrastructure & MVP</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Launch Social Fact-Checking Bot (X/Twitter)",
                    description: "Deploy a public-facing bot to analyze content tagged by users and reply with authenticity scores. Serves as both utility and viral awareness tool."
                  },
                  {
                    title: "Verification-as-a-Service (VaaS) API (Beta)",
                    description: "Release a developer-accessible API for image/video/text verification. Supports both pay-per-use and enterprise integrations."
                  },
                  {
                    title: "Agent Web Dashboard (Basic)",
                    description: "Build a lightweight interface for non-technical users (journalists, researchers, creators) to upload and verify content."
                  },
                  {
                    title: "Initial Detection Models (Image & Video)",
                    description: "Train and deploy foundational deepfake detection models using internal datasets and verified public examples."
                  }
                ].map((item, index) => (
                  <div key={index} className={`usecase-card-hover card-gradient p-6 rounded-lg border border-green-400/10 scroll-reveal-stagger ${visibleSections.has('roadmap') ? 'visible' : ''}`}>
                    <div className="usecase-card-content">
                      <div className="usecase-card-main">
                        <h4 className="text-lg font-semibold text-white mb-2 text-center">{item.title}</h4>
                      </div>
                      <div className="usecase-description">
                        <p className="text-gray-300 text-sm leading-relaxed text-center">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              

            </div>
          </div>

          {/* Phase 2 */}
          <div className={`mb-16 scroll-reveal ${visibleSections.has('roadmap') ? 'visible' : ''}`}>
            <div className="card-gradient p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 animate-pulse">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white">Phase 2 – Ecosystem Expansion & Utility</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Telegram, Reddit, and Discord Bot Integrations",
                    description: "Expand fact-checking bot functionality to additional platforms with high misinformation activity."
                  },
                  {
                    title: "Verification Badge System (for Creators/Platforms)",
                    description: "Launch a system that allows verified content to display authenticity badges, useful for stock media platforms and influencers."
                  },
                  {
                    title: "Onboarding Newsrooms & Fact-Checkers",
                    description: "Initiate pilots with media partners to integrate VGuard into newsroom workflows and CMS platforms."
                  },
                  {
                    title: "Voice & Text Deepfake Detection",
                    description: "Extend detection capabilities to synthesized speech and AI-generated text, enabling broader verification use cases (e.g., phone scams, fake news)."
                  }
                ].map((item, index) => (
                  <div key={index} className={`usecase-card-hover card-gradient p-6 rounded-lg border border-green-400/10 scroll-reveal-stagger ${visibleSections.has('roadmap') ? 'visible' : ''}`}>
                    <div className="usecase-card-content">
                      <div className="usecase-card-main">
                        <h4 className="text-lg font-semibold text-white mb-2 text-center">{item.title}</h4>
                      </div>
                      <div className="usecase-description">
                        <p className="text-gray-300 text-sm leading-relaxed text-center">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Token Mechanics */}
              <div className={`mt-6 usecase-card-hover card-gradient p-6 rounded-lg border border-green-400/10 scroll-reveal-stagger ${visibleSections.has('roadmap') ? 'visible' : ''}`}>
                <div className="usecase-card-content">
                  <div className="usecase-card-main">
                    <h4 className="text-lg font-semibold text-white mb-2 text-center">Basic Token Mechanics</h4>
                  </div>
                  <div className="usecase-description">
                    <p className="text-gray-300 text-sm leading-relaxed text-center">
                      Introduce token-based access features (e.g., pay in token for API calls, stake for higher limits), along with initial treasury infrastructure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* FAQ Section */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="webzi-yellow text-sm font-semibold tracking-wider uppercase mb-3">
              Questions & Answers
            </div>
            <div className="flex items-center justify-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold">FAQ</h2>
              <div className="ml-4">
                <svg width="48" height="48" viewBox="0 0 48 48" className="circular-icon">
                  <defs>
                    <filter id="faqGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <circle cx="24" cy="24" r="22" fill="none" stroke="#00FF7F" strokeWidth="2" filter="url(#faqGlow)" className="animate-pulse"/>
                  <g transform="translate(24, 24)" fill="none" stroke="#00FF7F" strokeWidth="1.5" filter="url(#faqGlow)">
                    {/* Head Profile */}
                    <path d="M-8 2 Q-8 -8 0 -8 Q8 -8 8 2 Q8 8 4 10 L4 12 L-4 12 L-4 10 Q-8 8 -8 2 Z" strokeWidth="1.5"/>
                    
                    {/* Brain/Tech Lines */}
                    <path d="M-4 -4 Q0 -6 4 -4" strokeWidth="1"/>
                    <path d="M-4 -1 Q0 -3 4 -1" strokeWidth="1"/>
                    <path d="M-4 2 Q0 0 4 2" strokeWidth="1"/>
                    
                    {/* Tech Circuit Elements */}
                    <circle cx="-2" cy="-2" r="1" fill="#00FF7F"/>
                    <circle cx="2" cy="-2" r="1" fill="#00FF7F"/>
                    <circle cx="0" cy="1" r="1" fill="#00FF7F"/>
                    
                    {/* Question Mark */}
                    <path d="M-1 -5 Q0 -6 1 -5 Q2 -4 1 -3 Q0 -2 0 -1" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="0" cy="0.5" r="0.5" fill="#00FF7F"/>
                    
                    {/* Connecting Lines */}
                    <path d="M-6 -2 L-4 -2" strokeWidth="1"/>
                    <path d="M4 -2 L6 -2" strokeWidth="1"/>
                    <path d="M0 -8 L0 -6" strokeWidth="1"/>
                  </g>
                </svg>
              </div>
            </div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about our AI-powered verification platform
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              {
                question: "What is deepfake?",
                answer: "A deepfake is an AI-generated image, video or audio. It can depict people, objects, or events in ways that did not actually occur but appear to be real."
              },
              {
                question: "How does our deepfake detection work?",
                answer: "Our Deepfake Detection uses multiple AI models to analyze subtle patterns in media such as inconsistencies in lighting, facial movements, or compression artifacts that reveal signs of manipulation. Additionally, metadata and watermarks can be checked, and a reverse image search can provide insights into the image's origin."
              },
              {
                question: "How accurate is deepfake detection?",
                answer: "Our multi‑detector framework achieves >98% accuracy on benchmark datasets, and provides visual explanations for every prediction. While real-world scenarios can be more challenging, we actively monitor weaknesses and continuously improve our system to ensure it remains robust and reliable in the wild."
              },
              {
                question: "Can your tool detect deepfakes in real time?",
                answer: "Yes, our soft- and hardware is optimized for high performance and can detect deepfakes in real-time or batch-process large volumes of content, depending on your need."
              }
            ].map((faq, index) => (
              <div key={index} className="card-gradient p-8 rounded-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                  <ChevronDownIcon className="w-6 h-6 webzi-yellow" />
                </div>
                <p className="text-gray-400 text-base leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-gray-800/50 bg-gradient-to-b from-gray-900/50 to-black relative overflow-hidden min-h-[60vh] flex flex-col">
        {/* Cool Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-green-400/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col justify-between h-full flex-1">
          {/* Main Footer Content */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="shield-logo">
                <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="metalGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:"#6B7280", stopOpacity:1}} />
                      <stop offset="30%" style={{stopColor:"#4B5563", stopOpacity:1}} />
                      <stop offset="70%" style={{stopColor:"#374151", stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:"#1F2937", stopOpacity:1}} />
                    </linearGradient>
                    <linearGradient id="metalBevelFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:"#9CA3AF", stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:"#6B7280", stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:"#374151", stopOpacity:1}} />
                    </linearGradient>
                    <linearGradient id="checkmarkGoldFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:"#F59E0B", stopOpacity:1}} />
                      <stop offset="50%" style={{stopColor:"#F1CA3A", stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:"#D97706", stopOpacity:1}} />
                    </linearGradient>
                    <filter id="metalShadowFooter" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="3" dy="3" stdDeviation="4" floodColor="rgba(0, 0, 0, 0.6)"/>
                    </filter>
                    <filter id="innerShadowFooter" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="rgba(0, 0, 0, 0.3)"/>
                    </filter>
                  </defs>
                  
                  {/* Outer Shield Shadow */}
                  <path d="M20 1L3 7V19C3 29 7 36 20 39C33 36 37 29 37 19V7L20 1Z" fill="rgba(0,0,0,0.3)" transform="translate(2, 2)"/>
                  
                  {/* Main Shield Body */}
                  <path d="M20 1L3 7V19C3 29 7 36 20 39C33 36 37 29 37 19V7L20 1Z" fill="url(#metalGradientFooter)" filter="url(#metalShadowFooter)"/>
                  
                  {/* Shield Bevel Edge */}
                  <path d="M20 2L4 7V19C4 28 8 34 20 37C32 34 36 28 36 19V7L20 2Z" fill="none" stroke="url(#metalBevelFooter)" strokeWidth="0.5"/>
                  
                  {/* Inner Shield Highlight */}
                  <path d="M20 3L5 8V19C5 27 9 32 20 35C31 32 35 27 35 19V8L20 3Z" fill="none" stroke="rgba(156, 163, 175, 0.3)" strokeWidth="0.5"/>
                  
                  {/* Checkmark Base Shadow */}
                  <path d="M13 20L17 24L27 14" stroke="rgba(0, 0, 0, 0.4)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(1, 1)"/>
                  
                  {/* Main Checkmark */}
                  <path d="M13 20L17 24L27 14" stroke="url(#checkmarkGoldFooter)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#innerShadowFooter)"/>
                  
                  {/* Checkmark Highlight */}
                  <path d="M13 20L17 24L27 14" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <span className="text-3xl font-bold text-glow">AskMira</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-8 max-w-2xl mx-auto">
              Join future with AskMira.
            </h2>
            
            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 mb-12">
              <a href="https://x.com/vladasanadev" target="_blank" rel="noopener noreferrer" className="social-icon-footer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://telegram.me/vladasanadev" target="_blank" rel="noopener noreferrer" className="social-icon-footer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-icon-footer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0003 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Copyright Section - Stuck to Bottom */}
          <div className="text-center mt-auto">
            <p className="text-sm text-gray-400 font-medium">
              © 2025 AskMira. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center success-modal-backdrop">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setShowSuccessModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="success-modal relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-filter backdrop-blur-xl border border-yellow-400/20 rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            
            {/* Thumbs Up Icon */}
            <div className="mb-6 flex justify-center">
              <div className="animate-bounce">
                <ThumbsUpIcon />
              </div>
            </div>
            
            {/* Success Message */}
            <h2 className="text-2xl font-bold text-white mb-4">
              Welcome to the Waitlist!
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Thank you for your interest in AskMira! We&apos;ve added you to our exclusive early access list. 
              You&apos;ll be among the first to experience the future of verification.
            </p>
            
            {/* Golden Accent */}
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6 rounded-full"></div>
            
            {/* Close Button */}
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="btn-primary px-8 py-3 rounded-lg font-semibold w-full"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
