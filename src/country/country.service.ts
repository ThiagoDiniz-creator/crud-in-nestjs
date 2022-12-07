import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country) private countryService: Repository<Country>,
  ) {}

  async findAll(): Promise<Country[]> {
    return await this.countryService.find();
  }

  async findOne(id: number): Promise<Country> {
    const country = await this.countryService.findOne({ where: { id } });

    if (!country)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found: There is not a country with this ID.',
        },
        HttpStatus.NOT_FOUND,
      );

    return country;
  }

  async create(createCountryDto: CreateCountryDto) {
    const countryWithSameName = await this.countryService.findOne({
      where: { name: createCountryDto.name },
    });
    if (countryWithSameName)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Conflict: There is other country with the same name',
        },
        HttpStatus.CONFLICT,
      );

    const country = new Country();
    country.name = createCountryDto.name;
    country.population = createCountryDto.population;
    country.size = createCountryDto.size;
    country.latitude = createCountryDto.latitude;
    country.longitude = createCountryDto.longitude;

    const createdCountry = await this.countryService.save(country);

    return createdCountry;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const country = await this.countryService.findOne({ where: { id } });
    if (!country)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Not found: There is no country with this ID.',
        },
        HttpStatus.NOT_FOUND,
      );

    const countryWithSameName = await this.countryService.findOne({
      where: { name: updateCountryDto.name },
    });
    if (countryWithSameName)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Conflict: There is already a country with the same name.',
        },
        HttpStatus.CONFLICT,
      );

    const updateCountry = new Country();
    country.id = id;
    country.name = updateCountry.name;
    country.population = updateCountry.population;
    country.size = updateCountry.size;
    country.latitude = updateCountry.latitude;
    country.longitude = updateCountry.longitude;

    const updatedCountry = await this.countryService.save(updateCountry);

    return updatedCountry;
  }

  async remove(id: number) {
    const country = await this.countryService.findOne({ where: { id } });
    if (!country)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Not found' },
        HttpStatus.NOT_FOUND,
      );

    await this.countryService.remove(country);

    return country;
  }
}
