import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanLoad,
  Router,
  Route
} from '@angular/router';

import {ReqHandlerService} from '../services/req-handler.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private reqHandler: ReqHandlerService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string): boolean {
    if (localStorage.getItem('authtoken') !== null && localStorage.getItem('authtoken').length > 20) {

      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
