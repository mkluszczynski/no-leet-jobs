import { Repository } from 'typeorm';
import { Skill } from './skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';

@Injectable()
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

  async createSkillFromDto(dto: CreateSkillDto): Promise<Skill> {
    const skill = new Skill();

    skill.name = dto.name;

    return this.skillsRepository.save(skill);
  }

  async updateSkillById(id: number, dto: CreateSkillDto): Promise<Skill> {
    const skill = await this.getSkillById(id);

    skill.name = dto.name;

    return this.skillsRepository.save(skill);
  }

  async deleteSkillById(id: number): Promise<void> {
    const skill = await this.getSkillById(id);

    await this.skillsRepository.remove(skill);
  }
}
