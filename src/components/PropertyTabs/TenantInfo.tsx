import React from 'react';
import { Users, Plus, Mail, Phone, Calendar, DollarSign, UserCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tenant } from '@/types/property';

interface TenantInfoProps {
  propertyId: string;
}

export function TenantInfo({ propertyId }: TenantInfoProps) {
  // Mock tenant data - in real app this would come from API
  const mockTenants: Tenant[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      leaseStart: new Date('2023-09-01'),
      leaseEnd: new Date('2024-08-31'),
      monthlyRent: 2500,
      deposit: 5000,
      status: 'active'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '(555) 987-6543',
      leaseStart: new Date('2023-06-01'),
      leaseEnd: new Date('2023-08-31'),
      monthlyRent: 2300,
      deposit: 4600,
      status: 'inactive'
    }
  ];

  // Mock applications data
  const mockApplications = [
    {
      id: '3',
      name: 'Jessica Williams',
      email: 'jessica.williams@email.com',
      phone: '(555) 555-0123',
      appliedDate: new Date('2024-01-10'),
      status: 'pending' as const
    },
    {
      id: '4',
      name: 'David Brown',
      email: 'david.brown@email.com',
      phone: '(555) 555-0456',
      appliedDate: new Date('2024-01-08'),
      status: 'pending' as const
    }
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: 'active' | 'inactive' | 'pending') => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const activeTenant = mockTenants.find(t => t.status === 'active');
  const currentApplications = mockApplications.filter(a => a.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-green-600 bg-green-100 dark:bg-green-900 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Active Tenant</p>
                <p className="text-xl font-bold">
                  {mockTenants.filter(t => t.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-600 bg-yellow-100 dark:bg-yellow-900 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Applications</p>
                <p className="text-xl font-bold">{currentApplications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-blue-600 bg-blue-100 dark:bg-blue-900 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                <p className="text-xl font-bold">
                  {activeTenant ? formatCurrency(activeTenant.monthlyRent) : '$0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Tenant */}
      {activeTenant ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Current Tenant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face`} />
                <AvatarFallback>{getInitials(activeTenant.name)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{activeTenant.name}</h3>
                    <Badge className={getStatusColor(activeTenant.status)} variant="secondary">
                      {activeTenant.status.charAt(0).toUpperCase() + activeTenant.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{activeTenant.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{activeTenant.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Lease: {formatDate(activeTenant.leaseStart)} - {formatDate(activeTenant.leaseEnd)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        Rent: {formatCurrency(activeTenant.monthlyRent)}/month
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-1" />
                    Send Message
                  </Button>
                  <Button variant="outline" size="sm">
                    View Full Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Active Tenant</h3>
            <p className="text-muted-foreground mb-4">This property is currently vacant.</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Tenant
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Pending Applications */}
      {currentApplications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pending Applications
              </span>
              <Badge variant="outline">{currentApplications.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{getInitials(application.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{application.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{application.email}</span>
                        <span>•</span>
                        <span>Applied {formatDate(application.appliedDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                    <Button size="sm">
                      Accept
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tenant History */}
      <Card>
        <CardHeader>
          <CardTitle>Tenant History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTenants.map((tenant) => (
              <div key={tenant.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{getInitials(tenant.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{tenant.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{formatDate(tenant.leaseStart)} - {formatDate(tenant.leaseEnd)}</span>
                      <span>•</span>
                      <span>{formatCurrency(tenant.monthlyRent)}/month</span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(tenant.status)} variant="secondary">
                  {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}