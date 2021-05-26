import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account/account.service';
import { RouterService } from '../services/router/router.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: RouterService,
    private _accountService: AccountService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this._accountService.isLoggedIn()){
      return true;
    }

    this._router.navigateInZone(['account/signin'], { queryParams: { returnUrl: state.url } });
    return false;
    } 
}
