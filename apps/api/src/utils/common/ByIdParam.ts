import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetByIdParam {
  @IsInt()
  @Type(() => Number)
  id: number;
}
