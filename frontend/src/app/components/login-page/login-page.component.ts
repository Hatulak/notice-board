import {Component, OnInit} from '@angular/core';
import {LoginModelDto} from '../../models/forms/login-model-dto';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginModel: LoginModelDto = new LoginModelDto();

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  authenticate(): void {
    this.userService.authenticate(this.loginModel);
  }
}
