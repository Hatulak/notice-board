import {Injectable} from '@angular/core';
import {LoginModelDto} from '../../models/forms/loginModelDto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {UserModel} from '../../models/user/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) {
  }

  authenticate(loginModel: LoginModelDto): Observable<UserModel> {
    return this.httpClient.post<UserModel>(environment.baseUrl + 'login', loginModel);
  }
}
