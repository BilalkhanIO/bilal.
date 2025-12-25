import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealProps {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  delay = 0, 
  className = "", 
  direction = 'up',
  duration = 0.8
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    // Initial starting positions
    const getX = () => {
      if (direction === 'left') return -50;
      if (direction === 'right') return 50;
      return 0;
    };

    const getY = () => {
      if (direction === 'up') return 50;
      if (direction === 'down') return -50;
      return 0;
    };

    const anim = gsap.from(element, {
      opacity: 0,
      x: getX(),
      y: getY(),
      duration: duration,
      delay: delay / 1000,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%", // Animation starts when top of element hits 85% of viewport
        toggleActions: "play none none none", // Only play once
      }
    });

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, [direction, delay, duration]);

  return (
    <div ref={ref} className={`${className} will-change-transform`}>
      {children}
    </div>
  );
};
