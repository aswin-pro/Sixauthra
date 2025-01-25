import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { //jwt -> token based authentication
    handleRequest(err, user, info, context: ExecutionContext) {
        // `info` contains details about the JWT validation error
        if (info instanceof TokenExpiredError) {  //if token has expires the passport jwt strategy will attach an instanceof tokenexpirederror to info
            throw new UnauthorizedException('Token has expired');
        } else if (info instanceof JsonWebTokenError) {
            throw new UnauthorizedException('Invalid token');
        } else if (err || !user) {
            throw new UnauthorizedException('Unauthorized access');
        }
        return user;
    }
}