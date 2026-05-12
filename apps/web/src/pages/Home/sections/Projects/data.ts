import type { Project } from 'content/projects/projects.json.d.ts';
import type { SkillCluster } from 'content/skills/skills.json.d.ts';
import projectsJson from 'content/projects/projects.json';
import skillsJson from 'content/skills/skills.json';

export const projects: Project[] = projectsJson.projects;
export const SKILL_CLUSTERS: SkillCluster[] = skillsJson.clusters;
