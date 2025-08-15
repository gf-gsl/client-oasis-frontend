import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, Calendar, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Property } from '@/types/property';
import { useProperty } from '@/context/PropertyContext';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();
  const { selectProperty } = useProperty();

  const handleViewDetails = () => {
    selectProperty(property);
    navigate(`/properties/${property.id}`);
  };

  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'occupied': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'maintenance': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'sold': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative">
        <img
          src={property.images[0] || '/placeholder.svg'}
          alt={property.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute top-3 right-3">
          <Badge className={getStatusColor(property.status)} variant="secondary">
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {property.name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{property.address}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{property.sqft.toLocaleString()} sq ft</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{property.yearBuilt}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-foreground">
                {formatPrice(property.price)}
              </p>
              {property.monthlyRent && (
                <p className="text-sm text-muted-foreground">
                  Rent: {formatPrice(property.monthlyRent)}/mo
                </p>
              )}
            </div>
            <Button onClick={handleViewDetails} size="sm">
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
          </div>

          {property.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {property.features.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {property.features.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{property.features.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}