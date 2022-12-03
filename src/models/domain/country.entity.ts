import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: '60', unique: true })
  name: string;
  @Column({ type: 'float' })
  latitude: number;
  @Column({ type: 'float' })
  longitude: number;
}
