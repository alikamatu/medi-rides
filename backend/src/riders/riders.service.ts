// import { 
//   Injectable, 
//   ConflictException, 
//   NotFoundException,
//   BadRequestException 
// } from '@nestjs/common';
// import { PrismaService } from 'prisma/prisma.service';
// import { CreateRiderDto, UpdateRiderDto } from './dto/create-rider.dto';
// import * as bcrypt from 'bcryptjs';
// import { UserRole, AuthProvider, VehicleType } from '@prisma/client';

// @Injectable()
// export class RidersService {
//   constructor(private prisma: PrismaService) {}

//   async createRider(createRiderDto: CreateRiderDto) {
//     try {
//       console.log('🔧 Creating rider with data:', { ...createRiderDto, password: '[HIDDEN]' });

//       // Check if email already exists
//       const existingUser = await this.prisma.user.findUnique({
//         where: { email: createRiderDto.email }
//       });

//       if (existingUser) {
//         throw new ConflictException('Email already exists');
//       }

//       // Hash password
//       const hashedPassword = await bcrypt.hash(createRiderDto.password, 12);

//       // Create user and driver profile in transaction
//       const result = await this.prisma.$transaction(async (tx) => {
//         // Create user
//         const user = await tx.user.create({
//           data: {
//             email: createRiderDto.email,
//             password: hashedPassword,
//             name: createRiderDto.name,
//             phone: createRiderDto.phone,
//             role: UserRole.DRIVER,
//             provider: AuthProvider.LOCAL,
//             isVerified: true,
//             isActive: true,
//           },
//         });

//         // Create driver profile
//         const driverProfile = await tx.driverProfile.create({
//           data: {
//             userId: user.id,
//             licenseNumber: createRiderDto.licenseNumber,
//             licenseState: createRiderDto.licenseState,
//             licenseExpiry: new Date(createRiderDto.licenseExpiry),
//             isAvailable: true,
//             rating: 5.0, // Default rating
//             totalTrips: 0,
//           },
//         });

//         // Create vehicle
//         const vehicle = await tx.vehicle.create({
//           data: {
//             driverId: user.id,
//             make: createRiderDto.vehicleMake,
//             model: createRiderDto.vehicleModel,
//             year: createRiderDto.vehicleYear,
//             color: createRiderDto.vehicleColor,
//             licensePlate: createRiderDto.licensePlate,
//             vin: createRiderDto.vin,
//             type: createRiderDto.vehicleType,
//             capacity: createRiderDto.capacity,
//             hasWheelchairAccess: createRiderDto.hasWheelchairAccess || false,
//             hasOxygenSupport: createRiderDto.hasOxygenSupport || false,
//             insuranceExpiry: new Date(createRiderDto.insuranceExpiry),
//             registrationExpiry: new Date(createRiderDto.registrationExpiry),
//           },
//         });

//         // Update driver profile with vehicle info
//         await tx.driverProfile.update({
//           where: { userId: user.id },
//           data: {
//             vehicleInfo: `${createRiderDto.vehicleMake} ${createRiderDto.vehicleModel} (${createRiderDto.licensePlate})`
//           }
//         });

//         return { user, driverProfile, vehicle };
//       });

//       console.log('✅ Rider created successfully:', result.user.id);

//       return {
//         success: true,
//         message: 'Rider created successfully',
//         data: {
//           id: result.user.id,
//           name: result.user.name,
//           email: result.user.email,
//           phone: result.user.phone,
//           licenseNumber: result.driverProfile.licenseNumber,
//           licenseState: result.driverProfile.licenseState,
//           vehicle: {
//             make: result.vehicle.make,
//             model: result.vehicle.model,
//             licensePlate: result.vehicle.licensePlate,
//             type: result.vehicle.type,
//           }
//         }
//       };

//     } catch (error) {
//       console.error('❌ Error creating rider:', error);
      
//       if (error instanceof ConflictException) {
//         throw error;
//       }
      
//       throw new BadRequestException('Failed to create rider: ' + error.message);
//     }
//   }

//   async getAllRiders() {
//     try {
//       const riders = await this.prisma.user.findMany({
//         where: {
//           role: UserRole.DRIVER,
//         },
//         orderBy: { createdAt: 'desc' }
//       });

//       return riders.map(rider => ({
//         id: rider.id,
//         name: rider.name,
//         email: rider.email,
//         phone: rider.phone,
//         avatar: rider.avatar,
//         status: rider.isActive ? 'ACTIVE' : 'INACTIVE',
//         createdAt: rider.createdAt,
//         lastLoginAt: rider.lastLoginAt,
//       }));
//     } catch (error) {
//       console.error('❌ Error fetching riders:', error);
//       throw new BadRequestException('Failed to fetch riders');
//     }
//   }

//   async getRiderById(id: number) {
//     try {
//       const rider = await this.prisma.user.findFirst({
//         where: {
//           id,
//           role: UserRole.DRIVER,
//         },
//       });

//       if (!rider) {
//         throw new NotFoundException('Rider not found');
//       }

//       return {
//         id: rider.id,
//         name: rider.name,
//         email: rider.email,
//         phone: rider.phone,
//         avatar: rider.avatar,
//         status: rider.isActive ? 'ACTIVE' : 'INACTIVE',
//         createdAt: rider.createdAt,
//         lastLoginAt: rider.lastLoginAt,
//       };
//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       console.error('❌ Error fetching rider:', error);
//       throw new BadRequestException('Failed to fetch rider');
//     }
//   }

//   async updateRider(id: number, updateRiderDto: UpdateRiderDto) {
//     try {
//       const rider = await this.prisma.user.findFirst({
//         where: {
//           id,
//           role: UserRole.DRIVER,
//         },
//         include: {
//           driverProfile: true
//         }
//       });

//       if (!rider) {
//         throw new NotFoundException('Rider not found');
//       }

//       // Update user data
//       const userUpdateData: any = {};
//       if (updateRiderDto.name) userUpdateData.name = updateRiderDto.name;
//       if (updateRiderDto.phone) userUpdateData.phone = updateRiderDto.phone;
//       if (updateRiderDto.avatar) userUpdateData.avatar = updateRiderDto.avatar;
//       if (updateRiderDto.status !== undefined) {
//         userUpdateData.isActive = updateRiderDto.status === 'ACTIVE';
//       }

//       // Update driver profile data
//       const driverProfileUpdateData: any = {};
//       if (updateRiderDto.licenseNumber) driverProfileUpdateData.licenseNumber = updateRiderDto.licenseNumber;
//       if (updateRiderDto.licenseState) driverProfileUpdateData.licenseState = updateRiderDto.licenseState;
//       if (updateRiderDto.licenseExpiry) driverProfileUpdateData.licenseExpiry = new Date(updateRiderDto.licenseExpiry);

//       const result = await this.prisma.$transaction(async (tx) => {
//         const updatedUser = await tx.user.update({
//           where: { id },
//           data: userUpdateData,
//         });

//         if (rider.driverProfile && Object.keys(driverProfileUpdateData).length > 0) {
//           await tx.driverProfile.update({
//             where: { userId: id },
//             data: driverProfileUpdateData,
//           });
//         }

//         return updatedUser;
//       });

//       return {
//         success: true,
//         message: 'Rider updated successfully',
//         data: result
//       };

//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       console.error('❌ Error updating rider:', error);
//       throw new BadRequestException('Failed to update rider');
//     }
//   }

//   async deleteRider(id: number) {
//     try {
//       const rider = await this.prisma.user.findFirst({
//         where: {
//           id,
//           role: UserRole.DRIVER,
//         }
//       });

//       if (!rider) {
//         throw new NotFoundException('Rider not found');
//       }

//       // Use transaction to ensure data consistency
//       await this.prisma.$transaction(async (tx) => {
//         // Delete related records first
//         await tx.vehicle.deleteMany({
//           where: { driverId: id }
//         });

//         await tx.driverProfile.deleteMany({
//           where: { userId: id }
//         });

//         await tx.user.delete({
//           where: { id }
//         });
//       });

//       return {
//         success: true,
//         message: 'Rider deleted successfully'
//       };

//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       console.error('❌ Error deleting rider:', error);
//       throw new BadRequestException('Failed to delete rider');
//     }
//   }

//   async toggleRiderStatus(id: number) {
//     try {
//       const rider = await this.prisma.user.findFirst({
//         where: {
//           id,
//           role: UserRole.DRIVER,
//         }
//       });

//       if (!rider) {
//         throw new NotFoundException('Rider not found');
//       }

//       const updatedRider = await this.prisma.user.update({
//         where: { id },
//         data: {
//           isActive: !rider.isActive
//         }
//       });

//       return {
//         success: true,
//         message: `Rider ${updatedRider.isActive ? 'activated' : 'deactivated'} successfully`,
//         data: {
//           id: updatedRider.id,
//           status: updatedRider.isActive ? 'ACTIVE' : 'INACTIVE'
//         }
//       };

//     } catch (error) {
//       if (error instanceof NotFoundException) {
//         throw error;
//       }
//       console.error('❌ Error toggling rider status:', error);
//       throw new BadRequestException('Failed to update rider status');
//     }
//   }
// }