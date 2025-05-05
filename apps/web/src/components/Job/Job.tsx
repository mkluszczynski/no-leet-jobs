import type { Job } from "@/lib/types/job";
import { JobApply } from "./JobApply";
import { JobDescription } from "./JobDescription";
import { JobRequiredSkills } from "./JobRequiredSkills";
import { JobTitle } from "./JobTitle";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function Job({ job }: { job: Job }) {
  return (
    <div className="flex flex-col gap-2 p-4">
      <Link href="/" className="fit-content">
        <Button variant="ghost" className="text-sm">
          <ChevronLeft />
          Go Back
        </Button>
      </Link>
      <JobTitle job={job} />
      <JobRequiredSkills requiredSkills={job.requiredSkills} />
      <JobDescription details={job.description} />
      <JobApply />
    </div>
  );
}
