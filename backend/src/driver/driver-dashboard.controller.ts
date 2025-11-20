import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DriverDashboardService } from './driver-dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UserRole } from '@prisma/client';
import { UpdateDriverStatusDto } from './dto/create-driver.dto';
import { AcceptRideDto, UpdateRideStatusDto } from './dto/driver-ride.dto';

@ApiTags('Driver Dashboard')
@Controller('driver')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.DRIVER)
@ApiBearerAuth()
export class DriverDashboardController {
  constructor(private readonly driverService: DriverDashboardService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get driver profile and stats' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  async getProfile(@CurrentUser('id') driverId: number) {
    const profile = await this.driverService.getDriverProfile(driverId);
    return {
      success: true,
      data: profile,
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get driver statistics' })
  @ApiResponse({ status: 200, description: 'Stats retrieved successfully' })
  async getStats(@CurrentUser('id') driverId: number) {
    const stats = await this.driverService.getDriverStats(driverId);
    return {
      success: true,
      data: stats,
    };
  }

  @Get('vehicles')
  @ApiOperation({ summary: 'Get assigned vehicles' })
  @ApiResponse({ status: 200, description: 'Vehicles retrieved successfully' })
  async getVehicles(@CurrentUser('id') driverId: number) {
    const vehicles = await this.driverService.getAssignedVehicles(driverId);
    return {
      success: true,
      data: vehicles,
      count: vehicles?.length,
    };
  }

  @Put('status')
  @ApiOperation({ summary: 'Update driver availability status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  async updateStatus(
    @CurrentUser('id') driverId: number,
    @Body(ValidationPipe) statusDto: UpdateDriverStatusDto,
  ) {
    const result = await this.driverService.updateDriverStatus(driverId, statusDto);
    return {
      success: true,
      message: 'Status updated successfully',
      data: result,
    };
  }

  @Get('rides/assigned')
  @ApiOperation({ summary: 'Get assigned rides' })
  @ApiResponse({ status: 200, description: 'Assigned rides retrieved successfully' })
  async getAssignedRides(@CurrentUser('id') driverId: number) {
    const rides = await this.driverService.getAssignedRides(driverId);
    return {
      success: true,
      data: rides,
      count: rides.length,
    };
  }

  @Get('rides/active')
  @ApiOperation({ summary: 'Get active/in-progress rides' })
  @ApiResponse({ status: 200, description: 'Active rides retrieved successfully' })
  async getActiveRides(@CurrentUser('id') driverId: number) {
    const rides = await this.driverService.getActiveRides(driverId);
    return {
      success: true,
      data: rides,
      count: rides.length,
    };
  }

  @Get('rides/history')
  @ApiOperation({ summary: 'Get ride history' })
  @ApiResponse({ status: 200, description: 'Ride history retrieved successfully' })
  async getRideHistory(@CurrentUser('id') driverId: number) {
    const rides = await this.driverService.getRideHistory(driverId);
    return {
      success: true,
      data: rides,
      count: rides.length,
    };
  }

  @Get('rides/:id')
  @ApiOperation({ summary: 'Get ride details' })
  @ApiResponse({ status: 200, description: 'Ride details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Ride not found' })
  async getRideDetails(
    @CurrentUser('id') driverId: number,
    @Param('id', ParseIntPipe) rideId: number,
  ) {
    const ride = await this.driverService.getRideDetails(driverId, rideId);
    return {
      success: true,
      data: ride,
    };
  }

  @Post('rides/:id/accept')
  @ApiOperation({ summary: 'Accept assigned ride' })
  @ApiResponse({ status: 200, description: 'Ride accepted successfully' })
  @ApiResponse({ status: 400, description: 'Cannot accept ride' })
  async acceptRide(
    @CurrentUser('id') driverId: number,
    @Param('id', ParseIntPipe) rideId: number,
    @Body(ValidationPipe) acceptRideDto: AcceptRideDto,
  ) {
    const ride = await this.driverService.acceptRide(driverId, rideId, acceptRideDto);
    return {
      success: true,
      message: 'Ride accepted successfully',
      data: ride,
    };
  }

  @Put('rides/:id/status')
  @ApiOperation({ summary: 'Update ride status' })
  @ApiResponse({ status: 200, description: 'Ride status updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid status transition' })
  async updateRideStatus(
    @CurrentUser('id') driverId: number,
    @Param('id', ParseIntPipe) rideId: number,
    @Body(ValidationPipe) statusDto: UpdateRideStatusDto,
  ) {
    const ride = await this.driverService.updateRideStatus(driverId, rideId, statusDto);
    return {
      success: true,
      message: 'Ride status updated successfully',
      data: ride,
    };
  }

  @Get('earnings')
  @ApiOperation({ summary: 'Get earnings summary' })
  @ApiResponse({ status: 200, description: 'Earnings retrieved successfully' })
  async getEarnings(@CurrentUser('id') driverId: number) {
    const earnings = await this.driverService.getEarnings(driverId);
    return {
      success: true,
      data: earnings,
    };
  }
}