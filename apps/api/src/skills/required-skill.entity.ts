import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "./skill.entity";
import { SkillLevel } from "src/jobs/enums/skill-level.enum";
import { Job } from "src/jobs/job.entity";

@Entity()
export class RequiredSkill{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "enum",
        enum: SkillLevel,
    })
    level: SkillLevel

    @ManyToOne(() => Skill, (skill) => skill.requiredSkills)
    skill: Skill

    @ManyToMany(() => Job, (job) => job.requiredSkills)
    jobs: Job[]
}