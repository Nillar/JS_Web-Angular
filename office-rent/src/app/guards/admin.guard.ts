import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, Router, Route} from '@angular/router';
import {ReqHandlerService} from "../services/req-handler.service";


@Injectable()
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private reqHandlerService: ReqHandlerService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkIsAdmin(state.url);
  }
  canLoad(route: Route): boolean {
    return this.checkIsAdmin(route.path);
  }

  checkIsAdmin(url: string): boolean {
    if (localStorage.getItem('role') === 'admin') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }


}
