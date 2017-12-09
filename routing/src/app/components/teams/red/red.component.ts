import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-red',
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.css']
})
export class RedComponent implements OnInit {

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
