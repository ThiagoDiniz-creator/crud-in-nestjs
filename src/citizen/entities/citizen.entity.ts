import { Country } from 'src/country/entities/country.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Citizen {
  @PrimaryGeneratedColumn({ name: 'idCitizen' })
  id: number;

  @ManyToOne(() => Country, (country: Country) => country.id)
  country: Country;

  @Column({ name: 'personalDocumentCitizen', unique: true })
  personalDocument: string;

  @Column({ name: 'firstNameCitizen' })
  firstName: string;

  @Column({ name: 'lastNameCitizen' })
  lastName: string;

  @Column({ name: 'birthday' })
  birthday: Date;

  @Column({ name: 'emailCitizen', unique: true })
  email: string;

  @Column({ name: 'passwordCitizen', select: false })
  password: string;
}
