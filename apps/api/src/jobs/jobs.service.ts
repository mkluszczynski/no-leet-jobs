import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { RequiredSkill } from './classes/required-skill.class';

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

  async createJobFromDto(dto: CreateJobDto): Promise<Job> {
    const job = new Job();

    job.title = dto.title;
    job.description = dto.description;
    job.minSalary = dto.minSalary;
    job.maxSalary = dto.maxSalary;
    job.workType = dto.workType;
    job.experience = dto.experience;
    job.employmentType = dto.employmentType;
    job.requiredSkills = dto.requiredSkills.map((skill: RequiredSkill) => ({
      id: skill.id,
      level: skill.level,
    }));

    return this.jobsRepository.save(job);
  }
}
