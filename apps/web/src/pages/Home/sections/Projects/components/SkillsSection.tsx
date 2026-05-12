import { CodeIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { SKILL_CLUSTERS } from '../data';
import { BubbleCluster } from './BubbleCluster';

export function SkillsSection() {
  const { t } = useTranslation();

  return (
    <div id='skills' className='mt-20 pt-10 border-t border-gray-800'>
      <div className='flex items-center gap-3 mb-10'>
        <div className='p-2 bg-brand-900/40 rounded-lg'>
          <CodeIcon className='size-5 text-brand-300' />
        </div>
        <h3 className='text-2xl font-bold text-white'>{t('about.skills')}</h3>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {SKILL_CLUSTERS.map((cluster) => (
          <BubbleCluster key={cluster.label} cluster={cluster} />
        ))}
      </div>
    </div>
  );
}
