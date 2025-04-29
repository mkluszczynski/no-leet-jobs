import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { IdParam } from 'src/utils/common/ByIdParam';
import { ApplicationDto } from './dto/application.dto';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UploadService } from '@lib/upload';
import { UsersService } from 'src/users/users.service';
import { AuthorizeApplicationEdit } from '@app/auth/decorators/auth-application-edit.decorator';
import { RequireRole } from '@app/auth/decorators/require-role.decorator';
import { Role } from 'src/accounts/enums/role.enum';
import { AuthorizeApplicationView } from '@app/auth/decorators/auth-application-view.decorator';

@ApiBearerAuth()
@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly uploadService: UploadService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @RequireRole()
  getAllApplications() {
    return this.applicationsService.getAllApplications();
  }

  @Get(':id')
  @RequireRole(Role.USER, Role.COMPANY)
  @AuthorizeApplicationView()
  @ApiParam({ name: 'id', type: Number })
  getApplicationById(@Param() params: IdParam) {
    return this.applicationsService.getApplicationById(params.id);
  }

  @Put(':id')
  @RequireRole(Role.USER)
  @AuthorizeApplicationEdit()
  updateApplicationById(@Param() params: IdParam, @Body() dto: ApplicationDto) {
    return this.applicationsService.updateApplicationFromDto(params.id, dto);
  }

  @RequireRole(Role.USER)
  @AuthorizeApplicationEdit()
  @Delete(':id')
  async deleteApplicationById(@Param() params: IdParam) {
    const application = await this.applicationsService.getApplicationById(
      params.id,
    );

    this.uploadService.deleteFile(application.resumePath);

    return this.applicationsService.deleteApplication(application);
  }
}
