import { Job } from "@/components/Job/Job";
import { Map } from "@/components/Map/Map";
import { jobMoc } from "@/lib/mocs/job-moc";

export default function JobPage() {
  return (
    <div className="bg-accent flex h-full w-full items-center justify-center">
      <div className="size-full">
        <Job job={jobMoc} />
      </div>
      <div className="size-full">
        <Map />
      </div>
    </div>
  );
}
