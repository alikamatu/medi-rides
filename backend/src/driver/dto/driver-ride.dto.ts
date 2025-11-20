import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RideStatus } from '@prisma/client';

export class AcceptRideDto {
  @ApiProperty({ example: 15, description: 'Estimated arrival time in minutes' })
  @IsNumber()
  estimatedArrivalMinutes: number;

  @ApiProperty({ example: 'On my way!', required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateRideStatusDto {
  @ApiProperty({ 
    enum: RideStatus, 
    example: RideStatus.DRIVER_EN_ROUTE,
    description: 'New ride status'
  })
  @IsEnum(RideStatus)
  status: RideStatus;

  @ApiProperty({ example: 'Arrived at pickup location', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: 12.5, description: 'Current latitude', required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ example: -73.5, description: 'Current longitude', required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}