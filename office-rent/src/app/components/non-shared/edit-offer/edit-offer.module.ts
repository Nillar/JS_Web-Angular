import { NgModule } from '@angular/core';
import {EditOfferComponent} from "./edit-offer.component";
import {EditOfferRoutingModule} from "./edit-offer-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    EditOfferRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  declarations:  [EditOfferComponent],
  exports: []
})

export class EditOffer {}
