import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-yellow',
  templateUrl: './yellow.component.html',
  styleUrls: ['./yellow.component.css']
})
export class YellowComponent implements OnInit {

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
