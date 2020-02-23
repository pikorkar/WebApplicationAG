import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/authentication/auth-interceptor.service';
import { ErrorInterceptorService } from './services/authentication/error-interceptor.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { UserManagerComponent } from './users/user-manager/user-manager.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { ProjectComponent } from './project/project.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { UserStoryCreateComponent } from './user-story/user-story-create/user-story-create.component';
import { ProjectBacklogComponent } from './project/project-backlog/project-backlog.component';
import { EngineeringTaskCreateComponent } from './engineering-task/engineering-task-create/engineering-task-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserRegisterComponent,
    UserManagerComponent,
    UserUpdateComponent,
    ProjectComponent,
    ProjectCreateComponent,
    ProjectDetailComponent,
    UserStoryCreateComponent,
    ProjectBacklogComponent,
    EngineeringTaskCreateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    UserUpdateComponent,
    ProjectCreateComponent,
    UserStoryCreateComponent,
    EngineeringTaskCreateComponent
  ]
})
export class AppModule { }
