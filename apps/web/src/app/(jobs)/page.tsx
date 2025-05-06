import { JobList } from "@/components/JobList/JobList";
import { NavigationBar } from "@/components/JobList/NavigationBar";
import { Map } from "@/components/Map/Map";
import { jobsMoc } from "@/lib/mocs/jobs-moc";

export default function Home() {
  return (
    <div className="flex size-full flex-col justify-center">
      <NavigationBar />
      <div className="flex h-[calc(100%-4rem)] w-full items-center justify-center">
        <div className="size-full">
          <JobList jobs={jobsMoc} />
        </div>
        <div className="size-full">
          <Map />
        </div>
      </div>
    </div>
  );
}
