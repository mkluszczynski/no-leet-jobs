import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
  ) {}

  getAllJobs(): Promise<Job[]> {
    return this.jobsRepository.find();
  }

  async getJobById(id: number): Promise<Job> {
    const job = await this.jobsRepository.findOne({ where: { id } });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job;
  }
}
