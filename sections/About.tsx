import React, { useRef, useEffect } from 'react';
import { EXPERIENCES, SKILLS, EDUCATION, CERTIFICATIONS } from '../constants';
import { Reveal } from '../components/IntersectionObserver';
import { Briefcase, Code2, Cpu, Globe, Layers, Zap, Download, ExternalLink, GraduationCap, Award } from 'lucide-react';
import { gsap } from 'gsap';

interface AboutProps {
  isDark?: boolean;
}

export const About: React.FC<AboutProps> = ({ isDark = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split skills for better categorization
  const frontendSkills = SKILLS.filter(s => s.category === 'Frontend');
  const toolSkills = SKILLS.filter(s => s.category === 'Tools' || s.category === 'UI');
  const backendSkills = SKILLS.filter(s => s.category === 'Backend' || s.category === 'State & Data');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the sticky sidebar elements
      gsap.to(".sidebar-element", {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-32 relative transition-colors duration-300 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-slate-200/5 dark:bg-slate-800/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-accent-red/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <Reveal direction="none" className="mb-24">
          <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-slate-950 dark:text-white leading-[0.9]">
            The Developer <br />
            <span className="text-gradient-hot italic">Chronicles.</span>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            
            {/* LEFT COLUMN - STICKY NARRATIVE & PROFILE */}
            <div className="lg:col-span-5 relative">
                <div className="lg:sticky lg:top-32 space-y-10 sidebar-element">
                    
                    {/* 1. Bio / Narrative */}
                    <Reveal delay={100}>
                        <div className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-accent-red flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-accent-red" />
                                The Narrative
                            </h3>
                            <div className="text-xl md:text-2xl font-light leading-relaxed text-slate-700 dark:text-gray-300">
                                <p className="mb-6">
                                    I am a <strong className="text-slate-900 dark:text-white font-medium">Frontend Architect</strong> who specializes in turning complex geographical data into intuitive interfaces.
                                </p>
                                <p className="text-lg text-slate-500 dark:text-gray-400">
                                    My journey began with analyzing systems, but I found my calling in building them. Today, I architect scalable React applications that power enterprise-grade dashboards and real-time map visualizations.
                                </p>
                            </div>
                        </div>
                    </Reveal>

                    {/* 2. Key Stats */}
                    <Reveal delay={200}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-primary-800/50 border border-slate-200 dark:border-primary-700/50 hover:border-accent-orange/30 transition-colors">
                                <div className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-1">2+</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-gray-500">Years Exp</div>
                            </div>
                            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-primary-800/50 border border-slate-200 dark:border-primary-700/50 hover:border-accent-orange/30 transition-colors">
                                <div className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-1">10+</div>
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-gray-500">Projects</div>
                            </div>
                        </div>
                    </Reveal>

                    {/* 3. Action Button */}
                    <Reveal delay={250}>
                        <div className="flex gap-4">
                            <a 
                                href="/public/Bilal_Ahmad_CV.pdf"
                                className="flex-1 py-4 flex items-center justify-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-accent-red dark:hover:bg-accent-red hover:text-white transition-all shadow-xl shadow-slate-900/10 active:scale-95 group"
                            >
                                <Download size={16} className="group-hover:translate-y-1 transition-transform" />
                                Download CV
                            </a>
                        </div>
                    </Reveal>

                    {/* 4. Education & Certs (Moved Here) */}
                    <div className="pt-8 border-t border-slate-200 dark:border-surface-800 space-y-8">
                        
                        {/* Education */}
                        <Reveal delay={300}>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-gray-600 mb-6 flex items-center gap-2">
                                <GraduationCap size={16} className="text-accent-yellow" /> Academic
                            </h3>
                            <div className="space-y-4">
                                {EDUCATION.map(edu => (
                                    <div key={edu.id} className="p-5 w-full rounded-2xl bg-white dark:bg-primary-900/40 border border-slate-100 dark:border-primary-800/50 hover:border-accent-yellow/30 transition-all shadow-sm dark:shadow-none">
                                        <div className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{edu.degree}</div>
                                        <div className="text-xs text-slate-500 dark:text-gray-400 mt-2 font-medium">{edu.school}</div>
                                        <div className="text-[10px] font-mono text-accent-red mt-2 bg-accent-red/5 dark:bg-accent-red/10 inline-block px-2 py-1 rounded">{edu.period}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        {/* Certifications */}
                        <Reveal delay={350}>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-gray-600 mb-6 flex items-center gap-2">
                                <Award size={16} className="text-green-500" /> Certifications
                            </h3>
                            <div className="space-y-3">
                                {CERTIFICATIONS.map(cert => (
                                    <div key={cert.id} className="p-4 w-full rounded-xl bg-white dark:bg-primary-900/40 border border-slate-100 dark:border-primary-800/50 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-primary-800/60 transition-colors">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] shrink-0" />
                                        <div>
                                            <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">{cert.name}</div>
                                            <div className="text-[11px] text-slate-500 dark:text-gray-500 mt-1">{cert.issuer} • {cert.date}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN - SCROLLABLE CONTENT */}
            <div className="lg:col-span-7 space-y-24">
                
                {/* 1. EXPERIENCE TIMELINE */}
                <div id="experience">
                    <Reveal delay={200}>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-4">
                            <Briefcase className="text-accent-orange" size={24} />
                            Career Trajectory
                        </h3>
                        
                        <div className="relative border-l-2 border-slate-200 dark:border-surface-800 ml-3 space-y-12">
                            {EXPERIENCES.map((exp, index) => (
                                <div key={exp.id} className="relative pl-12 group">
                                    {/* Timeline Dot */}
                                    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-primary-950 transition-all duration-300 ${exp.current ? 'bg-accent-red scale-125 shadow-[0_0_15px_rgba(255,59,48,0.5)]' : 'bg-slate-300 dark:bg-surface-700 group-hover:bg-accent-orange'}`} />
                                    
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-accent-orange transition-colors">
                                                {exp.role}
                                            </h4>
                                            <div className="text-sm font-medium text-slate-500 dark:text-gray-400 mt-1">
                                                {exp.company}
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:mt-0 px-3 py-1 rounded-full bg-slate-100 dark:bg-surface-800 border border-slate-200 dark:border-surface-700 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                            {exp.period}
                                        </div>
                                    </div>
                                    
                                    <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6 text-sm">
                                        {exp.description}
                                    </p>

                                    <div className="bg-slate-50 dark:bg-primary-900/30 rounded-xl p-4 border border-slate-100 dark:border-surface-800">
                                        <div className="space-y-3">
                                            {exp.achievements.map((ach, i) => (
                                                <div key={i} className="flex gap-3 text-xs text-slate-600 dark:text-gray-400">
                                                    <Zap size={14} className="text-accent-yellow shrink-0" />
                                                    {ach}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>

                {/* 2. TECH STACK */}
                <div id="stack">
                    <Reveal delay={300}>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-4">
                            <Layers className="text-accent-yellow" size={24} />
                            Technical Arsenal
                        </h3>

                        <div className="space-y-8">
                            {/* Frontend Core */}
                            <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-surface-800 bg-white/50 dark:bg-primary-900/20">
                                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                    <Code2 size={14} /> Frontend Architecture
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {frontendSkills.map(skill => (
                                        <div key={skill.name} className="group relative">
                                            <div className="px-4 py-2 bg-white dark:bg-primary-800/50 rounded-lg border border-slate-200 dark:border-surface-700 text-sm font-bold text-slate-700 dark:text-gray-300 hover:border-accent-red/50 hover:text-accent-red transition-all cursor-default flex items-center gap-2 shadow-sm dark:shadow-none">
                                                {skill.name}
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-surface-600 group-hover:bg-accent-red transition-colors" />
                                            </div>
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                                {skill.level}% Proficiency
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Ecosystem & Tools */}
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-surface-800 bg-white/50 dark:bg-primary-900/20">
                                    <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                        <Globe size={14} /> Map & UI Engines
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {toolSkills.map(skill => (
                                            <div key={skill.name} className="px-3 py-1.5 bg-white dark:bg-primary-800/50 rounded-md border border-slate-200 dark:border-surface-700 text-xs font-medium text-slate-600 dark:text-gray-400 shadow-sm dark:shadow-none">
                                                {skill.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-surface-800 bg-white/50 dark:bg-primary-900/20">
                                    <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                        <Cpu size={14} /> Backend & Infra
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {backendSkills.map(skill => (
                                            <div key={skill.name} className="px-3 py-1.5 bg-white dark:bg-primary-800/50 rounded-md border border-slate-200 dark:border-surface-700 text-xs font-medium text-slate-600 dark:text-gray-400 shadow-sm dark:shadow-none">
                                                {skill.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};