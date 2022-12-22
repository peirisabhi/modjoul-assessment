import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Post} from "../../../model/post-model/post";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {UserService} from "../../../service/user-service/user.service";
import {NotificationService} from "../../../service/notification-service/notification.service";
import {User} from "../../../model/user-model/user";
import {StorageService} from "../../../service/storage-service/storage.service";
import {data} from "jquery";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  user: User = new User();
  currentPassword ?: string;
  newPassword ?: string;

  constructor(private modalService: NgbModal,
              private userService: UserService,
              private notifyService: NotificationService,
              private storageService: StorageService) { }

  ngOnInit(): void {
    let id = this.storageService.get("id");
    this.userService.getUser(id) .subscribe(data => {
      console.log("user" + data);
      this.user = data;
    })
  }

  logOut(){
    window.location.replace('/')
  }


  close(content: any) {
    this.modalService.dismissAll();
  }

  open(content: any, id: any | null) {

    console.log(content)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  changePassword() {
    console.log("okk")

    if(this.user.password == this.currentPassword){
      this.user.password = this.newPassword;

      this.userService.updateUser(this.user, this.user.id)
        .subscribe(data =>{
          console.log("update --- " + data);
          this.notifyService.showSuccess("Successfully Changed ", "Success");
          close()
        })

    }else{
      this.notifyService.showWarning("Password Didn't match", "Error")
    }

  }


  getUser(id: any){
    this.userService.getUser(id)
      .subscribe(data => {
        this.user = data;
        console.log(data)
      })
  }


}
