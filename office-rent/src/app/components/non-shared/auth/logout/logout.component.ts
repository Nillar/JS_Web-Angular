import { Component, OnInit } from '@angular/core';
import {ReqHandlerService} from "../../../../services/req-handler.service";
import { Router } from '@angular/router';

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {
  constructor(
    private reqHandlerService : ReqHandlerService,
    private router : Router
  ) { }

  ngOnInit() {
    this.reqHandlerService.logout()
      .subscribe(data => {
        localStorage.clear();
        this.router.navigate(['/login']);
      })
  }
}
