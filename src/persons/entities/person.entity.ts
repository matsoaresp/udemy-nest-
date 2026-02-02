import { IsEmail, isEmail } from "class-validator";
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Recados } from "src/recados/entities/recados.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

    /*
  Entity que representa a tabela Person no banco de dados
*/
@Entity()
export class Person {

  @PrimaryGeneratedColumn()
  // Chave primária auto incremental
  id: number;

  @Column({ unique: true })
  // Email único da pessoa
  email: string;

  @Column({ type: 'varchar', length: 1000 })
  // Hash da senha do usuário
  passwordHash: string;

  @Column({ length: 100 })
  // Nome da pessoa
  nome: string;

  @CreateDateColumn()
  // Data de criação do registro
  createdAt?: Date;

  @UpdateDateColumn()
  // Data da última atualização do registro
  updatedAt?: Date;

  @OneToMany(() => Recados, recado => recado.de)
  // Recados enviados por esta pessoa
  recados_enviados: Recados[];

  @OneToMany(() => Recados, recado => recado.para)
  // Recados recebidos por esta pessoa
  recados_recebidos: Recados[];
}
