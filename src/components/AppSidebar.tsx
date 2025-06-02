
import { Building2, Users, FileText, Settings, Home, Calendar, DollarSign } from "lucide-react"
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
  SidebarFooter,
} from "@/components/ui/sidebar"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Users,
  },
  {
    title: "Properties",
    url: "/properties",
    icon: Building2,
  },
  {
    title: "Leases",
    url: "/leases",
    icon: FileText,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: DollarSign,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">PropManager</h2>
            <p className="text-sm text-gray-500">Client Portal</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-semibold">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <SidebarMenuButton asChild className="hover:bg-gray-100">
          <a href="/settings" className="flex items-center gap-3">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </a>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
