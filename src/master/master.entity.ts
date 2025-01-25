import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Master {
    @Column()
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    role: string

    @PrimaryGeneratedColumn()
    id: number
}