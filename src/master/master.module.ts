import { forwardRef, Module } from '@nestjs/common';
import { MasterController } from './master.controller';
import { MasterService } from './master.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports:[forwardRef(() => UsersModule)],
    controllers: [MasterController],
    providers: [MasterService],
    exports: [MasterService],
})
export class MasterModule {} 