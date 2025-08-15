import React from 'react';
import { Plus, Wrench, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MaintenanceRecord } from '@/types/property';

interface MaintenanceHistoryProps {
  propertyId: string;
}

export function MaintenanceHistory({ propertyId }: MaintenanceHistoryProps) {
  // Mock maintenance data - in real app this would come from API
  const mockMaintenanceRecords: MaintenanceRecord[] = [
    {
      id: '1',
      propertyId,
      title: 'HVAC System Maintenance',
      description: 'Annual HVAC system inspection and filter replacement',
      type: 'maintenance',
      status: 'completed',
      cost: 350,
      scheduledDate: new Date('2024-01-15'),
      completedDate: new Date('2024-01-15'),
      contractor: 'Cool Air HVAC Services'
    },
    {
      id: '2',
      propertyId,
      title: 'Kitchen Sink Repair',
      description: 'Fix leaking kitchen sink faucet and replace washers',
      type: 'repair',
      status: 'completed',
      cost: 125,
      scheduledDate: new Date('2024-01-08'),
      completedDate: new Date('2024-01-10'),
      contractor: 'Quick Fix Plumbing'
    },
    {
      id: '3',
      propertyId,
      title: 'Carpet Cleaning',
      description: 'Deep clean carpets in living room and bedrooms',
      type: 'maintenance',
      status: 'in-progress',
      cost: 200,
      scheduledDate: new Date('2024-01-22'),
      contractor: 'Pro Clean Services'
    },
    {
      id: '4',
      propertyId,
      title: 'Smoke Detector Inspection',
      description: 'Test all smoke detectors and replace batteries',
      type: 'inspection',
      status: 'pending',
      cost: 75,
      scheduledDate: new Date('2024-01-25')
    },
    {
      id: '5',
      propertyId,
      title: 'Kitchen Renovation',
      description: 'Complete kitchen remodel including new cabinets and appliances',
      type: 'upgrade',
      status: 'cancelled',
      cost: 15000,
      scheduledDate: new Date('2024-02-01')
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getStatusIcon = (status: MaintenanceRecord['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: MaintenanceRecord['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: MaintenanceRecord['type']) => {
    switch (type) {
      case 'repair': return <Wrench className="h-4 w-4" />;
      case 'maintenance': return <Clock className="h-4 w-4" />;
      case 'inspection': return <AlertCircle className="h-4 w-4" />;
      case 'upgrade': return <Plus className="h-4 w-4" />;
      default: return <Wrench className="h-4 w-4" />;
    }
  };

  const totalCost = mockMaintenanceRecords
    .filter(record => record.status === 'completed')
    .reduce((sum, record) => sum + record.cost, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-green-600 bg-green-100 dark:bg-green-900 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Completed Tasks</p>
                <p className="text-xl font-bold">
                  {mockMaintenanceRecords.filter(r => r.status === 'completed').length}
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
                <p className="text-sm text-muted-foreground">Active Tasks</p>
                <p className="text-xl font-bold">
                  {mockMaintenanceRecords.filter(r => r.status === 'in-progress' || r.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full p-2 flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">$</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-xl font-bold">{formatCurrency(totalCost)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Maintenance Records</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Maintenance
        </Button>
      </div>

      {/* Maintenance Records */}
      <div className="space-y-4">
        {mockMaintenanceRecords.map((record) => (
          <Card key={record.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getTypeIcon(record.type)}
                  <div>
                    <h4 className="font-semibold text-lg">{record.title}</h4>
                    <p className="text-muted-foreground">{record.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(record.status)}
                  <Badge className={getStatusColor(record.status)} variant="secondary">
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1).replace('-', ' ')}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{record.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Scheduled Date</p>
                  <p className="font-medium">{formatDate(record.scheduledDate)}</p>
                </div>
                {record.completedDate && (
                  <div>
                    <p className="text-muted-foreground">Completed Date</p>
                    <p className="font-medium">{formatDate(record.completedDate)}</p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground">Cost</p>
                  <p className="font-medium">{formatCurrency(record.cost)}</p>
                </div>
              </div>

              {record.contractor && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Contractor: <span className="font-medium text-foreground">{record.contractor}</span></p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}