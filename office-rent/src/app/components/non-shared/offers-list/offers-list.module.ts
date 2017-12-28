import { NgModule } from '@angular/core';
import {OffersListRoutingModule} from "./offers-list-routing.module";
import {OffersListComponent} from "./offers-list.component";
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  imports: [
    OffersListRoutingModule,
    CommonModule,
    NgxPaginationModule
  ],
  declarations: [OffersListComponent],
  exports: []
})

export class OffersList {}
