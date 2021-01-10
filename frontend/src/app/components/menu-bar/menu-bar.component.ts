import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {JwtService} from '../../services/auth/jwt.service';
import {TokenModelDto} from '../../models/user/token-model-dto';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  tokenModelDto: TokenModelDto;
  isAdmin: boolean = false;
  isLogged: boolean = false;

  constructor(private userService: UserService, private jwtService: JwtService) {
    this.userService.isLoggedChange.subscribe((value) => {
      this.isLogged = value;
    });
    this.userService.isAdminChange.subscribe((value) => {
      this.isAdmin = value;
      console.log(value);
      console.log(this.tokenModelDto);
    });
  }


  ngOnInit(): void {
    this.tokenModelDto = this.jwtService.getAndDecodeToken();
  }

  logout(): void {
    this.userService.logout();
    this.isAdmin = false;
    this.isLogged = false;
  }
}
