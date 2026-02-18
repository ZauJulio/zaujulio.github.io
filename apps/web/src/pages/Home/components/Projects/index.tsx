import { ExternalLinkIcon, StarIcon } from 'lucide-react';

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

      <p className='text-sm text-gray-400 mb-4 leading-relaxed line-clamp-3'>
        {project.description}
      </p>

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
          <span
            className='size-3 rounded-full'
            style={{ backgroundColor: project.languageColor }}
          />
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

export function ProjectsSection() {
  return (
    <section id='projects' className='py-20 px-4 bg-gray-950'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-4 text-white'>
          Projects
        </h2>
        <p className='text-center text-gray-400 mb-12 max-w-2xl mx-auto'>
          A selection of open-source projects spanning full-stack development, machine learning, Linux tooling, and system engineering.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>

        <div className='text-center mt-10'>
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
      </div>
    </section>
  );
}
