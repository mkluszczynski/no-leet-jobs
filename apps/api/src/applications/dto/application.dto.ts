import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber } from 'class-validator';

export class ApplicationDto {
  @ApiProperty({
    description: 'The first name of the applicant',
    example: 'Mateusz',
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the applicant',
    example: 'Kluszczynski',
  })
  lastName: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email address of the applicant',
    example: 'user@mkluszczynski.dev',
  })
  email: string;

  @IsPhoneNumber()
  @ApiProperty({
    format: 'phone',
    example: '+48123456789',
  })
  phone: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
