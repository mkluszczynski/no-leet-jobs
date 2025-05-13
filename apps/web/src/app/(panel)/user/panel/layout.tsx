import { SidebarProvider } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/User/panel/UserSidebar";

export default function UserPanelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <UserSidebar />
        <main className="w-full p-4">
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
