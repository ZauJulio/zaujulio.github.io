import { useTranslation } from 'react-i18next';
import { BookOpenIcon, BriefcaseIcon, EarIcon, GlobeIcon, GraduationCapIcon, MicIcon, UserIcon } from 'lucide-react';

// ─── Shared Sub-heading ─────────────────────────────────────────────────────

function SubSectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className='flex items-center gap-3 mb-10'>
      <div className='p-2 bg-brand-900/40 rounded-lg'>
        <Icon className='size-5 text-brand-300' />
      </div>
      <h3 className='text-2xl font-bold text-white'>{title}</h3>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TIMELINE
// ═══════════════════════════════════════════════════════════════════════════════

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  location?: string;
  description: string;
  skills?: string[];
  accentColor?: string;
}

function TimelineItem({
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
        className={`bg-gray-800/80 backdrop-blur-sm p-5 rounded-lg border border-gray-700/60 ${hoverBorder} transition-all duration-300 group-hover:shadow-lg group-hover:shadow-brand-900/20`}
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

// ═══════════════════════════════════════════════════════════════════════════════
// LANGUAGES (inlined — displayed below Education)
// ═══════════════════════════════════════════════════════════════════════════════

interface LanguageProficiency {
  speaking: number;
  listening: number;
  reading: number;
}

interface Language {
  name: string;
  nativeName: string;
  flag: string;
  proficiency: string;
  color: string;
  levels: LanguageProficiency;
}

import educationJson from '@content/education/education.json';
import profileJson from '@content/profile/profile.json';

// Inlined for TypeScript reliability
interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
}
interface ProfileJson {
  $schema: string;
  name: string;
  title: string;
  location: string;
  email: string;
  website: string;
  social: { github: string; linkedin: string };
  experience: ExperienceItem[];
}
interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
  accentColor?: string;
}
interface EducationJson {
  $schema: string;
  items: EducationItem[];
}

const profile = profileJson as ProfileJson;
const education = educationJson as EducationJson;

import languagesJson from '@content/languages/languages.json';

// TypeScript fix: explicit typing to unlock .d.ts, now .items points to LanguageItem[]
const LANGUAGES = (languagesJson as any).items.map((lang: any) => ({
  ...lang,
  flag: lang.emojiFlag,
}));

const LANG_SKILL_META: Record<keyof LanguageProficiency, { label: string; icon: React.ElementType }> = {
  speaking: { label: 'Speaking', icon: MicIcon },
  listening: { label: 'Listening', icon: EarIcon },
  reading: { label: 'Reading', icon: BookOpenIcon },
};

function LangSkillBar({ skill, value, color }: { skill: keyof LanguageProficiency; value: number; color: string }) {
  const { label, icon: Icon } = LANG_SKILL_META[skill];

  return (
    <div className='flex items-center gap-3'>
      <Icon className='size-3.5 text-gray-500 shrink-0' />
      <span className='text-gray-400 text-xs w-16 shrink-0'>{label}</span>
      <div className='flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden'>
        <div
          className='h-full rounded-full transition-all duration-700 ease-out'
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className='text-gray-500 text-xs w-8 text-right tabular-nums'>{value}%</span>
    </div>
  );
}

function LanguageCard({ language }: { language: Language }) {
  return (
    <div className='py-4 first:pt-0 last:pb-0'>
      <div className='flex items-center gap-3 mb-3'>
        <span className='text-2xl shrink-0'>{language.flag}</span>
        <div className='flex items-baseline gap-2 flex-1 min-w-0'>
          <span className='text-white font-semibold text-sm'>{language.name}</span>
          <span className='text-gray-500 text-xs'>({language.nativeName})</span>
        </div>
        <span className='text-xs font-medium shrink-0' style={{ color: language.color }}>
          {language.proficiency}
        </span>
      </div>

      <div className='flex flex-col gap-2 pl-10'>
        <LangSkillBar skill='speaking' value={language.levels.speaking} color={language.color} />
        <LangSkillBar skill='listening' value={language.levels.listening} color={language.color} />
        <LangSkillBar skill='reading' value={language.levels.reading} color={language.color} />
      </div>
    </div>
  );
}

function LanguagesBlock() {
  const { t } = useTranslation();
  
  return (
    <div id='languages' className='scroll-mt-8 mt-8'>
      <SubSectionHeader icon={GlobeIcon} title={t('about.languages')} />

      <div className='bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/60 p-6 divide-y divide-gray-700/30 hover:border-brand-500 transition-all duration-300 hover:shadow-lg hover:shadow-brand-900/20'>
        {LANGUAGES.map((lang) => (
          <LanguageCard key={lang.name} language={lang} />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT ME SECTION (unified)
// ═══════════════════════════════════════════════════════════════════════════════

export function AboutMeSection() {
  const { t } = useTranslation();
  
  return (
    <section id='about' className='bg-black py-20'>
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
              {profile.experience.map((exp) => (
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
        <div id='thesis' className='scroll-mt-8 mt-20'>
          <SubSectionHeader icon={BookOpenIcon} title={t('about.thesis')} />

          <div className='bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg border border-gray-700/60 hover:border-brand-500 transition-all duration-300 hover:shadow-lg hover:shadow-brand-900/20'>
            <div className='flex flex-col md:flex-row gap-6 mb-4'>
              <div className='md:w-1/3'>
                <picture>
                  <source
                    srcSet={`${import.meta.env.BASE_URL}thesis/thesis-features-analyzer.webp`}
                    type='image/webp'
                  />
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
                <h4 className='text-xl font-bold text-white mb-1'>Features Analyzer</h4>
                <h5 className='text-brand-300 font-medium text-sm mb-1'>
                  Boilerplate for Data Visualization and Analysis Tools
                </h5>
                <p className='text-gray-500 text-xs mb-4'>Federal University of Rio Grande do Norte (UFRN) - 2024</p>

                <p className='text-gray-400 text-sm leading-relaxed'>
                  A Python desktop application for dataset feature analysis, prototyping and testing machine learning
                  and statistical models. Built with a modular architecture using GTK for the UI, featuring a custom
                  state management system with the Observer pattern, a typed JSON ORM with Pydantic and TinyDB, and
                  internationalization support (i18n). Includes Docker containerization and automated documentation with
                  MkDocs.
                </p>
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
                <span key={skill} className='text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded'>
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
      </div>
    </section>
  );
}
