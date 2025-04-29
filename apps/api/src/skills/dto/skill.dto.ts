import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({
    description: 'The name of the skill',
    example: 'NestJS',
  })
  name: string;
}
