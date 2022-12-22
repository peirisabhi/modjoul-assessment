import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../../model/user-model/user";

let apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  saveUser(user : User): Observable<User>{
   return  this.httpClient.post<User>(apiURL+"user", user);
  }

  updateUser(user : User, id : any): Observable<User>{
   return  this.httpClient.put<User>(apiURL+"user/"+id, user);
  }

  removeUser(id : any): Observable<User>{
    return  this.httpClient.delete<User>(apiURL+"user/"+id);
  }

  getUsers(): Observable<User[]>{
    return  this.httpClient.get<User[]>(apiURL+"user/");
  }

  getUser(id:any): Observable<User>{
    return  this.httpClient.get<User>(apiURL+"user/"+id);
  }




}
