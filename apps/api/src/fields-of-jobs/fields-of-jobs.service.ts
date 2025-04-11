import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldOfJob } from './field-of-job.entity';
import { Repository } from 'typeorm';
import { FieldOfJobDto } from './dto/field-of-job.dto';

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

  async createFieldFromDto(dto: FieldOfJobDto): Promise<FieldOfJob> {
    const field = new FieldOfJob();

    field.name = dto.name;
    field.alias = dto.alias;

    return this.fieldsOfJobsRepository.save(field);
  }

  async updateFieldFromDto(
    fieldId: number,
    dto: FieldOfJobDto,
  ): Promise<FieldOfJob> {
    const field = await this.getFieldById(fieldId);

    field.updateFromDto(dto);

    return await this.fieldsOfJobsRepository.save(field);
  }

  async deleteFieldById(fieldId: number) {
    const field = await this.getFieldById(fieldId);

    await this.fieldsOfJobsRepository.remove(field);
  }
}
