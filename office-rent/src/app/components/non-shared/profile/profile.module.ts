import {NgModule} from '@angular/core';
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileComponent} from "./profile.component";
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    NgxPaginationModule
  ],
  declarations: [ProfileComponent],
  exports: []
})

export class ProfileList {
}
