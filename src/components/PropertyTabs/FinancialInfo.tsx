import React from 'react';
import { DollarSign, TrendingUp, Calendar, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Property } from '@/types/property';

interface FinancialInfoProps {
  property: Property;
}

export function FinancialInfo({ property }: FinancialInfoProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const calculateROI = () => {
    if (!property.monthlyRent) return 'N/A';
    const annualRent = property.monthlyRent * 12;
    const roi = ((annualRent / property.price) * 100).toFixed(2);
    return `${roi}%`;
  };

  const calculateMonthlyROI = () => {
    if (!property.monthlyRent) return 'N/A';
    const monthlyROI = ((property.monthlyRent / property.price) * 100).toFixed(3);
    return `${monthlyROI}%`;
  };

  // Mock financial data - in real app this would come from API
  const mockExpenses = [
    { category: 'Property Tax', amount: 450, frequency: 'Monthly' },
    { category: 'Insurance', amount: 125, frequency: 'Monthly' },
    { category: 'HOA Fees', amount: 75, frequency: 'Monthly' },
    { category: 'Maintenance Reserve', amount: 200, frequency: 'Monthly' },
  ];

  const totalMonthlyExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netMonthlyIncome = (property.monthlyRent || 0) - totalMonthlyExpenses;
  const netAnnualIncome = netMonthlyIncome * 12;

  return (
    <div className="space-y-6">
      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-green-600 bg-green-100 dark:bg-green-900 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Purchase Price</p>
                <p className="text-xl font-bold">{formatCurrency(property.price)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600 bg-blue-100 dark:bg-blue-900 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <p className="text-xl font-bold">
                  {property.monthlyRent ? formatCurrency(property.monthlyRent) : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-purple-600 bg-purple-100 dark:bg-purple-900 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Annual ROI</p>
                <p className="text-xl font-bold">{calculateROI()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-orange-600 bg-orange-100 dark:bg-orange-900 rounded-full p-2" />
              <div>
                <p className="text-sm text-muted-foreground">Security Deposit</p>
                <p className="text-xl font-bold">
                  {property.deposit ? formatCurrency(property.deposit) : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Income & Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Income Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span>Base Rent</span>
              <span className="font-medium">{formatCurrency(property.monthlyRent || 0)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span>Pet Fee</span>
              <span className="font-medium">$50</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span>Parking Fee</span>
              <span className="font-medium">$25</span>
            </div>
            <div className="flex justify-between items-center py-2 font-semibold text-lg border-t-2 pt-3">
              <span>Total Monthly Income</span>
              <span>{formatCurrency((property.monthlyRent || 0) + 75)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockExpenses.map((expense, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <span>{expense.category}</span>
                <span className="font-medium">{formatCurrency(expense.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center py-2 font-semibold text-lg border-t-2 pt-3">
              <span>Total Monthly Expenses</span>
              <span>{formatCurrency(totalMonthlyExpenses)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Net Income Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Net Income Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-lg">Monthly Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Gross Monthly Income</span>
                  <span className="font-medium">{formatCurrency((property.monthlyRent || 0) + 75)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Monthly Expenses</span>
                  <span className="font-medium">-{formatCurrency(totalMonthlyExpenses)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Net Monthly Income</span>
                  <span className={netMonthlyIncome >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatCurrency(netMonthlyIncome)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-lg">Annual Projection</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Gross Annual Income</span>
                  <span className="font-medium">{formatCurrency(((property.monthlyRent || 0) + 75) * 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Annual Expenses</span>
                  <span className="font-medium">-{formatCurrency(totalMonthlyExpenses * 12)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Net Annual Income</span>
                  <span className={netAnnualIncome >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatCurrency(netAnnualIncome)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}