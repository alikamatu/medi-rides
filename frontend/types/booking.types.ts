export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface BookingFormData {
  pickup: Location | null;
  dropoff: Location | null;
  serviceType: string;
  date: string;
  time: string;
  notes: string;
  distanceKm?: number;
  estimatedTime?: number;
}

export interface CreateRideDto {
  pickup: string;
  dropoff: string;
  serviceType: string;
  date: string;
  time: string;
  notes?: string;
  distanceKm?: number;
  estimatedTime?: number;
}

export interface BookingStepProps {
  formData: BookingFormData;
  updateFormData: (data: Partial<BookingFormData>) => void;
  errors: Record<string, string>;
  onNext?: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}