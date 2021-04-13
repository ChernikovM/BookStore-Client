import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { AccountService } from '../../services/account/account.service';
import { CartService } from '../../services/cart/cart.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { UsersActions } from '../../store/users/users.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    private _accountService: AccountService,
    private _store: Store,
    private _route: ActivatedRoute,
    private _router: Router,
    ) { }

  ngOnInit(): void {
  }

  isLogged() : boolean {
    return this._accountService.isLoggedIn();
  }

  onLogoutClicked(){
    let returnUrl = this._router.url;
    this._store.dispatch(new UsersActions.Logout(returnUrl!));
  }

}
