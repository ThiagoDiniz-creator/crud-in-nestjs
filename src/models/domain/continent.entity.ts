import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Continent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15, type: 'varchar' })
  name: string;
}
