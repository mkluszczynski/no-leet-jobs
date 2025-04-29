import {
  IsArray,
  IsEnum,
  IsInt,
  IsLowercase,
  ValidateNested,
} from 'class-validator';
import { EmploymentType } from '../enums/employemnt-type.enum';
import { ExperienceLevel } from '../enums/experience-level.enum';
import { WorkType } from '../enums/work-type.enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RequiredSkillDto } from 'src/required-skills/dto/requreid-skill.dto';

export class JobDto {
  @ApiProperty({
    description: 'The title of the job',
    example: 'Software Engineer',
  })
  title: string;

  @IsLowercase()
  @ApiProperty({
    description: 'The alias of the job',
    example: 'software-engineer',
  })
  alias: string;

  @ApiProperty({
    description: 'The description of the job',
    example: 'We are looking for a software engineer to join our team.',
  })
  description: string;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    description: 'The ID job field.',
    example: 1,
  })
  fieldOfJobId: number;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    type: 'number',
    minimum: 0,
    description: 'The minimum salary for the job',
    example: 7000,
  })
  minSalary: number;

  @IsInt()
  @Type(() => Number)
  @ApiProperty({
    type: 'number',
    minimum: 0,
    description: 'The maximum salary for the job',
    example: 9000,
  })
  maxSalary: number;

  @IsEnum(WorkType)
  @ApiProperty({
    enum: WorkType,
    description: 'The type of work for the job',
    example: WorkType.FULL_TIME,
  })
  workType: WorkType;

  @IsEnum(ExperienceLevel)
  @ApiProperty({
    enum: ExperienceLevel,
    description: 'The experience level required for the job',
    example: ExperienceLevel.JUNIOR,
  })
  experience: ExperienceLevel;

  @IsEnum(EmploymentType)
  @ApiProperty({
    enum: EmploymentType,
    description: 'The employment type for the job',
    example: EmploymentType.PERMANENT,
  })
  employmentType: EmploymentType;

  @IsArray()
  @ValidateNested()
  @Type(() => RequiredSkillDto)
  @ApiProperty({
    type: RequiredSkillDto,
    isArray: true,
  })
  requiredSkillsDto: RequiredSkillDto[];
}
