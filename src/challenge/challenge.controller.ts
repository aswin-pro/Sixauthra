import { Body, Controller, Post } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { challengeSchema } from 'src/schemavalidation/challengeSchema';

@Controller('challenge')
export class ChallengeController {
    constructor(private readonly challengeService : ChallengeService) {}

    @Post()
    create_challenge(@Body() body:any ) {
        // const {error} = challengeSchema.validate(body)
        return this.challengeService.create_challenge(body)
    }
}
