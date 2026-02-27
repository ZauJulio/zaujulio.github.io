export interface LanguageLevels {
  speaking: number;
  listening: number;
  reading: number;
}

export interface LanguageItem {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  proficiency: string;
  color: string;
  levels: LanguageLevels;
}

export interface LanguagesJson {
  $schema: string;
  items: LanguageItem[];
}

declare const value: LanguagesJson;
export default value;
