export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: string;
  phone?: string | null;
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
  patientProfile?: any;
  driverProfile?: any;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface Address {
  id: number;
  label: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
}

export interface EmergencyContact {
  id?: number;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}