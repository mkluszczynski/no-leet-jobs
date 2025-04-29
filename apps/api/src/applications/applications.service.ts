import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { ApplicationDto } from './dto/application.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async getAllApplications(): Promise<Application[]> {
    return this.applicationRepository.find({});
  }

  async getAllApplicationsByJobId(jobId: number): Promise<Application[]> {
    return this.applicationRepository.find({
      where: { job: { id: jobId } },
      relations: {
        user: true,
      },
    });
  }

  async getApplicationById(id: number): Promise<Application> {
    const application = await this.applicationRepository.findOneBy({ id });

    if (!application) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }

    return application;
  }

  async getFullApplicationById(id: number): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: {
        job: {
          company: true,
          requiredSkills: true,
          fieldOfJob: true,
        },
        user: true,
      },
    });
    if (!application) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }
    return application;
  }

  async createApplicationFromDto(dto: ApplicationDto): Promise<Application> {
    const newApplication = Application.fromDto(dto);
    return this.applicationRepository.save(newApplication);
  }

  async saveApplication(application: Application): Promise<Application> {
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
