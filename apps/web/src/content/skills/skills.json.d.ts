// Auto-generated skill clusters types for skills.json

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCluster {
  id: string;
  label: string;
  color: string;
  skills: Skill[];
}

export interface SkillsJson {
  clusters: SkillCluster[];
}

declare const value: SkillsJson;
export default value;
