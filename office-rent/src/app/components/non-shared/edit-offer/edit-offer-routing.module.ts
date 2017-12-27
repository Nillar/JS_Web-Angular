import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EditOfferComponent} from "./edit-offer.component";

const routes: Routes = [
  {path: '', component: EditOfferComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EditOfferRoutingModule {
}
