import { Body, Controller, Get, Post, UseGuards, Request, HttpException, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string, @Body('email') email: string, @Body('role') role: string, @Res() res: Response) {
    try {
      const tokens = await this.usersService.userLogin(username, password, email, role)
      if (!tokens) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid Credentials' });
      }

      // setting token as httponlycookies
      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true, //Ensures that the cookie is only accessible by server side, not by the client side
        maxAge: 20 * 60 * 1000
      })

      res.cookie('refresToken', tokens.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })

      return res.status(HttpStatus.OK).json({ message: "Loggin sccessful" })
    } catch (error) {
      throw new HttpException(
        {
          Error: error.message
        }, HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @Post('refresh')
  async refresh(@Request() req, @Res() res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken
      if (!refreshToken) {
        throw new HttpException('Refresh token missing', HttpStatus.UNAUTHORIZED)
      }

      const payload = await this.jwtService.verify(refreshToken, {
        secret: 'kjdn55nnd'
      })

      const { username, hashedpassword, role } = payload
      const newAccessToken = await this.usersService.generateAccessToken({
        username,  //username : username
        role
      })

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        maxAge: 20 * 60 * 1000,
      })

      return res.status(HttpStatus.OK).json({ message: "Token refreshed" })
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid or expired refresh token' });
    }
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
  }


  @Get('validate')
  @UseGuards(JwtAuthGuard)
  validate(@Request() req) {
    return `Hai "${req.user.username}" you are eligible to create a challenge, why are you waiting "${req.user.role}"`
  }
}
