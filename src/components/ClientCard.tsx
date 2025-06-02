
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Eye } from "lucide-react"

interface ClientCardProps {
  client: {
    id: string
    name: string
    email: string
    phone: string
    address: string
    status: 'active' | 'inactive' | 'pending'
    propertiesCount: number
    totalRent: number
    lastContact: string
  }
  onViewProfile: (clientId: string) => void
}

export function ClientCard({ client, onViewProfile }: ClientCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {client.name}
          </CardTitle>
          <Badge className={statusColors[client.status]}>
            {client.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
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
            <p className="font-semibold text-green-600">${client.totalRent.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="pt-3">
          <p className="text-xs text-gray-500 mb-2">Last Contact: {client.lastContact}</p>
          <Button 
            onClick={() => onViewProfile(client.id)}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
