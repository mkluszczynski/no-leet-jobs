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
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CreateSkillDto } from './dto/skill.dto';
import { Public } from '@app/auth/decorators/public.decorator';
import { RequireRole } from '@app/auth/decorators/require-role.decorator';

@ApiBearerAuth()
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @Public()
  getAllSkills() {
    return this.skillsService.getAllSkills();
  }

  @Get(':id')
  @Public()
  @ApiParam({ name: 'id', type: Number })
  getSkillById(@Param() params: IdParam) {
    return this.skillsService.getSkillById(+params.id);
  }

  @Post()
  @RequireRole()
  createSkill(@Body() dto: CreateSkillDto) {
    return this.skillsService.createSkillFromDto(dto);
  }

  @Put(':id')
  @RequireRole()
  updateSkill(@Param() params: IdParam, @Body() dto: CreateSkillDto) {
    return this.skillsService.updateSkillById(+params.id, dto);
  }

  @Delete(':id')
  @RequireRole()
  deleteSkill(@Param() params: IdParam) {
    return this.skillsService.deleteSkillById(+params.id);
  }
}
