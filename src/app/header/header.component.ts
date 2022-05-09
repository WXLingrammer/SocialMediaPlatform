import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User = new User();
  userId: number | any;
  currentUser: User;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    
  }

  goToProfile() {
    this.router.navigate(['userProfile']);
  }

  goToMyProfile(id: number){
    this.router.navigate(['myProfile', id]);
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
  

}
