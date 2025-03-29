import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class GetJobByIdParams {
  @IsInt()
  @Type(() => Number)
  id: number;
}
