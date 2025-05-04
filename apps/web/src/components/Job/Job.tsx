import type { Job } from "@/lib/types/job";
import { JobApply } from "./JobApply";
import { JobDescription } from "./JobDescription";
import { JobRequiredSkills } from "./JobRequiredSkills";
import { JobTitle } from "./JobTitle";

export function Job({ job }: { job: Job }) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <JobTitle job={job} />
      <JobRequiredSkills requiredSkills={job.requiredSkills} />
      <JobDescription details={job.description} />
      <JobApply />
    </div>
  );
}
