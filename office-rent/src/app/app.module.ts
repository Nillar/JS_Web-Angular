import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';
import {CommonModule} from "@angular/common";
import { ToastModule, ToastOptions } from 'ng2-toastr';
import { CustomOption } from './custom-option';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


// COMPONENTS
import {AppComponent} from './app.component';
import {ErrorComponent} from './components/shared/error/error.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {HomeComponent} from './components/non-shared/home/home.component';
import {RegisterComponent} from "./components/non-shared/auth/register/register.component";
import {LoginComponent} from "./components/non-shared/auth/login/login.component";
import {LogoutComponent} from "./components/non-shared/auth/logout/logout.component";

// GUARDS
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";

// SERVICES
import {ReqHandlerService} from "./services/req-handler.service";
import {ToasterService} from "angular2-toaster";


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
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [AuthGuard, AdminGuard, ReqHandlerService, ToasterService, {provide: ToastOptions, useClass: CustomOption}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
