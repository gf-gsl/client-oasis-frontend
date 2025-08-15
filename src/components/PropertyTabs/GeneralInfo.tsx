import React from 'react';
import { Bed, Bath, Square, Calendar, Tag, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/types/property';

interface GeneralInfoProps {
  property: Property;
}

export function GeneralInfo({ property }: GeneralInfoProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Property Images */}
      <Card>
        <CardHeader>
          <CardTitle>Property Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {property.images.map((image, index) => (
              <div key={index} className="relative aspect-video">
                <img
                  src={image}
                  alt={`${property.name} - Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg border"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {property.bedrooms && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <span>Bedrooms</span>
                </div>
                <span className="font-medium">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <span>Bathrooms</span>
                </div>
                <span className="font-medium">{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Square className="h-5 w-5 text-muted-foreground" />
                <span>Square Feet</span>
              </div>
              <span className="font-medium">{property.sqft.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Year Built</span>
              </div>
              <span className="font-medium">{property.yearBuilt}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <span>Property Type</span>
              </div>
              <Badge variant="outline">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-muted-foreground">{property.description}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Key Details</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Property ID</span>
                  <span className="font-medium">{property.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Created</span>
                  <span className="font-medium">{formatDate(property.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Updated</span>
                  <span className="font-medium">{formatDate(property.updatedAt)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features & Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Features & Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {property.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}