import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateRideDto } from './dto/create-ride.dto';
import { PrismaService } from 'prisma/prisma.service';
import { ServiceType, RideStatus } from '@prisma/client';

@Injectable()
export class RidesService {
  constructor(private prisma: PrismaService) {}

  async create(createRideDto: CreateRideDto, userId: number) {
    try {
      console.log('🔧 Creating ride for user:', userId);
      console.log('🔧 Ride data:', createRideDto);

      // Validate user ID
      if (!userId || isNaN(userId)) {
        throw new BadRequestException('Invalid user ID provided');
      }

      // Combine date and time into a single DateTime object
      const scheduledAt = new Date(`${createRideDto.date}T${createRideDto.time}`);

      // Check if scheduled time is in the future
      if (scheduledAt <= new Date()) {
        throw new ConflictException('Ride must be scheduled for a future date and time');
      }

      // Check for conflicting rides (same user, similar time)
      const conflictingRide = await this.prisma.ride.findFirst({
        where: {
          customerId: userId,
          scheduledAt: {
            gte: new Date(scheduledAt.getTime() - 2 * 60 * 60 * 1000), // 2 hours before
            lte: new Date(scheduledAt.getTime() + 2 * 60 * 60 * 1000), // 2 hours after
          },
          status: {
            in: [RideStatus.PENDING, RideStatus.ASSIGNED, RideStatus.CONFIRMED]
          }
        }
      });

      if (conflictingRide) {
        throw new ConflictException(
          'You already have a ride scheduled around this time. Please choose a different time.'
        );
      }

      // Get user details for passenger information
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, phone: true }
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Map service type from frontend to Prisma enum
      let serviceType: ServiceType;
      switch (createRideDto.serviceType) {
        case 'Medical Appointment':
        case 'Wheelchair Transport':
          serviceType = ServiceType.MEDICAL;
          break;
        case 'Errands':
        case 'Airport Shuttle':
        case 'Other':
        default:
          serviceType = ServiceType.GENERAL;
      }

      // Convert distance from km to miles if provided
      const distanceMiles = createRideDto.distanceKm ? createRideDto.distanceKm * 0.621371 : null;

      // Create the ride
      const ride = await this.prisma.ride.create({
        data: {
          customerId: userId,
          pickupAddress: createRideDto.pickup,
          dropoffAddress: createRideDto.dropoff,
          serviceType,
          scheduledAt,
          additionalNotes: createRideDto.notes,
          distance: distanceMiles,
          duration: createRideDto.estimatedTime,
          passengerName: user.name,
          passengerPhone: user.phone,
          basePrice: this.calculateBasePrice(serviceType, distanceMiles),
          status: RideStatus.PENDING,
        },
        include: {
          customer: {
            select: {
              name: true,
              email: true,
              phone: true
            }
          }
        }
      });

      console.log('✅ Ride created successfully:', ride.id);

      return {
        id: ride.id,
        pickup: ride.pickupAddress,
        dropoff: ride.dropoffAddress,
        serviceType: createRideDto.serviceType, // Return original service type
        date: createRideDto.date,
        time: createRideDto.time,
        notes: ride.additionalNotes,
        distanceKm: createRideDto.distanceKm,
        estimatedTime: ride.duration,
        status: ride.status,
        passengerName: ride.passengerName,
        passengerPhone: ride.passengerPhone,
        scheduledAt: ride.scheduledAt,
        createdAt: ride.createdAt,
      };
    } catch (error) {
      console.error('❌ Error creating ride:', error);
      
      // Re-throw known exceptions
      if (error instanceof ConflictException || 
          error instanceof NotFoundException ||
          error instanceof BadRequestException) {
        throw error;
      }
      
      // Wrap unknown errors
      throw new Error(`Failed to create ride booking: ${error.message}`);
    }
  }

  private calculateBasePrice(serviceType: ServiceType, distanceMiles: number | null): number {
    const baseFare = serviceType === ServiceType.MEDICAL ? 25 : 15;
    const perMileRate = serviceType === ServiceType.MEDICAL ? 2.5 : 1.5;
    
    const distance = distanceMiles || 5; // Default to 5 miles if distance not provided
    return baseFare + (distance * perMileRate);
  }

  // Add method to get user's ride history
  async getUserRides(userId: number) {
    if (!userId || isNaN(userId)) {
      throw new BadRequestException('Invalid user ID provided');
    }

    const rides = await this.prisma.ride.findMany({
      where: { customerId: userId },
      orderBy: { scheduledAt: 'desc' },
      include: {
        driver: {
          select: {
            name: true,
            phone: true,
            driverProfile: {
              select: {
                vehicleInfo: true
              }
            }
          }
        },
        payment: {
          select: {
            status: true,
            amount: true
          }
        }
      }
    });

    return rides.map(ride => ({
      id: ride.id,
      pickup: ride.pickupAddress,
      dropoff: ride.dropoffAddress,
      serviceType: ride.serviceType,
      scheduledAt: ride.scheduledAt,
      status: ride.status,
      driver: ride.driver ? {
        name: ride.driver.name,
        phone: ride.driver.phone,
        vehicle: ride.driver.driverProfile?.vehicleInfo
      } : null,
      payment: ride.payment ? {
        status: ride.payment.status,
        amount: ride.payment.amount
      } : null,
      distance: ride.distance,
      duration: ride.duration,
      finalPrice: ride.finalPrice
    }));
  }

  // Add method to get ride details
  async getRideDetails(rideId: number, userId: number) {
    if (!userId || isNaN(userId)) {
      throw new BadRequestException('Invalid user ID provided');
    }

    const ride = await this.prisma.ride.findFirst({
      where: {
        id: rideId,
        customerId: userId
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        },
        driver: {
          select: {
            name: true,
            phone: true,
            driverProfile: {
              select: {
                vehicleInfo: true,
                licenseNumber: true
              }
            }
          }
        },
        payment: {
          select: {
            status: true,
            amount: true,
            method: true,
            transactionId: true,
            paidAt: true
          }
        }
      }
    });

    if (!ride) {
      throw new NotFoundException('Ride not found');
    }

    return ride;
  }
}