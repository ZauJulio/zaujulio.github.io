import { BookOpenIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { SubSectionHeader } from './SubSectionHeader';

export function ThesisBlock() {
  const { t } = useTranslation();

  return (
    <div id='thesis' className='scroll-mt-8 mt-20'>
      <SubSectionHeader icon={BookOpenIcon} title={t('about.thesis')} />

      <div className='bg-gray-800/20 backdrop-blur-sm p-6 rounded-lg border border-gray-700/60 hover:border-brand-500 transition-all duration-300 hover:shadow-lg hover:shadow-brand-900/20'>
        <div className='flex flex-col md:flex-row gap-6 mb-4'>
          <div className='md:w-1/3'>
            <picture>
              <source srcSet={`${import.meta.env.BASE_URL}thesis/thesis-features-analyzer.webp`} type='image/webp' />
              <img
                src='/thesis/thesis-features-analyzer.webp'
                alt='Features Analyzer Application Screenshot'
                width={400}
                height={300}
                className='w-full h-auto rounded-lg border border-gray-700/60 shadow-lg'
              />
            </picture>
          </div>
          <div className='md:w-2/3'>
            <h4 className='text-xl font-bold text-white mb-1'>{t('about.thesisName')}</h4>
            <h5 className='text-brand-300 font-medium text-sm mb-1'>{t('about.thesisSubtitle')}</h5>
            <p className='text-gray-500 text-xs mb-4'>Federal University of Rio Grande do Norte (UFRN) - 2024</p>

            <p className='text-gray-400 text-sm leading-relaxed'>{t('about.thesisDescription')}</p>
          </div>
        </div>

        <div className='flex flex-wrap gap-1.5 mb-4'>
          {[
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
          ].map((skill) => (
            <span key={skill} className='text-xs bg-gray-700/20 text-gray-300 px-2 py-0.5 rounded'>
              {skill}
            </span>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          <a
            href='https://github.com/ZauJulio/FeaturesAnalyzer'
            target='_blank'
            rel='noopener noreferrer'
            className='text-brand-300 text-sm hover:text-brand-500 transition-colors no-underline'
          >
            Source Code
          </a>
          <a
            href='https://zaujulio.github.io/FeaturesAnalyzer/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-brand-300 text-sm hover:text-brand-500 transition-colors no-underline'
          >
            Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
