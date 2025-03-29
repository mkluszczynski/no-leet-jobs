import { Controller, Get, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';
import { ApiParam } from '@nestjs/swagger';
import { GetJobByIdParams } from './dto/get-job-by-id.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getAllJobs(): Promise<Job[]> {
    return this.jobsService.getAllJobs();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  getJobById(@Param() params: GetJobByIdParams): Promise<Job> {
    return this.jobsService.getJobById(+params.id);
  }
}
