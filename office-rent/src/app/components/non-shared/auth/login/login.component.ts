import {Component, OnInit} from '@angular/core';
import { LoginModel } from "../../../../models/login.model";
import { ReqHandlerService} from "../../../../services/req-handler.service";
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordValidation} from "../register/validate-pass";

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public login: FormGroup;
  public model : LoginModel;
  public loginFail : boolean;
  public username : string;

  constructor(
    private reqHandlerService : ReqHandlerService,
    private router : Router,
    private fb: FormBuilder
  ) {
    this.model = new LoginModel("", "");
    this.username = "";
  }

  ngOnInit() {
    console.log(this.reqHandlerService.isLoggedIn());
    // FORM GROUP REGISTER
    this.login = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    })
  }

  submit () : void {
    this.model.username = this.login.value['username'];
    this.model.password = this.login.value['password'];

    this.reqHandlerService.login(this.model)
      .subscribe(
        data => {
          this.successfulLogin(data);
        },
        err => {
          this.loginFail = true;
        }
      )
  }

  get diagnostics() : string {
    return JSON.stringify(this.model);
  }

  successfulLogin(data) : void {
    this.reqHandlerService.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    this.loginFail = false;
    this.router.navigate(['/']);
  }
}