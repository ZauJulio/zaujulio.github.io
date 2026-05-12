import { ExternalLinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { ProjectCard } from './components/ProjectCard';
import { SkillsSection } from './components/SkillsSection';
import { SoftSkillsSection } from './components/SoftSkillsSection';
import { projects } from './data';

export function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <section
      id='projects'
      className='py-20 px-4 relative overflow-hidden'
      style={{
        background: '#0a0a0a',
        backgroundImage:
          'radial-gradient(ellipse at 50% 20%, rgba(199,44,65,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(45,19,44,0.06) 0%, transparent 40%)',
      }}
    >
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-4 text-white'>{t('projects.title')}</h2>
        <p className='text-center text-gray-400 mb-12 max-w-2xl mx-auto'>{t('projects.description')}</p>

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

        {/* Soft Skills Section */}
        <SoftSkillsSection />
      </div>
    </section>
  );
}
