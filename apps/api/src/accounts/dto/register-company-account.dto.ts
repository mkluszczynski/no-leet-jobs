import { ApiProperty } from '@nestjs/swagger';
import { CompanyDto } from 'src/companies/dto/company.dto';

export class RegisterCompanyAccountDto extends CompanyDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
