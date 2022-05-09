import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-userpost',
  templateUrl: './userpost.component.html',
  styleUrls: ['./userpost.component.css']
})
export class UserpostComponent implements OnInit {
  postid: number;
  post: Post = new Post();
  @Input() posts: Post[] | any;
  editable: boolean = true;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) {
    this.postid = this.route.snapshot.params['id'];
    console.log("postid: ", this.postid);
  }

  ngOnInit(): void {
    this.getPostById();
  }

  private getPostById() {
    console.log("In getPostById method");
    this.postService.getPost(this.postid).subscribe(data=>{
      console.log("getPostById-data: ", data);
      this.post = data;
      if(JSON.parse(localStorage.getItem('currentUser')).role.toLowerCase() === "admin"){
        this.editable = true;
        console.log("if-this.editable: ", this.editable);
      }else if(this.post.posterId === JSON.parse(localStorage.getItem('currentUser')).userId){
        this.editable = true;
        console.log("else-if-this.editable: ", this.editable);
      }else{
        this.editable = false;
        console.log("else-this.editable: ", this.editable);
      }
      console.log("getPostById-post: ", this.post);

      this.updateViewCount(); // increment viewCount if 'Read Post' is clicked
    });
  }

  updateViewCount(){
    this.post.viewcount+=1; // increment post view count
    this.postService.updatePostById(this.postid, this.post).subscribe(data=>{
      this.post = data;
    });
  }

  updatePost(id: number) {
    console.log("In updatePost method-postid: ", id);
    this.postService.updatePostById(id, this.post).subscribe(data=>{
      this.post = data;
      this.goToHome();
    });
  }

  deletePost(id: number) {
    console.log("In deletePost method-id: ", id);
    this.postService.deletePostById(id).subscribe(data=>{
      this.posts = data;
      this.goToHome();
    });
  }

  goToHome(){
    this.router.navigate(['home']);
  }
  

}
