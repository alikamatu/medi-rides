import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { DriversService } from './drivers.service';
import { CreateDriverDto, UpdateDriverDto, AssignVehiclesDto, UpdateDriverStatusDto } from './dto/create-driver.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Admin Drivers')
@Controller('admin/drivers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@ApiBearerAuth()
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new driver' })
  @ApiResponse({ status: 201, description: 'Driver created successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createDriver(@Body(ValidationPipe) createDriverDto: CreateDriverDto) {
    const driver = await this.driversService.createDriver(createDriverDto);
    return {
      success: true,
      message: 'Driver created successfully',
      data: driver,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all drivers with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200, description: 'Drivers retrieved successfully' })
  async getAllDrivers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = parseInt(page || '1') || 1;
    const limitNum = parseInt(limit || '10') || 10;
    
    const result = await this.driversService.getAllDrivers(pageNum, limitNum, search);
    return {
      success: true,
      ...result,
    };
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get driver statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  async getDriverStats() {
    const stats = await this.driversService.getDriverStats();
    return {
      success: true,
      data: stats,
    };
  }

  @Get('available')
  @ApiOperation({ summary: 'Get available drivers for assignment' })
  @ApiResponse({ status: 200, description: 'Available drivers retrieved successfully' })
  async getAvailableDrivers() {
    const drivers = await this.driversService.getAvailableDrivers();
    return {
      success: true,
      data: drivers,
      count: drivers.length,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get driver by ID' })
  @ApiResponse({ status: 200, description: 'Driver retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  async getDriverById(@Param('id', ParseIntPipe) id: number) {
    const driver = await this.driversService.getDriverById(id);
    return {
      success: true,
      data: driver,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update driver information' })
  @ApiResponse({ status: 200, description: 'Driver updated successfully' })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateDriver(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateDriverDto: UpdateDriverDto,
  ) {
    const driver = await this.driversService.updateDriver(id, updateDriverDto);
    return {
      success: true,
      message: 'Driver updated successfully',
      data: driver,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a driver' })
  @ApiResponse({ status: 200, description: 'Driver deleted successfully' })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @ApiResponse({ status: 400, description: 'Cannot delete driver with active rides' })
  async deleteDriver(@Param('id', ParseIntPipe) id: number) {
    const result = await this.driversService.deleteDriver(id);
    return {
      success: true,
      ...result,
    };
  }

  @Post(':id/vehicles')
  @ApiOperation({ summary: 'Assign vehicles to driver' })
  @ApiResponse({ status: 200, description: 'Vehicles assigned successfully' })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  @ApiResponse({ status: 400, description: 'Invalid vehicle IDs' })
  @ApiResponse({ status: 409, description: 'Vehicles already assigned' })
  async assignVehicles(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) assignVehiclesDto: AssignVehiclesDto,
  ) {
    const driver = await this.driversService.assignVehicles(id, assignVehiclesDto);
    return {
      success: true,
      message: 'Vehicles assigned successfully',
      data: driver,
    };
  }

  @Delete(':driverId/vehicles/:vehicleId')
  @ApiOperation({ summary: 'Unassign vehicle from driver' })
  @ApiResponse({ status: 200, description: 'Vehicle unassigned successfully' })
  @ApiResponse({ status: 404, description: 'Driver or vehicle not found' })
  @ApiResponse({ status: 400, description: 'Vehicle not assigned to this driver' })
  async unassignVehicle(
    @Param('driverId', ParseIntPipe) driverId: number,
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    const driver = await this.driversService.unassignVehicle(driverId, vehicleId);
    return {
      success: true,
      message: 'Vehicle unassigned successfully',
      data: driver,
    };
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update driver availability status' })
  @ApiResponse({ status: 200, description: 'Driver status updated successfully' })
  @ApiResponse({ status: 404, description: 'Driver not found' })
  async updateDriverStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) statusDto: UpdateDriverStatusDto,
  ) {
    const driver = await this.driversService.updateDriverStatus(id, statusDto);
    return {
      success: true,
      message: 'Driver status updated successfully',
      data: driver,
    };
  }
}