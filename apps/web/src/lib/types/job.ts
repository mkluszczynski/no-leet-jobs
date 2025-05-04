import { Company } from "./company";
import { FieldOfJob } from "./field-of-job";
import { RequiredSkill } from "./required-skill";

export type Job = {
  id: number;
  title: string;
  alias: string;
  description: string;
  minSalary: number;
  maxSalary: number;
  workType: WorkType;
  experience: ExperienceLevel;
  employmentType: EmploymentType;
  fieldOfJob: FieldOfJob;
  requiredSkills: RequiredSkill[];
  company: Company;
};

export enum EmploymentType {
  B2B = "B2B",
  PERMANENT = "PERMANENT",
  MANDATORY_CONTRACT = "MANDATORY_CONTRACT",
}

export enum ExperienceLevel {
  INTERN = "INTERN",
  JUNIOR = "JUNIOR",
  MID = "MID",
  SENIOR = "SENIOR",
}

export enum WorkType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERNSHIP = "INTERNSHIP",
}
