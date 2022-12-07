import {
  isNumber,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateCitizenDto } from '../dto/create-citizen.dto';

@ValidatorConstraint({ name: 'isPersonalDocument', async: false })
export class IsPersonalDocument implements ValidatorConstraintInterface {
  validate(
    value: unknown,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const createCitizenDTO = validationArguments.object as CreateCitizenDto;

    const stringValue = createCitizenDTO.personalDocument;
    if (stringValue.length === 13) {
      if (
        isNumber(+stringValue.slice(0, 2)) &&
        stringValue.slice(2, 3) === '.' &&
        isNumber(+stringValue.slice(4, 7)) &&
        stringValue.slice(6, 7) === '.' &&
        isNumber(+stringValue.slice(8, 10)) &&
        stringValue.slice(10, 11) === '-' &&
        isNumber(+stringValue.slice(12, 15))
      ) {
        return true;
      }
      return false;
    }
    return false;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'The personal document must have thirteen characters, and follow the required pattern: XX.XXX.XXX-XX, where X is any number between (and including) 0-9';
  }
}
