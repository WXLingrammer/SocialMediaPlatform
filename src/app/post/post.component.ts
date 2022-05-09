import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  @Input() posts: Post[] | any;
  post: Post = new Post();
  pages: any;

  constructor(private postService: PostService, private router: Router) {
    
    this.pages = {
      itemsPerPage: 10,
      currentPage: 1
    };
  }

  ngOnInit(): void {
    // this.posts.reverse();
  }

  goToPost(id: number): void {
    // this.updatePost(id);
    this.router.navigate(['getPost', id]);
  }

  next(event: any){
    this.pages.currentPage = event;
  }

  // updatePost(id: number) {
  //   this.post.viewcount+=1;
  //   this.postService.updatePostById(id, this.post).subscribe(data=>{
  //     // this.post = data;
  //   });
  // }
  
}
