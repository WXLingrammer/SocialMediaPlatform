import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:8080";
  constructor(private http: HttpClient) { }

  getUsers(role : string):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/getUsers/${role}`);
  }

  updateUserById(id : number, user:User):Observable<Object>{
    return this.http.put(`${this.baseUrl}/updateUser/${id}`,user);
  }

  getUserByUsername(username: String | undefined, password: String | undefined):Observable<User>{
    console.log(`${this.baseUrl}/getUsername/${username}@${password}`);
    return this.http.get<User>(`${this.baseUrl}/getUsername/${username}@${password}`);
  }

  getUserByName(name: String | undefined):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/getName/${name}`);
  }

  getUserById(id: number | undefined):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/getUser/${id}`);
  }

  addUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.baseUrl}/addUser`, user);
  }

  deleteUserById(id : number):Observable<User[]>{
    return this.http.delete<User[]>(`${this.baseUrl}/deleteUser/${id}`);
  }

  

}
