import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {LoginModel} from "../../../../models/login.model";
import {ReqHandlerService} from "../../../../services/req-handler.service";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public login: FormGroup;
  public model: LoginModel;
  public username: string;
  public loader: boolean = true;

  constructor(private reqHandlerService: ReqHandlerService,
              private router: Router,
              private fb: FormBuilder,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
    this.model = new LoginModel("", "");
    this.username = "";
  }

  ngOnInit() {
    this.loader = false;
    this.login = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    })
  }

  submit(): void {
    this.model.username = this.login.value['username'];
    this.model.password = this.login.value['password'];

    if (this.model.username.length < 4 || this.model.username.length > 15) {
      this.toastr.error('Username must be between 4 and 15 symbols', 'Error');
      console.log('Username must be between 4 and 15 symbols');
      return;
    }

    if (this.model.password.length < 4 || this.model.password.length > 25) {
      this.toastr.error('Password must be between 4 and 25 symbols', 'Error');
      console.log('Password must be between 4 and 25 symbols');
      return;
    }
    this.loader = true;

    this.toastr.info('Loading...');


    this.reqHandlerService.login(this.model)
      .subscribe(
        data => {
          this.successfulLogin(data);
          this.loader = false;
        },
        err => {
          console.log(err);
          this.toastr.error('Invalid credentials', 'Error!');
          this.loader = false;
          return;
        }
      );
  }

  successfulLogin(data): void {
    this.reqHandlerService.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    localStorage.setItem('firstName', data['firstName']);
    localStorage.setItem('lastName', data['lastName']);
    localStorage.setItem('email', data['email']);
    localStorage.setItem('role', data['role']);
    this.router.navigate(['/']);
  }
}
