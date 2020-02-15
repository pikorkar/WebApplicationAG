import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AuthInterceptorService } from './services/authentication/auth-interceptor.service';
import { ErrorInterceptorService } from './services/authentication/error-interceptor.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
