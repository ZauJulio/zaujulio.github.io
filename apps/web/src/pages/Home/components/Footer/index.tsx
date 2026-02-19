import { DownloadIcon, GithubIcon, HeartIcon, LinkedinIcon, MailIcon } from 'lucide-react';

// Profile data for JSON export
const profileData = {
  name: 'Zaú Júlio',
  title: 'Software Engineer',
  location: 'Brazil (UTC-3)',
  email: 'zaujulio.dev@gmail.com',
  website: 'https://zaujulio.github.io',
  social: {
    github: 'https://github.com/zaujulio',
    linkedin: 'https://linkedin.com/in/zaujulio',
  },
  experience: [
    {
      role: 'Tech Lead',
      company: 'Bitwise Technology',
      period: 'Aug 2025 - Present',
      location: 'Sorocaba, SP - Remote',
      description:
        'Leading the engineering efforts to build high-performance software solutions. Defining technical standards, overseeing system design from ER modeling to cloud infrastructure budgeting and deployment.',
      skills: ['Mentoring', 'System Design', 'CI/CD', 'Cloud Architecture'],
    },
    {
      role: 'Full Stack Developer',
      company: 'Bitwise Technology',
      period: 'Mar 2023 - Present',
      location: 'Sorocaba, SP - Remote',
      description:
        'Designing and developing robust web applications across the entire software lifecycle — from planning and architecture to deployment and optimization.',
      skills: ['TypeScript', 'GraphQL', 'MongoDB', 'React', 'AWS', 'Node.js'],
    },
    {
      role: 'Full Stack Developer',
      company: 'commcepta',
      period: 'Dec 2021 - Dec 2022',
      location: 'Curitiba, PR - Remote',
      description:
        'Handled complex projects involving Big Data and GraphQL. Explored hidden insights within graph data structures, building a large-scale data lake.',
      skills: ['GraphQL', 'Big Data', 'React', 'Data Lake'],
    },
    {
      role: 'Project Director',
      company: 'Byte Serido Jr',
      period: 'Jun 2021 - Nov 2022',
      location: 'Caico, RN - Hybrid',
      description:
        'Started as a Frontend Developer, later taking on the role of Project Director. Led the planning and execution of software projects.',
      skills: ['Project Management', 'System Design', 'Frontend', 'Leadership'],
    },
  ],
  education: [
    {
      degree: "Bachelor's Degree in Information Systems",
      institution: 'Federal University of Rio Grande do Norte (UFRN)',
      period: 'Jan 2019 - Jan 2025',
      location: 'Caico, RN',
      description:
        '8-semester program (3000h) covering algorithms, data structures, OOP, databases, software engineering, computer networks, operating systems, web and visual programming, statistics, and systems analysis.',
      skills: ['Full Stack', 'Algorithms', 'Software Engineering', 'Databases', 'Research'],
    },
    {
      degree: 'Technician in Computer Networks',
      institution: 'Metropole Digital - IMD/UFRN',
      period: 'Jan 2018 - Sep 2019',
      location: 'Natal, RN',
      description:
        'Technical course at the Institute of Computing and Digital Technologies (IMD). Covered network architecture, server administration, Linux systems, and infrastructure fundamentals.',
      skills: ['Computer Networks', 'Linux', 'Infrastructure', 'Teaching Assistant'],
    },
  ],
  languages: [
    { name: 'Portuguese', level: 'Native', proficiency: { speaking: 100, listening: 100, reading: 100 } },
    { name: 'English', level: 'Intermediate', proficiency: { speaking: 35, listening: 60, reading: 95 } },
    { name: 'Spanish', level: 'Basic', proficiency: { speaking: 20, listening: 40, reading: 45 } },
    { name: 'French', level: 'Beginner', proficiency: { speaking: 10, listening: 25, reading: 30 } },
  ],
  skills: {
    databases: ['MongoDB', 'PostgreSQL', 'Mongoose', 'TypeORM', 'SQL', 'Psycopg'],
    backend: ['Node.js', 'GraphQL', 'ExpressJS', 'Socket.io', 'FastAPI', 'Flask', 'Django'],
    python: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib', 'PyQt', 'Data Analysis'],
    devops: ['Docker', 'CI/CD', 'Testing', 'Git', 'Linux', 'Bash'],
    typescript: ['TypeScript', 'React', 'Next.js', 'Redux', 'GraphQL'],
    ml: ['Machine Learning', 'SOM', 'Neural Nets', 'Data Science', 'Scipy'],
  },
  thesis: {
    title: 'Features Analyzer',
    subtitle: 'Boilerplate for Data Visualization and Analysis Tools',
    institution: 'Federal University of Rio Grande do Norte (UFRN)',
    year: '2024',
    description:
      'A Python desktop application for dataset feature analysis, prototyping and testing machine learning and statistical models.',
    technologies: [
      'Python',
      'GTK',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Matplotlib',
      'Seaborn',
      'Pydantic',
      'TinyDB',
      'Docker',
      'i18n',
    ],
    links: {
      source: 'https://github.com/ZauJulio/FeaturesAnalyzer',
      documentation: 'https://zaujulio.github.io/FeaturesAnalyzer/',
    },
  },
  projects: [
    {
      name: 'FeaturesAnalyzer',
      description:
        'Python desktop application for dataset feature analysis, prototyping and testing ML and statistical models.',
      technologies: ['GTK', 'Machine Learning', 'Pandas', 'Scikit-learn'],
      url: 'https://github.com/ZauJulio/FeaturesAnalyzer',
    },
    {
      name: 'ZSOM',
      description: 'Implementation of the Self-Organizing Maps algorithm in Python.',
      technologies: ['SOM', 'AI', 'Visualization'],
      url: 'https://github.com/ZauJulio/ZSOM',
    },
    {
      name: 'weasyprint-pdf-render',
      description: 'High-performance HTML-to-PDF rendering Dockerized microservice.',
      technologies: ['Docker', 'Microservice', 'CI/CD', 'WeasyPrint'],
      url: 'https://github.com/ZauJulio/weasyprint-pdf-render',
    },
    {
      name: 'AutoThrottleSetup',
      description: 'Manual configuration tool for unexpected thermal throttle on Linux.',
      technologies: ['Linux', 'Thermal', 'Power Management'],
      url: 'https://github.com/ZauJulio/AutoThrottleSetup',
    },
    {
      name: 'linuwu-sense-dkms',
      description: 'DKMS kernel module for Linux hardware sensor monitoring.',
      technologies: ['Linux', 'DKMS', 'Kernel Module', 'Hardware Sensors'],
      url: 'https://github.com/ZauJulio/linuwu-sense-dkms',
    },
  ],
  hobbies: ['Photography', 'Cooking', 'Music'],
};

function exportProfileJSON() {
  const dataStr = JSON.stringify(profileData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'zaujulio-profile.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-black border-t border-gray-800/60 py-10'>
      <div className='container mx-auto px-6 max-w-6xl'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          {/* Left: branding */}
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Built with</span>
            <HeartIcon className='size-3.5 text-brand-500 fill-brand-500' />
            <span>by</span>
            <a
              href='https://github.com/zaujulio'
              target='_blank'
              rel='noopener noreferrer'
              className='text-brand-300 hover:text-brand-500 transition-colors no-underline font-medium'
            >
              Zau Julio
            </a>
          </div>

          {/* Center: export button */}
          <button
            type='button'
            onClick={exportProfileJSON}
            className='inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-brand-300 border border-gray-700 hover:border-brand-500/50 rounded-lg transition-colors'
          >
            <DownloadIcon className='size-4' />
            Export Profile (JSON)
          </button>

          {/* Right: copyright */}
          <p className='text-gray-500 text-xs'>&copy; {year} Zau Julio. All rights reserved.</p>
        </div>

        {/* Social links row */}
        <div className='flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-800/60'>
          <a
            href='https://github.com/zaujulio'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-500 hover:text-brand-300 transition-colors'
            aria-label='GitHub'
          >
            <GithubIcon className='size-5' />
          </a>
          <a
            href='https://linkedin.com/in/zaujulio'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-500 hover:text-brand-300 transition-colors'
            aria-label='LinkedIn'
          >
            <LinkedinIcon className='size-5' />
          </a>
          <a
            href='mailto:zaujulio.dev@gmail.com'
            className='text-gray-500 hover:text-brand-300 transition-colors'
            aria-label='Email'
          >
            <MailIcon className='size-5' />
          </a>
        </div>
      </div>
    </footer>
  );
}
