import { NgModule } from '@angular/core';

import { authenticationComponents } from  './index';

// Modules
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Services
import { ReqHandlerService} from "./req-handler.service";

@NgModule({
  declarations: [
    ...authenticationComponents
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    ...authenticationComponents
  ],
  providers: [ ReqHandlerService ]
})
export class ReqHandlerModule {  }
