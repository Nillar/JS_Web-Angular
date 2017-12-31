import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Form} from '@angular/forms/src/directives/form_interface'
import {Router} from "@angular/router";
import {ReqHandlerService} from "../../../services/req-handler.service";
import {CategoryModel} from "../../../models/category.model";

@Component({
  selector: 'office-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isLogged: boolean = false;
  public isAdmin: boolean = false;

  constructor(private reqHandlerService: ReqHandlerService
  ) {

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
