import { 
  Controller, 
  Post, 
  Get,
  Body, 
  UsePipes, 
  ValidationPipe, 
  UseGuards,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RidesService } from './rides.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('rides')
@Controller('rides')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RidesController {
  constructor(private readonly ridesService: RidesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new ride booking' })
  @ApiResponse({ 
    status: 201, 
    description: 'Ride booking created successfully' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid input data' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflicting ride exists' 
  })
  async create(
    @Body() createRideDto: CreateRideDto, 
    @CurrentUser('sub') userId: number // FIX: Use CurrentUser decorator instead of Req
  ) {
    console.log('🔐 Create Ride - User ID:', userId);
    
    if (!userId) {
      throw new Error('User ID not found in request');
    }
    
    const ride = await this.ridesService.create(createRideDto, userId);
    
    return {
      success: true,
      message: 'Ride booking created successfully',
      data: ride
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get user ride history' })
  @ApiResponse({ 
    status: 200, 
    description: 'Ride history retrieved successfully' 
  })
  async getUserRides(@CurrentUser('sub') userId: number) { // FIX: Use CurrentUser decorator
    console.log('🔐 Get User Rides - User ID:', userId);
    
    if (!userId) {
      throw new Error('User ID not found in request');
    }
    
    const rides = await this.ridesService.getUserRides(userId);
    
    return {
      success: true,
      data: rides
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ride details' })
  @ApiResponse({ 
    status: 200, 
    description: 'Ride details retrieved successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Ride not found' 
  })
  async getRideDetails(
    @Param('id', ParseIntPipe) rideId: number,
    @CurrentUser('sub') userId: number // FIX: Use CurrentUser decorator
  ) {
    console.log('🔐 Get Ride Details - User ID:', userId, 'Ride ID:', rideId);
    
    if (!userId) {
      throw new Error('User ID not found in request');
    }
    
    const ride = await this.ridesService.getRideDetails(rideId, userId);
    
    return {
      success: true,
      data: ride
    };
  }
}