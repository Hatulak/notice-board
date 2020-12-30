import {Injectable} from '@angular/core';
import {LoginModelDto} from '../../models/forms/login-model-dto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageService} from '../message/message.service';
import {UserModelDto} from '../../models/forms/user-model-dto';
import {UserModel} from '../../models/user/user-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
  }

  authenticate(loginModel: LoginModelDto): void {
    console.log(loginModel);
    console.log(environment.baseUrl + 'login');
    this.httpClient.post<any>(environment.baseUrl + 'login', loginModel).subscribe(
      data => {
        console.log(data);
        sessionStorage.setItem('token', data.token);
      },
      error => {
        console.log(error);
        this.messageService.displayErrorMessage('Problem with sign in!');
      }
    );
  }

  isAuthenticated(): boolean {
    // todo create method to check if authenticate
    const token = sessionStorage.getItem('token');
    return token != null;
  }

  register(user: UserModelDto): Observable<UserModel> {
    console.log(user)
    return this.httpClient.post<UserModel>(environment.baseUrl + 'register', user);
  }
}
