import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { IdParam } from 'src/utils/common/ByIdParam';
import { CompanyDto } from './dto/company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getAllCompanies() {
    return this.companiesService.getAllCompanies();
  }

  @Get(':id')
  getCompanyById(@Param() params: IdParam) {
    return this.companiesService.getCompanyById(params.id);
  }

  @Post()
  createCompany(@Body() dto: CompanyDto) {
    return this.companiesService.createCompanyFromDto(dto);
  }

  @Put(':id')
  updateCompanyById(@Param() params: IdParam, @Body() dto: CompanyDto) {
    return this.companiesService.updateCompanyFromDto(params.id, dto);
  }

  @Delete(':id')
  deleteCompanyById(@Param() params: IdParam) {
    return this.companiesService.deleteCompany(params.id);
  }
}
