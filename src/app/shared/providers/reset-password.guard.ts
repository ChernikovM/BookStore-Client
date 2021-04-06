import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UsersState } from '../store/users/users.state';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate{

  @Select(UsersState.getEmailForResettingPassword) email$!: Observable<string>;
  email!: string;

  constructor(private _router: Router, private _store: Store){
    this.email$.subscribe(data => this.email = data);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.email === ''){
        this._router.navigate(['account/forgotPassword']);
        return false;
      }
      
      return true;
  }
  
}
