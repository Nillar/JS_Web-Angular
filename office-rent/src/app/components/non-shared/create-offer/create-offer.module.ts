import { NgModule } from '@angular/core';
import {CreateOfferComponent} from "./create-offer.component";
import {CreateOfferRoutingModule} from "./create-offer-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CreateOfferRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  declarations:  [CreateOfferComponent],
  exports: []
})

export class CreateOffer {}
