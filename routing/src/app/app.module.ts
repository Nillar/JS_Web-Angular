import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {AttackComponent} from './components/attack/attack.component';
import {BlueComponent} from './components/teams/blue/blue.component';
import {RedComponent} from './components/teams/red/red.component';
import {GreenComponent} from './components/teams/green/green.component';
import {YellowComponent} from './components/teams/yellow/yellow.component';
import {AppRoutingModule} from "./app-routing.module";

import {AuthGuard} from "./services/guards/auth.guard";
import {TargetGuardGuard} from "./services/guards/target-guard.guard";
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AttackComponent,
    BlueComponent,
    RedComponent,
    GreenComponent,
    YellowComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, TargetGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
