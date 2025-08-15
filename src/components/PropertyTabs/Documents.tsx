import React from 'react';
import { Upload, FileText, Image, Download, Eye, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PropertyDocument } from '@/types/property';

interface DocumentsProps {
  propertyId: string;
}

export function Documents({ propertyId }: DocumentsProps) {
  // Mock documents data - in real app this would come from API
  const mockDocuments: PropertyDocument[] = [
    {
      id: '1',
      propertyId,
      name: 'Property Lease Agreement - 2024',
      type: 'lease',
      url: '/documents/lease-2024.pdf',
      uploadedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      propertyId,
      name: 'Home Insurance Certificate',
      type: 'certificate',
      url: '/documents/insurance-cert.pdf',
      uploadedAt: new Date('2024-01-10')
    },
    {
      id: '3',
      propertyId,
      name: 'Annual Property Inspection Report',
      type: 'inspection',
      url: '/documents/inspection-2024.pdf',
      uploadedAt: new Date('2024-01-08')
    },
    {
      id: '4',
      propertyId,
      name: 'Kitchen Renovation Photos',
      type: 'photo',
      url: '/photos/kitchen-renovation.jpg',
      uploadedAt: new Date('2024-01-05')
    },
    {
      id: '5',
      propertyId,
      name: 'Property Tax Assessment',
      type: 'other',
      url: '/documents/tax-assessment.pdf',
      uploadedAt: new Date('2024-01-03')
    },
    {
      id: '6',
      propertyId,
      name: 'Utility Bills - December 2023',
      type: 'other',
      url: '/documents/utilities-dec-2023.pdf',
      uploadedAt: new Date('2023-12-28')
    }
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getDocumentIcon = (type: PropertyDocument['type']) => {
    switch (type) {
      case 'photo': return <Image className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: PropertyDocument['type']) => {
    switch (type) {
      case 'lease': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'certificate': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inspection': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'photo': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'other': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const groupedDocuments = mockDocuments.reduce((acc, doc) => {
    if (!acc[doc.type]) {
      acc[doc.type] = [];
    }
    acc[doc.type].push(doc);
    return acc;
  }, {} as Record<string, PropertyDocument[]>);

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Property Documents</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here, or click to browse
            </p>
            <Button>Choose Files</Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents by Category */}
      <div className="space-y-6">
        {Object.entries(groupedDocuments).map(([type, documents]) => (
          <Card key={type}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="capitalize">
                  {type === 'other' ? 'Other Documents' : `${type.charAt(0).toUpperCase() + type.slice(1)} Documents`}
                </span>
                <Badge variant="outline">{documents.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((document) => (
                  <div
                    key={document.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-accent rounded-lg">
                        {getDocumentIcon(document.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{document.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge className={getTypeColor(document.type)} variant="secondary">
                            {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
                          </Badge>
                          <span>•</span>
                          <span>Uploaded {formatDate(document.uploadedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Document Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(groupedDocuments).map(([type, documents]) => (
              <div key={type} className="text-center">
                <p className="text-2xl font-bold text-primary">{documents.length}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {type === 'other' ? 'Other' : type}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}