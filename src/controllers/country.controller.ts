import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCountryDTO } from 'src/dto/create-country.dto';
import { UpdateCountryDTO } from 'src/dto/update-country.dto';
import { CountryService } from 'src/services/country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll(): Promise<object> {
    return this.countryService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number | void): Promise<object> {
    if (!id) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.countryService.getOne(id);
  }

  @Post()
  createOne(@Body() createCountryDTO: CreateCountryDTO): Promise<object> {
    return this.countryService.createOne(createCountryDTO);
  }

  @Patch('id')
  updateOne(
    @Param('id') id: number | void,
    @Body() updateCountryDTO: UpdateCountryDTO,
  ): Promise<object> {
    if (!id) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    updateCountryDTO.id = id;
    return this.countryService.updateOne(updateCountryDTO);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number | void): Promise<object> {
    if (!id) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.countryService.deleteOne(id);
  }
}
