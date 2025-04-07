import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { RequiredSkillsService } from 'src/required-skills/required-skills.service';
import { CreateRequiredSkillDto } from 'src/required-skills/dto/create-requreid-skill';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
    private readonly requiredSkillsService: RequiredSkillsService,
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
    const requiredSkills = await Promise.all(
      dto.requiredSkillsDto.map((dto: CreateRequiredSkillDto) =>
        this.requiredSkillsService.createRequiredSkillFromDto(dto),
      ),
    );

    const job = Job.fromDto(dto);
    job.requiredSkills = requiredSkills;

    return this.jobsRepository.save(job);
  }
}
