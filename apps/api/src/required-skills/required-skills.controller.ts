import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RequiredSkillsService } from './required-skills.service';
import { IdParam } from 'src/utils/common/ByIdParam';
import { CreateRequiredSkillDto } from './dto/create-requreid-skill';

@Controller('required-skills')
export class RequiredSkillsController {
  constructor(private readonly requiredSkillsService: RequiredSkillsService) {}

  @Get()
  async getAll() {
    return await this.requiredSkillsService.getAllRequiredSkills();
  }

  @Get(':id')
  async getById(@Param() params: IdParam) {
    return await this.requiredSkillsService.getRequiredSkillById(params.id);
  }

  @Post()
  async createRequiredSkill(@Body() dto: CreateRequiredSkillDto) {
    return await this.requiredSkillsService.createRequiredSkillFromDto(dto);
  }

  @Put(':id')
  async updateRequiredSkill(
    @Param() params: IdParam,
    @Body() dto: CreateRequiredSkillDto,
  ) {
    return await this.requiredSkillsService.updateRequiredSkill(params.id, dto);
  }

  @Delete(':id')
  async deleteRequiredSkill(@Param() params: IdParam) {
    return await this.requiredSkillsService.deleteRequiredSkill(params.id);
  }
}
