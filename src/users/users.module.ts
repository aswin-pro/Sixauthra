import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { MasterModule } from 'src/master/master.module';
import { RolesGuard } from './roles.guards';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: 'b1c34522dd',
      signOptions: { expiresIn: '20m' }
    }),
    forwardRef(() => MasterModule)
  ],
  controllers: [UsersController,],
  providers: [UsersService, JwtStrategy, RolesGuard],
  exports: [UsersService],
})
export class UsersModule { }
