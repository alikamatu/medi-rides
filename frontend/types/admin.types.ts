export interface CustomerProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalRides: number;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  createdAt: string;
  lastRide: string | null;
}

export interface AdminRideRequest {
  id: number;
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  pickup: string;
  dropoff: string;
  scheduledAt: string;
  status: 'PENDING' | 'ASSIGNED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  serviceType: 'MEDICAL' | 'GENERAL';
  distance: number | null;
  duration: number | null;
  basePrice: number;
  finalPrice: number | null;
  driver: {
    id: number;
    name: string;
    phone: string;
  } | null;
  vehicle: {
    id: number;
    make: string;
    model: string;
    licensePlate: string;
  } | null;
  createdAt: string;
}

export interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
  rating: number;
  totalRides: number;
  vehicle: {
    id: number;
    make: string;
    model: string;
    licensePlate: string;
    type: string;
    capacity: number;
  } | null;
}

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  type: string;
  capacity: number;
  status: 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE';
  driver: {
    id: number;
    name: string;
  } | null;
}