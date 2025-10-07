'use client';

import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AnimatedSection({ 
  children, 
  animation = 'fadeInUp',
  delay = 0,
  duration = 1000,
  className = '',
  threshold = 0.1
}) {
  const [ref, isVisible] = useScrollAnimation({ threshold });

  const animations = {
    fadeInUp: {
      initial: 'opacity-0 translate-y-10',
      animate: 'opacity-100 translate-y-0'
    },
    fadeInDown: {
      initial: 'opacity-0 -translate-y-10',
      animate: 'opacity-100 translate-y-0'
    },
    fadeInLeft: {
      initial: 'opacity-0 -translate-x-10',
      animate: 'opacity-100 translate-x-0'
    },
    fadeInRight: {
      initial: 'opacity-0 translate-x-10',
      animate: 'opacity-100 translate-x-0'
    },
    fadeIn: {
      initial: 'opacity-0',
      animate: 'opacity-100'
    },
    scaleIn: {
      initial: 'opacity-0 scale-95',
      animate: 'opacity-100 scale-100'
    },
    slideInUp: {
      initial: 'opacity-0 translate-y-20',
      animate: 'opacity-100 translate-y-0'
    },
    slideInDown: {
      initial: 'opacity-0 -translate-y-20',
      animate: 'opacity-100 translate-y-0'
    },
    rotateIn: {
      initial: 'opacity-0 rotate-12 scale-95',
      animate: 'opacity-100 rotate-0 scale-100'
    },
    flipIn: {
      initial: 'opacity-0 rotate-y-90',
      animate: 'opacity-100 rotate-y-0'
    },
    bounceIn: {
      initial: 'opacity-0 scale-75',
      animate: 'opacity-100 scale-100'
    }
  };

  const currentAnimation = animations[animation] || animations.fadeInUp;

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${currentAnimation.initial} ${
        isVisible ? currentAnimation.animate : ''
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
}

export function StaggeredAnimation({ 
  children, 
  staggerDelay = 100,
  animation = 'fadeInUp',
  className = ''
}) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {items.map((child, index) => (
        <AnimatedSection
          key={index}
          animation={animation}
          delay={index * staggerDelay}
        >
          {child}
        </AnimatedSection>
      ))}
    </div>
  );
}

export function ParallaxSection({ 
  children, 
  speed = 0.5,
  className = ''
}) {
  return (
    <div 
      className={`transform-gpu ${className}`}
      style={{
        transform: `translateY(${typeof window !== 'undefined' ? window.pageYOffset * speed : 0}px)`
      }}
    >
      {children}
    </div>
  );
}

export function RevealText({ 
  text, 
  animation = 'fadeInUp',
  delay = 0,
  className = ''
}) {
  const words = text.split(' ');
  
  return (
    <div className={className}>
      {words.map((word, index) => (
        <AnimatedSection
          key={index}
          animation={animation}
          delay={delay + index * 50}
          className="inline-block mr-2"
        >
          {word}
        </AnimatedSection>
      ))}
    </div>
  );
}

export function CounterAnimation({ 
  end, 
  duration = 2000,
  delay = 0,
  className = ''
}) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollAnimation();

  useEffect(() => {
    if (isVisible) {
      const startTime = Date.now() + delay;
      
      const updateCount = () => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= 0) {
          const progress = Math.min(elapsed / duration, 1);
          const currentCount = Math.floor(progress * end);
          setCount(currentCount);
          
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        } else {
          requestAnimationFrame(updateCount);
        }
      };
      
      requestAnimationFrame(updateCount);
    }
  }, [isVisible, end, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {count}
    </span>
  );
}
