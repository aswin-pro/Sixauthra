// custom decorator used to decorate controllers or routes 

import { SetMetadata } from '@nestjs/common';  //SetMetadata is a nestjs function that stores metadata about particular route or controller

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);   //...rest restparameter for example admin, users we can pass n number of values 
//'roles' -> is a key  roles -> value eg: [admin,user]
// Example: @SetMetadata('roles', ['admin'])



