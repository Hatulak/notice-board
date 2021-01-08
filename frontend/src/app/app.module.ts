import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MainPageComponent} from './components/main-page/main-page.component';
import {RouterModule} from '@angular/router';
import {MenuBarComponent} from './components/menu-bar/menu-bar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppRoutingModule} from './app-routing.module';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {RegistrationPageComponent} from './components/registration-page/registration-page.component';
import {AuthGuardService} from './services/auth/auth-guard.service';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthInterceptorService} from './services/auth/auth-interceptor.service';
import {MatMenuModule} from '@angular/material/menu';
import {FooterComponent} from './components/footer/footer.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {CategoryComponent} from './components/category/category.component';
import {NoticeComponent} from './components/notice/notice.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MenuBarComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    FooterComponent,
    CategoryComponent,
    NoticeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    AppRoutingModule,
    MatCardModule,
    FormsModule,
    NgbModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    },
    {
      provide: AuthGuardService
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500, horizontalPosition: 'center', verticalPosition: 'bottom'}
    }
  ],
  exports: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
