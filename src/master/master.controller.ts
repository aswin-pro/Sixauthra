import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { RolesGuard } from 'src/users/roles.guards';
import { Roles } from '../users/roles.decoretor'
import { MasterService } from './master.service';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/dto/Userdto';
import { ValidationException } from 'src/exceptions/validation.exception';
import { createUserSchema, updateUserSchema } from 'src/schemavalidation/userSchema';
 
@Controller('master')
@UseGuards(JwtAuthGuard,RolesGuard)
export class MasterController {
    constructor (
        private  userService:UsersService,        
    ) {}
    
    @Get()
    @Roles('admin')
    getAll() {
      return this.userService.findAll();
    }
    
    @Get(':id')
    @Roles('admin', 'user')
    getById(@Param('id') id: string) {
      return this.userService.findOneById(id);
    }
  
    @Post()
    @Roles('admin')
    create(@Body() body: any) {
      const { error } = createUserSchema.validate(body)
      if (error) {
        throw new ValidationException(error.details.map(e => e.message).join(','))
      }
      return this.userService.createUser(body);
    }
  
    @Patch(':id')
    @Roles('admin')
    update(@Param('id') id: string, @Body() body: any) {
      const { error } = updateUserSchema.validate(body)
      if (error) {
        throw new ValidationException(error.details.map(e => e.message).join(','))
      }
      return this.userService.updateUser(id, body);
    }
  
    @Delete(':id')
    @Roles('admin')
    delete(@Param('id') id: string) {
      return this.userService.deleteUser(id);
    } 
}