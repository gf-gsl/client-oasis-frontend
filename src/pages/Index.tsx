
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ClientDashboard } from "@/components/ClientDashboard"
import { useLocation } from "react-router-dom"

const Index = () => {
  const location = useLocation()
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard'
      case '/clients': return 'Clients'
      case '/estates': return 'Estates'
      case '/properties': return 'Properties'
      case '/units': return 'Units'
      case '/tenants': return 'Tenants'
      case '/leases': return 'Leases'
      case '/settings': return 'Settings'
      default: return 'Dashboard'
    }
  }

  const renderContent = () => {
    switch (location.pathname) {
      case '/':
        return <div className="p-6"><h1 className="text-3xl font-bold">Welcome to PropManager</h1><p className="text-gray-600 mt-2">Select an option from the sidebar to get started.</p></div>
      case '/clients':
        return <ClientDashboard />
      default:
        return <div className="p-6"><h1 className="text-3xl font-bold">{getPageTitle()}</h1><p className="text-gray-600 mt-2">This section is coming soon...</p></div>
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <div className="flex items-center gap-4 px-6 py-4 bg-white border-b border-gray-200">
            <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-md" />
            <div className="flex-1">
              <h2 className="text-sm text-gray-500">Property Management Portal - {getPageTitle()}</h2>
            </div>
          </div>
          <div className="flex-1">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Index
