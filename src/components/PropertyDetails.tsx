import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, DollarSign, Share, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProperty } from '@/context/PropertyContext';
import { GeneralInfo } from '@/components/PropertyTabs/GeneralInfo';
import { FinancialInfo } from '@/components/PropertyTabs/FinancialInfo';
import { MaintenanceHistory } from '@/components/PropertyTabs/MaintenanceHistory';
import { Documents } from '@/components/PropertyTabs/Documents';
import { TenantInfo } from '@/components/PropertyTabs/TenantInfo';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, setActiveTab } = useProperty();
  const { selectedProperty, activeTab } = state;

  // In a real app, you'd fetch the property by ID if not already selected
  if (!selectedProperty) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-medium text-foreground mb-2">Property Not Found</h3>
            <p className="text-muted-foreground mb-4">The property you're looking for doesn't exist or couldn't be loaded.</p>
            <Button onClick={() => navigate('/properties')}>Back to Properties</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
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
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/properties">Properties</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{selectedProperty.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/properties')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Image */}
            <div className="relative">
              <img
                src={selectedProperty.images[0] || '/placeholder.svg'}
                alt={selectedProperty.name}
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
              <div className="absolute top-3 right-3">
                <Badge className={getStatusColor(selectedProperty.status)} variant="secondary">
                  {selectedProperty.status.charAt(0).toUpperCase() + selectedProperty.status.slice(1)}
                </Badge>
              </div>
            </div>

            {/* Property Info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{selectedProperty.name}</h1>
                  <Badge variant="outline">
                    {selectedProperty.type.charAt(0).toUpperCase() + selectedProperty.type.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedProperty.address}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Purchase Price</p>
                    <p className="font-semibold text-lg">{formatPrice(selectedProperty.price)}</p>
                  </div>
                </div>
                {selectedProperty.monthlyRent && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Rent</p>
                      <p className="font-semibold text-lg">{formatPrice(selectedProperty.monthlyRent)}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-medium">{selectedProperty.ownerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Year Built</p>
                    <p className="font-medium">{selectedProperty.yearBuilt}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground">{selectedProperty.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <GeneralInfo property={selectedProperty} />
        </TabsContent>

        <TabsContent value="financial" className="mt-6">
          <FinancialInfo property={selectedProperty} />
        </TabsContent>

        <TabsContent value="maintenance" className="mt-6">
          <MaintenanceHistory propertyId={selectedProperty.id} />
        </TabsContent>

        <TabsContent value="documents" className="mt-6">
          <Documents propertyId={selectedProperty.id} />
        </TabsContent>

        <TabsContent value="tenants" className="mt-6">
          <TenantInfo propertyId={selectedProperty.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}