import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {RegistrationPageComponent} from './components/registration-page/registration-page.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {CategoryComponent} from './components/category/category.component';
import {NoticeComponent} from './components/notice/notice.component';
import {UsersComponent} from './components/users/users.component';
import {RoleGuardService} from './services/auth/role-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'user-notice', component: NoticeComponent, canActivate: [AuthGuardService]},
  {path: 'category', component: CategoryComponent, canActivate: [AuthGuardService, RoleGuardService]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuardService, RoleGuardService]},
  {path: '', component: MainPageComponent, canActivate: [AuthGuardService]},
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
