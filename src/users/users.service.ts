import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { Master } from 'src/master/master.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Master)
    private readonly masterRepostitory: Repository<Master>
  ) { }

  // private users = [
  //   {
  //     id: uuidv4(),
  //     username: "Aswin",
  //     email: "aswin@gmail.com",
  //     password: "password",
  //     role: "admin"
  //   },
  //   {
  //     id: uuidv4(),
  //     username: "Jhon",
  //     email: "jhon@gmail.com",
  //     password: "password",
  //     role: "user"
  //   },
  //   {
  //     id: uuidv4(),
  //     username: "Jhon Doe",
  //     email: "doe@gmail.com",
  //     password: "password",
  //     role: "user"
  //   },
  // ]

  // CRUD operation..  
  // findAll() {
  //   return this.users;
  // }

  // findOneById(id: string) {
  //   try {
  //     const user = this.users.find((user) => user.id === id);
  //     if (!user) {
  //       throw new NotFoundException(`User with ID ${id} not found`);
  //     }
  //     return user;
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  //   }
  // }

  // createUser(createUser: any) {
  //   try {
  //     const newUser = { id: uuidv4(), ...createUser };
  //     this.users.push(newUser);
  //     return {message : "User created Successfully"}
  //   } catch (error) {
  //     throw new HttpException(
  //       'Failed to create user',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  // updateUser(id: string, updateUser: any) {
  //   try {
  //     let userFound = false;
  //     this.users = this.users.map((user) => {
  //       if (user.id === id) {
  //         userFound = true;
  //         return { ...user, ...updateUser };
  //       }
  //       return user;
  //     });
  //     if (!userFound) {
  //       throw new NotFoundException(`User with ID ${id} not found`);
  //     }
  //     return { message: `User with ID ${id} updated successfully` };
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  //   }
  // }

  // deleteUser(id: string) {
  //   try {
  //     const userIndex = this.users.findIndex((user) => user.id === id);
  //     if (userIndex === -1) {
  //       throw new NotFoundException(`User with ID ${id} not found`);
  //     }
  //     this.users.splice(userIndex, 1);
  //     return { message: `User with ID ${id} deleted successfully` };
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  //   }
  // }

  // Login to generate a token
  async userLogin(username: string, password: string, email: string, role: string) {
    try {
      const user = await this.masterRepostitory.findOne({
        where: {
          username: username,
          email: email,
          role: role,
        },
      });

      if (!user) {
        return null
      }

      //Compare the provided password with the hashed password 
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const accessToken = await this.generateAccessToken({ username: user.username, role: user.role })
      const refreshToken = await this.generateRefreshToken({ username: user.username, role: user.role })

      return { accessToken: accessToken, refreshToken: refreshToken }

    } catch (error) {
      throw new HttpException(
        {
          Error: error.message
        }, HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  //for generate the access token
  async generateAccessToken(payload: { username: string, role: string }) {
    return this.jwtService.sign({ username: payload.username, role: payload.role })
    //    {
    //   secret: 'b1c34522dd',
    //   expiresIn: '20m'
    // })
  }

  //for generate the refresh token
  async generateRefreshToken(payload: { username: string, role: string }) {
    return this.jwtService.sign({ username: payload.username, role: payload.role }, {
      secret: 'kjdn55nnd',
      expiresIn: '20m'
    })
  }

}
