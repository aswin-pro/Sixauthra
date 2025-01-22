import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challengedetails } from './challenge.entity';

@Module({
    imports : [
        // TypeOrmModule.forFeature([Challengedetails])
    ],
    controllers : [ChallengeController],
    providers : [ChallengeService]
})
export class ChallengeModule {}
