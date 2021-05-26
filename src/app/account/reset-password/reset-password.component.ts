import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { IPasswordChangeModel } from 'src/app/shared/models/Account/ResetPassword/IPasswordChangeModel';
import { UsersActions } from 'src/app/shared/store/users/users.actions';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  passwordChangeModel!: IPasswordChangeModel

  userId: string;
  token: string;

  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _formBuilder: FormBuilder
  ) {
    this.userId = this._route.snapshot.queryParamMap.get("userId")!;
    this.token = this._route.snapshot.queryParamMap.get("token")!;

    this.resetPasswordForm = this._formBuilder.group({
      newPassword: ["", [Validators.required]],
      confirmNewPassword:["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._store.dispatch(new UsersActions.CheckPasswordResetToken({id: this.userId, token: this.token}));
  }

  onSubmit(){
    this._store.dispatch(new UsersActions.ChangePassword({...this.resetPasswordForm.value, id: this.userId, token: this.token}));
  }

  CheckForm(): boolean{
    return this.resetPasswordForm.valid;
  }

}
