import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContinentDTO } from 'src/dto/create-continent.dto';
import { Continent } from 'src/models/domain/continent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateContinentDTO } from 'src/dto/update-continent.dto';

@Injectable()
export class ContinentService {
  constructor(
    @InjectRepository(Continent)
    private continentRepository: Repository<Continent>,
  ) {}

  async getAll(): Promise<object> {
    const continents = await this.continentRepository.find();
    return { status: 'success', data: { continents } };
  }

  async getOne(id: number): Promise<object> {
    const continent = await this.continentRepository.findOne({ where: { id } });
    if (!continent) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return { status: 'success', data: { continent: continent } };
  }

  async createOne(createContinentDTO: CreateContinentDTO): Promise<object> {
    const continent: Continent = new Continent();

    continent.name = createContinentDTO.name;
    const newContinent = await this.continentRepository.save(continent);

    if (!newContinent) {
      throw new HttpException(
        'Failed to create!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { status: 'successful', data: { continent: newContinent } };
  }

  async updateOne(updateContinentDTO: UpdateContinentDTO): Promise<object> {
    const continent = await this.continentRepository.findOne({
      where: { id: updateContinentDTO.id },
    });

    if (!continent) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    continent.name = updateContinentDTO.name
      ? updateContinentDTO.name
      : continent.name;

    await this.continentRepository.save(continent);

    return { status: 'success', data: { continent: continent } };
  }

  async deleteOne(id: number): Promise<object> {
    const continent = await this.continentRepository.findOne({ where: { id } });
    if (!continent) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.continentRepository.delete(continent);
    return {
      status: 'success',
      message: 'The required continent was deleted successfully',
    };
  }
}
