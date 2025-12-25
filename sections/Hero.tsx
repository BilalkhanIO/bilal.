import React, { useEffect, useRef } from 'react';
import { ArrowRight, Github } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { gsap } from 'gsap';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapPathRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });
      
      // Initial Reveal Sequence
      tl.from(".hero-badge", { opacity: 0, y: 20, duration: 1 })
        .from(".hero-title span", { 
          opacity: 0, 
          y: 60, 
          stagger: 0.15,
          rotateX: 10,
          transformOrigin: "0% 50% -50"
        }, "-=0.8")
        .from(".hero-tagline", { opacity: 0, y: 30, duration: 1.2 }, "-=1")
        .from(".hero-btn", { 
          opacity: 0, 
          y: 20, 
          stagger: 0.1,
          ease: "back.out(1.7)" 
        }, "-=1")
        .from(".hero-map", { 
          opacity: 0, 
          scale: 0.8, 
          rotation: -5,
          duration: 2 
        }, "-=1.8");

      // Continuous Floating Animations
      gsap.to(mapPathRef.current, {
        y: 20,
        x: 10,
        rotate: 2,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Ambient Blob Movement
      gsap.to(".bg-blob", {
        x: "random(-60, 60)",
        y: "random(-60, 60)",
        scale: "random(0.9, 1.1)",
        duration: "random(8, 12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Mouse Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(".parallax-layer", {
          x: x,
          y: y,
          duration: 1,
          ease: "power2.out"
        });
        
        gsap.to(".hero-map", {
          x: x * -1.5,
          y: y * -1.5,
          rotateY: x * 0.5,
          rotateX: y * -0.5,
          duration: 1.5,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50 dark:bg-transparent perspective-1000">
      {/* Dynamic Background Layers */}
      <div className="bg-blob parallax-layer absolute -top-20 -right-20 w-[600px] h-[600px] bg-accent-red/10 dark:bg-accent-red/20 rounded-full blur-[120px] mix-blend-screen -z-10" />
      <div className="bg-blob parallax-layer absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-accent-orange/10 dark:bg-accent-orange/15 rounded-full blur-[100px] mix-blend-screen -z-10" />
      
      {/* 3D Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-accent-yellow/30 animate-float -z-5" style={{animationDelay: '1s'}} />
      <div className="absolute bottom-1/3 right-1/4 w-8 h-8 rounded-full border border-accent-red/20 animate-float -z-5" style={{animationDelay: '2s'}} />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-8">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] text-accent-red dark:text-accent-orange uppercase bg-accent-red/5 dark:bg-accent-orange/10 border border-accent-red/10 dark:border-accent-orange/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
            React Maps & Dashboard Specialist
          </div>
          
          <h1 ref={textRef} className="hero-title font-display text-5xl md:text-8xl font-bold leading-[0.95] mb-8 tracking-tighter text-slate-950 dark:text-white preserve-3d">
            <span className="block">Architecting</span>
            <span className="block text-gradient-hot">Digital Geography.</span>
          </h1>
          
          <p className="hero-tagline text-lg md:text-2xl text-slate-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed font-light">
            I'm <span className="font-bold text-slate-900 dark:text-white">Bilal Ahmad</span>. {PERSONAL_INFO.tagline}
          </p>

          <div className="flex flex-wrap gap-4">
            <a 
              href="#projects"
              className="hero-btn group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-hot text-white font-bold rounded-xl shadow-lg shadow-accent-red/20 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">View Case Studies</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            
            <a 
              href={PERSONAL_INFO.github}
              target="_blank"
              className="hero-btn group inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-surface-800 text-slate-700 dark:text-white font-bold rounded-xl border border-slate-200 dark:border-surface-700 hover:border-accent-orange transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-accent-orange/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="relative">Github</span>
            </a>
          </div>

          <div className="hero-current mt-16 pt-8 border-t border-slate-200 dark:border-surface-800 flex items-center gap-4 text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-gray-500">
            <span>Production Ready</span>
            <div className="w-12 h-[1px] bg-accent-orange" />
            <span>Maps API Specialist</span>
          </div>
        </div>

        {/* Floating Abstract Map Motif */}
        <div className="hero-map lg:col-span-4 hidden lg:block relative preserve-3d">
          <svg ref={mapPathRef} width="400" height="400" viewBox="0 0 400 400" fill="none" className="drop-shadow-2xl opacity-80 dark:opacity-100">
            <path d="M50 200 C50 100, 350 100, 350 200 S50 300, 50 200" stroke="url(#h-grad)" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 20" />
            <circle cx="200" cy="200" r="150" stroke="url(#h-grad-subtle)" strokeWidth="2" strokeDasharray="5 5" />
            <circle cx="350" cy="200" r="10" fill="#FFD60A" />
            <circle cx="50" cy="200" r="8" fill="#FF3B30" />
            
            <circle cx="200" cy="120" r="6" fill="#FFA500" className="animate-pulse" />
            <circle cx="140" cy="250" r="6" fill="#FFA500" className="animate-pulse" style={{animationDelay: '0.5s'}} />
            
            <defs>
              <linearGradient id="h-grad" x1="50" y1="200" x2="350" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF3B30"/>
                <stop offset="0.5" stopColor="#FFA500"/>
                <stop offset="1" stopColor="#FFD60A"/>
              </linearGradient>
              <linearGradient id="h-grad-subtle" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF3B30" stopOpacity="0.1"/>
                <stop offset="1" stopColor="#FFD60A" stopOpacity="0.05"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Scroll Hint */}
      <div className="absolute bottom-12 left-6 hidden md:flex items-center gap-4 text-slate-400 dark:text-gray-600 rotate-90 origin-left animate-bounce">
        <span className="text-[10px] font-bold tracking-[0.5em] uppercase">Scroll to explore</span>
        <div className="w-20 h-[1px] bg-current" />
      </div>
    </section>
  );
};