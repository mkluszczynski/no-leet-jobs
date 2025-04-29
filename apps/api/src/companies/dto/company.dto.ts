import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsUrl } from 'class-validator';

export class CompanyDto {
  @ApiProperty({
    description: 'The name of the company',
    example: 'My Company',
  })
  name: string;

  @ApiProperty({
    description: 'The address of the company',
    example: '123 Main St, City, Country',
  })
  address: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({
    description: 'The phone number of the company',
    example: '+48123456789',
  })
  phoneNumber?: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email of the company',
    example: 'contact@mkluszczynski.dev',
  })
  email: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    description: 'The website of the company',
    example: 'https://mkluszczynski.dev',
  })
  website?: string;
}
