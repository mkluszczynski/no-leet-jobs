import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldOfJob } from './field-of-job.entity';
import { FieldsOfJobsController } from './fields-of-jobs.controller';
import { FieldsOfJobsService } from './fields-of-jobs.service';

@Module({
  imports: [TypeOrmModule.forFeature([FieldOfJob])],
  controllers: [FieldsOfJobsController],
  providers: [FieldsOfJobsService],
  exports: [FieldsOfJobsService],
})
export class FieldsOfJobsModule {}
