import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  FolderOpen, 
  Wrench, 
  Settings 
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import Logo from "@/components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Dokumen PR", url: "/dokumen-pr", icon: FileText },
  { title: "Tabel Vendor", url: "/tabel-vendor", icon: Users },
  { title: "File Manager", url: "/file-manager", icon: FolderOpen },
  { title: "Maintenance", url: "/maintenance", icon: Wrench },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border bg-navy-dark">
      <SidebarHeader className="border-b border-navy-light p-4">
        <Logo className="text-white" />
      </SidebarHeader>
      
      <SidebarContent className="bg-navy-dark">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wide px-4 py-2">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:bg-navy-light">
                  <NavLink 
                    to="/dashboard" 
                    className="flex items-center gap-3 px-4 py-3 text-white rounded-md transition-colors"
                    activeClassName="bg-white/10 font-medium"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wide px-4 py-2">
            Aplikasi Arsip
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.slice(1, 4).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-navy-light">
                    <NavLink 
                      to={item.url}
                      className="flex items-center gap-3 px-4 py-3 text-white rounded-md transition-colors"
                      activeClassName="bg-white/10 font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.slice(4).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-navy-light">
                    <NavLink 
                      to={item.url}
                      className="flex items-center gap-3 px-4 py-3 text-white rounded-md transition-colors"
                      activeClassName="bg-white/10 font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
