import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: '',
      clientSecret: '',
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('GoogleStrategy: Validating user by Google OAuth2');
    console.log('access token: ' + accessToken);
    console.log('refresh token: ' + refreshToken);
    console.log('profile: ' + profile);
    const user = await this.authService.validateGoogleUser({
      name: profile.name.givenName,
      username: profile.name.givenName,
      password: profile.id,
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });
    console.log('Validate');
    console.log(user);
    return user || null;
  }
}
