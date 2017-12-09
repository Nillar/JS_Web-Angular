import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {BlueComponent} from "./components/teams/blue/blue.component";
import {GreenComponent} from "./components/teams/green/green.component";
import {RedComponent} from "./components/teams/red/red.component";
import {YellowComponent} from "./components/teams/yellow/yellow.component";
import {AttackComponent} from "./components/attack/attack.component";

import {AuthGuard} from "./services/guards/auth.guard";
import {TargetGuardGuard} from "./services/guards/target-guard.guard";
import {ErrorComponent} from "./components/error/error.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', canActivate: [AuthGuard], component: HomeComponent},
  {path: 'attack', component: AttackComponent},
  {path: 'blue', canActivate:[TargetGuardGuard], component: BlueComponent},
  {path: 'green', canActivate:[TargetGuardGuard], component: GreenComponent},
  {path: 'red', canActivate:[TargetGuardGuard], component: RedComponent},
  {path: 'yellow', canActivate:[TargetGuardGuard], component: YellowComponent},
  {path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
