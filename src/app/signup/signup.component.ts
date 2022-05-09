import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  users: User[] = [];
  newUser : User = new User();
  isError: boolean = false;
  userExists: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
  }

  signup() {
    this.createUser();
  }

  createUser(){
    console.log("createUser-this.newUser", this.newUser);
    if(this.newUser.username != null){
      this.newUser.username = this.newUser.username.trim();
    }else{
      this.isError = true;
    }
    this.userService.addUser(this.newUser).subscribe({
      next: data => {
        console.log("createUser-data", data);
        this.users.push(data);
      },error: error => {
        if(error.status==400){
          this.userExists = true;
        }else if(error.status==200){
          console.log('Sign Up Success!');
          this.goToLogin();
        }else{
          this.isError = true;
        }
      }
    });
  }

  goToLogin(){
    this.router.navigate(['login']);
  }
  
}