import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'office-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isLogged: boolean = false;
  public isAdmin: boolean = false;

  constructor() {
  }

  ngOnInit() {
    if(localStorage.getItem('username') !== null){
      this.isLogged = true;
    }

    if(localStorage.getItem('role') === 'admin'){
      this.isAdmin = true;
    }

  }

}
