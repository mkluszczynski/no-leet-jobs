import { BackButton } from "@/components/utils/BackButton";
import "@/styles/globals.css";

export default function JobsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute top-0 left-0 m-4">
        <BackButton />
      </div>
      <div className="flex h-[calc(100vh)] flex-col items-center justify-center">
        {children}
      </div>
    </>
  );
}
