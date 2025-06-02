
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Phone, Mail, MapPin, Building2, DollarSign, Calendar } from "lucide-react"

interface ClientProfileProps {
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
    joinDate: string
    emergencyContact: string
    notes: string
  }
  onBack: () => void
}

export function ClientProfile({ client, onBack }: ClientProfileProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Clients
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Client Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{client.name}</CardTitle>
                <Badge className={statusColors[client.status]}>
                  {client.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{client.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{client.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{client.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p className="font-medium">{client.joinDate}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Emergency Contact</p>
                <p className="font-medium">{client.emergencyContact}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Notes</p>
                <p className="text-gray-700">{client.notes}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-600">{client.propertiesCount}</p>
                  <p className="text-sm text-gray-500">Properties</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-600">${client.totalRent.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Monthly Rent</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Last Contact</p>
                <p className="font-medium">{client.lastContact}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Send Message
              </Button>
              <Button className="w-full" variant="outline">
                Schedule Meeting
              </Button>
              <Button className="w-full" variant="outline">
                View Properties
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Edit Client
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
