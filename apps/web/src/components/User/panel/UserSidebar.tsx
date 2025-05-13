import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ChartNoAxesGantt,
  FileUser,
  LayoutDashboard,
  User,
} from "lucide-react";
import { UserSidebarFooterButton } from "./UserSidebarFooterButton";

const items = [
  {
    title: "Dashboard",
    url: "/user/panel",
    icon: () => <LayoutDashboard />,
  },
  {
    title: "Your Profile",
    url: "/user/panel/profile",
    icon: () => <User />,
  },
  {
    title: "Your Applications",
    url: "/user/panel/applications",
    icon: () => <FileUser />,
  },
];

export function UserSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2">
              <ChartNoAxesGantt />
              <h1 className="text-xl font-bold">no-leet-jobs</h1>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="items-center">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserSidebarFooterButton />
      </SidebarFooter>
    </Sidebar>
  );
}
