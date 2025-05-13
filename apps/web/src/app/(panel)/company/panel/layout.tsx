import { CompanySidebar } from "@/components/Company/panel/CompanySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <CompanySidebar />
        <main>
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
