import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengeModule } from './challenge/challenge.module';
import { UsersModule } from './users/users.module';
import { MasterController } from './master/master.controller';
import { MasterModule } from './master/master.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master } from './master/master.entity';

@Module({
  imports: [ChallengeModule, UsersModule, MasterModule,
    TypeOrmModule.forRoot({ ////Establishes a connection to a database and configures TypeORM's behavior.     
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'aswin@21',
        database: 'sixathra',
        entities: [Master],
        synchronize: true,
    })
  ],
  controllers: [AppController, MasterController],
  providers: [AppService],
})
export class AppModule { }
