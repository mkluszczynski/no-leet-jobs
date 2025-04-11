import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldOfJob } from './field-of-job.entity';
import { Repository } from 'typeorm';
import { CreateFieldOfJobDto } from './dto/create-field-of-job.dto';

@Injectable()
export class FieldsOfJobsService {
  constructor(
    @InjectRepository(FieldOfJob)
    private readonly fieldsOfJobsRepository: Repository<FieldOfJob>,
  ) {}

  async getAllFields(): Promise<FieldOfJob[]> {
    return this.fieldsOfJobsRepository.find();
  }

  async getFieldById(id: number): Promise<FieldOfJob> {
    const field = await this.fieldsOfJobsRepository.findOne({ where: { id } });

    if (!field) throw new NotFoundException(`Field with ID ${id} not found`);

    return field;
  }

  async createFieldFromDto(dto: CreateFieldOfJobDto): Promise<FieldOfJob> {
    const field = new FieldOfJob();

    field.name = dto.name;
    field.alias = dto.alias;

    return this.fieldsOfJobsRepository.save(field);
  }
}
