import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }
}
