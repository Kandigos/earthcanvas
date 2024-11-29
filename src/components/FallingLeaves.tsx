import React from 'react';
import { useSpring, animated } from '@react-spring/web';

export function BackgroundCanvas() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = React.useCallback((event: React.MouseEvent) => {
    setMousePosition({
      x: event.clientX / window.innerWidth,
      y: event.clientY / window.innerHeight,
    });
  }, []);

  // אנימציית גרדיאנט דינמית
  const gradientSpring = useSpring({
    to: {
      backgroundPosition: `${50 + mousePosition.x * 10}% ${50 + mousePosition.y * 10}%`,
    },
    config: {
      tension: 280,
      friction: 60,
    },
  });

  return (
    <animated.div
      onMouseMove={handleMouseMove}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        ...gradientSpring,
        background: `
          radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            rgba(255, 255, 255, 0.03) 0%,
            rgba(255, 255, 255, 0.01) 20%,
            rgba(217, 219, 204, 0.005) 40%,
            rgba(235, 236, 231, 0.01) 60%,
            rgba(250, 250, 250, 0.02) 80%,
            rgba(255, 255, 255, 0.03) 100%
          ),
          linear-gradient(
            45deg,
            rgba(245, 245, 240, 0.05) 0%,
            rgba(250, 250, 245, 0.05) 25%,
            rgba(240, 240, 235, 0.05) 50%,
            rgba(245, 245, 240, 0.05) 75%,
            rgba(250, 250, 245, 0.05) 100%
          )
        `,
        backdropFilter: 'blur(80px)',
        transition: 'all 0.3s ease-out',
      }}
    >
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 50% 50%,
              rgba(255, 255, 255, 0.015) 0%,
              rgba(255, 255, 255, 0.01) 100%
            )
          `,
          mixBlendMode: 'overlay',
        }}
      />
    </animated.div>
  );
}
