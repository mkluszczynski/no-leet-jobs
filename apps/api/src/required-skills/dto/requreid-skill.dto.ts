import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { SkillLevel } from 'src/required-skills/enums/skill-level.enum';

export class RequiredSkillDto {
  @ApiProperty({
    description: 'The ID of the skill',
    example: 1,
  })
  skillId: number;

  @IsEnum(SkillLevel)
  @ApiProperty({
    enum: SkillLevel,
    description: 'The level of the skill',
    example: SkillLevel.NICE_TO_HAVE,
  })
  level: SkillLevel;
}
