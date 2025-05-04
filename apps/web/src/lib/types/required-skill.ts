import { Skill } from "./skill";

export type RequiredSkill = {
  id: number;
  level: SkillLevel;
  skill: Skill;
};

export enum SkillLevel {
  NICE_TO_HAVE = "NICE_TO_HAVE",
  NOVICE = "NOVICE",
  REGULAR = "REGULAR",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
}
