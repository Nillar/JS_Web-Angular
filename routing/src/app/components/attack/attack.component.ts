import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-attack',
  templateUrl: './attack.component.html',
  styleUrls: ['./attack.component.css']
})
export class AttackComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  attackTeam(e){
    let target = e.target.innerHTML.toLowerCase();

    this.router.navigate([target])
  }

  logout(): void{
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
