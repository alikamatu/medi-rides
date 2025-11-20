// rider.types.ts
export interface Rider {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'ACTIVE' | 'INACTIVE';
  isAvailable: boolean;
  licenseNumber: string;
  licenseState: string;
  licenseExpiry: string;
  rating: number;
  totalTrips: number;
  vehicle: {
    id: number;
    make: string;
    model: string;
    licensePlate: string;
    type: string;
    capacity: number;
    year: number;
    color: string;
    vin?: string;
    hasWheelchairAccess: boolean;
    hasOxygenSupport: boolean;
    insuranceExpiry: string;
    registrationExpiry: string;
  } | null;
  createdAt: string;
  lastLoginAt?: string;
}

export interface CreateRiderData {
  name: string;
  email: string;
  password: string;
  phone: string;
  licenseNumber: string;
  licenseState: string;
  licenseExpiry: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleColor: string;
  licensePlate: string;
  vin?: string;
  vehicleType: string;
  capacity: number;
  hasWheelchairAccess?: boolean;
  hasOxygenSupport?: boolean;
  insuranceExpiry: string;
  registrationExpiry: string;
  avatar?: string;
}

export interface UpdateRiderData {
  name?: string;
  phone?: string;
  licenseNumber?: string;
  licenseState?: string;
  licenseExpiry?: string;
  avatar?: string;
  status?: 'ACTIVE' | 'INACTIVE';
  // Vehicle update fields
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  vehicleColor?: string;
  licensePlate?: string;
  vin?: string;
  vehicleType?: string;
  capacity?: number;
  hasWheelchairAccess?: boolean;
  hasOxygenSupport?: boolean;
  insuranceExpiry?: string;
  registrationExpiry?: string;
}