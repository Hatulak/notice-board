import {Component, OnInit, ViewChild} from '@angular/core';
import {MessageService} from '../../services/message/message.service';
import {UserService} from '../../services/user/user.service';
import {UserModel} from '../../models/user/user-model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ChangeRoleDto} from '../../models/user/change-role-dto';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private users: UserModel[];
  changeRoleDto: ChangeRoleDto = new ChangeRoleDto();
  displayedColumns: string[] = ['id', 'username', 'role', 'actions'];
  dataSource: MatTableDataSource<UserModel> = new MatTableDataSource();
  isVisible: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        this.fillTable(this.users);
      },
      error => {
        this.messageService.displayErrorMessage('Problem with loading users!');
      }
    );
  }

  private fillTable(users: UserModel[]): void {
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(user: UserModel): void {
    this.userService.deleteUser(user).subscribe(
      data => {
        this.messageService.displaySuccessMessage('Successfully delete user!');
        this.users = this.users.filter(p => p.id !== user.id);
        this.fillTable(this.users);
        this.changeRoleDto = new ChangeRoleDto();
      },
      error => {
        this.messageService.displayErrorMessage('Problem with deleting user!');
        console.log(error);
      }
    );
  }

  updateUserRole(changeRoleDto: ChangeRoleDto): void {
    this.userService.changeUserRole(changeRoleDto).subscribe(
      data => {
        this.messageService.displaySuccessMessage('Successfully change user role!');
        this.loadUsers();
        this.fillTable(this.users);
        this.changeRoleDto = new ChangeRoleDto();
      },
      error => {
        this.messageService.displayErrorMessage('Problem with changing user role!');
        console.log(error);
      }
    );
  }

  editUser(user: UserModel): void {
    this.changeRoleDto = new ChangeRoleDto(user.id, user.username, user.roles[0]?.name);
  }

  changeRole(): void {
    this.updateUserRole(this.changeRoleDto);
  }

  showForm() {
    this.isVisible = !this.isVisible;
  }
}
