import {Injectable} from '@angular/core';
import {LoginModelDto} from '../../models/forms/login-model-dto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MessageService} from '../message/message.service';
import {UserModelDto} from '../../models/forms/user-model-dto';
import {UserModel} from '../../models/user/user-model';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ChangeRoleDto} from '../../models/user/change-role-dto';
import {JwtService} from '../auth/jwt.service';
import {TokenModelDto} from '../../models/user/token-model-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  isLoggedChange: Subject<boolean> = new Subject<boolean>();
  isAdminChange: Subject<boolean> = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private messageService: MessageService, private route: Router, private jwtService: JwtService) {
  }


  authenticate(loginModel: LoginModelDto): void {
    this.httpClient.post<any>(environment.baseUrl + 'login', loginModel).subscribe(
      data => {
        console.log(data.token);
        sessionStorage.setItem('token', data.token);
        const modelDto: TokenModelDto = this.jwtService.decodeToken(data.token);
        this.isLoggedChange.next(true);
        this.isAdminChange.next(modelDto.ROLES[0]['authority'] === 'ADMIN');
        this.route.navigate(['']);
      },
      error => {
        console.log(error);
        this.messageService.displayErrorMessage('Problem with sign in!');
      }
    );
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    return !(token === null);
  }

  logout(): void {
    sessionStorage.clear();
    this.isLoggedChange.next(false);
    this.isAdminChange.next(false);
    this.route.navigate(['login']);
  }

  register(user: UserModelDto): Observable<UserModel> {
    return this.httpClient.post<UserModel>(environment.baseUrl + 'register', user);
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(environment.baseUrl + 'admin/users');

  }

  deleteUser(user: UserModel): Observable<any> {
    return this.httpClient.delete<UserModel[]>(environment.baseUrl + 'admin/user/' + user.id);
  }

  changeUserRole(changeRoleDto: ChangeRoleDto): Observable<UserModel> {
    return this.httpClient.put<UserModel>(environment.baseUrl + 'admin/user', changeRoleDto);
  }
}
