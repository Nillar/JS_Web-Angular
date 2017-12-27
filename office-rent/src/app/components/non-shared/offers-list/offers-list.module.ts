import { NgModule } from '@angular/core';
import {OffersListRoutingModule} from "./offers-list-routing.module";
import {OffersListComponent} from "./offers-list.component";

@NgModule({
  imports: [
    OffersListRoutingModule
  ],
  declarations: [OffersListComponent],
  exports: []
})

export class OffersList {}
