import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsUrl } from 'class-validator';

export class CompanyDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @IsPhoneNumber()
  @ApiProperty()
  phoneNumber: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsUrl()
  @ApiProperty()
  website: string;
}
