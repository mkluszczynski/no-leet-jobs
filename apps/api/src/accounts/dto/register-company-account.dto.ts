import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { CompanyDto } from 'src/companies/dto/company.dto';

export class RegisterCompanyAccountDto extends CompanyDto {
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
