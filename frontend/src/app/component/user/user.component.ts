import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {User} from "../../model/user-model/user";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../service/user-service/user.service";
import {NotificationService} from "../../service/notification-service/notification.service";
import {HttpClient} from "@angular/common/http";
import {Confirm} from "notiflix";

let apiURL = environment.apiURL;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User();
  // dtOptions: DataTables.Settings = {};
  users?: User[];


  constructor(private modalService: NgbModal,
              private userService: UserService,
              private http: HttpClient,
              private notifyService: NotificationService) { }


  ngOnInit(): void {
    console.log(environment.title)

    this.userService.getUsers() .subscribe(data => {
      console.log("all --- " + data);
      this.users = data;
    })

    // this.dtOptions = {
    //   serverSide: true,
    //   processing: true,
    //   ajax: (dataTablesParameters: any, callback) => {
    //     this.http
    //       .post<DataTablesResponse>(
    //         apiURL + 'user/get',
    //         dataTablesParameters, {}
    //       ).subscribe(resp => {
    //       console.log("data table called")
    //       this.users = resp.data;
    //
    //       callback({
    //         recordsTotal: resp.recordsTotal,
    //         recordsFiltered: resp.recordsFiltered,
    //         data: []
    //       });
    //     });
    //   },
    //   columns: [
    //     {data: 'id'},
    //     {data: 'fname'},
    //     {data: 'lname'},
    //     {data: 'email'},
    //
    //   ]
    // };

  }


  open(content: any, id: any|null) {

    if (id != null){
      this.getUser(id)
    }else {
      this.user = new User();
    }

    console.log(content)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }



  close(content: any) {
    this.modalService.dismissAll();
  }


  getUser(id: any){
    this.userService.getUser(id)
      .subscribe(data => {
        this.user = data;
        console.log(data)
      })
  }


  saveUser() {
    console.log("okk")


    this.userService.saveUser(this.user)
      .subscribe(data => {
        console.log("saving --- " + data);
        this.user = new User();
        this.notifyService.showSuccess("Successfully User Saved", "Success");
        window.location.reload();
      })
  }

  removeUser(id: any){
    console.log(id)

    Confirm.show(
      'Confirm',
      'Do you want to remove?',
      'Yes', 'No',
      () => {
        this.userService.removeUser(id)
          .subscribe(data => {
            console.log("removing --- " + data);
            this.notifyService.showSuccess("Successfully User Removed", "Success");
            window.location.reload();
          })
      }
    );
  }


  updateUser(){
    this.userService.updateUser(this.user, this.user.id)
      .subscribe(data => {
        this.user = new User();
        window.location.reload()
        this.notifyService.showSuccess("Successfully updated", "Success");
      })
  }


}
