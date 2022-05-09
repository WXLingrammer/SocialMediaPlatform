import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PostService } from '../post.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : User = new User()
  isError: boolean;

  constructor(private userService: UserService, 
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) {
      
    }

  ngOnInit(): void {
    
  }

  login(){
    this.authService.login(this.user.username, this.user.password).subscribe({
      next: data => {
        this.user = data;
        console.log('Login Success!');
        this.router.navigate(["home"]);
      },
      error: error => {
        console.log('Error: ', error);
        this.isError = true;
      }
    });
  }

}