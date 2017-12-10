import {BlueComponent} from "./blue/blue.component";
import {GreenComponent} from "./green/green.component";
import {RedComponent} from "./red/red.component";
import {YellowComponent} from "./yellow/yellow.component";
import {TargetGuardGuard} from "../../services/guards/target-guard.guard";
import {AttackComponent} from "../attack/attack.component";

export const teamsRoutes =[
  {path: '', component: AttackComponent},
  { path: 'blue', canActivate:[TargetGuardGuard], component: BlueComponent},
  { path:'green', canActivate:[TargetGuardGuard], component: GreenComponent},
  { path: 'red', canActivate:[TargetGuardGuard], component: RedComponent},
  { path: 'yellow', canActivate:[TargetGuardGuard], component: YellowComponent}
];
