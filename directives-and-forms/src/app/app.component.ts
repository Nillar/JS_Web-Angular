import {Component, OnInit} from '@angular/core';

import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {Form} from "@angular/forms/src/directives/form_interface";
import {DuplicateCheck} from "./validate-email";
import {PasswordValidation} from "./validate-pass";

const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

@Component({
  selector: 'softuni-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  register: FormGroup;
  title = 'softuni';

  constructor(private fb: FormBuilder, private val: DuplicateCheck) {
  }

  ngOnInit() {
    this.register = this.fb.group({
      mail: ['', [Validators.required, Validators.pattern(new RegExp(emailPattern)), this.checkMail.bind(this)]],
      name: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
      auth: this.fb.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      }, {
        validator: PasswordValidation.MatchPassword
      }),
      address: ['', [Validators.required]],
      city: ['', []],
      country: ['', []],
      zip: ['', []]
    })
  }

  checkMail(email) {
    return this.val.validateMail(email.value) ? {duplicate: true} : null;
  }

  submit(a, b) {
    console.log(a);
    console.log(b);

  }
}
