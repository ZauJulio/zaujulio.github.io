import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import profileJson from '@content/profile/profile.json';
import profilePtBRJson from '@content/profile/profile.pt-BR.json';

import type { ProfileJson } from '../types';

export function useExperience() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';

  return useMemo(() => {
    const data = lang === 'pt-BR' ? profilePtBRJson : profileJson;
    return (data as ProfileJson).experience;
  }, [lang]);
}
