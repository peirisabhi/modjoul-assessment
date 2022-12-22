import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/user-model/user";
import {Observable} from "rxjs";

let apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }

  login(email : String, password : String): Observable<User>{
    return  this.httpClient.post<User>(apiURL+"user/login",
      {"email": email, "password": password}
    );
  }
}
