import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class CitizenDataParser implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<NextFunction>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    if (req.params.idCountry) {
      req.body.country = +req.params.idCountry;
    }
    if (req.body.birthday) {
      req.body.birthday = new Date(req.body.birthday);
    }
    if (req.body.document) {
      req.body.personalDocument = req.body.document;
    }

    return next.handle();
  }
}
