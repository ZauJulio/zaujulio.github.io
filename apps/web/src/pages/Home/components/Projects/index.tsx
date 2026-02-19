import { CodeIcon, ExternalLinkIcon, StarIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Projects data
interface Project {
  name: string;
  description: string;
  url: string;
  language: string;
  languageColor: string;
  stars: number;
  topics: string[];
}

const projects: Project[] = [
  {
    name: 'FeaturesAnalyzer',
    description:
      'Python desktop application for dataset feature analysis, prototyping and testing ML and statistical models. Built with GTK, Pydantic, TinyDB, and i18n.',
    url: 'https://github.com/ZauJulio/FeaturesAnalyzer',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 3,
    topics: ['GTK', 'Machine Learning', 'Pandas', 'Scikit-learn'],
  },
  {
    name: 'ZSOM',
    description:
      'Implementation of the Self-Organizing Maps algorithm in Python. Visualization and clustering of high-dimensional data.',
    url: 'https://github.com/ZauJulio/ZSOM',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 2,
    topics: ['SOM', 'AI', 'Visualization'],
  },
  {
    name: 'weasyprint-pdf-render',
    description:
      'A high-performance HTML-to-PDF rendering Dockerized microservice. CI/CD pipeline with automated documentation.',
    url: 'https://github.com/ZauJulio/weasyprint-pdf-render',
    language: 'Python',
    languageColor: '#3572A5',
    stars: 0,
    topics: ['Docker', 'Microservice', 'CI/CD', 'WeasyPrint'],
  },
  {
    name: 'AutoThrottleSetup',
    description:
      'Manual configuration tool for unexpected thermal throttle on Linux. Automates CPU frequency and power management.',
    url: 'https://github.com/ZauJulio/AutoThrottleSetup',
    language: 'Shell',
    languageColor: '#89e051',
    stars: 2,
    topics: ['Linux', 'Thermal', 'Power Management'],
  },
  {
    name: 'linuwu-sense-dkms',
    description:
      'DKMS kernel module for Linux hardware sensor monitoring. Provides custom driver support for temperature and fan sensor readings.',
    url: 'https://github.com/ZauJulio/linuwu-sense-dkms',
    language: 'C',
    languageColor: '#555555',
    stars: 0,
    topics: ['Linux', 'DKMS', 'Kernel Module', 'Hardware Sensors'],
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target='_blank'
      rel='noopener noreferrer'
      className='group block rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-brand-500/50 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-brand-500/5'
    >
      <div className='flex items-start justify-between mb-3'>
        <h3 className='text-lg font-semibold text-white group-hover:text-brand-300 transition-colors'>
          {project.name}
        </h3>
        <ExternalLinkIcon className='size-4 text-gray-500 group-hover:text-brand-400 transition-colors flex-shrink-0 mt-1' />
      </div>

      <p className='text-sm text-gray-400 mb-4 leading-relaxed line-clamp-3'>{project.description}</p>

      <div className='flex flex-wrap gap-1.5 mb-4'>
        {project.topics.map((topic) => (
          <span
            key={topic}
            className='text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700'
          >
            {topic}
          </span>
        ))}
      </div>

      <div className='flex items-center gap-4 text-xs text-gray-500'>
        <span className='flex items-center gap-1.5'>
          <span className='size-3 rounded-full' style={{ backgroundColor: project.languageColor }} />
          {project.language}
        </span>

        {project.stars > 0 && (
          <span className='flex items-center gap-1'>
            <StarIcon className='size-3.5' />
            {project.stars}
          </span>
        )}
      </div>
    </a>
  );
}

// Skills data based on CodersRank metrics - focusing on backend, databases, and infrastructure
interface Skill {
  name: string;
  level: number;
}

interface SkillCluster {
  label: string;
  color: string;
  skills: Skill[];
}

const SKILL_CLUSTERS: SkillCluster[] = [
  {
    label: 'Databases',
    color: '#249E94',
    skills: [
      { name: 'MongoDB', level: 90 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Mongoose', level: 85 },
      { name: 'TypeORM', level: 70 },
      { name: 'SQL', level: 75 },
      { name: 'Psycopg', level: 60 },
    ],
  },
  {
    label: 'Backend & APIs',
    color: '#3BC1A8',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'GraphQL', level: 95 },
      { name: 'ExpressJS', level: 85 },
      { name: 'Socket.io', level: 95 },
      { name: 'FastAPI', level: 70 },
      { name: 'Flask', level: 75 },
      { name: 'Django', level: 65 },
    ],
  },
  {
    label: 'Python & Data',
    color: '#0C7779',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Pandas', level: 85 },
      { name: 'NumPy', level: 80 },
      { name: 'Scikit-Learn', level: 85 },
      { name: 'Matplotlib', level: 75 },
      { name: 'PyQt', level: 70 },
      { name: 'Data Analysis', level: 80 },
    ],
  },
  {
    label: 'DevOps & Cloud',
    color: '#249E94',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'CI/CD', level: 75 },
      { name: 'Testing', level: 85 },
      { name: 'Git', level: 90 },
      { name: 'Linux', level: 85 },
      { name: 'Bash', level: 80 },
    ],
  },
  {
    label: 'TypeScript/Node',
    color: '#3BC1A8',
    skills: [
      { name: 'TypeScript', level: 85 },
      { name: 'React', level: 75 },
      { name: 'Next.js', level: 80 },
      { name: 'Redux', level: 70 },
      { name: 'GraphQL', level: 95 },
    ],
  },
  {
    label: 'ML & AI',
    color: '#005461',
    skills: [
      { name: 'Machine Learning', level: 75 },
      { name: 'SOM', level: 90 },
      { name: 'Neural Nets', level: 70 },
      { name: 'Data Science', level: 75 },
      { name: 'Scipy', level: 70 },
    ],
  },
];

interface BubbleData {
  name: string;
  level: number;
  r: number;
  x: number;
  y: number;
}

function levelToRadius(level: number, maxRadius: number): number {
  return Math.max(14, (level / 100) * maxRadius);
}

function packBubbles(skills: Skill[], containerWidth: number, maxRadius: number): BubbleData[] {
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

function BubbleCluster({ cluster }: { cluster: SkillCluster }) {
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
                    className='transition-all duration-300 hover:fill-opacity-80 hover:stroke-opacity-100 cursor-pointer'
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

function SkillsSection() {
  return (
    <div id='skills' className='mt-20 pt-10 border-t border-gray-800'>
      <div className='flex items-center gap-3 mb-10'>
        <div className='p-2 bg-brand-900/40 rounded-lg'>
          <CodeIcon className='size-5 text-brand-300' />
        </div>
        <h3 className='text-2xl font-bold text-white'>Skills</h3>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {SKILL_CLUSTERS.map((cluster) => (
          <BubbleCluster key={cluster.label} cluster={cluster} />
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id='projects' className='py-20 px-4 bg-gray-950'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-4 text-white'>Projects & Skills</h2>
        <p className='text-center text-gray-400 mb-12 max-w-2xl mx-auto'>
          A selection of open-source projects spanning full-stack development, machine learning, Linux tooling, and
          system engineering.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>

        <div className='text-center mt-10 mb-16'>
          <a
            href='https://github.com/zaujulio?tab=repositories'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors text-sm font-medium'
          >
            View all repositories on GitHub
            <ExternalLinkIcon className='size-4' />
          </a>
        </div>

        {/* Skills Section */}
        <SkillsSection />
      </div>
    </section>
  );
}
