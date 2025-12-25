import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Reveal } from '../components/IntersectionObserver';
import { ProjectModal } from '../components/ProjectModal';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Maps', 'MERN', 'React', 'AI'];
  
  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tags.some(tag => tag.includes(filter)) || p.techStack?.some(tech => tech.includes(filter)));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 8 degrees)
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)"
    });
  };

  return (
    <section id="projects" className="py-32 relative transition-colors duration-300 perspective-1000">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <Reveal direction="left">
                <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tighter text-slate-950 dark:text-white">
                    Selected <span className="text-gradient-hot">Work.</span>
                </h2>
            </Reveal>

            <Reveal delay={200} direction="right">
                <div className="flex gap-2 p-1.5 glass-panel rounded-2xl overflow-x-auto no-scrollbar border border-slate-200 dark:border-surface-800">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap interactive ${
                                filter === cat 
                                ? 'bg-gradient-hot text-white shadow-lg shadow-accent-red/20 scale-105' 
                                : 'text-slate-500 dark:text-gray-400 hover:text-accent-orange'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <Reveal 
              key={project.slug} 
              delay={(index % 3) * 100} 
              direction="up"
            >
              <div 
                className="group relative bg-white dark:bg-surface-900 border border-slate-200 dark:border-surface-800 rounded-[2.5rem] overflow-hidden cursor-pointer h-[500px] flex flex-col interactive preserve-3d will-change-transform shadow-lg dark:shadow-none hover:shadow-2xl hover:shadow-accent-orange/10 dark:hover:shadow-glow-orange transition-shadow duration-500"
                onClick={() => setSelectedProject(project)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Image & Overlay */}
                <div className="relative h-64 overflow-hidden transform-style-3d">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-primary-950/80 to-transparent z-10 transition-opacity duration-300" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out-expo"
                  />
                  <div className="absolute top-6 left-6 z-20 flex gap-2">
                    {project.featured && (
                      <span className="px-3 py-1 bg-accent-red text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg animate-pulse-slow">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 scale-50 group-hover:scale-100 transition-transform duration-500 hover:bg-white/20">
                        <ArrowUpRight className="text-white" size={32} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-10 flex-grow flex flex-col justify-between transform-style-3d bg-white dark:bg-surface-900">
                  <div className="transform transition-transform duration-300 group-hover:translate-z-10">
                    <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-3 group-hover:text-accent-orange transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed font-medium">
                        {project.shortSummary}
                    </p>
                  </div>
                  
                  <div className="space-y-6 transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                    <div className="flex flex-wrap gap-2">
                        {project.techStack?.slice(0, 3).map(tech => (
                            <span key={tech} className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 bg-slate-50 dark:bg-primary-950/50 px-3 py-1 rounded-full border border-slate-200 dark:border-surface-800">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="h-[1px] w-full bg-slate-100 dark:bg-surface-800" />
                    <div className="flex justify-between items-center text-accent-red font-bold text-xs uppercase tracking-widest group-hover:tracking-[0.3em] transition-all">
                        <span>Case Study</span>
                        <div className="w-8 h-[1px] bg-accent-red group-hover:w-12 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};