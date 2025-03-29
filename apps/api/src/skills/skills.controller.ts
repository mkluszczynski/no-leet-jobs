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
import { GetByIdParam } from 'src/utils/common/ByIdParam';
import { ApiParam } from '@nestjs/swagger';
import { CreateSkillDto } from './dto/create-skill.dto';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  getAlllSkills() {
    return this.skillsService.getAllSkills();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  getSkillById(@Param() params: GetByIdParam) {
    return this.skillsService.getSkillById(+params.id);
  }

  @Post()
  createSkill(@Body() dto: CreateSkillDto) {
    return this.skillsService.createSkillFromDto(dto);
  }

  @Put(':id')
  updateSkill(@Param() params: GetByIdParam, @Body() dto: CreateSkillDto) {
    return this.skillsService.updateSkillById(+params.id, dto);
  }

  @Delete(':id')
  deleteSkill(@Param() params: GetByIdParam) {
    return this.skillsService.deleteSkillById(+params.id);
  }
}
