import { ApiProperty } from '@nestjs/swagger';

export class CreateFieldOfJobDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  alias: string;
}
