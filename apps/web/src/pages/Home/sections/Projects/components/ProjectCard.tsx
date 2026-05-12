import { ExternalLinkIcon, StarIcon } from 'lucide-react';

import type { Project } from 'content/projects/projects.json.d.ts';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target='_blank'
      rel='noopener noreferrer'
      className='group block rounded-xl border border-gray-800 bg-gray-950/15 p-6 transition-all duration-300 hover:border-brand-500/50 hover:bg-gray-800/30 hover:shadow-lg hover:shadow-brand-500/5'
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
