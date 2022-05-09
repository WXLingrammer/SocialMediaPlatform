import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from './user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "http://localhost:8080";

  public loginStatus = 0; // 0 = not login yet, 1 = login successfully
  public isAdmin: boolean;
  public role: string | undefined;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private userService: UserService, private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getToken() {  
    console.log("AuthService-this.currentUserValue: ", this.currentUserValue)
    if(this.currentUserValue){
      // authorised so return true
      return true;
    }else{
      return false;
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    console.log("In AuthService Login method");
    return this.http.get<User>(`${this.baseUrl}/getUsername/${username}@${password}`)
    .pipe(map(user => {
      console.log("user: ", user);
      // store user details in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('name', user.name);
      this.role = user.role;
      console.log("AuthService-this.role: ", this.role)
      if(this.role == "admin"){
        this.isAdmin = true;
        console.log("AuthService-if-isAdmin:", this.isAdmin);
      }else{
        this.isAdmin = false;
        console.log("AuthService-else-isAdmin:", this.isAdmin);
      }
      this.currentUserSubject.next(user);
      this.setLoginStatus(1);
      console.log("AuthService-loginStatus:", this.loginStatus);
      localStorage.setItem('loginStatus', this.loginStatus.toString());
      return user;
    }));
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      localStorage.removeItem('name');
      localStorage.removeItem('loginStatus');
      localStorage.clear();
      this.setAdmin(false);
      this.setLoginStatus(0);
      this.currentUserSubject.next(null);
  }

  setLoginStatus(status: number) {
    this.loginStatus = status;
  }

  setAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }

  isAdministrator(): boolean {
    if(this.currentUserValue.role == "admin"){
      this.isAdmin = true;
      console.log("AuthService-isAdministrator-if-isAdmin:", this.isAdmin);
    }else{
      this.isAdmin = false;
      console.log("AuthService-isAdministrator-else-isAdmin:", this.isAdmin);
    }
    return this.isAdmin;
  }

}
