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
            <h1 className="text-3xl md:text-5xl font-bold mb-12 mt-16 leading-relaxed">
              The future of<br/>
              <span className="gradient-text">verification</span> is here
            </h1>

          </div>
        </div>
      </section>



      <div className="section-divider"></div>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 relative" data-section="features">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 scroll-reveal ${visibleSections.has('features') ? 'visible' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Feature Showcase</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* First 3 cards */}
            {[
              {
                icon: <EyeIcon className="w-8 h-8" />,
                title: "Mira",
                description: "Our first AI agent for real-time deepfake detection on social media across text, image, and video content."
              },
              {
                icon: <CurrencyDollarIcon className="w-8 h-8" />,
                title: "Oasic",
                description: "PolyMarket-style community prediction market for content authentication and model training."
              },
              {
                icon: <ChartBarIcon className="w-8 h-8" />,
                title: "AIlyser",
                description: "Verification agent for everyday & fun tasks."
              }
            ].map((feature, index) => (
              <div key={index} className={`feature-card-hover card-gradient p-6 rounded-xl transition-all duration-500 group scroll-reveal-stagger ${visibleSections.has('features') ? 'visible' : ''}`}>
                <div className="feature-card-content">
                  <div className="feature-card-main">
                    <div className="webzi-yellow mb-4 transition-all duration-500 group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 text-center transition-all duration-500">
                      {feature.title}
                    </h3>
                  </div>
                  <div className="feature-description">
                    <p className="text-gray-300 text-sm leading-relaxed text-center">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Last 2 cards - centered */}
            <div className="lg:col-span-3 flex justify-center gap-8">
              <div className="w-full max-w-sm">
                <div className={`feature-card-hover card-gradient p-6 rounded-xl transition-all duration-500 group scroll-reveal-stagger ${visibleSections.has('features') ? 'visible' : ''}`}>
                  <div className="feature-card-content">
                    <div className="feature-card-main">
                      <div className="webzi-yellow mb-4 transition-all duration-500 group-hover:scale-110">
                        <GlobeAltIcon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2 text-center transition-all duration-500">
                        B2B Services
                      </h3>
                    </div>
                    <div className="feature-description">
                      <p className="text-gray-300 text-sm leading-relaxed text-center">
                        Comprehensive solutions for newsroom & journalism verification, enterprise content moderation, financial services & KYC, government & law enforcement. Trusted by content creators & platforms worldwide for reliable verification services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full max-w-sm">
                <div className={`feature-card-hover card-gradient p-6 rounded-xl transition-all duration-500 group scroll-reveal-stagger ${visibleSections.has('features') ? 'visible' : ''}`}>
                  <div className="feature-card-content">
                    <div className="feature-card-main">
                      <div className="webzi-yellow mb-4 transition-all duration-500 group-hover:scale-110">
                        <ShieldCheckIcon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2 text-center transition-all duration-500">
                        VeriFi
                      </h3>
                    </div>
                    <div className="feature-description">
                      <p className="text-gray-300 text-sm leading-relaxed text-center">
                        The on-chain credibility score, proving who's the real deal, and who's just noise.
                      </p>
                    </div>
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

                    {/* Visual Roadmap */}
          <div className={`scroll-reveal ${visibleSections.has('roadmap') ? 'visible' : ''}`}>
            <div className="max-w-7xl mx-auto">
              {/* Roadmap Timeline */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-green-400 via-cyan-400 via-purple-500 to-orange-500 opacity-60" style={{top: '32px', bottom: '32px'}}></div>
                
                {/* Phase 1 */}
                <div className="relative flex items-center mb-32 lg:mb-48">
                  <div className="flex-1 pr-12 lg:pr-20 text-right">
                    <div className="mb-8 lg:mb-12">
                      <div className="inline-block bg-gradient-to-r from-green-400/10 to-green-600/10 px-6 py-2 rounded-full border border-green-400/20 mb-4">
                        <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">Q1</span>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Foundation</h3>
                      <h4 className="text-lg lg:text-xl text-green-400 font-medium mb-8">Core Infrastructure & MVP</h4>
                    </div>
                    <div className="space-y-3 text-gray-300 max-w-sm ml-auto">
                      <div className="flex items-center justify-end">
                        <div className="font-medium text-white">Social Bot Launch</div>
                        <div className="w-2 h-2 bg-green-400 rounded-full ml-4 flex-shrink-0"></div>
                      </div>
                      <div className="flex items-center justify-end">
                        <div className="font-medium text-white">Verification API</div>
                        <div className="w-2 h-2 bg-green-400 rounded-full ml-4 flex-shrink-0"></div>
                      </div>
                      <div className="flex items-center justify-end">
                        <div className="font-medium text-white">Web Dashboard</div>
                        <div className="w-2 h-2 bg-green-400 rounded-full ml-4 flex-shrink-0"></div>
                      </div>
                      <div className="flex items-center justify-end">
                        <div className="font-medium text-white">Detection Models</div>
                        <div className="w-2 h-2 bg-green-400 rounded-full ml-4 flex-shrink-0"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Phase 1 Circle */}
                  <div className="roadmap-circle relative z-10 w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg cursor-pointer">
                    <span className="text-black font-bold text-lg lg:text-xl">1</span>
                  </div>
                  
                  <div className="flex-1 pl-12 lg:pl-20"></div>
                </div>
                
                {/* Phase 2 */}
                <div className="relative flex items-center mb-32 lg:mb-48">
                  <div className="flex-1 pr-12 lg:pr-20"></div>
                  
                  {/* Phase 2 Circle */}
                  <div className="roadmap-circle relative z-10 w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg cursor-pointer">
                    <span className="text-black font-bold text-lg lg:text-xl">2</span>
                  </div>
                  
                  <div className="flex-1 pl-12 lg:pl-20 text-left">
                    <div className="mb-8 lg:mb-12">
                      <div className="inline-block bg-gradient-to-r from-cyan-400/10 to-blue-600/10 px-6 py-2 rounded-full border border-cyan-400/20 mb-4">
                        <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Q2-Q3</span>
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Expansion</h3>
                      <h4 className="text-lg lg:text-xl text-cyan-400 font-medium mb-8">Ecosystem Growth & Features</h4>
                    </div>
                    <div className="space-y-3 text-gray-300 max-w-sm">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-4 flex-shrink-0"></div>
                        <div className="font-medium text-white">Multi-Platform Integration</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-4 flex-shrink-0"></div>
                        <div className="font-medium text-white">Verification Badges</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-4 flex-shrink-0"></div>
                        <div className="font-medium text-white">Enterprise Partnerships</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-4 flex-shrink-0"></div>
                        <div className="font-medium text-white">Voice & Text Detection</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-4 flex-shrink-0"></div>
                        <div className="font-medium text-white">Token Economy</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Phase 3 */}
                <div className="relative flex items-center mb-32 lg:mb-48">
                  <div className="flex-1 pr-12 lg:pr-20 text-right">
                                         <div className="mb-8 lg:mb-12">
                       <div className="inline-block bg-gradient-to-r from-purple-500/10 to-purple-600/10 px-6 py-2 rounded-full border border-purple-500/20 mb-4">
                         <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Q4</span>
                       </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Intelligence</h3>
                      <h4 className="text-lg lg:text-xl text-purple-400 font-medium mb-8">Systems & Layers</h4>
                    </div>
                    <div className="space-y-3 text-gray-300 max-w-sm ml-auto">
                      <div className="flex items-center justify-end">
                        <div className="font-medium text-white">Mira Launch - Social Fact-Checking Bot (X/Twitter)</div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full ml-4 flex-shrink-0"></div>
                      </div>
                      <div className="flex items-center justify-end">
                        <div className="font-medium text-white">Oasis Launch - Community Prediction Market</div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full ml-4 flex-shrink-0"></div>
                      </div>
                    </div>
                  </div>
                  
                                     {/* Phase 3 Circle */}
                   <div className="roadmap-circle relative z-10 w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg cursor-pointer">
                     <span className="text-black font-bold text-lg lg:text-xl">3</span>
                   </div>
                  
                  <div className="flex-1 pl-12 lg:pl-20"></div>
                </div>
                
                {/* Phase 4 */}
                <div className="relative flex items-center">
                  <div className="flex-1 pr-12 lg:pr-20"></div>
                  
                                     {/* Phase 4 Circle */}
                   <div className="roadmap-circle relative z-10 w-16 h-16 lg:w-18 lg:h-18 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg cursor-pointer">
                     <span className="text-black font-bold text-lg lg:text-xl">4</span>
                   </div>
                  
                  <div className="flex-1 pl-12 lg:pl-20 text-left">
                                         <div className="mb-8 lg:mb-12">
                       <div className="inline-block bg-gradient-to-r from-orange-500/10 to-red-500/10 px-6 py-2 rounded-full border border-orange-500/20 mb-4">
                         <span className="text-orange-400 font-semibold text-sm uppercase tracking-wider">Q4+</span>
                       </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">Enterprise</h3>
                      <h4 className="text-lg lg:text-xl text-orange-400 font-medium mb-8">& Regulatory Integration</h4>
                    </div>
                    <div className="space-y-3 text-gray-300 max-w-sm">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-4 flex-shrink-0"></div>
                        <div className="font-medium text-white">Advanced Enterprise Suite</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-4 flex-shrink-0"></div>
                        <div className="font-medium text-white">Financial Services & KYC Integration</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mr-4 flex-shrink-0"></div>
                        <div className="font-medium text-white">Model & Dataset Licensing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

      {/* Social Links */}
      <div className="py-12 px-6 relative z-50">
        <div className="max-w-6xl mx-auto text-center">
          {/* Social Media Icons */}
          <div className="flex justify-center">
            <a href="https://x.com/vladasanadev" target="_blank" rel="noopener noreferrer" className="social-icon-footer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
          

        </div>
      </div>

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
