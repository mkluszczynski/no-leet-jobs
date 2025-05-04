import { RequiredSkill, SkillLevel } from "@/lib/types/required-skill";
import {
  BicepsFlexed,
  Bird,
  Check,
  Crown,
  Glasses,
  SearchCode,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function JobRequiredSkills({
  requiredSkills,
}: {
  requiredSkills: RequiredSkill[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center gap-2">
            <SearchCode />
            Required Skills
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row flex-wrap justify-start gap-2">
        {requiredSkills.map((skill) => (
          <JobSkill key={skill.skill.id} skill={skill} />
        ))}
      </CardContent>
    </Card>
  );
}

export function JobSkill({ skill }: { skill: RequiredSkill }) {
  const levelIcons = {
    [SkillLevel.NICE_TO_HAVE]: <Check />,
    [SkillLevel.NOVICE]: <Bird color="#35b5fa" />,
    [SkillLevel.REGULAR]: <Glasses color="#2ad051" />,
    [SkillLevel.ADVANCED]: <BicepsFlexed color="#ffd900" />,
    [SkillLevel.EXPERT]: <Crown color="#ff0000" />,
  };

  return (
    <Card className="flex flex-row items-center gap-2 p-2">
      <div className="flex items-center gap-2">
        {levelIcons[skill.level]}
        <span>{skill.skill.name}</span>
      </div>
      <span className="text-sm text-gray-500">{skill.level}</span>
    </Card>
  );
}
