import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';
import { ApplicationDto } from './dto/application.dto';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class ApplicationsService {
  private readonly uploadsPath = join(__dirname, '..', '..', '..', 'uploads');

  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {
    this.ensureUploadsDirectory();
  }

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

  async createApplicationFromDtoAndFile(
    dto: ApplicationDto,
    file: Express.Multer.File,
  ): Promise<Application> {
    const newApplication = Application.fromDtoAndFileName(
      dto,
      file.originalname,
    );

    const year = newApplication.createdAt.getFullYear().toString();
    const month = (newApplication.createdAt.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const day = newApplication.createdAt.getDate().toString().padStart(2, '0');

    await this.ensureUploadsSubDirectory(year, month, day);

    const filePath = join(
      this.uploadsPath,
      year,
      month,
      day,
      file.originalname,
    );
    await fs.writeFile(filePath, file.buffer);

    newApplication.resumePath = join(
      'uploads',
      year,
      month,
      day,
      file.originalname,
    );

    return this.applicationRepository.save(newApplication);
  }

  async updateApplicationFromDto(
    id: number,
    dto: ApplicationDto,
  ): Promise<Application> {
    const application = await this.getApplicationById(id);

    application.updateFromDto(dto);

    return this.applicationRepository.save(application);
  }

  async deleteApplication(id: number): Promise<void> {
    const application = await this.getApplicationById(id);

    this.applicationRepository.remove(application);
  }

  private async ensureUploadsDirectory() {
    try {
      await fs.access(this.uploadsPath);
    } catch {
      await fs.mkdir(this.uploadsPath, { recursive: true });
    }
  }

  private async ensureUploadsSubDirectory(
    year: string,
    month: string,
    day: string,
  ) {
    const subDir = join(this.uploadsPath, year, month, day);
    try {
      await fs.access(subDir);
    } catch {
      await fs.mkdir(subDir, { recursive: true });
    }
  }

  private async deleteFile(filePath: string) {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Error deleting file: ${filePath}`, error);
    }
  }
}
