import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { UserpostComponent } from './userpost/userpost.component';
import { AuthService } from './auth.service';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DisplayImageComponent } from './display-image/display-image.component';
import { DisplayVideoComponent } from './display-video/display-video.component';
import { DisplayLinkComponent } from './display-link/display-link.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    CreatepostComponent,
    UserpostComponent,
    DateAgoPipe,
    UserprofileComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    MyProfileComponent,
    DisplayImageComponent,
    DisplayVideoComponent,
    DisplayLinkComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
