import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Form} from '@angular/forms/src/directives/form_interface'
import {Router} from "@angular/router";

import {RegisterModel} from "../../../../models/register.model";
import {ReqHandlerService} from "../../../../services/req-handler.service";

import {DuplicateCheck} from "./validate-email";
import {PasswordValidation} from "./validate-pass";


const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

@Component({
  selector: 'office-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  public register: FormGroup;
  public model: RegisterModel;
  public registerFail: boolean;
  public userN: any;
  public passW: any;
  public confirmP: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private reqHandlerService: ReqHandlerService,
    private value: DuplicateCheck) {
    this.model = new RegisterModel('', '', '')
  }

  ngOnInit() {
    // FORM GROUP REGISTER
    this.register = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(new RegExp(emailPattern)), this.checkMail.bind(this)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      auth: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      }, {
        validator: PasswordValidation.MatchPassword
      })
    })
  }

  checkMail(email) {
    return this.value.validateMail(email.value) ? {duplicate: true} : null;
  }


  // SUBMIT REGISTER MODEL
  submit():void {
    this.model.username = this.register.value['username'];
    this.model.password = this.register.value.auth['password'];
    this.model.email = this.register.value['email'];

    //NOTIFICATIONS
    if(this.model.username === ''){
      this.userN = true;
      return
    }
    else if(this.model.password === ''){
      this.userN = false;
      this.passW = true;
      return
    }
    else if(this.register.value.auth['password'] !== this.register.value.auth['confirmPassword']){
      this.passW = false;
      this.confirmP = true;
      return
    }

    // POST REGISTER
    this.reqHandlerService.register(this.model).subscribe(data => {
        this.successfulRegister();
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err.message);
        this.registerFail = true;
      })
  }



  successfulRegister(): void {
    this.registerFail = false;
    this.router.navigate(['/']);
  }

}
