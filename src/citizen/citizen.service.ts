import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/country/entities/country.entity';
import { Repository } from 'typeorm';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { Citizen } from './entities/citizen.entity';

@Injectable()
export class CitizenService {
  constructor(
    @InjectRepository(Country) private countryService: Repository<Country>,
    @InjectRepository(Citizen) private citizenService: Repository<Citizen>,
  ) {}

  async findAll(idCountry: number) {
    const country = await this.countryService.findOne({
      where: { id: idCountry },
    });
    if (!country)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found: There is not country with this ID.',
        },
        HttpStatus.NOT_FOUND,
      );

    const citizens = await this.citizenService
      .createQueryBuilder('citizen')
      .where('citizen.countryId = :countryId', { countryId: country.id })
      .getMany();

    return citizens;
  }

  async findOne(idCountry: number, idCitizen: number) {
    const country = await this.countryService.findOne({
      where: { id: idCountry },
    });
    if (!country)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found: There is not a country with the supplied id.',
        },
        HttpStatus.NOT_FOUND,
      );

    const citizen = await this.citizenService.findOne({
      where: { id: idCitizen, country: { id: idCountry } },
    });
    if (!citizen)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found: There is no citizen that matches the required id.',
        },
        HttpStatus.NOT_FOUND,
      );
    return citizen;
  }

  async create(idCountry: number, createCitizenDto: CreateCitizenDto) {
    const country = await this.countryService.findOne({
      where: { id: idCountry },
    });
    if (!country)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found: There is no country with the required id.',
        },
        HttpStatus.NOT_FOUND,
      );

    const citizen = new Citizen();
    citizen.firstName = createCitizenDto.firstName;
    citizen.lastName = createCitizenDto.lastName;
    citizen.birthday = createCitizenDto.birthday;
    citizen.email = createCitizenDto.email;
    citizen.password = createCitizenDto.password;
    citizen.personalDocument = createCitizenDto.personalDocument;
    citizen.country = country;

    const createdCitizen = await this.citizenService.save(citizen);

    return createdCitizen;
  }

  async update(
    idCountry: number,
    idCitizen: number,
    updateCitizenDto: UpdateCitizenDto,
  ) {
    return `This action updates a #${idCitizen} citizen`;
  }

  async remove(idCountry: number, idCitizen: number) {
    return `This action removes a #${idCitizen} citizen`;
  }
}
