import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { UploadService } from '../upload.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Array<Post> = [];
  name: string | undefined;
  userId: number | undefined;
  fileDetails!: Observable<any>;

  constructor(private postService: PostService,
    private uploadService: UploadService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router) {
    this.getAllPosts();
    this.getAllFiles();
    this.authService.isAdministrator();
    this.authService.loginStatus = Number(localStorage.getItem('loginStatus'));
    console.log("home-constructor-this.authService.loginStatus: ", this.authService.loginStatus);
  }
  ngOnInit(): void {
    this.name = localStorage.getItem('name');
  }

  goToCreatePost() {
    this.router.navigate(['createPost']);
  }

  getAllPosts(){
    this.postService.getPosts().subscribe(post => {
      console.log("post",post);
      this.posts = post;
      console.log("this.posts", this.posts);
    });
  }

  getAllFiles(){
    this.fileDetails = this.uploadService.getFiles();
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('loginToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
