import {Injectable} from '@angular/core';
import {LoginModelDto} from '../../models/forms/login-model-dto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageService} from '../message/message.service';
import {UserModelDto} from '../../models/forms/user-model-dto';
import {UserModel} from '../../models/user/user-model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private messageService: MessageService, private route: Router) {
  }

  authenticate(loginModel: LoginModelDto): void {
    this.httpClient.post<any>(environment.baseUrl + 'login', loginModel).subscribe(
      data => {
        console.log(data.token);
        sessionStorage.setItem('token', data.token);
        this.route.navigate(['']);
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
    return !(token === null);
  }

  logout(): void {
    // todo logut when enpoint showups
    sessionStorage.clear();
    this.route.navigate(['login']);
  }

  register(user: UserModelDto): Observable<UserModel> {
    console.log(user);
    return this.httpClient.post<UserModel>(environment.baseUrl + 'register', user);
  }
}
