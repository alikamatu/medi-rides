import { useState, useEffect, useCallback } from 'react';
import { CustomerProfile, AdminRideRequest, Driver, Vehicle } from '@/types/admin.types';

// Mock data - replace with actual API calls
const mockCustomers: CustomerProfile[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    totalRides: 12,
    status: 'ACTIVE',
    createdAt: '2024-01-15T10:00:00Z',
    lastRide: '2024-11-18T14:30:00Z'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 987-6543',
    totalRides: 8,
    status: 'ACTIVE',
    createdAt: '2024-02-20T08:15:00Z',
    lastRide: '2024-11-17T09:45:00Z'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'm.brown@email.com',
    phone: '+1 (555) 456-7890',
    totalRides: 3,
    status: 'INACTIVE',
    createdAt: '2024-03-10T16:20:00Z',
    lastRide: '2024-10-15T11:30:00Z'
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+1 (555) 234-5678',
    totalRides: 25,
    status: 'ACTIVE',
    createdAt: '2024-01-05T12:00:00Z',
    lastRide: '2024-11-18T16:15:00Z'
  },
  {
    id: 5,
    name: 'Robert Wilson',
    email: 'r.wilson@email.com',
    phone: '+1 (555) 876-5432',
    totalRides: 0,
    status: 'SUSPENDED',
    createdAt: '2024-04-01T14:30:00Z',
    lastRide: null
  }
];

const mockRideRequests: AdminRideRequest[] = [
  {
    id: 1001,
    customer: {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567'
    },
    pickup: '123 Main Street, New York, NY',
    dropoff: 'Medical Center, 456 Healthcare Ave',
    scheduledAt: '2024-11-19T10:00:00Z',
    status: 'PENDING',
    serviceType: 'MEDICAL',
    distance: 8.5,
    duration: 25,
    basePrice: 45.50,
    finalPrice: null,
    driver: null,
    vehicle: null,
    createdAt: '2024-11-18T14:30:00Z'
  },
  {
    id: 1002,
    customer: {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543'
    },
    pickup: '789 Park Avenue, New York, NY',
    dropoff: 'JFK International Airport',
    scheduledAt: '2024-11-19T14:30:00Z',
    status: 'ASSIGNED',
    serviceType: 'GENERAL',
    distance: 18.2,
    duration: 45,
    basePrice: 35.75,
    finalPrice: 42.90,
    driver: {
      id: 101,
      name: 'David Miller',
      phone: '+1 (555) 111-2233'
    },
    vehicle: {
      id: 201,
      make: 'Toyota',
      model: 'Camry',
      licensePlate: 'ABC123'
    },
    createdAt: '2024-11-18T09:15:00Z'
  },
  {
    id: 1003,
    customer: {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 234-5678'
    },
    pickup: '321 Oak Street, Brooklyn, NY',
    dropoff: 'Physical Therapy Clinic, Queens',
    scheduledAt: '2024-11-18T16:15:00Z',
    status: 'COMPLETED',
    serviceType: 'MEDICAL',
    distance: 12.8,
    duration: 35,
    basePrice: 52.25,
    finalPrice: 52.25,
    driver: {
      id: 102,
      name: 'Maria Garcia',
      phone: '+1 (555) 444-5566'
    },
    vehicle: {
      id: 202,
      make: 'Honda',
      model: 'Accord',
      licensePlate: 'XYZ789'
    },
    createdAt: '2024-11-17T11:20:00Z'
  }
];

const mockDrivers: Driver[] = [
  {
    id: 101,
    name: 'David Miller',
    email: 'david.m@email.com',
    phone: '+1 (555) 111-2233',
    status: 'AVAILABLE',
    rating: 4.8,
    totalRides: 156,
    vehicle: {
      id: 201,
      make: 'Toyota',
      model: 'Camry',
      licensePlate: 'ABC123',
      type: 'SEDAN',
      capacity: 4
    }
  },
  {
    id: 102,
    name: 'Maria Garcia',
    email: 'maria.g@email.com',
    phone: '+1 (555) 444-5566',
    status: 'BUSY',
    rating: 4.9,
    totalRides: 203,
    vehicle: {
      id: 202,
      make: 'Honda',
      model: 'Accord',
      licensePlate: 'XYZ789',
      type: 'SEDAN',
      capacity: 4
    }
  },
  {
    id: 103,
    name: 'James Wilson',
    email: 'james.w@email.com',
    phone: '+1 (555) 777-8899',
    status: 'AVAILABLE',
    rating: 4.7,
    totalRides: 89,
    vehicle: {
      id: 203,
      make: 'Ford',
      model: 'Transit',
      licensePlate: 'DEF456',
      type: 'WHEELCHAIR_VAN',
      capacity: 6
    }
  }
];

const mockVehicles: Vehicle[] = [
  {
    id: 201,
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    licensePlate: 'ABC123',
    type: 'SEDAN',
    capacity: 4,
    status: 'AVAILABLE',
    driver: { id: 101, name: 'David Miller' }
  },
  {
    id: 202,
    make: 'Honda',
    model: 'Accord',
    year: 2023,
    licensePlate: 'XYZ789',
    type: 'SEDAN',
    capacity: 4,
    status: 'IN_USE',
    driver: { id: 102, name: 'Maria Garcia' }
  },
  {
    id: 203,
    make: 'Ford',
    model: 'Transit',
    year: 2021,
    licensePlate: 'DEF456',
    type: 'WHEELCHAIR_VAN',
    capacity: 6,
    status: 'AVAILABLE',
    driver: { id: 103, name: 'James Wilson' }
  },
  {
    id: 204,
    make: 'Chevrolet',
    model: 'Suburban',
    year: 2023,
    licensePlate: 'GHI789',
    type: 'SUV',
    capacity: 7,
    status: 'AVAILABLE',
    driver: null
  }
];

export const useAdminBookingManagement = () => {
  const [activeTab, setActiveTab] = useState<'customers' | 'rides'>('rides');
  const [customers, setCustomers] = useState<CustomerProfile[]>(mockCustomers);
  const [rideRequests, setRideRequests] = useState<AdminRideRequest[]>(mockRideRequests);
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [loading, setLoading] = useState(false);
  
  // Customer filters
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerStatusFilter, setCustomerStatusFilter] = useState('all');
  
  // Ride filters
  const [rideSearch, setRideSearch] = useState('');
  const [rideStatusFilter, setRideStatusFilter] = useState('all');

  // Filtered customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
      customer.phone.includes(customerSearch);
    
    const matchesStatus = customerStatusFilter === 'all' || customer.status === customerStatusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Filtered ride requests
  const filteredRideRequests = rideRequests.filter(ride => {
    const matchesSearch = 
      ride.customer.name.toLowerCase().includes(rideSearch.toLowerCase()) ||
      ride.pickup.toLowerCase().includes(rideSearch.toLowerCase()) ||
      ride.dropoff.toLowerCase().includes(rideSearch.toLowerCase()) ||
      ride.id.toString().includes(rideSearch);
    
    const matchesStatus = rideStatusFilter === 'all' || ride.status === rideStatusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Actions
  const approveRide = useCallback((rideId: number) => {
    setRideRequests(prev => 
      prev.map(ride => 
        ride.id === rideId ? { ...ride, status: 'ASSIGNED' } : ride
      )
    );
  }, []);

  const declineRide = useCallback((rideId: number) => {
    setRideRequests(prev => 
      prev.map(ride => 
        ride.id === rideId ? { ...ride, status: 'CANCELLED' } : ride
      )
    );
  }, []);

  const assignDriverAndVehicle = useCallback((rideId: number, driverId: number, vehicleId: number) => {
    const driver = drivers.find(d => d.id === driverId);
    const vehicle = vehicles.find(v => v.id === vehicleId);
    
    if (driver && vehicle) {
      setRideRequests(prev =>
        prev.map(ride =>
          ride.id === rideId
            ? {
                ...ride,
                status: 'ASSIGNED',
                driver: {
                  id: driver.id,
                  name: driver.name,
                  phone: driver.phone
                },
                vehicle: {
                  id: vehicle.id,
                  make: vehicle.make,
                  model: vehicle.model,
                  licensePlate: vehicle.licensePlate
                }
              }
            : ride
        )
      );
      
      // Update driver status
      setDrivers(prev =>
        prev.map(d =>
          d.id === driverId ? { ...d, status: 'BUSY' } : d
        )
      );
      
      // Update vehicle status
      setVehicles(prev =>
        prev.map(v =>
          v.id === vehicleId ? { ...v, status: 'IN_USE' } : v
        )
      );
    }
  }, [drivers, vehicles]);

  const updateCustomerStatus = useCallback((customerId: number, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED') => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === customerId ? { ...customer, status } : customer
      )
    );
  }, []);

  return {
    // State
    activeTab,
    setActiveTab,
    customers: filteredCustomers,
    rideRequests: filteredRideRequests,
    drivers: drivers.filter(d => d.status === 'AVAILABLE'),
    vehicles: vehicles.filter(v => v.status === 'AVAILABLE'),
    loading,
    
    // Customer filters
    customerSearch,
    setCustomerSearch,
    customerStatusFilter,
    setCustomerStatusFilter,
    
    // Ride filters
    rideSearch,
    setRideSearch,
    rideStatusFilter,
    setRideStatusFilter,
    
    // Actions
    approveRide,
    declineRide,
    assignDriverAndVehicle,
    updateCustomerStatus,
    
    // Stats
    stats: {
      totalCustomers: customers.length,
      activeCustomers: customers.filter(c => c.status === 'ACTIVE').length,
      totalRides: rideRequests.length,
      pendingRides: rideRequests.filter(r => r.status === 'PENDING').length,
      completedRides: rideRequests.filter(r => r.status === 'COMPLETED').length,
      availableDrivers: drivers.filter(d => d.status === 'AVAILABLE').length,
      availableVehicles: vehicles.filter(v => v.status === 'AVAILABLE').length,
    }
  };
};