import { Header } from "@/components/Header/Header";

export default function JobsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
        {children}
      </div>
    </>
  );
}
