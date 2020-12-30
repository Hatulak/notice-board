import {Component, OnInit} from '@angular/core';
import {LoginModelDto} from '../../models/forms/loginModelDto';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginModel: LoginModelDto = new LoginModelDto();

  constructor() {
  }

  ngOnInit(): void {
  }

  authenticate(): void {
    console.log('login');
  }
}
