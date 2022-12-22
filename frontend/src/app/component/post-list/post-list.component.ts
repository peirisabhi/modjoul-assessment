import { Component, OnInit } from '@angular/core';
import {PostService} from "../../service/post-service/post.service";
import {Post} from "../../model/post-model/post";
import {data, post} from "jquery";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts?: Post[];

  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe(data => {
        console.log(data)
        this.posts = data;
      })
  }

}
