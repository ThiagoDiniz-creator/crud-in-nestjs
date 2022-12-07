import {
  IsAlpha,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNumber,
} from 'class-validator';

export class CreateCountryDto {
  @IsAlpha()
  name: string;

  @IsInt()
  population: number;

  @IsNumber()
  size: number;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
