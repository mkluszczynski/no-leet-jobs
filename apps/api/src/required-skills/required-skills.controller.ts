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
import { RequiredSkillDto } from './dto/requreid-skill.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '@app/auth/decorators/public.decorator';

@ApiBearerAuth()
@Controller('required-skills')
export class RequiredSkillsController {
  constructor(private readonly requiredSkillsService: RequiredSkillsService) {}

  @Public()
  @Get()
  async getAll() {
    return await this.requiredSkillsService.getAllRequiredSkills();
  }

  @Public()
  @Get(':id')
  async getById(@Param() params: IdParam) {
    return await this.requiredSkillsService.getRequiredSkillById(params.id);
  }

  @Post()
  async createRequiredSkill(@Body() dto: RequiredSkillDto) {
    return await this.requiredSkillsService.createRequiredSkillFromDto(dto);
  }

  @Put(':id')
  async updateRequiredSkill(
    @Param() params: IdParam,
    @Body() dto: RequiredSkillDto,
  ) {
    return await this.requiredSkillsService.updateRequiredSkillById(
      params.id,
      dto,
    );
  }

  @Delete(':id')
  async deleteRequiredSkill(@Param() params: IdParam) {
    return await this.requiredSkillsService.deleteRequiredSkillById(params.id);
  }
}
