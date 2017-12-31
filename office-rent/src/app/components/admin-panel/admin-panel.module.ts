import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AdminPanelComponent} from "./admin-panel.component";
import {AdminPanelRoutingModule} from "./admin-panel-routing.module";
import {RouterModule} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    AdminPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    NgxPaginationModule
  ],
  declarations:  [AdminPanelComponent],
  exports: [RouterModule]
})
export class AdminPanel{}

