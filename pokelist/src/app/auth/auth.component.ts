import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  sub$;

  payload = {
    username: '',
    password: ''
  };

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.sub$.unsubscribe();
  }

  collectData(e) {
    this.payload[e.target.name] = e.target.value;
  }

  loginUser(e){
    this.sub$ = this.auth.authFunc(this.payload).subscribe(data=>{
      sessionStorage.setItem('authtoken', data['authtoken']);
    });
  }
}
