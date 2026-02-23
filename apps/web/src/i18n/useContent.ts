import { useTranslation } from 'react-i18next';

export function useContent() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  
  return {
    lang,
    isEnglish: lang === 'en',
    isPortuguese: lang === 'pt-BR',
  };
}

export function useLocalizedContent<T>(enContent: T, ptBRContent: T): T {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';
  
  return lang === 'pt-BR' ? ptBRContent : enContent;
}
