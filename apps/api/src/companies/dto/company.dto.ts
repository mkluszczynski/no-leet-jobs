import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsUrl } from 'class-validator';

export class CompanyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty()
  phoneNumber?: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty()
  website?: string;
}
