import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class IdParam {
  @IsInt()
  @Type(() => Number)
  id: number;
}
