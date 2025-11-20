import { Module } from '@nestjs/common';
import { DriverDashboardController } from './driver-dashboard.controller';
import { DriverDashboardService } from './driver-dashboard.service';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DriverDashboardController],
  providers: [DriverDashboardService, PrismaService],
  exports: [DriverDashboardService],
})
export class DriverDashboardModule {}