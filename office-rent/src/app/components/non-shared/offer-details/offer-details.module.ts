import { NgModule } from '@angular/core';
import {OfferDetailsRoutingModule} from "./offer-details-routing.module";
import {OfferDetailsComponent} from "./offer-details.component";

@NgModule({
  imports: [
    OfferDetailsRoutingModule
  ],
  declarations:  [OfferDetailsComponent],
  exports: []
})

export class OfferDetails {}
