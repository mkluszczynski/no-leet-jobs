import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @ApiProperty()
  firstName?: string;

  @IsOptional()
  @ApiProperty()
  lastName?: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty()
  phoneNumber?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isPublic?: boolean;
}
