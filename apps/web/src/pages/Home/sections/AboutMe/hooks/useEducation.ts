import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import educationJson from '@content/education/education.json';
import educationPtBRJson from '@content/education/education.pt-BR.json';

import type { EducationJson } from '../types';

const enEducation = educationJson as EducationJson;
const ptBREducation = educationPtBRJson as EducationJson;

export function useEducation() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';

  return useMemo(() => {
    return lang === 'pt-BR' ? ptBREducation : enEducation;
  }, [lang]);
}
