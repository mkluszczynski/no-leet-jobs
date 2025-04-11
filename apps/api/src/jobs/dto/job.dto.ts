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
import { CreateRequiredSkillDto } from 'src/required-skills/dto/create-requreid-skill';

export class JobDto {
  @ApiProperty()
  title: string;

  @IsLowercase()
  @ApiProperty()
  alias: string;

  @ApiProperty()
  description: string;

  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  fieldOfJobId: number;

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
  @Type(() => CreateRequiredSkillDto)
  @ApiProperty({
    type: CreateRequiredSkillDto,
    isArray: true,
  })
  requiredSkillsDto: CreateRequiredSkillDto[];
}
