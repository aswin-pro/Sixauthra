import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChallengeModule } from './challenge/challenge.module';
import { UsersModule } from './users/users.module';
import { MasterController } from './master/master.controller';
import { MasterModule } from './master/master.module';

@Module({
  imports: [ChallengeModule, UsersModule, MasterModule],
  controllers: [AppController, MasterController],
  providers: [AppService],
})
export class AppModule {}
