import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Songs {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({type: 'varchar', length: 100})
    nome: string;

    @Column({type: 'varchar', length: 100})
    artista: string;

    @Column({type: 'varchar', length: 100})
    album:string;

    @Column()
    data: Date

    @CreateDateColumn()
    createdAt?:  Date

    @UpdateDateColumn()
    updatedAt?: Date
}