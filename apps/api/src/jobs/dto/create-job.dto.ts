import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  ValidateNested,
} from 'class-validator';
import { EmploymentType } from '../enums/employemnt-type.enum';
import { ExperienceLevel } from '../enums/experience-level.enum';
import { WorkType } from '../enums/work-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { RequiredSkill } from '../classes/required-skill.class';

export class CreateJobDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    type: 'number',
    minimum: 0,
  })
  @IsInt()
  @Type(() => Number)
  minSalary: number;

  @ApiProperty({
    type: 'number',
    minimum: 0,
  })
  @IsInt()
  @Type(() => Number)
  maxSalary: number;

  @ApiProperty({
    enum: WorkType,
  })
  @IsEnum(WorkType)
  workType: WorkType;

  @ApiProperty({
    enum: ExperienceLevel,
  })
  @IsEnum(ExperienceLevel)
  experience: ExperienceLevel;

  @ApiProperty({
    enum: EmploymentType,
  })
  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => RequiredSkill)
  requiredSkills: RequiredSkill[];
}
