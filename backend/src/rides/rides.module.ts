import { Module } from '@nestjs/common';
import { RidesController } from './rides.controller';
import { RidesService } from './rides.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [RidesController],
  providers: [RidesService, PrismaService],
  exports: [RidesService],
})

export class RidesModule {}