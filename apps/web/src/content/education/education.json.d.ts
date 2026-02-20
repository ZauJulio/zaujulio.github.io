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

declare const value: EducationJson;
export default value;
// The above is the only default export. No duplicate exports or trailing accidental declarations.
