import {
  CalendarDays,
  CircleDollarSign,
  LayoutDashboard,
  PanelLeft,
  Settings,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import UserMenu from "./user-menu";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: Users,
  },
  {
    title: "Time Management",
    url: "/time-management",
    icon: CalendarDays,
  },
  {
    title: "Payroll",
    url: "/payroll",
    icon: CircleDollarSign,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const companyName = "Acme Inc";

export function AppSidebar() {
  const { setOpen } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <div>
                  <div className="w-6 h-6 rounded-full bg-black grid place-items-center">
                    <Image
                      src="/vercel.svg"
                      alt="Logo"
                      width={12}
                      height={12}
                    />
                  </div>
                </div>
                <span>{companyName}</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuAction onClick={() => setOpen(false)}>
              <PanelLeft className="cursor-pointer" />
            </SidebarMenuAction>
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
                    <a href={item.url}>
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
        <SidebarMenu>
          <UserMenu />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
