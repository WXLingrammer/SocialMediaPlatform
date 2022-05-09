import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CreatepostComponent } from './createpost/createpost.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SignupComponent } from './signup/signup.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserpostComponent } from './userpost/userpost.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full' },
  { path: 'signUp', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'myProfile/:id', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'userProfile', component: UserprofileComponent, canActivate: [AuthGuard] } ,
  { path: 'backToProfile/:users', redirectTo:'userProfile', pathMatch:'full' },
  { path: 'update-user/:id', component: UpdateUserComponent, canActivate: [AuthGuard] },
  { path: 'delete-user/:id', component: DeleteUserComponent, canActivate: [AuthGuard] },
  { path: 'createPost', component: CreatepostComponent, canActivate: [AuthGuard] },
  { path: 'getPost/:id', component: UserpostComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
