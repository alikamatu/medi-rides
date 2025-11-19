import { useState, useCallback } from 'react';
import { BookingFormData, CreateRideDto } from '@/types/booking.types';
import { RidesService } from '@/services/rides.service';

export const useBooking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    pickup: null,
    dropoff: null,
    serviceType: '',
    date: '',
    time: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);

  const updateFormData = useCallback((data: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    // Clear errors when data is updated
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(data).forEach(key => {
        delete newErrors[key];
      });
      return newErrors;
    });
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Location step
        if (!formData.pickup) newErrors.pickup = 'Pickup location is required';
        if (!formData.dropoff) newErrors.dropoff = 'Drop-off location is required';
        break;
      
      case 2: // Service type step
        if (!formData.serviceType) newErrors.serviceType = 'Please select a service type';
        break;
      
      case 3: // Date/time step
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';
        
        if (formData.date && formData.time) {
          const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
          if (selectedDateTime <= new Date()) {
            newErrors.date = 'Date and time must be in the future';
          }
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  }, []);

  const submitBooking = useCallback(async (): Promise<any> => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    try {
      const bookingData: CreateRideDto = {
        pickup: formData.pickup!.address,
        dropoff: formData.dropoff!.address,
        serviceType: formData.serviceType,
        date: formData.date,
        time: formData.time,
        notes: formData.notes,
        distanceKm: formData.distanceKm,
        estimatedTime: formData.estimatedTime,
      };

      const result = await RidesService.createRide(bookingData);
      setBookingResult(result.data);
      return result.data;
    } catch (error: any) {
      setErrors({ submit: error.message });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateStep]);

  const resetBooking = useCallback(() => {
    setCurrentStep(1);
    setFormData({
      pickup: null,
      dropoff: null,
      serviceType: '',
      date: '',
      time: '',
      notes: '',
    });
    setErrors({});
    setBookingResult(null);
  }, []);

  return {
    currentStep,
    formData,
    updateFormData,
    errors,
    isSubmitting,
    bookingResult,
    nextStep,
    prevStep,
    submitBooking,
    resetBooking,
    validateStep,
  };
};