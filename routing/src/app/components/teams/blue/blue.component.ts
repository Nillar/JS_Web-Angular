import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-blue',
  templateUrl: './blue.component.html',
  styleUrls: ['./blue.component.css']
})
export class BlueComponent implements OnInit {

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
