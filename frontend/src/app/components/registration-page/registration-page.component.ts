import {Component, OnInit} from '@angular/core';
import {UserModelDto} from '../../models/forms/userModelDto';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  user: UserModelDto = new UserModelDto();

  constructor() {
  }

  ngOnInit(): void {
  }

  registerUser(): void {
    console.log('any');
  }
}
