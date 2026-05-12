import { HeartHandshakeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function SoftSkillCard({ name, description, index }: { name: string; description: string; index: number }) {
  const accents = ['#EE4540', '#C72C41', '#801336', '#F47370', '#A82033'];
  const accent = accents[index % accents.length];

  return (
    <div
      className='group relative bg-gray-900/25 rounded-lg border border-gray-800/60 p-4 transition-all duration-300 hover:border-brand-500/40 hover:bg-gray-800/30'
      style={{ borderLeftWidth: '3px', borderLeftColor: accent }}
    >
      <h4 className='text-sm font-semibold text-white mb-1.5 group-hover:text-brand-300 transition-colors'>{name}</h4>
      <p className='text-xs text-gray-500 leading-relaxed'>{description}</p>
    </div>
  );
}

export function SoftSkillsSection() {
  const { t } = useTranslation();
  const items = t('softSkills.items', { returnObjects: true }) as Array<{ name: string; description: string }>;

  return (
    <div className='mt-16 pt-10 border-t border-gray-800/50'>
      <div className='flex items-center gap-3 mb-8'>
        <div className='p-2 bg-brand-900/40 rounded-lg'>
          <HeartHandshakeIcon className='size-5 text-brand-300' />
        </div>
        <h3 className='text-2xl font-bold text-white'>{t('softSkills.title')}</h3>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3'>
        {Array.isArray(items) &&
          items.map((skill, i) => (
            <SoftSkillCard key={skill.name} name={skill.name} description={skill.description} index={i} />
          ))}
      </div>
    </div>
  );
}
