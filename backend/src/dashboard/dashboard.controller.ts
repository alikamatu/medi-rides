import {
  Controller,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Get dashboard data for the current user' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully' })
  async getDashboardData(@CurrentUser('sub') userId: number, @CurrentUser('role') userRole: UserRole) {
    const data = await this.dashboardService.getDashboardData(userId, userRole);
    
    return {
      success: true,
      data,
    };
  }
}