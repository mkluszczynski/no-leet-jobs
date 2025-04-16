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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { IdParam } from 'src/utils/common/ByIdParam';
import { ApplicationDto } from './dto/application.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  getAllApplications() {
    return this.applicationsService.getAllApplications();
  }

  @Get(':id')
  getApplicationById(@Param() params: IdParam) {
    return this.applicationsService.getApplicationById(params.id);
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
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  createApplication(
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
  ) {
    return this.applicationsService.createApplicationFromDtoAndFile(dto, file);
  }

  @Put(':id')
  updateApplicationById(@Param() params: IdParam, @Body() dto: ApplicationDto) {
    return this.applicationsService.updateApplicationFromDto(params.id, dto);
  }

  @Delete(':id')
  deleteApplicationById(@Param() params: IdParam) {
    return this.applicationsService.deleteApplication(params.id);
  }
}
