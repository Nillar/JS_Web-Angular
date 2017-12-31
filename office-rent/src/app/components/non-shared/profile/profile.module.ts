import {NgModule} from '@angular/core';
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileComponent} from "./profile.component";
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [ProfileComponent],
  exports: []
})

export class ProfileList {
}
