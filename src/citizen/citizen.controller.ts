import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CitizenService } from './citizen.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { UpdateCitizenDto } from './dto/update-citizen.dto';
import { CitizenDataParser } from './interceptors/CitizenDataParser';

@Controller('country/:idCountry/citizen')
export class CitizenController {
  constructor(private readonly citizenService: CitizenService) {}

  @Get()
  findAll(@Param('idCountry') idCountry: string) {
    return this.citizenService.findAll(+idCountry);
  }

  @Get(':idCitizen')
  findOne(
    @Param('idCountry') idCountry: string,
    @Param('idCitizen') idCitizen: string,
  ) {
    return this.citizenService.findOne(+idCountry, +idCitizen);
  }

  @Post()
  @UseInterceptors(CitizenDataParser)
  create(
    @Param('idCountry') idCountry: string,
    @Body() createCitizenDto: CreateCitizenDto,
  ) {
    return this.citizenService.create(+idCountry, createCitizenDto);
  }

  @Patch(':idCitizen')
  update(
    @Param('idCountry') idCountry: string,
    @Param('idCitizen') idCitizen: string,
    @Body() updateCitizenDto: UpdateCitizenDto,
  ) {
    return this.citizenService.update(+idCountry, +idCitizen, updateCitizenDto);
  }

  @Delete(':idCitizen')
  remove(
    @Param('idCountry') idCountry: string,
    @Param('idCitizen') idCitizen: string,
  ) {
    return this.citizenService.remove(+idCountry, +idCitizen);
  }
}
