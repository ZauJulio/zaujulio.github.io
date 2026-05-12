import type { ElementType } from 'react';
import { BookOpenIcon, EarIcon, GlobeIcon, MicIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import languagesJson from '@content/languages/languages.json';

import type { Language, LanguageProficiency } from '../types';
import { SubSectionHeader } from './SubSectionHeader';

const LANGUAGES = (languagesJson as any).items.map((lang: any) => ({
  ...lang,
  flag: lang.emojiFlag,
}));

const LANG_SKILL_META: Record<keyof LanguageProficiency, { label: string; icon: ElementType }> = {
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

export function LanguagesBlock() {
  const { t } = useTranslation();

  return (
    <div id='languages' className='scroll-mt-8 mt-8'>
      <SubSectionHeader icon={GlobeIcon} title={t('about.languages')} />

      <div className='bg-gray-800/25 backdrop-blur-sm rounded-lg border border-gray-700/60 p-6 divide-y divide-gray-700/30 hover:border-brand-500 transition-all duration-300 hover:shadow-lg hover:shadow-brand-900/20'>
        {LANGUAGES.map((lang: Language) => (
          <LanguageCard key={lang.name} language={lang} />
        ))}
      </div>
    </div>
  );
}
