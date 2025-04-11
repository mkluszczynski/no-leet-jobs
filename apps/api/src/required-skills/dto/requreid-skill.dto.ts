import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { SkillLevel } from 'src/required-skills/enums/skill-level.enum';

export class RequiredSkillDto {
  @ApiProperty()
  skillId: number;

  @IsEnum(SkillLevel)
  @ApiProperty()
  level: SkillLevel;
}
