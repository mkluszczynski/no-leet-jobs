import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'contact@mkluszczynski.dev',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  password: string;
}
