import { Body, Controller, Get, Post, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string, @Body('email') email: string, @Body('role') role: string) {
    try {
      const tokens = await this.usersService.userLogin(username, password, email, role)
      if (!tokens) {
        return { message: "Invalid Credentials" }
      }
      return { tokens: tokens }
    } catch (error) {
      throw new HttpException({
        Error: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    try {
      const payload = await this.jwtService.verify(refreshToken, {
        secret: 'kjdn55nnd'
      })
 
      const { username, hashedpassword, role } = payload
      const newAccessToken = await this.usersService.generateAccessToken({
        username,  //username : username
        hashedpassword, //hashedpassword : hashedpassword
        role
      })

      return { accessToken: newAccessToken }
    } catch (error) {
      return { message: 'Invalid or expired refresh token' };
    }
  }


  @Get('validate')
  @UseGuards(JwtAuthGuard)
  validate(@Request() req) {
    return `Hai "${req.user.username}" you are eligible to create a challenge, why are you waiting "${req.user.role}"`
  }
}
