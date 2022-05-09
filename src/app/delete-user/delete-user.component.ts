import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  user: User = new User();
  id!: number;
  users: User[] | any;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data=>{
      this.user = data;
    });
  }

  onSubmit(){
    console.log("In delete-user-onSubmit method");
    this.userService.deleteUserById(this.id).subscribe(data=>{
      console.log("delete-user-data: ", data);
      this.users = data;
      console.log("delete-user-this.users: ", this.users);
      this.backToUserAccounts();
    });
  }

  backToUserAccounts() {
    this.router.navigate(['userProfile']);
  }

}
