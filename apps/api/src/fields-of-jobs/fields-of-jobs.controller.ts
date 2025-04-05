import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FieldsOfJobsService } from './fields-of-jobs.service';
import { FieldOfJob } from './field-of-job.entity';
import { GetByIdParam } from 'src/utils/common/ByIdParam';
import { CreateFieldOfJobDto } from './dto/create-field-of-job.dto';

@Controller('fields-of-jobs')
export class FieldsOfJobsController {
  constructor(private readonly fieldsOfJobsService: FieldsOfJobsService) {}

  @Get()
  getAllFields(): Promise<FieldOfJob[]> {
    return this.fieldsOfJobsService.getAllFields();
  }

  @Get(':id')
  getFieldById(@Param() params: GetByIdParam): Promise<FieldOfJob> {
    return this.fieldsOfJobsService.getFieldById(params.id);
  }

  @Post()
  createField(@Body() dto: CreateFieldOfJobDto): Promise<FieldOfJob> {
    return this.fieldsOfJobsService.createFieldFromDto(dto);
  }
}
