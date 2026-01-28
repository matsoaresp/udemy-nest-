import { IsEmail, isEmail } from "class-validator";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Recados } from "src/recados/entities/recados.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Person {

    @PrimaryGeneratedColumn()
    id:number;


    @Column({unique: true})
    @IsEmail()
    email: string;

    @Column({length: 100})
    passwordHash: string;

    @Column({length: 100})
    nome: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    

}
