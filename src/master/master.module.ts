import { forwardRef, Module } from '@nestjs/common';
import { MasterController } from './master.controller';
import { MasterService } from './master.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master } from './master.entity';

@Module({
    imports: [forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([Master]) //Registers the master entity with typeorm
    ],
    controllers: [MasterController],
    providers: [MasterService],
    exports: [MasterService, TypeOrmModule], // Export TypeOrmModule so it's available in other modules
})
export class MasterModule { } 