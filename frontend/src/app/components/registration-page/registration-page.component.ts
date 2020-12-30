import {Component, OnInit} from '@angular/core';
import {UserModelDto} from '../../models/forms/user-model-dto';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {MessageService} from '../../services/message/message.service';
import {Router} from '@angular/router';
import {UserModel} from '../../models/user/user-model';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  user: UserModelDto = new UserModelDto();

  constructor(private userService: UserService, private messageService: MessageService, private router: Router) {
  }

  ngOnInit(): void {
  }

  registerUser(): void {
    this.userService.register(this.user).subscribe(
      (data: UserModel) => {
        console.log(data);
      },
      error => {
        this.messageService.displayErrorMessage('Problem with registration');
        console.error(error);
      }
    );
  }
}
