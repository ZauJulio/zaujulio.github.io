import { type ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the animation starts once visible */
  delay?: number;
  /** Direction from which the element slides in */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** How far (px) the element travels */
  distance?: number;
  /** Duration of the animation in ms */
  duration?: number;
  /** IntersectionObserver threshold (0-1) */
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 40,
  duration = 700,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const updateAnimationMode = () => {
      const isCompactViewport = mediaQuery.matches;
      setShouldAnimate(!isCompactViewport);

      if (isCompactViewport) {
        setIsVisible(true);
      }
    };

    updateAnimationMode();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateAnimationMode);
      return () => mediaQuery.removeEventListener('change', updateAnimationMode);
    }

    mediaQuery.addListener(updateAnimationMode);
    return () => mediaQuery.removeListener(updateAnimationMode);
  }, []);

  useEffect(() => {
    if (!shouldAnimate) return undefined;

    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldAnimate, threshold]);

  const translateMap = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shouldAnimate ? (isVisible ? 1 : 0) : 1,
        transform: shouldAnimate ? (isVisible ? 'translate(0, 0)' : translateMap[direction]) : 'translate(0, 0)',
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
