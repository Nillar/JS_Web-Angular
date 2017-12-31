import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from "./components/non-shared/home/home.component";
import {LoginComponent} from "./components/non-shared/auth/login/login.component";
import {RegisterComponent} from "./components/non-shared/auth/register/register.component";
import {ErrorComponent} from "./components/shared/error/error.component";

import {AuthGuard} from "./guards/auth.guard";
import {LogoutComponent} from "./components/non-shared/auth/logout/logout.component";
import {AdminGuard} from "./guards/admin.guard";

const appRoutes: Routes = [
  {pathMatch: 'full', path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {
    path: 'offers',
    canActivate: [AuthGuard],
    loadChildren: './components/non-shared/offers-list/offers-list.module#OffersList'
  },
  {
    path: 'offers/:id',
    canActivate: [AuthGuard],
    loadChildren: './components/non-shared/offer-details/offer-details.module#OfferDetails'
  },
  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    loadChildren: './components/non-shared/edit-offer/edit-offer.module#EditOffer'
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    loadChildren: './components/non-shared/create-offer/create-offer.module#CreateOffer'
  },
  {
    path: 'my-posts',
    canActivate: [AuthGuard],
    loadChildren: './components/non-shared/my-posts/my-posts.module#MyPostsList'
  },
  {
    path: `profile/:username`,
    canActivate: [AuthGuard],
    loadChildren: './components/non-shared/profile/profile.module#ProfileList'
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadChildren: './components/admin-panel/admin-panel.module#AdminPanel'
  },
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
