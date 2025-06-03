
import { useState } from "react"
import { EntitySummary, EntityItem } from "./EntitySummary"
import { ClientProfile } from "./ClientProfile"
import { Phone, Mail, MapPin } from "lucide-react"

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
    notes: "Excellent tenant, always pays on time. Prefers digital communication.",
    description: "Active client with 3 properties"
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
    notes: "Owns multiple properties, looking to expand portfolio.",
    description: "Active client with 2 properties"
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
    notes: "New client, currently reviewing lease agreement.",
    description: "New client pending approval"
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
    notes: "Lease ended in April 2024. Good tenant history.",
    description: "Former client - lease ended"
  }
]

export function ClientDashboard() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null)

  const selectedClient = selectedClientId 
    ? mockClients.find(client => client.id === selectedClientId)
    : null

  const renderClientFields = (client: EntityItem) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Mail className="h-4 w-4" />
        <span>{client.email}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Phone className="h-4 w-4" />
        <span>{client.phone}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MapPin className="h-4 w-4" />
        <span className="truncate">{client.address}</span>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500">Properties</p>
          <p className="font-semibold text-blue-600">{client.propertiesCount}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Monthly Rent</p>
          <p className="font-semibold text-green-600">${client.totalRent?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )

  if (selectedClient) {
    return (
      <ClientProfile 
        client={selectedClient}
        onBack={() => setSelectedClientId(null)}
      />
    )
  }

  return (
    <EntitySummary
      title="Clients"
      description="Manage your property management clients"
      items={mockClients}
      onViewDetail={setSelectedClientId}
      onAdd={() => console.log("Add new client")}
      breadcrumbItems={[
        { label: "Dashboard", href: "/" },
        { label: "Clients", isCurrentPage: true }
      ]}
      renderCustomFields={renderClientFields}
    />
  )
}
