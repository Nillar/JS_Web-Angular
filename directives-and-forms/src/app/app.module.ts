import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';

import {DuplicateCheck} from "./validate-email";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,
    AppRoutingModule,

  ],
  providers: [DuplicateCheck],
  bootstrap: [AppComponent]
})
export class AppModule { }
