import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { Cursor } from './components/Cursor';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : true;
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    const handleScroll = () => {
      // Update Scroll Progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);

      // Section Highlight Logic
      const sections = ['home', 'about', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-500 selection:bg-accent-red selection:text-white">
      <Cursor />
      
      {/* Dynamic Scroll Indicator */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100]">
        <div 
          className="h-full bg-gradient-hot shadow-[0_0_10px_#FF3B30] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Navigation activeSection={activeSection} isDark={isDark} toggleTheme={toggleTheme} />

      <main className="relative">
        <Hero />
        <About isDark={isDark} />
        <Projects />
        <Contact />
      </main>

      <footer className="py-20 text-center border-t border-slate-100 dark:border-surface-800 bg-white dark:bg-primary-950 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Bilal Ahmad.</h2>
            <p className="text-slate-500 dark:text-gray-500 text-sm font-medium mb-10">Crafting robust frontend experiences with heart and code.</p>
            <div className="flex justify-center gap-8 mb-12">
                {['Github', 'LinkedIn', 'Twitter'].map(link => (
                    <a key={link} href="#" className="text-xs uppercase font-black tracking-widest text-slate-400 hover:text-accent-orange transition-colors interactive">
                        {link}
                    </a>
                ))}
            </div>
            <p className="text-[10px] text-slate-400 dark:text-gray-600 uppercase tracking-widest">
                &copy; {new Date().getFullYear()} All Rights Reserved. Built with Next-gen React.
            </p>
        </div>
      </footer>
    </div>
  );
}

export default App;