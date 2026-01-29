import { Person } from "src/persons/entities/person.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

/*
  Entity que representa a tabela de recados no banco de dados.
  Cada recado possui um remetente (de) e um destinatário (para).
*/
@Entity()
export class Recados {

  // Chave primária gerada automaticamente
  @PrimaryGeneratedColumn()
  id: number;

  // Conteúdo do recado
  @Column({ type: 'varchar', length: 255 })
  texto: string;

  // Indica se o recado foi lido ou não
  @Column({ default: false })
  lido?: boolean;

  // Data em que o recado foi criado (informada manualmente)
  @Column()
  data: Date;

  // Data de criação do registro (gerada automaticamente pelo banco)
  @CreateDateColumn()
  createdAt?: Date;

  // Data da última atualização do registro (gerada automaticamente pelo banco)
  @UpdateDateColumn()
  updatedAt?: Date;

  // Relacionamento com a pessoa que enviou o recado
  // Caso a pessoa seja removida, os recados associados também serão removidos
  @ManyToOne(() => Person, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'de' })
  de: Person;

  // Relacionamento com a pessoa que recebeu o recado
  @ManyToOne(() => Person)
  @JoinColumn({ name: 'para' })
  para: Person;
}
