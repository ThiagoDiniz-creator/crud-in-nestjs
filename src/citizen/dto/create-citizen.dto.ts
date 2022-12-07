import {
  IsAlpha,
  IsAlphanumeric,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  Validate,
} from 'class-validator';
import { IsPersonalDocument } from '../validator/isPersonalDoc';

export class CreateCitizenDto {
  @IsInt()
  country: number;

  @Validate(IsPersonalDocument)
  personalDocument: string;

  @IsNotEmpty()
  firstName: string;

  @IsAlpha()
  lastName: string;

  @IsDate()
  birthday: Date;

  @IsEmail()
  email: string;

  @IsAlphanumeric()
  password: string;
}
