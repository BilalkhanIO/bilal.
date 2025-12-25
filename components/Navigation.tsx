import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { gsap } from 'gsap';

interface NavigationProps {
  activeSection: string;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, isDark, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);

  // Split name for individual character animation
  const nameChars = "Bilal".split("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Continuous Character Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
        // The specific "B" effect (Float + Rotate) applied to ALL characters
        // Slowed down significantly (duration: 3)
        gsap.to(".logo-char", {
            y: -5,          // Float up
            rotate: -5,     // The specific slight rotation previously only on B
            duration: 3,    // Slowed down
            ease: "sine.inOut",
            stagger: {
                each: 0.2, 
                yoyo: true,
                repeat: -1
            }
        });

        // Distinct Pulse for the Dot
        gsap.to(".logo-dot", {
            scale: 1.5,
            opacity: 0.8,
            color: "#FFD60A",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, logoRef);

    return () => ctx.revert();
  }, []);

  // Smooth Scroll Handler with Offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-primary-950/80 backdrop-blur-md border-b border-slate-200 dark:border-surface-800 py-3' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Animated Logo */}
        <a 
            ref={logoRef}
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-display font-bold text-xl tracking-tight transition-colors group interactive flex items-center select-none"
        >
          {nameChars.map((char, i) => (
            <span 
                key={i} 
                className={`logo-char inline-block origin-bottom-left ${
                    i === 0 
                        ? 'text-accent-red text-2xl' // The 'B' gets the accent color and size
                        : 'text-slate-900 dark:text-white' // The rest match theme
                }`}
            >
                {char}
            </span>
          ))}
          {/* Punctuation */}
          <span className="logo-dot text-accent-yellow text-2xl leading-none mb-1 ml-0.5 inline-block">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative text-sm font-medium transition-all duration-300 hover:text-accent-orange interactive group ${
                activeSection === link.name.toLowerCase() 
                  ? 'text-slate-900 dark:text-white' 
                  : 'text-slate-500 dark:text-gray-400'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-accent-orange transform origin-left transition-transform duration-300 ${activeSection === link.name.toLowerCase() ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`} />
            </a>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-surface-800 text-slate-600 dark:text-gray-300 hover:text-accent-orange transition-all duration-300 transform active:scale-90 interactive hover:rotate-12"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} className="animate-pulse-slow" /> : <Moon size={20} />}
          </button>

          <a 
            href="/public/Bilal_Ahmad_CV.pdf"
            className="group relative px-5 py-2 text-xs font-bold rounded-xl overflow-hidden interactive transition-transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-slate-100 dark:bg-surface-800 border border-slate-200 dark:border-accent-orange/30 group-hover:bg-gradient-hot transition-colors duration-300" />
            <span className="relative z-10 text-slate-700 dark:text-accent-orange group-hover:text-white transition-colors duration-300">Resume</span>
          </a>
        </div>

        {/* Mobile Toggle Group */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-surface-800 text-slate-600 dark:text-gray-300 interactive"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-slate-600 dark:text-gray-300 hover:text-accent-orange interactive"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-primary-950 border-b border-slate-200 dark:border-surface-800 animate-in slide-in-from-top-2 duration-300 h-screen">
          <div className="flex flex-col p-6 gap-6 items-center justify-center h-3/4">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-2xl font-bold text-slate-600 dark:text-gray-300 hover:text-accent-orange transition-colors"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};