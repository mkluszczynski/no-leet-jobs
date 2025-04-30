import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job } from './job.entity';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JobDto } from './dto/job.dto';
import { IdParam } from 'src/utils/common/ByIdParam';
import { AuthorizeJobEdit } from 'src/jobs/decorators/auth-job-edit.decorator';
import { Public } from '@app/auth/decorators/public.decorator';
import { RequireRole } from '@app/auth/decorators/require-role.decorator';
import { Role } from 'src/accounts/enums/role.enum';
import { CompaniesService } from 'src/companies/companies.service';
import { Email } from '@app/auth/decorators/email.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApplicationDto } from 'src/applications/dto/application.dto';
import { TryEmail } from '@app/auth/decorators/try-email.decorator';
import { ApplicationsService } from 'src/applications/applications.service';
import { UploadService } from '@lib/upload';
import { UsersService } from 'src/users/users.service';
import { AuthorizeJobView } from 'src/jobs/decorators/auth-job-view.decorator';
import { JobQuery } from './types/job-query.type';
import { EmploymentType } from './enums/employemnt-type.enum';
import { ExperienceLevel } from './enums/experience-level.enum';
import { WorkType } from './enums/work-type.enum';

@ApiBearerAuth()
@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly companiesService: CompaniesService,
    private readonly uploadService: UploadService,
    private readonly applicationsService: ApplicationsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @Public()
  @ApiQuery({ name: 'minSalary', type: Number, required: false })
  @ApiQuery({ name: 'maxSalary', type: Number, required: false })
  @ApiQuery({ name: 'workType', enum: WorkType, required: false })
  @ApiQuery({ name: 'experience', enum: ExperienceLevel, required: false })
  @ApiQuery({ name: 'employmentType', enum: EmploymentType, required: false })
  @ApiQuery({ name: 'fieldOfJobId', type: Number, required: false })
  @ApiQuery({ name: 'requiredSkills', type: String, required: false })
  @ApiQuery({ name: 'companyId', type: Number, required: false })
  getAllJobs(
    @Query('minSalary') minSalary: string | undefined,
    @Query('maxSalary') maxSalary: string | undefined,
    @Query('workType') workType: string | undefined,
    @Query('experience') experience: string | undefined,
    @Query('employmentType') employmentType: string | undefined,
    @Query('fieldOfJobId') fieldOfJobId: string | undefined,
    @Query('requiredSkills') requiredSkills: string | undefined,
    @Query('companyId') companyId: string | undefined,
  ): Promise<Job[]> {
    const jobQuery: JobQuery = {
      minSalary: minSalary ? +minSalary : undefined,
      maxSalary: maxSalary ? +maxSalary : undefined,
      workType: workType ? (workType as WorkType) : undefined,
      experience: experience ? (experience as ExperienceLevel) : undefined,
      employmentType: employmentType
        ? (employmentType as EmploymentType)
        : undefined,
      fieldOfJobId: fieldOfJobId ? +fieldOfJobId : undefined,
      requiredSkills: requiredSkills ? requiredSkills.split(',') : undefined,
      companyId: companyId ? +companyId : undefined,
    };
    console.log('Query:', jobQuery);

    return this.jobsService.getAllJobs(jobQuery);
  }

  @Get(':id')
  @Public()
  @ApiParam({ name: 'id', type: Number })
  getJobById(@Param() params: IdParam): Promise<Job> {
    return this.jobsService.getJobById(+params.id);
  }

  @Get(':id/applications')
  @RequireRole(Role.COMPANY)
  @AuthorizeJobView()
  @ApiParam({ name: 'id', type: Number })
  async getJobApplications(@Param() params: IdParam) {
    const job = await this.jobsService.getJobById(+params.id);
    return this.applicationsService.getAllApplicationsByJobId(job.id);
  }

  @Post()
  @RequireRole(Role.COMPANY)
  async createJob(@Body() dto: JobDto, @Email() email): Promise<Job> {
    const newJob = await this.jobsService.createJobFromDto(dto);
    const company = await this.companiesService.getCompanyByAccountEmail(email);
    newJob.company = company;
    return await this.jobsService.saveJob(newJob);
  }
  /*
    curl -X POST http://localhost:3001/api/v1/applications \
    -H "Content-Type: multipart/form-data" \
    -F "file=@/path/file.pdf" \
    -F "firstName=Jan" \
    -F "lastName=Kowalski" \
    -F "email=test@example.com" \
    -F "phone=+48123456789"
    */
  @Post(':id/apply')
  @Public()
  @ApiParam({ name: 'id', type: Number })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async createApplication(
    @Param() params: IdParam,
    @Body() dto: ApplicationDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'application/pdf',
        })
        .addMaxSizeValidator({
          maxSize: 4194304, // 4MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @TryEmail() email: string | null,
  ) {
    const newApplication =
      await this.applicationsService.createApplicationFromDto(dto);

    const time = newApplication.createdAt.getTime();
    const resumePath = await this.uploadService.uploadFile(file, [
      'resumes',
      time.toString(),
    ]);
    newApplication.resumePath = resumePath;

    const user = await this.usersService.tryGetUserByEmail(email);
    if (user) newApplication.user = user;

    const job = await this.jobsService.getJobById(+params.id);
    newApplication.job = job;

    return this.applicationsService.saveApplication(newApplication);
  }

  @Put(':id')
  @RequireRole(Role.COMPANY)
  @AuthorizeJobEdit()
  @ApiParam({ name: 'id', type: Number })
  async updateJob(@Param() params: IdParam, @Body() dto: JobDto): Promise<Job> {
    return await this.jobsService.updateJobFromDto(+params.id, dto);
  }

  @Delete(':id')
  @RequireRole(Role.COMPANY)
  @AuthorizeJobEdit()
  @ApiParam({ name: 'id', type: Number })
  async deleteJob(@Param() params: IdParam) {
    await this.jobsService.deleteJobById(+params.id);
  }
}
