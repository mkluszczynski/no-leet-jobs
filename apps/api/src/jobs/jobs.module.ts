import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { RequiredSkillsModule } from 'src/required-skills/required-skills.module';
import { FieldsOfJobsModule } from 'src/fields-of-jobs/fields-of-jobs.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { UploadModule } from '@lib/upload';
import { UsersModule } from 'src/users/users.module';
import { ApplicationsModule } from 'src/applications/applications.module';
import { APP_GUARD } from '@nestjs/core';
import { JobViewGuard } from './guards/job-view.guard';
import { JobEditGuard } from './guards/job-edit.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    RequiredSkillsModule,
    FieldsOfJobsModule,
    CompaniesModule,
    UploadModule,
    ApplicationsModule,
    UsersModule,
  ],
  controllers: [JobsController],
  providers: [
    JobsService,
    {
      provide: APP_GUARD,
      useClass: JobViewGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JobEditGuard,
    },
  ],
  exports: [JobsService],
})
export class JobsModule {}
