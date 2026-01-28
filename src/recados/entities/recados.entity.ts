import { Person } from "src/persons/entities/person.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Recados { // Entitie sem typeOrm

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255})
    texto: string;

    @Column({default: false})
    lido: boolean;

    @Column()    
    data: Date;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    @ManyToOne(() => Person)
    @JoinColumn({name: 'de'})
    de: Person

    @ManyToOne(() => Person)
    @JoinColumn({name: 'para'})
    para: Person

}