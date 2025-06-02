
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ClientCard } from "./ClientCard"
import { ClientProfile } from "./ClientProfile"
import { Search, Plus, Users, UserCheck, UserX, Clock } from "lucide-react"

// Mock client data
const mockClients = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    status: "active" as const,
    propertiesCount: 3,
    totalRent: 4500,
    lastContact: "2024-05-28",
    joinDate: "2023-01-15",
    emergencyContact: "Mike Johnson - (555) 987-6543",
    notes: "Excellent tenant, always pays on time. Prefers digital communication."
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "(555) 234-5678",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    status: "active" as const,
    propertiesCount: 2,
    totalRent: 3200,
    lastContact: "2024-05-25",
    joinDate: "2023-03-20",
    emergencyContact: "Lisa Chen - (555) 876-5432",
    notes: "Owns multiple properties, looking to expand portfolio."
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "(555) 345-6789",
    address: "789 Pine St, Chicago, IL 60601",
    status: "pending" as const,
    propertiesCount: 1,
    totalRent: 1800,
    lastContact: "2024-05-30",
    joinDate: "2024-05-15",
    emergencyContact: "Carlos Rodriguez - (555) 765-4321",
    notes: "New client, currently reviewing lease agreement."
  },
  {
    id: "4",
    name: "David Thompson",
    email: "david.thompson@email.com",
    phone: "(555) 456-7890",
    address: "321 Elm St, Miami, FL 33101",
    status: "inactive" as const,
    propertiesCount: 0,
    totalRent: 0,
    lastContact: "2024-04-15",
    joinDate: "2022-08-10",
    emergencyContact: "Karen Thompson - (555) 654-3210",
    notes: "Lease ended in April 2024. Good tenant history."
  }
]

export function ClientDashboard() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const selectedClient = selectedClientId 
    ? mockClients.find(client => client.id === selectedClientId)
    : null

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || client.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: mockClients.length,
    active: mockClients.filter(c => c.status === "active").length,
    pending: mockClients.filter(c => c.status === "pending").length,
    inactive: mockClients.filter(c => c.status === "inactive").length
  }

  if (selectedClient) {
    return (
      <ClientProfile 
        client={selectedClient}
        onBack={() => setSelectedClientId(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Manage your property management clients</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Clients
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Inactive
            </CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                All
              </Button>
              <Button
                variant={filterStatus === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("active")}
              >
                Active
              </Button>
              <Button
                variant={filterStatus === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("pending")}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === "inactive" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("inactive")}
              >
                Inactive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onViewProfile={setSelectedClientId}
          />
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
