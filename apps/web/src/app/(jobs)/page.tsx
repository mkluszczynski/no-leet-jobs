import { Header } from "@/components/Header/Header";
import { JobList } from "@/components/JobList/JobList";
import { NavigationBar } from "@/components/JobList/NavigationBar";
import { Map } from "@/components/Map/Map";
import { jobsMoc } from "@/lib/mocs/jobs-moc";

export default function Home() {
  return (
    <>
      <div className="bg-background top-0 z-10 block shadow-xs xl:sticky">
        <Header />
        <NavigationBar />
      </div>
      <div className="bg-accent relative flex h-[calc(100%-4rem)] w-full items-start justify-center">
        <div className="size-full">
          <JobList jobs={jobsMoc} />
        </div>
        <div className="sticky top-32 hidden h-[calc(100vh-8rem)] w-full xl:block">
          <Map />
        </div>
      </div>
    </>
  );
}
