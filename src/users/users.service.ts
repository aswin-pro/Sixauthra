import { HttpException, HttpStatus, Injectable, ParseUUIDPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(private jwtService: JwtService) { }

     private users = [
        {
            username: "Aswin",
            password:  "password"
        }
    ]


    async userLogin(username: string, password: string) {
        try {
            const user = this.users.find(user => user.username == username && user.password == password)
            if (!user) return null
            const hashedpassword = await bcrypt.hash(user.password, 10)
            const accessToken = await this.generateAccessToken({username:user.username, hashedpassword:hashedpassword})
            const refreshToken = await this.generateRefreshToken({username:user.username, hashedpassword})

            return { accessToken:accessToken, refreshToken:refreshToken }

        } catch (error) {
            throw new HttpException(
                {
                    Error: error.message
                }, HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    //for generate the access token
    async generateAccessToken(payload: { username: string , hashedpassword: string }) {
        return this.jwtService.sign({username: payload.username, password: payload.hashedpassword}, {
            secret: 'b1c34522dd',
            expiresIn: '2m'
        })
    }

    //for generate the refresh token
    async generateRefreshToken(payload: { username: string , hashedpassword: string }) {
        return this.jwtService.sign({username: payload.username,password: payload.hashedpassword}, {
            secret: 'kjdn55nnd',
            expiresIn: '20m'
        })
    }

}
