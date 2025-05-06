import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function JobsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GoBack />
      <div className="flex h-[calc(100vh)] flex-col items-center justify-center">
        {children}
      </div>
    </>
  );
}

function GoBack() {
  return (
    <div className="absolute top-0 left-0 m-4">
      <Link href="/" className="fit-content">
        <Button variant="ghost" className="gap-1 text-sm">
          <ChevronLeft />
          Back
        </Button>
      </Link>
    </div>
  );
}
