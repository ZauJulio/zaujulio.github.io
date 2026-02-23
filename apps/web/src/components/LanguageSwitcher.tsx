import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'pt-BR', label: 'PT', flag: '🇧🇷' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
  };

  return (
    <div className='flex items-center gap-1'>
      {languages.map((lang) => (
        <button
          key={lang.code}
          type='button'
          onClick={() => handleLanguageChange(lang.code)}
          className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
            i18n.language === lang.code
              ? 'bg-brand-500 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
