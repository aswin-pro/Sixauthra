import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";  //Reflector -> utility helps to retrieve metadata that was set using dcorators

// It checks if the logged-in user's role is allowed to access a specific route.
// Its job is to allow or deny access based on roles.

// CanActivate (interface) -> method determines whether a route can be accessed or not.

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { } //which is used to retrieve metadata set by a custom decorator.

  //context -> the object gives information about the current request
  canActivate(context: ExecutionContext): boolean {

    //'roles' -> This is metadata key that we set using the roles decorator
    //context.getHandler -> provides specific handler i.e controller method which is where the metadata stored

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler()); // this line retrieves metadata from the handler method using reflector utility
    if (!requiredRoles) {  //if no metadata provided means any one can access the route
      return true;
    }

    //switchToHttp -> Switches the execution context to HTTP 
    //const request -> assigns the HTTP request object to the request variable, making it available to extract information (e.g., body, params, user, headers, etc.).
    const request = context.switchToHttp().getRequest(); //This retrieves the current request object (HTTP req object) from the execution context.
    const user = request.user;

    //console.log(user) { username: 'Jhon', role: 'user' }

    // Check if the user's role is in the list of allowed roles.
    if (!user || !requiredRoles.includes(user.role)) {
      throw new UnauthorizedException('You do not have the required permissions to access this route.');
    }

    return true;
  }
}
