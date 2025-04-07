import { Module } from '@nestjs/common';
import { RequiredSkillsService } from './required-skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequiredSkill } from 'src/required-skills/required-skill.entity';
import { SkillsModule } from 'src/skills/skills.module';
import { RequiredSkillsController } from './required-skills.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RequiredSkill]), SkillsModule],
  controllers: [RequiredSkillsController],
  providers: [RequiredSkillsService],
  exports: [RequiredSkillsService],
})
export class RequiredSkillsModule {}
