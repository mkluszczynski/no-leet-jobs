import { Job } from "@/lib/types/job";
import {
  Braces,
  Briefcase,
  Building2,
  Coins,
  Handshake,
  Lightbulb,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function JobTitle({ job }: { job: Job }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center gap-2">
            <Braces /> {/* Icon for job title */}
            {job.title}
          </div>
        </CardTitle>
        <CardDescription>{job.fieldOfJob.name}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row flex-wrap justify-start gap-2">
        <JobTitleInfo
          info="Experience"
          value={job.experience}
          icon={<Lightbulb />}
        />
        <JobTitleInfo
          info="Salary"
          value={`${job.minSalary}$ - ${job.maxSalary}$`}
          icon={<Coins />}
        />
        <JobTitleInfo
          info="Work Type"
          value={job.workType}
          icon={<Briefcase />}
        />
        <JobTitleInfo
          info="Employment Type"
          value={job.employmentType}
          icon={<Handshake />}
        />
        <JobTitleInfo info="Operation" value={"Remote"} icon={<Building2 />} />
      </CardContent>
    </Card>
  );
}

export function JobTitleInfo({
  info,
  value,
  icon,
}: {
  info: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="flex w-auto flex-row gap-2 px-3 py-2">
      <div className="flex items-center justify-center">
        <div className="bg-accent flex h-auto items-center justify-center rounded-md p-2">
          {icon}
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-1">
        <div>
          <span className="text-accent-foreground text-xs font-medium">
            {info}
          </span>
        </div>
        <div className="text text-sm font-bold">{value}</div>
      </div>
    </Card>
  );
}
