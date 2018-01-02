import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";

import {RegisterModel} from "../../../../models/register.model";
import {ReqHandlerService} from "../../../../services/req-handler.service";

import {PasswordValidation} from "./validate-pass";
import {LoginModel} from "../../../../models/login.model";
import {ToastsManager} from "ng2-toastr";


const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

@Component({
  selector: 'office-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public register: FormGroup;
  public model: RegisterModel;
  public loginModel: LoginModel;
  public loader: boolean = true;

  constructor(private router: Router,
              private fb: FormBuilder,
              private reqHandlerService: ReqHandlerService,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.model = new RegisterModel('', '', '', '', '', '', '');
    this.loginModel = new LoginModel('', '');
  }

  ngOnInit() {
    // FORM GROUP REGISTER
    this.register = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(new RegExp(emailPattern))]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12)]],
      auth: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      }, {
        validator: PasswordValidation.MatchPassword
      })
    });
    this.loader = false;
  }


  // SUBMIT REGISTER MODEL
  submit(): void {

    this.model.username = this.register.value['username'];
    this.model.password = this.register.value.auth['password'];
    this.model.email = this.register.value['email'];
    this.model.firstName = this.register.value['firstName'];
    this.model.lastName = this.register.value['lastName'];
    this.model.personalInfo = '';
    this.model.role = 'user';

    this.loginModel.username = this.register.value['username'];
    this.loginModel.password = this.register.value.auth['password'];

    if (this.model.username.length < 4 || this.model.username.length > 15) {
      this.toastr.error('Username must be between 4 and 15 symbols', 'Error');
      this.register.reset();
      console.log('Username must be between 4 and 15 symbols');
      return;
    }

    if (this.model.firstName.length < 4 || this.model.firstName.length > 15) {
      this.toastr.error('First Name must be between 4 and 15 symbols', 'Error');
      console.log('First Name must be between 4 and 15 symbols');
      return;
    }

    if (this.model.lastName.length < 4 || this.model.lastName.length > 15) {
      this.toastr.error('Last Name must be between 4 and 15 symbols', 'Error');
      console.log('Last Name must be between 4 and 15 symbols');
      return;
    }

    if (this.model.password.length < 4 || this.model.password.length > 25) {
      this.toastr.error('Password must be between 4 and 25 symbols', 'Error');

      console.log('Password must be between 4 and 25 symbols');
      return;
    }

    if (this.register.value.password !== this.register.value.confirmPassword) {
      this.toastr.error('Passwords do not match', 'Error');

      console.log('Passwords do not match');
      return;
    }

    this.loader = true;

    this.reqHandlerService.register(this.model).subscribe(data => {
        this.successfulRegister();
        this.toastr.success('Register Successful');
        // this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
        if(err.status === 409){
          this.toastr.error('User already exists', 'Error');
        }
        else if(err.status !== 409){
          this.toastr.error('Register unsuccessful', 'Error');
        }
        this.loader = false;
        return;
      })
  }


  successfulRegister(): void {
    this.reqHandlerService.login(this.loginModel).subscribe(data => {
      this.reqHandlerService.authtoken = data['_kmd']['authtoken'];
      this.loader = false;
      localStorage.setItem('authtoken', data['_kmd']['authtoken']);
      localStorage.setItem('username', data['username']);
      localStorage.setItem('firstName', data['firstName']);
      localStorage.setItem('lastName', data['lastName']);
      localStorage.setItem('email', data['email']);
      localStorage.setItem('role', data['role']);
      this.router.navigate(['/']);
    });

  }

}
