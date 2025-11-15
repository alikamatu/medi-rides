import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID') || configService.get('auth.google.clientId') || '',
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET') || configService.get('auth.google.clientSecret') || '',
      callbackURL: configService.get('GOOGLE_CALLBACK_URL') || configService.get('auth.google.callbackURL') || 'http://localhost:1000/auth/google/callback',
      scope: ['email', 'profile'],
      passReqToCallback: false,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      console.log('Google Profile Received:', profile);
      
      const { id, emails, name, photos, displayName } = profile;
      
      if (!emails || emails.length === 0) {
        throw new Error('No email found in Google profile');
      }

      const userData = {
        provider: 'GOOGLE',
        providerId: id,
        email: emails[0].value,
        name: displayName || `${name?.givenName || ''} ${name?.familyName || ''}`.trim() || emails[0].value,
        avatar: photos?.[0]?.value,
        accessToken,
        refreshToken,
      };

      console.log('Processed user data:', userData);

      const validatedUser = await this.authService.validateOAuthUser(userData);
      done(null, validatedUser);
    } catch (error) {
      console.error('Google OAuth validation error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      done(new InternalServerErrorException('Google authentication failed. Please try again.'), false);
    }
  }
}