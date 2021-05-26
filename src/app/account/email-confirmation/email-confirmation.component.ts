import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { UsersActions } from 'src/app/shared/store/users/users.actions';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {

  userId: string;
  token: string;

  constructor(private _store: Store, private _route: ActivatedRoute) {
    this.userId = this._route.snapshot.queryParamMap.get("userId")!;
    this.token = this._route.snapshot.queryParamMap.get("token")!;
   }

  ngOnInit(): void {
    this._store.dispatch(new UsersActions.EmailConfirm({id: this.userId, token: this.token}));
  }

}
