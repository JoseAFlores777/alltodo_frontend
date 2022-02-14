import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private userService:AuthService, private router:Router){}


    canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return this.userService.validateToken()
      .pipe(
        tap(isAuthenticated => {
          
          // console.log(isAuthenticated);
          if (!isAuthenticated) {
            // console.log('canLoad');
            this.router.navigateByUrl('/auth')
          }
        })
      );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.userService.validateToken()
      .pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated) {
            // console.log('canActivate');
            this.router.navigateByUrl('/auth')
          }
        })
      );
  }


}
