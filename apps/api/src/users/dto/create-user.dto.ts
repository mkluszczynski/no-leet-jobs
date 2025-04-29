import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@mkluszczynski.dev',
  })
  email: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName: string;
}
