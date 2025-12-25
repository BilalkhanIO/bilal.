import React, { useState } from 'react';
import { Reveal } from '../components/IntersectionObserver';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

export const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Aesthetic Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-orange/5 dark:bg-accent-orange/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
            <Reveal direction="left">
                <div className="space-y-10">
                    <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter text-slate-950 dark:text-white leading-[0.9]">
                        Let's build <br/> 
                        the <span className="text-gradient-hot italic">future.</span>
                    </h2>
                    
                    <p className="text-xl text-slate-500 dark:text-gray-400 font-light max-w-md leading-relaxed">
                        I'm currently seeking new opportunities to innovate and create high-impact user experiences. My inbox is always open.
                    </p>

                    <div className="space-y-6 pt-10">
                        <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-6 group interactive p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-surface-800 transition-colors">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-surface-800 flex items-center justify-center text-accent-red group-hover:bg-gradient-hot group-hover:text-white transition-all shadow-sm group-hover:scale-110 duration-300">
                                <Mail size={24} />
                            </div>
                            <div className="space-y-1">
                                <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400">Email Me</span>
                                <span className="block text-lg font-bold text-slate-900 dark:text-white group-hover:text-accent-red transition-colors">{PERSONAL_INFO.email}</span>
                            </div>
                        </a>

                        <div className="flex items-center gap-6 group p-4">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-surface-800 flex items-center justify-center text-accent-orange shadow-sm group-hover:rotate-12 transition-transform duration-300">
                                <Phone size={24} />
                            </div>
                            <div className="space-y-1">
                                <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400">Call Me</span>
                                <span className="block text-lg font-bold text-slate-900 dark:text-white">{PERSONAL_INFO.phone}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 group p-4">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-surface-800 flex items-center justify-center text-accent-yellow shadow-sm group-hover:bounce">
                                <MapPin size={24} />
                            </div>
                            <div className="space-y-1">
                                <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400">Location</span>
                                <span className="block text-lg font-bold text-slate-900 dark:text-white">{PERSONAL_INFO.location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>

            <Reveal direction="right" delay={300}>
                <div className="glass-panel p-10 md:p-14 rounded-[3rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-surface-800">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="relative group">
                            <label className={`absolute left-0 transition-all duration-300 ${focusedField === 'name' || true ? '-top-6 text-[10px] text-accent-orange font-black uppercase tracking-widest' : 'top-4 text-slate-400'}`}>
                                Your Full Name
                            </label>
                            <input 
                                type="text" 
                                required
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-surface-800 py-4 text-xl text-slate-900 dark:text-white focus:outline-none focus:border-accent-orange transition-all placeholder:text-transparent interactive"
                                placeholder="Bilal Ahmad"
                            />
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-accent-orange transition-all duration-500 ${focusedField === 'name' ? 'w-full' : 'w-0'}`} />
                        </div>
                        
                        <div className="relative group">
                            <label className={`absolute left-0 transition-all duration-300 ${focusedField === 'email' || true ? '-top-6 text-[10px] text-accent-orange font-black uppercase tracking-widest' : 'top-4 text-slate-400'}`}>
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                required
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-surface-800 py-4 text-xl text-slate-900 dark:text-white focus:outline-none focus:border-accent-orange transition-all placeholder:text-transparent interactive"
                                placeholder="hello@company.com"
                            />
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-accent-orange transition-all duration-500 ${focusedField === 'email' ? 'w-full' : 'w-0'}`} />
                        </div>

                        <div className="relative group">
                            <label className={`absolute left-0 transition-all duration-300 ${focusedField === 'message' || true ? '-top-6 text-[10px] text-accent-orange font-black uppercase tracking-widest' : 'top-4 text-slate-400'}`}>
                                Your Message
                            </label>
                            <textarea 
                                required
                                rows={3}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-surface-800 py-4 text-xl text-slate-900 dark:text-white focus:outline-none focus:border-accent-orange transition-all resize-none placeholder:text-transparent interactive"
                                placeholder="Tell me about your project..."
                            />
                            <div className={`absolute bottom-0 left-0 h-[2px] bg-accent-orange transition-all duration-500 ${focusedField === 'message' ? 'w-full' : 'w-0'}`} />
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={status !== 'idle'}
                            className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-500 active:scale-95 overflow-hidden relative interactive ${
                                status === 'success' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-gradient-hot hover:text-white'
                            }`}
                        >
                            <div className={`absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 ${status === 'idle' ? 'group-hover:translate-y-0' : ''}`} />
                            {status === 'submitting' && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                            {status === 'success' && <div className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2"><CheckCircle size={20} /> Sent Successfully</div>}
                            {status === 'idle' && <>Send Inquiry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>
                </div>
            </Reveal>
        </div>
      </div>
    </section>
  );
};