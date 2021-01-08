import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {RegistrationPageComponent} from './components/registration-page/registration-page.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {CreateNoticeComponent} from './components/create-notice/create-notice.component';
import {CategoryService} from './services/category/category.service';
import {CategoryComponent} from './components/category/category.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'create-notice', component: CreateNoticeComponent, canActivate: [AuthGuardService]},
  {path: 'category', component: CategoryComponent, canActivate: [AuthGuardService]},
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
