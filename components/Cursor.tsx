import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    // Initial center position
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        setIsVisible(true);
        gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Interactive elements detection
    const onHoverStart = (e: Event) => {
      setIsHovering(true);
      const target = e.currentTarget as HTMLElement;
      // Optional: Add magnetic pull logic here if desired
    };
    
    const onHoverEnd = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Dynamic listener attachment
    const addListeners = () => {
      const elements = document.querySelectorAll('a, button, input, textarea, [role="button"], .interactive');
      elements.forEach(el => {
        el.addEventListener('mouseenter', onHoverStart);
        el.addEventListener('mouseleave', onHoverEnd);
      });
    };

    addListeners();

    // Observer for new elements (like modals)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 bg-accent-red rounded-full pointer-events-none z-[9999] transition-transform duration-300 mix-blend-difference ${
          isHovering ? 'scale-[0]' : 'scale-100'
        }`}
      />
      
      {/* Follower Ring */}
      <div 
        ref={followerRef}
        className={`fixed top-0 left-0 w-8 h-8 border border-accent-orange/50 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out-expo ${
          isHovering ? 'scale-[3] border-accent-red bg-accent-red/10 backdrop-blur-[1px]' : 'scale-100'
        } ${isClicking ? 'scale-[0.8]' : ''}`}
      />
    </>
  );
};