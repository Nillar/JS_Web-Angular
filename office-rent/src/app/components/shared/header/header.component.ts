import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'office-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public role: string;
  constructor() { }

  ngOnInit() {
  }

  loggedIn() {
    return !!localStorage.getItem('authtoken');
  }

  isAdmin() {
    if (this.role === 'admin') {
      return true
    }
    return false
  }

}
