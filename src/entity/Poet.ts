import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Poet {
    @PrimaryGeneratedColumn("uuid")
    id?: number;

    @Column({ nullable: true })
    nickName!: string;

    @Column()
    fullName?: string;

    @Column({ nullable: true, type: 'date' })
    bornAt?: Date;

    @Column({ nullable: true, type: 'date' })
    diedAt?: Date;

    @Column("text", { array: true, nullable: true })
    whereLived?: string[];

    @Column("text", { array: true, nullable: true })
    underState?: string[];

    @Column("text", { array: true, nullable: true })
    underRulers?: string[];

    @Column({ nullable: true })
    religion?: string;

    @Column("text", { array: true, nullable: true })
    bestKnownPoems?: string[];

    @Column({ nullable: true, type: 'boolean' })
    jahiliyyah?: boolean;

    @Column({ nullable: true, type: 'text' })
    qabilah?: string;
}
