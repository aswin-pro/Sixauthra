import { Column, Entity } from "typeorm";

@Entity()
export class Challengedetails {
    @Column()
    thumbnail: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    tags: JSON;

    @Column()
    avatar_id: number;

    @Column()
    links: JSON;

    @Column()
    image: JSON;

    @Column()
    references: JSON;

    @Column()
    created_at: Date;

    @Column()
    created_by: string;
}

