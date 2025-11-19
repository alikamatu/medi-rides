// import {
//   Controller,
//   Post,
//   Get,
//   Put,
//   Delete,
//   Body,
//   Param,
//   ParseIntPipe,
//   UsePipes,
//   ValidationPipe,
//   UseGuards,
//   Query,
//   HttpCode,
//   HttpStatus,
// } from '@nestjs/common';
// import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
// import { RidersService } from './riders.service';
// import { CreateRiderDto, UpdateRiderDto } from './dto/create-rider.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../common/decorators/roles.decorator';
// import { UserRole } from '@prisma/client';

// @ApiTags('Admin Riders')
// @Controller('admin/riders')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(UserRole.ADMIN)
// @ApiBearerAuth()
// export class RidersController {
//   constructor(private readonly ridersService: RidersService) {}

//   @Post()
//   @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
//   @HttpCode(HttpStatus.CREATED)
//   @ApiOperation({ summary: 'Create a new rider/driver' })
//   @ApiResponse({ status: 201, description: 'Rider created successfully' })
//   @ApiResponse({ status: 400, description: 'Invalid input data' })
//   @ApiResponse({ status: 409, description: 'Email already exists' })
//   async createRider(@Body() createRiderDto: CreateRiderDto) {
//     return this.ridersService.createRider(createRiderDto);
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get all riders' })
//   @ApiResponse({ status: 200, description: 'Riders retrieved successfully' })
//   async getAllRiders() {
//     const riders = await this.ridersService.getAllRiders();
//     return {
//       success: true,
//       data: riders,
//       count: riders.length
//     };
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Get rider by ID' })
//   @ApiResponse({ status: 200, description: 'Rider retrieved successfully' })
//   @ApiResponse({ status: 404, description: 'Rider not found' })
//   async getRiderById(@Param('id', ParseIntPipe) id: number) {
//     const rider = await this.ridersService.getRiderById(id);
//     return {
//       success: true,
//       data: rider
//     };
//   }

//   @Put(':id')
//   @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
//   @ApiOperation({ summary: 'Update rider information' })
//   @ApiResponse({ status: 200, description: 'Rider updated successfully' })
//   @ApiResponse({ status: 404, description: 'Rider not found' })
//   async updateRider(
//     @Param('id', ParseIntPipe) id: number,
//     @Body() updateRiderDto: UpdateRiderDto
//   ) {
//     return this.ridersService.updateRider(id, updateRiderDto);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Delete a rider' })
//   @ApiResponse({ status: 200, description: 'Rider deleted successfully' })
//   @ApiResponse({ status: 404, description: 'Rider not found' })
//   async deleteRider(@Param('id', ParseIntPipe) id: number) {
//     return this.ridersService.deleteRider(id);
//   }

//   @Put(':id/status')
//   @ApiOperation({ summary: 'Toggle rider active status' })
//   @ApiResponse({ status: 200, description: 'Rider status updated successfully' })
//   @ApiResponse({ status: 404, description: 'Rider not found' })
//   async toggleRiderStatus(@Param('id', ParseIntPipe) id: number) {
//     return this.ridersService.toggleRiderStatus(id);
//   }
// }