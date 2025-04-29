import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { IdParam } from 'src/utils/common/ByIdParam';
import { ApplicationDto } from './dto/application.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UploadService } from '@lib/upload';
import { UsersService } from 'src/users/users.service';

@ApiBearerAuth()
@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly uploadService: UploadService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getAllApplications() {
    return this.applicationsService.getAllApplications();
  }

  @Get(':id')
  getApplicationById(@Param() params: IdParam) {
    return this.applicationsService.getApplicationById(params.id);
  }

  @Put(':id')
  updateApplicationById(@Param() params: IdParam, @Body() dto: ApplicationDto) {
    return this.applicationsService.updateApplicationFromDto(params.id, dto);
  }

  @Delete(':id')
  async deleteApplicationById(@Param() params: IdParam) {
    const application = await this.applicationsService.getApplicationById(
      params.id,
    );

    this.uploadService.deleteFile(application.resumePath);

    return this.applicationsService.deleteApplication(application);
  }
}
