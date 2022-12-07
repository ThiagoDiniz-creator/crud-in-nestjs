import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn({ name: 'idCountry' })
  id: number;

  @Column({ length: 30, name: 'nameCountry', type: 'varchar' })
  name: string;

  @Column({ name: 'populationCountry' })
  population: number;

  @Column({ name: 'sizeCountry' })
  size: number;

  @Column({ name: 'latitudeCountry' })
  latitude: number;

  @Column({ name: 'longitudeCountry' })
  longitude: number;
}
