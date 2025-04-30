import { Injectable, NotFoundException } from '@nestjs/common';
import { In, LessThan, MoreThan, Repository } from 'typeorm';
import { Job } from './job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JobDto } from './dto/job.dto';
import { RequiredSkillsService } from 'src/required-skills/required-skills.service';
import { RequiredSkillDto } from 'src/required-skills/dto/requreid-skill.dto';
import { FieldsOfJobsService } from 'src/fields-of-jobs/fields-of-jobs.service';
import { JobQuery } from './types/job-query.type';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobsRepository: Repository<Job>,
    private readonly requiredSkillsService: RequiredSkillsService,
    private readonly fieldOfJobsService: FieldsOfJobsService,
  ) {}

  getAllJobs(query: JobQuery): Promise<Job[]> {
    return this.jobsRepository.find({
      where: {
        // ...parsedQuery,
        maxSalary: query.maxSalary ? LessThan(query.maxSalary) : undefined,
        minSalary: query.minSalary ? MoreThan(query.minSalary) : undefined,
        workType: query.workType,
        experience: query.experience,
        employmentType: query.employmentType,
        requiredSkills: {
          skill: {
            id: query.requiredSkills
              ? In(query.requiredSkills?.map((id) => +id))
              : undefined,
          },
        },
        fieldOfJob: {
          id: query.fieldOfJobId,
        },
        company: {
          id: query.companyId,
        },
      },
      relations: {
        company: true,
        requiredSkills: {
          skill: true,
        },
        fieldOfJob: true,
      },
    });
  }

  async getFullJobById(id: number): Promise<Job> {
    const job = await this.jobsRepository.findOne({
      where: { id },
      relations: {
        company: true,
        requiredSkills: true,
        fieldOfJob: true,
      },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async getJobById(id: number): Promise<Job> {
    const job = await this.jobsRepository.findOne({ where: { id } });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job;
  }

  async createJobFromDto(dto: JobDto): Promise<Job> {
    const requiredSkills = await Promise.all(
      dto.requiredSkillsDto.map((dto: RequiredSkillDto) =>
        this.requiredSkillsService.createRequiredSkillFromDto(dto),
      ),
    );

    const fieldOfJob = await this.fieldOfJobsService.getFieldById(
      dto.fieldOfJobId,
    );

    const job = Job.fromDto(dto);
    job.requiredSkills = requiredSkills;
    job.fieldOfJob = fieldOfJob;

    return this.jobsRepository.save(job);
  }

  async saveJob(job: Job): Promise<Job> {
    return this.jobsRepository.save(job);
  }

  async updateJobFromDto(jobId: number, dto: JobDto) {
    const job = await this.getJobById(jobId);

    const requiredSkills = await Promise.all(
      dto.requiredSkillsDto.map((dto: RequiredSkillDto) =>
        this.requiredSkillsService.createRequiredSkillFromDto(dto),
      ),
    );

    const fieldOfJob = await this.fieldOfJobsService.getFieldById(
      dto.fieldOfJobId,
    );

    job.updateFromDto(dto);
    job.requiredSkills = requiredSkills;
    job.fieldOfJob = fieldOfJob;

    return await this.jobsRepository.save(job);
  }

  async deleteJobById(jobId: number) {
    const job = await this.getJobById(jobId);

    await this.jobsRepository.remove(job);
  }
}
