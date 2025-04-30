import { EmploymentType } from '../enums/employemnt-type.enum';
import { ExperienceLevel } from '../enums/experience-level.enum';
import { WorkType } from '../enums/work-type.enum';

export type JobQuery = {
  minSalary?: number;
  maxSalary?: number;
  workType?: WorkType;
  experience?: ExperienceLevel;
  employmentType?: EmploymentType;
  fieldOfJobId?: number;
  requiredSkills?: string[];
  companyId?: number;
};
