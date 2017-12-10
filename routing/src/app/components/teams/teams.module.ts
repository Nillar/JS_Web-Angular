import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {teamsRoutes} from "./teams.routing";

import {teams} from "./index";
import {TargetGuardGuard} from "../../services/guards/target-guard.guard";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(teamsRoutes)
  ],
  declarations: [
    ...teams
  ],
  providers: [
    TargetGuardGuard
  ]
})

export class TeamsModule{ }
