import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Poet {
    @PrimaryGeneratedColumn("uuid")
    id?: number;

    @Column({ nullable: true })
    nickName!: string;

    @Column({ nullable: true })
    fullName?: string;

    @Column({ nullable: true, type: 'int' })
    bornYear?: number;

    @Column({ nullable: true, type: 'int' })
    diedYear?: number;

    @Column({ nullable: true, type: 'date' })
    bornAt?: Date;

    @Column({ nullable: true, type: 'date' })
    diedAt?: Date;

    @Column("text", { array: true, nullable: true })
    whereLived?: string[];

    @Column("text", { array: true, nullable: true })
    underState?: string[];

    @Column("text", { array: true, nullable: true })
    era?: string[];

    @Column("text", { array: true, nullable: true })
    underRulers?: string[];

    @Column({ nullable: true })
    religion?: string;

    @Column({ nullable: true, type: 'text' })
    madhhab?: string;

    @Column("text", { array: true, nullable: true })
    bestKnownPoems?: string[];

    @Column("text", { array: true, nullable: true })
    poetryThemes?: string[];

    @Column({ nullable: true, type: 'boolean' })
    jahiliyyah?: boolean;

    @Column({ nullable: true, type: 'text' })
    qabilah?: string;

    @Column({ nullable: true, type: 'text' })
    biography?: string;

    @Column({ nullable: true, type: 'text' })
    nationality?: string;
}
