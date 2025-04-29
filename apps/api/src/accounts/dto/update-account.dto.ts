import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateAccountDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'The email of the user',
    example: 'contact@mkluszczynski.dev',
  })
  email?: string;

  @IsOptional()
  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password?: string;
}
