
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Eye } from "lucide-react"
import { NavigationBreadcrumb, BreadcrumbItem } from "./NavigationBreadcrumb"

export interface EntityItem {
  id: string
  name: string
  description?: string
  status?: string
  [key: string]: any
}

interface EntitySummaryProps {
  title: string
  description: string
  items: EntityItem[]
  onViewDetail: (id: string) => void
  onAdd?: () => void
  breadcrumbItems?: BreadcrumbItem[]
  statusColors?: Record<string, string>
  renderCustomFields?: (item: EntityItem) => React.ReactNode
}

export function EntitySummary({
  title,
  description,
  items,
  onViewDetail,
  onAdd,
  breadcrumbItems = [],
  statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800'
  },
  renderCustomFields
}: EntitySummaryProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      {breadcrumbItems.length > 0 && (
        <div className="px-6 py-4">
          <NavigationBreadcrumb items={breadcrumbItems} />
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        {onAdd && (
          <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add {title.slice(0, -1)}
          </Button>
        )}
      </div>

      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {items.length} {title.toLowerCase()}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {item.name}
                </CardTitle>
                {item.status && (
                  <Badge className={statusColors[item.status] || 'bg-gray-100 text-gray-800'}>
                    {item.status}
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {item.description && (
                <p className="text-sm text-gray-600">{item.description}</p>
              )}
              
              {renderCustomFields && renderCustomFields(item)}
              
              <div className="pt-3">
                <Button 
                  onClick={() => onViewDetail(item.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No {title.toLowerCase()} found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
