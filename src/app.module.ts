import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengeModule } from './challenge/challenge.module';
import { UsersModule } from './users/users.module';
import { MasterController } from './master/master.controller';
import { MasterModule } from './master/master.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master } from './master/master.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ChallengeModule, UsersModule, MasterModule,
    // TypeOrmModule.forRoot({ //Establishes a connection to a database and configures TypeORM's behavior.     
    //     type: 'postgres',
    //     host: 'localhost',
    //     port: 5432,
    //     username: 'postgres',
    //     password: 'aswin@21',
    //     database: 'sixathra',
    //     entities: [Master],
    //     synchronize: true,
    // })

    //configModule -> It allows to manage environment variable in our application
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env variables available globally
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbHost = configService.get<string>('DB_HOST');
        const dbPort = configService.get<number>('DB_PORT');
        const dbUsername = configService.get<string>('DB_USERNAME');
        const dbPassword = configService.get<string>('DB_PASSWORD');
        const dbName = configService.get<string>('DB_NAME');

        return {
          type: 'postgres',
          host: dbHost,
          port: dbPort,
          username: dbUsername,
          password: dbPassword,
          database: dbName,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [AppController, MasterController],
  providers: [AppService],
})
export class AppModule { }
