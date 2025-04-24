import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FieldsOfJobsService } from './fields-of-jobs.service';
import { FieldOfJob } from './field-of-job.entity';
import { IdParam } from 'src/utils/common/ByIdParam';
import { FieldOfJobDto } from './dto/field-of-job.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('fields-of-jobs')
export class FieldsOfJobsController {
  constructor(private readonly fieldsOfJobsService: FieldsOfJobsService) {}

  @Get()
  getAllFields(): Promise<FieldOfJob[]> {
    return this.fieldsOfJobsService.getAllFields();
  }

  @Get(':id')
  getFieldById(@Param() params: IdParam): Promise<FieldOfJob> {
    return this.fieldsOfJobsService.getFieldById(params.id);
  }

  @Post()
  createField(@Body() dto: FieldOfJobDto): Promise<FieldOfJob> {
    return this.fieldsOfJobsService.createFieldFromDto(dto);
  }

  @Put(':id')
  updateField(
    @Param() params: IdParam,
    @Body() dto: FieldOfJobDto,
  ): Promise<FieldOfJob> {
    return this.fieldsOfJobsService.updateFieldFromDto(params.id, dto);
  }

  @Delete(':id')
  deleteField(@Param() params: IdParam) {
    return this.fieldsOfJobsService.deleteFieldById(params.id);
  }
}
