import { Component, OnInit } from '@angular/core';
import {ReqHandlerService} from "../../../services/req-handler.service";
import {Router} from "@angular/router";

@Component({
  selector: 'office-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public role: string;
  public username: string;
  public profileLinkVariable: string;

  constructor(private reqHandlerService: ReqHandlerService,
              private router:Router) {
    this.role = 'user';
  }

  ngOnInit() {
    if(localStorage.getItem('username') !== null){
      this.username = localStorage.getItem('username');
    }

    if(this.username !== undefined){
      this.reqHandlerService.getUserDetails(this.username).subscribe(data=>{
        this.role = data[0].role;
      })
    }

  }

  redirectToAdmin(){
    this.router.navigate(['/admin'])
  }

  loggedIn() {
    this.profileLinkVariable = `/profile/${localStorage.getItem('username')}`;
    return !!localStorage.getItem('authtoken');
  }

  profileLinkRedirect(){
    this.reqHandlerService.getUserDetails(localStorage.getItem('username')).subscribe(data=>{
    });

    this.router.navigate([`/profile/${localStorage.getItem('username')}`])
  }
  isAdmin() {
    if (this.role === 'admin') {
      return true
    }
    return false
  }

}
