export interface Property {
  id: string;
  name: string;
  address: string;
  type: 'apartment' | 'house' | 'commercial' | 'warehouse';
  status: 'available' | 'occupied' | 'maintenance' | 'sold';
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  sqft: number;
  yearBuilt: number;
  images: string[];
  description: string;
  features: string[];
  ownerId: string;
  ownerName: string;
  monthlyRent?: number;
  deposit?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyFilters {
  type?: Property['type'];
  status?: Property['status'];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minSqft?: number;
  maxSqft?: number;
  location?: string;
}

export interface PropertySearchState {
  searchQuery: string;
  filters: PropertyFilters;
  searchResults: Property[];
  selectedProperty: Property | null;
  activeTab: string;
  loading: boolean;
  error: string | null;
}

export interface MaintenanceRecord {
  id: string;
  propertyId: string;
  title: string;
  description: string;
  type: 'repair' | 'maintenance' | 'inspection' | 'upgrade';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  cost: number;
  scheduledDate: Date;
  completedDate?: Date;
  contractor?: string;
}

export interface PropertyDocument {
  id: string;
  propertyId: string;
  name: string;
  type: 'lease' | 'certificate' | 'inspection' | 'photo' | 'other';
  url: string;
  uploadedAt: Date;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  leaseStart: Date;
  leaseEnd: Date;
  monthlyRent: number;
  deposit: number;
  status: 'active' | 'inactive' | 'pending';
}