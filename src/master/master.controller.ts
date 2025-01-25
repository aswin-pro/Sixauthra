import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { RolesGuard } from 'src/users/roles.guards';
import { Roles } from '../users/roles.decoretor'
import { MasterService } from './master.service';
import { ValidationException } from 'src/exceptions/validation.exception';
import { createUserSchema, updateUserSchema } from 'src/schemavalidation/userSchema';
import * as bcrypt from 'bcrypt'

@Controller('master')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MasterController {
  constructor(
    private masterService: MasterService,
  ) { }

  @Get()
  @Roles('admin')
  getAll() {
    return this.masterService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  getById(@Param('id') id: number) {
    return this.masterService.findOneById(id);
  }

  @Post()
  @Roles('admin')
  async create(@Body() body: any) {
    const { error } = createUserSchema.validate(body)
    if (error) {
      throw new ValidationException(error.details.map(e => e.message).join(','))
    }
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }
    return this.masterService.createUser(body);
  }

  @Patch(':id')
  @Roles('admin')
  async update(@Param('id') id: number, @Body() body: any) {
    const { error } = updateUserSchema.validate(body)
    if (error) {
      throw new ValidationException(error.details.map(e => e.message).join(','))
    }
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }
    return this.masterService.updateUser(id, body);
  }

  @Put(':id?')
  @Roles('admin')
  async put(@Param('id') id: number | undefined, @Body() body: any) {
    const { error } = createUserSchema.validate(body)
    if (error) {
      throw new ValidationException(error.details.map(e => e.message).join(','))
    }
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }
    if (id === undefined) {
      return this.masterService.createUser(body);
    } else {
      return this.masterService.updateAll(id, body);
    }
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: number) {
    return this.masterService.deleteUser(id);
  }
}