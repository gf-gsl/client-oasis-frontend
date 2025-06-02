
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ClientDashboard } from "@/components/ClientDashboard"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <div className="flex items-center gap-4 px-6 py-4 bg-white border-b border-gray-200">
            <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-md" />
            <div className="flex-1">
              <h2 className="text-sm text-gray-500">Property Management</h2>
            </div>
          </div>
          <div className="flex-1 p-6">
            <ClientDashboard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Index
