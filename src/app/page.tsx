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
            <div className="flex justify-center mb-16">
              {/* Roadmap Timeline */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-400 to-cyan-400 rounded-full"></div>
                
                {/* Phase 1 */}
                <div className="relative flex items-center mb-24">
                  <div className="flex-1 pr-8 text-right">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">Phase 1</h3>
                      <h4 className="text-lg text-green-400 font-semibold">Core Infrastructure & MVP</h4>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>• Social Fact-Checking Bot (X/Twitter)</div>
                      <div>• Verification API (Beta)</div>
                      <div>• Web Dashboard (Basic)</div>
                      <div>• Detection Models (Image & Video)</div>
                    </div>
                  </div>
                  
                  {/* Phase 1 Circle */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center border-4 border-gray-900">
                    <span className="text-black font-bold text-xl">1</span>
                  </div>
                  
                  <div className="flex-1 pl-8"></div>
                </div>
                
                {/* Phase 2 */}
                <div className="relative flex items-center">
                  <div className="flex-1 pr-8"></div>
                  
                  {/* Phase 2 Circle */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center border-4 border-gray-900">
                    <span className="text-black font-bold text-xl">2</span>
                  </div>
                  
                  <div className="flex-1 pl-8 text-left">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">Phase 2</h3>
                      <h4 className="text-lg text-cyan-400 font-semibold">Ecosystem Expansion & Utility</h4>
                    </div>
                    <div className="text-sm text-gray-300 space-y-1">
                      <div>• Multi-Platform Bot Integration</div>
                      <div>• Verification Badge System</div>
                      <div>• Newsroom Partnerships</div>
                      <div>• Voice & Text Detection</div>
                      <div>• Token Mechanics</div>
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
