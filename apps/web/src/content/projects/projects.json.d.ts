export interface Project {
  name: string;
  description: string;
  url: string;
  language: string;
  languageColor: string;
  stars: number;
  topics: string[];
}
export interface ProjectsJson {
  $schema?: string;
  projects: Project[];
}
declare const value: ProjectsJson;
export default value;
