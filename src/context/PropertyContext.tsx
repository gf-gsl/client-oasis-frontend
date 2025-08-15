import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Property, PropertyFilters, PropertySearchState } from '@/types/property';

// Mock data for development
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Sunset Apartments',
    address: '123 Sunset Blvd, Los Angeles, CA 90028',
    type: 'apartment',
    status: 'available',
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    yearBuilt: 2018,
    images: ['/placeholder.svg', '/placeholder.svg'],
    description: 'Modern apartment with city views and premium amenities.',
    features: ['Pool', 'Gym', 'Parking', 'Pet Friendly'],
    ownerId: '1',
    ownerName: 'John Smith',
    monthlyRent: 2500,
    deposit: 5000,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Downtown Loft',
    address: '456 Main St, Los Angeles, CA 90014',
    type: 'apartment',
    status: 'occupied',
    price: 675000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 900,
    yearBuilt: 2020,
    images: ['/placeholder.svg'],
    description: 'Stylish loft in the heart of downtown with exposed brick.',
    features: ['High Ceilings', 'Exposed Brick', 'Hardwood Floors'],
    ownerId: '2',
    ownerName: 'Jane Doe',
    monthlyRent: 3200,
    deposit: 6400,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '3',
    name: 'Family House',
    address: '789 Oak Avenue, Pasadena, CA 91101',
    type: 'house',
    status: 'available',
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2400,
    yearBuilt: 2015,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    description: 'Spacious family home with large backyard and garage.',
    features: ['Garage', 'Backyard', 'Fireplace', 'Updated Kitchen'],
    ownerId: '1',
    ownerName: 'John Smith',
    monthlyRent: 4500,
    deposit: 9000,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-12')
  }
];

type PropertyAction =
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTERS'; payload: PropertyFilters }
  | { type: 'SET_SEARCH_RESULTS'; payload: Property[] }
  | { type: 'SET_SELECTED_PROPERTY'; payload: Property | null }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SEARCH_PROPERTIES' };

const initialState: PropertySearchState = {
  searchQuery: '',
  filters: {},
  searchResults: [],
  selectedProperty: null,
  activeTab: 'general',
  loading: false,
  error: null,
};

function propertyReducer(state: PropertySearchState, action: PropertyAction): PropertySearchState {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload, loading: false };
    case 'SET_SELECTED_PROPERTY':
      return { ...state, selectedProperty: action.payload };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SEARCH_PROPERTIES':
      return { ...state, loading: true, error: null };
    default:
      return state;
  }
}

interface PropertyContextType {
  state: PropertySearchState;
  searchProperties: (query: string, filters: PropertyFilters) => void;
  selectProperty: (property: Property) => void;
  setActiveTab: (tab: string) => void;
  clearSearch: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(propertyReducer, initialState);

  const searchProperties = (query: string, filters: PropertyFilters) => {
    dispatch({ type: 'SEARCH_PROPERTIES' });
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    dispatch({ type: 'SET_FILTERS', payload: filters });

    // Simulate API call
    setTimeout(() => {
      let results = mockProperties;

      // Filter by query
      if (query) {
        results = results.filter(property =>
          property.name.toLowerCase().includes(query.toLowerCase()) ||
          property.address.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Apply filters
      if (filters.type) {
        results = results.filter(property => property.type === filters.type);
      }
      if (filters.status) {
        results = results.filter(property => property.status === filters.status);
      }
      if (filters.minPrice) {
        results = results.filter(property => property.price >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        results = results.filter(property => property.price <= filters.maxPrice!);
      }
      if (filters.bedrooms) {
        results = results.filter(property => property.bedrooms === filters.bedrooms);
      }

      dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
    }, 1000);
  };

  const selectProperty = (property: Property) => {
    dispatch({ type: 'SET_SELECTED_PROPERTY', payload: property });
    dispatch({ type: 'SET_ACTIVE_TAB', payload: 'general' });
  };

  const setActiveTab = (tab: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  const clearSearch = () => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
    dispatch({ type: 'SET_FILTERS', payload: {} });
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
    dispatch({ type: 'SET_SELECTED_PROPERTY', payload: null });
  };

  return (
    <PropertyContext.Provider value={{
      state,
      searchProperties,
      selectProperty,
      setActiveTab,
      clearSearch,
    }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
}