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
  social: {
    github: string;
    linkedin: string;
  };
  experience: ExperienceItem[];
}

declare const value: ProfileJson;
export default value;
