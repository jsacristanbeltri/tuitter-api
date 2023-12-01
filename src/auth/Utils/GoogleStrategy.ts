import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: '357598114353-4k4uro9u66n6e0bq4gtmgqrtnicmg76h.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('access token: ' + accessToken);
    console.log('refresh token: ' + refreshToken);
    console.log('profile: ' + profile);
    const user = await this.authService.validateUser({
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
