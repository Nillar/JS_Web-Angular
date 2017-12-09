import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-green',
  templateUrl: './green.component.html',
  styleUrls: ['./green.component.css']
})
export class GreenComponent implements OnInit {

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
