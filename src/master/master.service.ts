import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Master } from './master.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MasterService {
    constructor(
        @InjectRepository(Master)
        private readonly masterRepository: Repository<Master> // Master respository to perfom db operations
    ) { }

    async findAll() {
        try {
            return this.masterRepository.find();
        } catch (error) {
            throw new HttpException(
                'Failed to get user',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findOneById(id: number) {
        try {
            const user = await this.masterRepository.findOne({ where: { id } })
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }
            return user;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    async createUser(createUser: any) {
        try {
            const newUser = this.masterRepository.create(createUser)
            await this.masterRepository.save(newUser)
            return { message: "User created Successfully" }
        } catch (error) {
            if (error.code === "23505") {
                // Unique constraint violation error code for PostgreSQL
                throw new HttpException(
                    "Email already exists. Please use a different email address.",
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw new HttpException(
                "An unexpected error occurred.",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateUser(id: number, updateUser: any) {
        try {
            await this.findOneById(id)
            await this.masterRepository.update(id, updateUser)
            return { message: `User with ID ${id} updated successfully` };
        } catch (error) {
            if (error.code === "23505") {
                throw new HttpException(
                    "Email already exists. Please use a different email address.",
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw new HttpException(
                "An error occurs when updating the user",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateAll(id: number, createDto: any): Promise<any> {
        try {
            await this.findOneById(id)
            const updatedUser = await this.masterRepository.update(id, createDto)
            return {
                message: "User updated complitely successfully"
            }
        } catch (error) {
            if (error.code === "23505") {
                throw new HttpException(
                    "Email already exists. Please use a different email address.",
                    HttpStatus.BAD_REQUEST,
                );
            }
            throw new HttpException(
                "An error occurs when updating the user",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async deleteUser(id: number) {
        try {
            const user = await this.findOneById(id)
            await this.masterRepository.remove(user)
            return { message: `User with ID ${id} deleted successfully` };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }
}
