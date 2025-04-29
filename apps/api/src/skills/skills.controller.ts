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

  @Public()
  @Get()
  getAllSkills() {
    return this.skillsService.getAllSkills();
  }

  @Public()
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  getSkillById(@Param() params: IdParam) {
    return this.skillsService.getSkillById(+params.id);
  }

  @RequireRole()
  @Post()
  createSkill(@Body() dto: CreateSkillDto) {
    return this.skillsService.createSkillFromDto(dto);
  }

  @RequireRole()
  @Put(':id')
  updateSkill(@Param() params: IdParam, @Body() dto: CreateSkillDto) {
    return this.skillsService.updateSkillById(+params.id, dto);
  }

  @RequireRole()
  @Delete(':id')
  deleteSkill(@Param() params: IdParam) {
    return this.skillsService.deleteSkillById(+params.id);
  }
}
