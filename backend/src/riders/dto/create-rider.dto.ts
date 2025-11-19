import { 
  IsString, 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsEnum, 
  IsDateString,
  IsNumber,
  MinLength,
  Matches
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleType } from '@prisma/client';

export class CreateRiderDto {
  @ApiProperty({ description: 'Driver full name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Driver email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Driver password (min 8 characters)' })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  })
  password: string;

  @ApiProperty({ description: 'Driver phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Driver license number' })
  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @ApiProperty({ description: 'License state' })
  @IsString()
  @IsNotEmpty()
  licenseState: string;

  @ApiProperty({ description: 'License expiry date' })
  @IsDateString()
  licenseExpiry: string;

  // Vehicle Information
  @ApiProperty({ description: 'Vehicle make' })
  @IsString()
  @IsNotEmpty()
  vehicleMake: string;

  @ApiProperty({ description: 'Vehicle model' })
  @IsString()
  @IsNotEmpty()
  vehicleModel: string;

  @ApiProperty({ description: 'Vehicle year' })
  @IsNumber()
  vehicleYear: number;

  @ApiProperty({ description: 'Vehicle color' })
  @IsString()
  @IsNotEmpty()
  vehicleColor: string;

  @ApiProperty({ description: 'License plate' })
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({ description: 'Vehicle VIN (optional)' })
  @IsOptional()
  @IsString()
  vin?: string;

  @ApiProperty({ enum: VehicleType, description: 'Vehicle type' })
  @IsEnum(VehicleType)
  vehicleType: VehicleType;

  @ApiProperty({ description: 'Passenger capacity' })
  @IsNumber()
  capacity: number;

  @ApiProperty({ description: 'Wheelchair accessibility' })
  @IsOptional()
  hasWheelchairAccess?: boolean;

  @ApiProperty({ description: 'Oxygen support capability' })
  @IsOptional()
  hasOxygenSupport?: boolean;

  @ApiProperty({ description: 'Insurance expiry date' })
  @IsDateString()
  insuranceExpiry: string;

  @ApiProperty({ description: 'Registration expiry date' })
  @IsDateString()
  registrationExpiry: string;

  @ApiProperty({ description: 'Profile photo URL (optional)', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;
}

export class UpdateRiderDto {
  @ApiProperty({ description: 'Driver full name', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Driver phone number', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Driver license number', required: false })
  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @ApiProperty({ description: 'License state', required: false })
  @IsOptional()
  @IsString()
  licenseState?: string;

  @ApiProperty({ description: 'License expiry date', required: false })
  @IsOptional()
  @IsDateString()
  licenseExpiry?: string;

  @ApiProperty({ description: 'Profile photo URL', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ description: 'Driver status', required: false })
  @IsOptional()
  @IsString()
  status?: 'ACTIVE' | 'INACTIVE';
}