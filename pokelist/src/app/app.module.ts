import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

//Components
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

//Services
import { AuthService } from './services/auth.service';
import { SearchService } from './services/search.service';
import { PokemonDetailService} from "./services/pokemon-details.service.ts.service";

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from "./interceptor/auth.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SearchComponent,
    TableComponent,
    PokemonDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    SearchService,
    PokemonDetailService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
