import { ApiProperty } from '@nestjs/swagger';

export class FieldOfJobDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  alias: string;
}
