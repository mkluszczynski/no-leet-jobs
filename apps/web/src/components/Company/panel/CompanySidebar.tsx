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
  BriefcaseBusiness,
  Building2,
  ChartNoAxesGantt,
  LayoutDashboard,
} from "lucide-react";
import { CompanySidebarFooterButton } from "./CompanySidebarFooterButton";

const items = [
  {
    title: "Dashboard",
    url: "/company/panel",
    icon: () => <LayoutDashboard />,
  },
  {
    title: "Company Profile",
    url: "/company/panel/profile",
    icon: () => <Building2 />,
  },
  {
    title: "Your Job Offers",
    url: "/company/panel/job-offers",
    icon: () => <BriefcaseBusiness />,
  },
];

export function CompanySidebar() {
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
        <CompanySidebarFooterButton />
      </SidebarFooter>
    </Sidebar>
  );
}
