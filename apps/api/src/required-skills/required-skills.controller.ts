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
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Public } from '@app/auth/decorators/public.decorator';
import { RequireRole } from '@app/auth/decorators/require-role.decorator';

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
  @RequireRole()
  async createRequiredSkill(@Body() dto: RequiredSkillDto) {
    return await this.requiredSkillsService.createRequiredSkillFromDto(dto);
  }

  @Put(':id')
  @RequireRole()
  @ApiParam({ name: 'id', type: Number })
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
  @RequireRole()
  @ApiParam({ name: 'id', type: Number })
  async deleteRequiredSkill(@Param() params: IdParam) {
    return await this.requiredSkillsService.deleteRequiredSkillById(params.id);
  }
}
