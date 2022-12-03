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
import { UpdateContinentDTO } from 'src/dto/update-continent.dto';
import { Continent } from 'src/models/domain/continent.entity';
import { CreateContinentDTO } from '../dto/create-continent.dto';
import { ContinentService } from '../services/continent.service';

@Controller('/continent')
export class ContinentController {
  constructor(private readonly continentService: ContinentService) {}

  @Get()
  findAll(): Promise<object> {
    return this.continentService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<object> {
    return this.continentService.getOne(id);
  }

  @Post()
  createOne(@Body() createContinentDT: CreateContinentDTO): Promise<object> {
    return this.continentService.createOne(createContinentDT);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: number | undefined,
    @Body()
    updateContinentDTO: UpdateContinentDTO,
  ): Promise<object> {
    if (!id) {
      throw new HttpException(
        'Bad request: No ID was sent',
        HttpStatus.BAD_REQUEST,
      );
    }

    updateContinentDTO.id = id as number;
    return this.continentService.updateOne(updateContinentDTO);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number | void,
  ): Promise<Continent[] | object> {
    if (!id) {
      throw new HttpException(
        'Bad request: No ID was sent in the request',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.continentService.deleteOne(id);
  }
}
