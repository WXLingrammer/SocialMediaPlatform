import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  users : User[] | any;
  user: User = new User();
  pages: any;
  role: string;

  constructor(private userService: UserService, private router: Router) { 
    this.role = JSON.parse(localStorage.getItem('currentUser')).role;
  }

  ngOnInit(): void {
    this.userService.getUsers(this.role).subscribe((data:User[])=>{
      console.log("userprofile-ngOnInit-data: ", data);
      this.users = data;
    });
    this.pages = {
      itemsPerPage: 5,
      currentPage: 1
    };
  }

  updateUser(id: number | undefined){
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number) {
    this.router.navigate(['delete-user', id]);
  }

  backToHome() {
    this.router.navigate(['home']);
  }

  next(event: any){
    this.pages.currentPage = event;
  }

}
