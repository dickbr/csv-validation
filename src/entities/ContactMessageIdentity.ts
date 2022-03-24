
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { FileIdentity } from "./FileIdentity";

@Entity('contact_message')
export class ContactMessageIdentity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false })
  file_id!: string;

  @ManyToOne(() => FileIdentity)
  @JoinColumn({ name: 'file_id' })
  file!: FileIdentity;

  @Column({ nullable: false })
  phone!: string;

  @Column({ nullable: false })
  message!: string;

  @Column({ nullable: false })
  valid!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}