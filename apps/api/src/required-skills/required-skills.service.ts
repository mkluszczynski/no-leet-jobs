import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequiredSkill } from 'src/required-skills/required-skill.entity';
import { Repository } from 'typeorm';
import { RequiredSkillDto } from './dto/requreid-skill.dto';
import { SkillsService } from 'src/skills/skills.service';

@Injectable()
export class RequiredSkillsService {
  constructor(
    @InjectRepository(RequiredSkill)
    private readonly requiredSkillsRepository: Repository<RequiredSkill>,
    private readonly skillsService: SkillsService,
  ) {}

  async getAllRequiredSkills(): Promise<RequiredSkill[]> {
    return this.requiredSkillsRepository.find();
  }

  async getRequiredSkillById(id: number): Promise<RequiredSkill> {
    const requiredSkill = await this.requiredSkillsRepository.findOne({
      where: { id },
    });

    if (!requiredSkill) {
      throw new NotFoundException(`Required skill with ID ${id} not found`);
    }

    return requiredSkill;
  }

  async createRequiredSkillFromDto(
    dto: RequiredSkillDto,
  ): Promise<RequiredSkill> {
    const requiredSkill = new RequiredSkill();
    const skill = await this.skillsService.getSkillById(dto.skillId);

    requiredSkill.skill = skill;
    requiredSkill.level = dto.level;

    return this.requiredSkillsRepository.save(requiredSkill);
  }

  async updateRequiredSkillById(
    id: number,
    dto: RequiredSkillDto,
  ): Promise<RequiredSkill> {
    const requiredSkill = await this.getRequiredSkillById(id);

    const skill = await this.skillsService.getSkillById(dto.skillId);

    requiredSkill.skill = skill;
    requiredSkill.level = dto.level;

    return this.requiredSkillsRepository.save(requiredSkill);
  }

  async deleteRequiredSkillById(id: number): Promise<void> {
    const requiredSkill = await this.getRequiredSkillById(id);

    await this.requiredSkillsRepository.remove(requiredSkill);
  }
}
