import { NgModule } from '@angular/core';
import {OfferDetailsRoutingModule} from "./offer-details-routing.module";
import {OfferDetailsComponent} from "./offer-details.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    OfferDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  declarations:  [OfferDetailsComponent],
  exports: []
})

export class OfferDetails {}
