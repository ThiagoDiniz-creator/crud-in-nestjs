import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCountryDTO } from 'src/dto/create-country.dto';
import { UpdateCountryDTO } from 'src/dto/update-country.dto';
import { Country } from 'src/models/domain/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
  ) {}

  async getAll(): Promise<object> {
    return await this.countryRepository.find();
  }

  async getOne(id: number): Promise<object> {
    return await this.countryRepository.findOne({ where: { id } });
  }

  async createOne(createCountryDTO: CreateCountryDTO): Promise<object> {
    const country = new Country();
    country.name = createCountryDTO.name;
    country.latitude = createCountryDTO.latitude;
    country.longitude = createCountryDTO.longitude;

    return await this.countryRepository.save(country);
  }

  async updateOne(updateCountryDTO: UpdateCountryDTO): Promise<object> {
    const country = await this.countryRepository.findOne({
      where: { id: updateCountryDTO.id },
    });

    country.name = updateCountryDTO.name ? updateCountryDTO.name : country.name;
    country.latitude = updateCountryDTO.latitude
      ? updateCountryDTO.latitude
      : country.latitude;
    country.longitude = updateCountryDTO.longitude
      ? updateCountryDTO.longitude
      : country.longitude;

    return await this.countryRepository.save(country);
  }

  async deleteOne(id: number): Promise<object> {
    const country = await this.countryRepository.findOne({ where: { id } });
    if (!country) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.countryRepository.remove(country);
    if (!result) {
      throw new HttpException(
        'Failed to delete country',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { status: 'success', data: { country: result } };
  }
}
