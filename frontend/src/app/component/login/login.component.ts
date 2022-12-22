import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../service/storage-service/storage.service";
import {AuthService} from "../../service/auth-service/auth.service";
import {User} from "../../model/user-model/user";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification-service/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private storageService: StorageService,
              private authService: AuthService,
              private router: Router,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  form: any = {
    username: null,
    password: null
  };
  //
  // goToDashboard() {
  //
  //   const {username, password} = this.form;
  //
  //
  //   window.location.replace('/dashboard')
  // }

  onSubmit(): void {
    const {username, password} = this.form;

    console.log(username)

    this.authService.login(username, password)
      .subscribe(data => {
        this.storageService.set("id", data.id+"");
        this.storageService.set("fname", data.fname+"");
        this.storageService.set("lname", data.lname+"");
        this.storageService.set("email", data.email+"");

          // window.location.replace('/dashboard')
      },
        error => {
          this.notificationService.showError("Invalid Conditionals", "Error");
        }
      )

    // window.location.replace('/dashboard')
    this.router.navigate(['/dashboard'])
  }

}
