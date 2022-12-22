import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../service/storage-service/storage.service";

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  admin: boolean = false;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    let role = this.storageService.get('role');
    console.log(role)

    if(role == "admin"){
      this.admin = true;
    }

  }

}
