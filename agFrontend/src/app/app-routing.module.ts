import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/authentication/auth-guard.service';
import { Role } from './users/model/role';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { UserManagerComponent } from './users/user-manager/user-manager.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ProjectBacklogComponent } from './project/project-backlog/project-backlog.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: 'userManager', component: UserManagerComponent, canActivate: [AuthGuardService], data: { roles: [Role.Admin] } },
  { path: 'projects', component: ProjectComponent, canActivate: [AuthGuardService] },
  { path: 'projects/:id', component: ProjectDetailComponent, canActivate: [AuthGuardService] },
  { path: 'projects/:id/backlog', component: ProjectBacklogComponent, canActivate: [AuthGuardService] },

  // otherwise redirect to home
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
