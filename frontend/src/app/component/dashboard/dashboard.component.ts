import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user-service/user.service";
import {PostService} from "../../service/post-service/post.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // usersCount :

  constructor(private userService: UserService,
              private postService: PostService) { }

  ngOnInit(): void {


  }

}
