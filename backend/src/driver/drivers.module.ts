import { Module } from '@nestjs/common';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { PrismaService } from 'prisma/prisma.service';
import { EmailService } from '../mail/email.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [DriversController],
  providers: [DriversService, PrismaService, EmailService],
  exports: [DriversService],
})
export class DriversModule {}