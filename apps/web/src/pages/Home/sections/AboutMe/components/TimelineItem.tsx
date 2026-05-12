import type { TimelineItemProps } from '../types';

export function TimelineItem({
  title,
  subtitle,
  period,
  location,
  description,
  skills,
  accentColor = 'brand-500',
}: TimelineItemProps) {
  const hoverBorder = accentColor === 'brand-300' ? 'hover:border-brand-300' : 'hover:border-brand-500';
  const dotBg = accentColor === 'brand-300' ? 'bg-brand-300' : 'bg-brand-500';
  const glowColor = accentColor === 'brand-300' ? 'shadow-brand-300/40' : 'shadow-brand-500/40';

  return (
    <div className='relative group pl-8'>
      <div
        className={`absolute -left-[1px] top-7 -translate-x-1/2 h-3 w-3 rounded-full ${dotBg} shadow-[0_0_8px_2px] ${glowColor} transition-all group-hover:scale-150 group-hover:shadow-[0_0_12px_4px] z-10`}
      />

      <div
        className={`bg-gray-800/20 backdrop-blur-sm p-5 rounded-lg border border-gray-700/40 ${hoverBorder} transition-all duration-300 group-hover:shadow-lg group-hover:shadow-brand-900/20`}
      >
        <h4 className='text-lg font-bold text-white'>{title}</h4>
        <h5 className='text-brand-300 font-medium text-sm'>{subtitle}</h5>

        <div className='flex flex-wrap items-center gap-2 mt-2 mb-3'>
          <span className='inline-block bg-brand-900/60 text-brand-300 text-xs px-2 py-0.5 rounded'>{period}</span>
          {location && <span className='text-gray-500 text-xs'>{location}</span>}
        </div>

        <p className='text-gray-400 text-sm leading-relaxed'>{description}</p>

        {skills && skills.length > 0 && (
          <div className='flex flex-wrap gap-1.5 mt-3'>
            {skills.map((skill) => (
              <span key={skill} className='text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded'>
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
