import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode';
import {TokenModelDto} from '../../models/user/token-model-dto';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() {
  }

  decodeToken(token: string): TokenModelDto {
    return jwt_decode(token);
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  getAndDecodeToken(): TokenModelDto {
    return this.decodeToken(this.getToken());
  }
}
