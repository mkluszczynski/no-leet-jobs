import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsLowercase,
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
  @IsLowercase()
  alias: string;

  @ApiProperty()
  description: string;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    type: 'number',
    minimum: 0,
  })
  minSalary: number;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    type: 'number',
    minimum: 0,
  })
  maxSalary: number;

  @IsEnum(WorkType)
  @ApiProperty({
    enum: WorkType,
  })
  workType: WorkType;

  @IsEnum(ExperienceLevel)
  @ApiProperty({
    enum: ExperienceLevel,
  })
  experience: ExperienceLevel;

  @IsEnum(EmploymentType)
  @ApiProperty({
    enum: EmploymentType,
  })
  employmentType: EmploymentType;

  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => RequiredSkill)
  @ApiProperty({
    type: RequiredSkill,
    isArray: true,
    minItems: 1,
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        level: { type: 'string' },
      },
    },
  })
  requiredSkills: RequiredSkill[];
}
