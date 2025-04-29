import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@mkluszczynski.dev',
  })
  email?: string;

  @IsOptional()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  firstName?: string;

  @IsOptional()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  lastName?: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+48123456789',
  })
  phoneNumber?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Indicates if the user is public',
    example: true,
  })
  isPublic?: boolean;
}
