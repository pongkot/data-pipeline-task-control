import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization: string = request.headers.authorization;
    const token: string = authorization
      ? authorization.replace('Bearer ', '')
      : '';
    const secret: string = process.env.SECRET;
    return new Promise<boolean>((resolve, reject) => {
      jwt.verify(token, secret, (error) => {
        if (error) {
          reject(new ForbiddenException());
        } else {
          resolve(true);
        }
      });
    });
  }
}
