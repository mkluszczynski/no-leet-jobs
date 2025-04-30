import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyEditGuard } from './guards/company-edit.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    {
      provide: APP_GUARD,
      useClass: CompanyEditGuard,
    },
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}
