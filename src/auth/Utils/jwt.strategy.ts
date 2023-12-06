import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        //private readonly authService: AuthService,
        //private readonly jwtService: JwtService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secrete'
        });
    }

    async validate(payload: any) {
        console.log('JwtStrategy: Validating JWT and setting user data in request');
        console.log('payload: ', payload);
        return { 
            userId: payload.sub,
            username: payload.username,
            role: payload.roles,
        };
    }
}