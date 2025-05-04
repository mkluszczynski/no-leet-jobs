import { ChartNoAxesGantt } from "lucide-react";

export function Header() {
  return (
    <div className="flex justify-center items-center w-full h-16">
      <div className="flex justify-center items-center gap-2">
        <ChartNoAxesGantt />
        <h1 className="text-2xl font-bold">no-leet-jobs</h1>
      </div>
    </div>
  );
}
