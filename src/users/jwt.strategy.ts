import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req?.cookies?.accessToken,  //optional chaining method
            ]),
            ignoreExpiration: false,
            secretOrKey: 'b1c34522dd',
        })
    }
    async validate(payload: { username: string, password: string, role: string }) {
        return { username: payload.username, role: payload.role }
    }
}







//without cookies
// super({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  
//     ignoreExpiration: false,
//     secretOrKey: 'b1c34522dd'
// })