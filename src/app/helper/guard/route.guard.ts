import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  NavigationStart,
  NavigationEnd,
} from '@angular/router';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    let paramId = route.paramMap.get('id');
    let realId = sessionStorage.getItem('id');
    if (paramId === realId) {
      return true;
    } else {
      this.router.navigate(['/gallery']);
    }
    return true;
  }
}
