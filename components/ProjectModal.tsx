import React from 'react';
import { X, ExternalLink, Github, ArrowRight, Code, Activity, AlertTriangle, Cpu } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl transition-opacity animate-in fade-in" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white dark:bg-primary-950 w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-[3rem] border border-slate-200 dark:border-surface-800 shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 duration-500">
        <button 
          onClick={onClose}
          className="sticky md:absolute top-6 right-6 p-3 bg-slate-100 dark:bg-surface-800 rounded-2xl text-slate-500 dark:text-gray-400 hover:text-white hover:bg-accent-red transition-all z-[110] active:scale-90"
        >
          <X size={24} />
        </button>

        {/* Hero Section */}
        <div className="h-[40vh] md:h-[50vh] w-full relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-primary-950 via-transparent to-transparent z-[1]" />
            <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-8 md:p-16 z-[2] w-full">
                <div className="flex gap-3 mb-6">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-4 py-1 bg-accent-red/20 text-accent-red text-[10px] font-black uppercase tracking-widest rounded-full border border-accent-red/30">
                            {tag}
                        </span>
                    ))}
                </div>
                <h2 className="text-4xl md:text-7xl font-display font-bold text-slate-950 dark:text-white mb-4 tracking-tighter">
                    {project.title}
                </h2>
                <p className="text-lg md:text-2xl text-slate-600 dark:text-gray-400 font-light max-w-3xl leading-relaxed">
                    {project.shortSummary}
                </p>
            </div>
        </div>

        <div className="p-8 md:p-16 grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-16">
                
                {/* Metrics Grid */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="bg-slate-50 dark:bg-surface-800/50 p-6 rounded-3xl border border-slate-100 dark:border-surface-700 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Activity size={40} />
                         </div>
                         <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-bold">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                         <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-accent-orange transition-colors">{value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Challenge & Solution */}
                {project.problem && (
                    <section>
                        <h3 className="text-accent-red font-black uppercase tracking-[0.3em] text-xs mb-6 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-accent-red" /> The Challenge
                        </h3>
                        <p className="text-slate-700 dark:text-gray-300 leading-relaxed text-lg md:text-xl font-light">{project.problem}</p>
                    </section>
                )}
                
                {project.challenges && project.challenges.length > 0 && (
                  <div className="space-y-4">
                    {project.challenges.map((challenge, idx) => (
                      <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                        <AlertTriangle className="text-accent-red shrink-0 mt-1" size={18} />
                        <p className="text-sm text-slate-700 dark:text-gray-300 font-medium">{challenge}</p>
                      </div>
                    ))}
                  </div>
                )}

                {project.solution && (
                    <section>
                        <h3 className="text-accent-orange font-black uppercase tracking-[0.3em] text-xs mb-6 flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-accent-orange" /> The Solution
                        </h3>
                        <p className="text-slate-700 dark:text-gray-300 leading-relaxed text-lg md:text-xl font-light">{project.solution}</p>
                    </section>
                )}

                {/* Technical Decisions */}
                {project.technicalDecisions && (
                  <section className="bg-slate-50 dark:bg-surface-800/30 rounded-3xl p-8 border border-slate-100 dark:border-surface-800">
                    <h3 className="text-slate-900 dark:text-white font-black uppercase tracking-[0.3em] text-xs mb-8 flex items-center gap-4">
                      <Cpu size={18} className="text-accent-yellow" /> Technical Decisions
                    </h3>
                    <div className="space-y-6">
                      {project.technicalDecisions.map((item, idx) => (
                        <div key={idx} className="grid md:grid-cols-12 gap-4 pb-6 border-b border-slate-200 dark:border-surface-700 last:border-0 last:pb-0">
                          <div className="md:col-span-4 font-bold text-slate-800 dark:text-white text-sm">
                            {item.decision}
                          </div>
                          <div className="md:col-span-8 text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                            {item.reason}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {project.codeSnippet && (
                    <section>
                        <h3 className="text-slate-400 dark:text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] mb-6 flex items-center gap-4">
                            <Code size={16} /> Architecture Preview
                        </h3>
                        <div className="bg-slate-950 border border-surface-700 rounded-3xl p-8 overflow-x-auto group relative shadow-2xl">
                            <div className="absolute top-4 right-4 text-[10px] font-mono text-gray-600 uppercase">React.tsx</div>
                            <pre className="font-mono text-xs md:text-sm text-gray-300 leading-relaxed">
                                <code>{project.codeSnippet}</code>
                            </pre>
                        </div>
                    </section>
                )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-12">
                <div className="p-8 glass-panel rounded-3xl border-slate-200 dark:border-surface-800 sticky top-8">
                    <h3 className="text-slate-950 dark:text-white font-bold mb-8 uppercase tracking-widest text-sm">
                        Core Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack?.map(tech => (
                            <span key={tech} className="px-4 py-2 bg-slate-50 dark:bg-surface-800 text-slate-600 dark:text-gray-300 text-xs font-bold rounded-xl border border-slate-200 dark:border-surface-700">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        {project.github && (
                            <a 
                                href={project.github} 
                                target="_blank" 
                                className="flex items-center justify-center gap-3 w-full py-4 bg-slate-950 text-white rounded-2xl font-bold transition-all hover:bg-slate-900 shadow-xl shadow-slate-900/20 active:scale-95 text-sm"
                            >
                                <Github size={18} /> View Source Code
                            </a>
                        )}
                        {project.demo && (
                            <a 
                                href={project.demo} 
                                target="_blank" 
                                className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-hot text-white rounded-2xl font-bold shadow-xl shadow-accent-red/20 hover:scale-105 transition-transform active:scale-95 text-sm"
                            >
                                <ExternalLink size={18} /> Launch Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
        
        <div className="p-8 md:p-16 border-t border-slate-100 dark:border-surface-800 bg-slate-50/50 dark:bg-primary-900/20">
            <button 
                onClick={onClose}
                className="group flex items-center gap-3 text-sm font-bold text-slate-500 hover:text-accent-red transition-all"
            >
                <ArrowRight className="rotate-180 group-hover:-translate-x-2 transition-transform" />
                Back to projects
            </button>
        </div>
      </div>
    </div>
  );
};