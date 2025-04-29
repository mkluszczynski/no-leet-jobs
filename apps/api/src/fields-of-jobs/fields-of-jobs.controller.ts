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
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Public } from '@app/auth/decorators/public.decorator';
import { RequireRole } from '@app/auth/decorators/require-role.decorator';

@ApiBearerAuth()
@Controller('fields-of-jobs')
export class FieldsOfJobsController {
  constructor(private readonly fieldsOfJobsService: FieldsOfJobsService) {}

  @Get()
  @Public()
  getAllFields(): Promise<FieldOfJob[]> {
    return this.fieldsOfJobsService.getAllFields();
  }

  @Get(':id')
  @Public()
  getFieldById(@Param() params: IdParam): Promise<FieldOfJob> {
    return this.fieldsOfJobsService.getFieldById(params.id);
  }

  @Post()
  @RequireRole()
  createField(@Body() dto: FieldOfJobDto): Promise<FieldOfJob> {
    return this.fieldsOfJobsService.createFieldFromDto(dto);
  }

  @Put(':id')
  @RequireRole()
  @ApiParam({ name: 'id', type: Number })
  updateField(
    @Param() params: IdParam,
    @Body() dto: FieldOfJobDto,
  ): Promise<FieldOfJob> {
    return this.fieldsOfJobsService.updateFieldFromDto(params.id, dto);
  }

  @Delete(':id')
  @RequireRole()
  @ApiParam({ name: 'id', type: Number })
  deleteField(@Param() params: IdParam) {
    return this.fieldsOfJobsService.deleteFieldById(params.id);
  }
}
