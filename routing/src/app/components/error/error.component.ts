import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  private teamOn = sessionStorage.getItem('team');

  constructor(private router: Router) { }

  ngOnInit() {
  }

  attackAnotherFaction(){
    this.router.navigate(['attack']);
  }

  logout(): void{
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
