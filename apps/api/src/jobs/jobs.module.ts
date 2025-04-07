import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { RequiredSkillsModule } from 'src/required-skills/required-skills.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), RequiredSkillsModule],
  controllers: [JobsController],
  providers: [JobsService],
  exports: [JobsService],
})
export class JobsModule {}
