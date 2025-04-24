import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JobDto } from './dto/job.dto';
import { IdParam } from 'src/utils/common/ByIdParam';
import { Public } from '@app/auth/decorators/public.decorator';

@ApiBearerAuth()
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Public()
  @Get()
  getAllJobs(): Promise<Job[]> {
    return this.jobsService.getAllJobs();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  getJobById(@Param() params: IdParam): Promise<Job> {
    return this.jobsService.getJobById(+params.id);
  }

  @Post()
  createJob(@Body() dto: JobDto): Promise<Job> {
    return this.jobsService.createJobFromDto(dto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  async updateJob(@Param() params: IdParam, @Body() dto: JobDto): Promise<Job> {
    return await this.jobsService.updateJobFromDto(+params.id, dto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  async deleteJob(@Param() params: IdParam) {
    await this.jobsService.deleteJobById(+params.id);
  }
}
