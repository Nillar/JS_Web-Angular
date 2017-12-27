import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {NgxPaginationModule} from 'ngx-pagination';
import {CommonModule} from "@angular/common";

// SERVICES
import {ReqHandlerModule} from "./services/req-handler.module";

// COMPONENTS
import {AppComponent} from './app.component';
import {ErrorComponent} from './components/shared/error/error.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {HomeComponent} from './components/non-shared/home/home.component';
import {RegisterComponent} from "./components/non-shared/auth/register/register.component";
import {LoginComponent} from "./components/non-shared/auth/login/login.component";

// GUARDS
import {AuthGuard} from "./guards/auth.guard";
import {ReqHandlerService} from "./services/req-handler.service";
import {LogoutComponent} from "./components/non-shared/auth/logout/logout.component";
import {DuplicateCheck} from "./components/non-shared/auth/register/validate-email";



@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [AuthGuard, ReqHandlerService, DuplicateCheck],
  bootstrap: [AppComponent]
})
export class AppModule {
}
