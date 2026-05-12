import { useEffect, useRef, useState } from 'react';

import type { SkillCluster } from 'content/skills/skills.json.d.ts';

type BubbleData = {
  name: string;
  level: number;
  r: number;
  x: number;
  y: number;
};

function levelToRadius(level: number, maxRadius: number): number {
  return Math.max(14, (level / 100) * maxRadius);
}

function packBubbles(
  skills: { name: string; level: number }[],
  containerWidth: number,
  maxRadius: number,
): BubbleData[] {
  const bubbles: BubbleData[] = skills
    .sort((a, b) => b.level - a.level)
    .map((s) => ({
      name: s.name,
      level: s.level,
      r: levelToRadius(s.level, maxRadius),
      x: containerWidth / 2 + (Math.random() - 0.5) * 20,
      y: containerWidth / 2 + (Math.random() - 0.5) * 20,
    }));

  for (let iter = 0; iter < 200; iter++) {
    for (let i = 0; i < bubbles.length; i++) {
      for (let j = i + 1; j < bubbles.length; j++) {
        const a = bubbles[i];
        const b = bubbles[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = a.r + b.r + 3;

        if (dist < minDist && dist > 0) {
          const overlap = (minDist - dist) / 2;
          const nx = dx / dist;
          const ny = dy / dist;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;
        }
      }

      const cx = containerWidth / 2;
      const cy = containerWidth / 2;
      bubbles[i].x += (cx - bubbles[i].x) * 0.01;
      bubbles[i].y += (cy - bubbles[i].y) * 0.01;
    }
  }

  return bubbles;
}

export function BubbleCluster({ cluster }: { cluster: SkillCluster }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [containerSize, setContainerSize] = useState(280);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerSize(width);
      }
    };

    const debouncedUpdateSize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSize, 150);
    };

    updateSize();
    window.addEventListener('resize', debouncedUpdateSize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedUpdateSize);
    };
  }, []);

  useEffect(() => {
    if (containerSize > 0) {
      const maxRadius = containerSize * 0.11;
      const packed = packBubbles(cluster.skills, containerSize, maxRadius);
      setBubbles(packed);
    }
  }, [cluster.skills, containerSize]);

  const padding = 10;

  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (const b of bubbles) {
    minX = Math.min(minX, b.x - b.r);
    minY = Math.min(minY, b.y - b.r);
    maxX = Math.max(maxX, b.x + b.r);
    maxY = Math.max(maxY, b.y + b.r);
  }
  const vbX = (minX || 0) - padding;
  const vbY = (minY || 0) - padding;
  const vbW = (maxX || containerSize) - (minX || 0) + padding * 2;
  const vbH = (maxY || containerSize) - (minY || 0) + padding * 2;

  return (
    <div className='group'>
      <h4 className='text-sm font-semibold text-brand-300 mb-3 text-center uppercase tracking-wider'>
        {cluster.label}
      </h4>
      <div ref={containerRef} className='relative w-full aspect-square'>
        {bubbles.length > 0 && (
          <svg
            viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
            className='w-full h-full'
            preserveAspectRatio='xMidYMid meet'
            role='img'
            aria-label={`${cluster.label} skills`}
          >
            {bubbles.map((bubble) => {
              const opacity = 0.15 + (bubble.level / 100) * 0.55;
              const fontSize = Math.max(6, bubble.r * 0.28);

              return (
                <g key={bubble.name} className='transition-all duration-300'>
                  <circle
                    cx={bubble.x}
                    cy={bubble.y}
                    r={bubble.r}
                    fill={cluster.color}
                    fillOpacity={opacity}
                    stroke={cluster.color}
                    strokeOpacity={0.5}
                    strokeWidth={1}
                    className='transition-all duration-300 hover:fill-opacity-80 hover:stroke-opacity-100'
                  />
                  <title>{`${bubble.name}: ${bubble.level}%`}</title>

                  <text
                    x={bubble.x}
                    y={bubble.y}
                    textAnchor='middle'
                    dominantBaseline='central'
                    fill='white'
                    fontSize={fontSize}
                    fontWeight='600'
                    className='pointer-events-none select-none'
                  >
                    {bubble.name}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
