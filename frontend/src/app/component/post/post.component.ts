import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {NotificationService} from "../../service/notification-service/notification.service";
import {PostService} from "../../service/post-service/post.service";
import {Post} from "../../model/post-model/post";
import {User} from "../../model/user-model/user";
import {Confirm} from "notiflix";

let apiURL = environment.apiURL;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: Post = new Post();
  posts?: Post[];

  constructor(private modalService: NgbModal,
              private postService: PostService,
              private http: HttpClient,
              private notifyService: NotificationService) {
  }

  ngOnInit(): void {

    console.log(environment.title)

    this.postService.getPosts().subscribe(data => {
      console.log("all --- " + data);
      this.posts = data;
    })

  }


  open(content: any, id: any | null) {

    if (id != null) {
      this.getPost(id)
    } else {
      this.post = new Post();
    }

    console.log(content)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }


  close(content: any) {
    this.modalService.dismissAll();
  }

  selectImage(event: any): void {
    this.post.image = (event.target.files).item(0);
  }

  getPost(id: any) {
    this.postService.getPost(id)
      .subscribe(data => {
        this.post = data;
        console.log(data)
      })
  }


  savePost() {
    console.log("okk")

    const formData: FormData = new FormData();
    Object.entries(this.post).forEach(
      ([key, value]) => formData.append(key, value)
    );

    this.postService.savePost(formData)
      .subscribe(
        {
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              // this.progress = Math.round(100 * event.loaded / event.total);
              console.log(Math.round(100 * event.loaded / event.total))
            } else if (event instanceof HttpResponse) {
              console.log("message- ", event.body.message)
              // this.message = event.body.message;
            }

          },
          error: (err: any) => {
            console.log(err);
            this.notifyService.showError("Something Went Wrong", "Error")

          },
          complete: () => {
            console.log("success")
            this.post = new Post();
            this.notifyService.showSuccess("Post Saved Successfully", "Success")
          },

        })
  }

  removePost(id: any) {
    console.log(id)

    Confirm.show(
      'Confirm',
      'Do you want to remove?',
      'Yes', 'No',
      () => {
        this.postService.removePost(id)
          .subscribe(data => {
            console.log("removing --- " + data);
            this.notifyService.showSuccess("Successfully post Removed", "Success");
            window.location.reload();
          })
      }
    );
  }


  updatePost() {
    const formData: FormData = new FormData();
    Object.entries(this.post).forEach(
      ([key, value]) => formData.append(key, value)
    );

    this.postService.updatePost(formData, this.post.id)
      .subscribe(
        {
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              // this.progress = Math.round(100 * event.loaded / event.total);
              console.log(Math.round(100 * event.loaded / event.total))
            } else if (event instanceof HttpResponse) {
              console.log("message- ", event.body.message)
              // this.message = event.body.message;
            }

          },
          error: (err: any) => {
            console.log(err);
            this.notifyService.showError("Something Went Wrong", "Error")

          },
          complete: () => {
            console.log("success")
            this.post = new Post();
            this.notifyService.showSuccess("Post Updated Successfully", "Success")
          },

        })
  }


}
