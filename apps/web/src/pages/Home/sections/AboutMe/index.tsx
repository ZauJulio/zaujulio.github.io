import { BriefcaseIcon, GraduationCapIcon, UserIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { LanguagesBlock } from './components/LanguagesBlock';
import { SubSectionHeader } from './components/SubSectionHeader';
import { ThesisBlock } from './components/ThesisBlock';
import { TimelineItem } from './components/TimelineItem';
import { useEducation } from './hooks/useEducation';
import { useExperience } from './hooks/useExperience';

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT ME SECTION (unified)
// ═══════════════════════════════════════════════════════════════════════════════

export function AboutMeSection() {
  const { t } = useTranslation();
  const education = useEducation();
  const experience = useExperience();

  return (
    <section
      id='about'
      className='py-20 relative overflow-hidden'
      style={{
        background: '#000',
        backgroundImage:
          'radial-gradient(ellipse at 20% 50%, rgba(45,19,44,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(128,19,54,0.05) 0%, transparent 45%)',
      }}
    >
      <div className='container mx-auto px-6 max-w-6xl'>
        {/* Section Title */}
        <div className='flex items-center gap-3 mb-16'>
          <div className='p-2 bg-brand-900/40 rounded-lg'>
            <UserIcon className='size-7 text-brand-300' />
          </div>
          <h2 className='text-4xl font-bold text-white'>{t('about.title')}</h2>
        </div>

        {/* Two-column: Experience (left) | Education + Languages (right) */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16'>
          {/* Experience Timeline */}
          <div id='experience' className='scroll-mt-8'>
            <SubSectionHeader icon={BriefcaseIcon} title={t('about.experience')} />
            <div className='relative border-l-2 border-brand-700/50 space-y-8'>
              {experience.map((exp) => (
                <TimelineItem
                  key={exp.id}
                  title={exp.role}
                  subtitle={exp.company}
                  period={exp.period}
                  location={exp.location}
                  description={exp.description}
                  skills={exp.skills}
                />
              ))}
            </div>
          </div>

          {/* Education Timeline + Languages (same column) */}
          <div>
            <div id='education' className='scroll-mt-8'>
              <SubSectionHeader icon={GraduationCapIcon} title={t('about.education')} />
              <div className='relative border-l-2 border-brand-700/50 space-y-8'>
                {education.items.map((edu) => (
                  <TimelineItem
                    key={edu.id}
                    title={edu.degree}
                    subtitle={edu.institution}
                    period={edu.period}
                    location={edu.location}
                    description={edu.description}
                    skills={edu.skills}
                    accentColor={edu.accentColor}
                  />
                ))}
              </div>
            </div>

            {/* Languages — directly below Education, same width */}
            <LanguagesBlock />
          </div>
        </div>

        {/* Thesis — full width below the two columns */}
        <ThesisBlock />
      </div>
    </section>
  );
}
