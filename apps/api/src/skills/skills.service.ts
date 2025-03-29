import { Repository } from 'typeorm';
import { Skill } from './skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}

  async getAllSkills(): Promise<Skill[]> {
    return this.skillsRepository.find();
  }

  async getSkillById(id: number): Promise<Skill> {
    const skill = await this.skillsRepository.findOne({ where: { id } });

    if (!skill) throw new NotFoundException(`Skill with ID ${id} not found`);

    return skill;
  }
}
