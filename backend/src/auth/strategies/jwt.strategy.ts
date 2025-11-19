import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../common/types/auth.types';
import { PrismaService } from 'prisma/prisma.service';

// jwt.strategy.ts - Enhanced with logging
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwt.secret') || 'super-secret-key',
    });
  }

  async validate(payload: JwtPayload) {
    console.log('🔐 JWT Strategy - Validating payload:', payload);
    
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isVerified: true,
        avatar: true,
      },
    });

    console.log('🔐 JWT Strategy - Found user:', user);

    if (!user) {
      console.error('❌ JWT Strategy - User not found for ID:', payload.sub);
      throw new UnauthorizedException('User not found');
    }

    if (!user.isVerified) {
      console.warn('⚠️ JWT Strategy - User not verified:', user.email);
      throw new UnauthorizedException('Please verify your email address');
    }

    console.log('✅ JWT Strategy - Validation successful for user:', user.email);
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isVerified: user.isVerified,
      avatar: user.avatar,
    };
  }
}