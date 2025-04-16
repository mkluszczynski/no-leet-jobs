import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { ApplicationDto } from './dto/application.dto';
import { UploadService } from '@lib/upload';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
    private readonly uploadService: UploadService,
  ) {}

  async getAllApplications(): Promise<Application[]> {
    return this.applicationRepository.find({});
  }

  async getApplicationById(id: number): Promise<Application> {
    const application = await this.applicationRepository.findOneBy({ id });

    if (!application) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }

    return application;
  }

  async createApplicationFromDto(dto: ApplicationDto): Promise<Application> {
    const newApplication = Application.fromDto(dto);
    return this.applicationRepository.save(newApplication);
  }

  async updateApplication(application: Application): Promise<Application> {
    return this.applicationRepository.save(application);
  }

  async updateApplicationFromDto(
    id: number,
    dto: ApplicationDto,
  ): Promise<Application> {
    const application = await this.getApplicationById(id);

    application.updateFromDto(dto);

    return this.applicationRepository.save(application);
  }

  async deleteApplication(application: Application): Promise<void> {
    await this.applicationRepository.remove(application);
  }

  async deleteApplicationById(id: number): Promise<void> {
    const application = await this.getApplicationById(id);
    await this.deleteApplication(application);
  }
}
