import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  // sbj = new BehaviorSubject<any>("none");

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/getPosts`);
  }

  // userNameSender(username: String){
  //   this.sbj.next(username);
  // }

  // getUserObservable(): Observable<any>{
  //   return this.sbj.asObservable();
  // }

  // userIdSender(userId: number){
  //   this.sbj.next(userId);
  // }

  // getUserIdObservable(): Observable<any>{
  //   return this.sbj.asObservable();
  // }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/addPost`, post);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/getPost/` + id);
  }

  updatePostById(id : number, post:Post):Observable<Post>{
    return this.http.put<Post>(`${this.baseUrl}/updatePost/${id}`, post);
  }

  deletePostById(id : number):Observable<Post[]>{
    return this.http.delete<Post[]>(`${this.baseUrl}/deletePost/${id}`);
  }

}
