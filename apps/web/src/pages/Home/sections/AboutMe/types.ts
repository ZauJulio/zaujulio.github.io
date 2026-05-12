export interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  location?: string;
  description: string;
  skills?: string[];
  accentColor?: string;
}

export interface LanguageProficiency {
  speaking: number;
  listening: number;
  reading: number;
}

export interface Language {
  name: string;
  nativeName: string;
  flag: string;
  proficiency: string;
  color: string;
  levels: LanguageProficiency;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
}

export interface ProfileJson {
  $schema: string;
  name: string;
  title: string;
  location: string;
  email: string;
  website: string;
  social: { github: string; linkedin: string };
  experience: ExperienceItem[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
  accentColor?: string;
}

export interface EducationJson {
  $schema: string;
  items: EducationItem[];
}
