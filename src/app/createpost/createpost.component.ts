import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,  } from 'rxjs';
import { Post } from '../post';
import { PostService } from '../post.service';
import { UploadService } from '../upload.service';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  userInfo: User[] | any;
  postInfo: Post[] = [];
  createdBy: string | undefined;
  isLink: boolean;
  postTypes = [
    {name: 'Image', type: 'image/jpeg'},
    {name: 'Video', type: 'video/mp4'},
    {name: 'HyperLink', type: 'href'}
  ];
  posterId: number | undefined;
  newPost: Post = new Post();

  selectedFiles!: FileList;
  currentFile!: File;
  progress = 0;
  message = '';
  fileDetails!: Observable<any>;
  rootPath: string = "assets/uploads/";
  relativeFilePath: string;

  constructor(private postService: PostService, 
    private userService: UserService, 
    private uploadService: UploadService,
    private router: Router) { 
      console.log("PostType: ", this.newPost.postType);
      this.newPost.postType = this.postTypes[0].type;
  }

  ngOnInit(): void { 
    this.posterId = JSON.parse(localStorage.getItem('currentUser')).userId;
    console.log("createPost-ngOnInit-this.posterId: ", this.posterId);
    this.createdBy = JSON.parse(localStorage.getItem('currentUser')).name;
    console.log("createPost-ngOnInit-this.createdBy: ", this.createdBy);
    // this.fileDetails = this.uploadService.getFiles();
  }

  selectPostType(event: any) {
    if(this.newPost.postType == 'href'){
      this.isLink = true;
    }else{
      this.isLink = false;
    }
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    console.log("selectedFiles: ", this.selectedFiles);
    if(this.selectedFiles.item(0).name.split('.').length == 2){
      console.log("this.selectedFiles.item(0).name.split('.').length: ", this.selectedFiles.item(0).name.split('.').length);
      if(this.selectedFiles.item(0).name.split('.')[1] == 'jpg'){
        console.log("this.selectedFiles.item(0).name.split('.')[1]: ", this.selectedFiles.item(0).name.split('.')[1]);
        this.postTypes[0].type = this.selectedFiles.item(0).type;
        this.newPost.postType = this.postTypes[0].type;
        console.log("this.selectedFiles.item(0).type: ", this.selectedFiles.item(0).type);
        console.log("this.postTypes: ", this.postTypes);
      }else if(this.selectedFiles.item(0).name.split('.')[1] == 'mp4'){
        console.log("this.selectedFiles.item(0).name.split('.')[1]: ", this.selectedFiles.item(0).name.split('.')[1]);
        this.postTypes[1].type = this.selectedFiles.item(0).type;
        this.newPost.postType = this.postTypes[1].type;
      }
    }
    console.log("this.rootPath.concat(this.selectedFiles.item(0).name): ", this.rootPath.concat(this.selectedFiles.item(0).name));
    this.relativeFilePath = this.rootPath.concat(this.selectedFiles.item(0).name);
  }

  createPost() {
    this.upload();
  }

  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    console.log("currentFile: ", this.currentFile);
    console.log("Webkit Relative Path: ", this.currentFile.webkitRelativePath);
    this.uploadService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.onPost();
          this.fileDetails = this.uploadService.getFiles();
        }
      },
      error => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }

  onPost(){
    console.log("onPost-this.newPost", this.newPost);
    this.newPost.posterId = this.posterId;
    console.log("onPost-this.newPost.posterId: ", this.newPost.posterId);
    this.newPost.createdBy = this.createdBy;
    console.log("onPost-this.newPost.createdBy: ", this.newPost.createdBy);
    this.newPost.filelocation = this.relativeFilePath;
    this.postService.addPost(this.newPost).subscribe(data=>{
      this.postInfo.push(data);
    });
    this.refreshPost();
  }

  onPostForLink(){
    this.newPost.posterId = this.posterId;
    this.newPost.createdBy = this.createdBy;
    this.postService.addPost(this.newPost).subscribe(data=>{
      this.postInfo.push(data);
    });
    this.refreshPost();
  }

  refreshPost() {
    this.router.navigate(['home']);
  }

}