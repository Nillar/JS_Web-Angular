import {Component, OnInit} from '@angular/core';
import {ReqHandlerService} from "../../../services/req-handler.service";
import {Router} from "@angular/router";

@Component({
  selector: 'office-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public username: string;
  public profileLinkVariable: string;

  constructor(private reqHandlerService: ReqHandlerService,
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('username') !== null) {
      this.username = localStorage.getItem('username');
    }
  }

  loggedIn() {
    this.profileLinkVariable = `/profile/${localStorage.getItem('username')}`;
    return !!localStorage.getItem('authtoken');
  }

  profileLinkRedirect() {
    this.reqHandlerService.getUserDetails(localStorage.getItem('username')).subscribe(data => {
      this.router.navigate([`/profile/${data[0]['username']}`]);
    });
  }
}
