import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {User} from "../../model/user-model/user";
import {Observable} from "rxjs";
import {Post} from "../../model/post-model/post";

let apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient : HttpClient) { }

  savePost(formData: FormData): Observable<HttpEvent<any>>{
    const req = new HttpRequest('POST', apiURL+"post", formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  updatePost(formData: FormData, id : any): Observable<HttpEvent<any>>{
    const req = new HttpRequest('POST', apiURL+"post/"+id, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  removePost(id : any): Observable<Post>{
    return  this.httpClient.delete<Post>(apiURL+"post/"+id);
  }

  getPosts(): Observable<Post[]>{
    return  this.httpClient.get<Post[]>(apiURL+"post/");
  }

  getPost(id : any): Observable<Post>{
    return  this.httpClient.get<Post>(apiURL+"post/"+id);
  }
}
