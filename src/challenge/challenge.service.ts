import { Injectable } from '@nestjs/common';

@Injectable()
export class ChallengeService {
    private challenge = [
        {
            thumbnail: "http://example.com/thumbnail.jpg",
            title: "My Challenge",
            description: "This is a description of the challenge.",
            tags: { category: "JavaScript", level: "Intermediate" }, 
            avatar_id: 1,
            links: { website: "http://example.com" },
            image: { src: "http://example.com/image.jpg" },
            references: { reference1: "http://example.com/reference" },
            created_at: new Date(),
            created_by: "User1",
        }
    ]

    create_challenge(createChallenge: any) {
        const newChallenge = {
            ...createChallenge
        }
        this.challenge.push(newChallenge)
        return newChallenge
    }
}
