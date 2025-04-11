import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { IdParam } from 'src/utils/common/ByIdParam';
import { ApiParam } from '@nestjs/swagger';
import { CreateSkillDto } from './dto/skill.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  getAlllSkills() {
    return this.skillsService.getAllSkills();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  getSkillById(@Param() params: IdParam) {
    return this.skillsService.getSkillById(+params.id);
  }

  @Post()
  createSkill(@Body() dto: CreateSkillDto) {
    return this.skillsService.createSkillFromDto(dto);
  }

  @Put(':id')
  updateSkill(@Param() params: IdParam, @Body() dto: CreateSkillDto) {
    return this.skillsService.updateSkillById(+params.id, dto);
  }

  @Delete(':id')
  deleteSkill(@Param() params: IdParam) {
    return this.skillsService.deleteSkillById(+params.id);
  }
}
