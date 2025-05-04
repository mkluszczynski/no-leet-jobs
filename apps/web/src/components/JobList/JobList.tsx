import { Job } from "@/lib/types/job";
import { Braces, Building2, Gauge } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

export function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <div className="flex size-full flex-col justify-center">
      <div className="px-4 py-2">
        <h1 className="text-xl font-semibold">Job posts ({jobs.length})</h1>
      </div>
      <ScrollArea className="min-h-[calc(100%-4rem)]">
        <div className="flex flex-col gap-2 p-4">
          {jobs.map((job) => (
            <JobListItem key={"job-list-item-" + job.id} job={job} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export function JobListItem({ job }: { job: Job }) {
  return (
    <Card className="flex w-auto flex-row gap-2 px-3 py-2">
      <div className="flex items-center justify-center">
        <div className="bg-accent flex h-auto items-center justify-center rounded-md p-2">
          <Braces /> {/* Icon for job title */}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-start justify-center gap-1">
          <div className="text-accent-foreground text-xs font-medium">
            {job.title}
          </div>
          <div className="flex gap-2 text-sm font-bold">
            <Badge variant="outline">
              <Building2 />
              {job.company.name}
            </Badge>
            <Badge variant="secondary">
              <Gauge />
              {job.experience}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center gap-1">
          <div className="text-accent-foreground text-xs font-medium">
            {job.minSalary}$ - {job.maxSalary}$
          </div>
          <div className="flex gap-2 text-sm font-bold">
            {job.requiredSkills.slice(0, 3).map((skill) => (
              <Badge key={skill.skill.id}>{skill.skill.name}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
