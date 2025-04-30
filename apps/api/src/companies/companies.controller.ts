import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { IdParam } from 'src/utils/common/ByIdParam';
import { CompanyDto } from './dto/company.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Public } from '@app/auth/decorators/public.decorator';
import { RequireRole } from '@app/auth/decorators/require-role.decorator';
import { Role } from 'src/accounts/enums/role.enum';
import { AuthorizeCompanyEdit } from 'src/companies/decorators/auth-company-edit.decorator';

@ApiBearerAuth()
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @Public()
  getAllCompanies() {
    return this.companiesService.getAllCompanies();
  }

  @Get(':id')
  @Public()
  @ApiParam({ name: 'id', type: Number })
  getCompanyById(@Param() params: IdParam) {
    return this.companiesService.getCompanyById(params.id);
  }

  @Put(':id')
  @RequireRole(Role.COMPANY)
  @AuthorizeCompanyEdit()
  @ApiParam({ name: 'id', type: Number })
  updateCompanyById(@Param() params: IdParam, @Body() dto: CompanyDto) {
    return this.companiesService.updateCompanyFromDto(params.id, dto);
  }

  @Delete(':id')
  @RequireRole(Role.COMPANY)
  @AuthorizeCompanyEdit()
  @ApiParam({ name: 'id', type: Number })
  deleteCompanyById(@Param() params: IdParam) {
    return this.companiesService.deleteCompany(params.id);
  }
}
