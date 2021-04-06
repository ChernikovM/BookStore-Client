import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IPasswordChangeModel } from 'src/app/shared/models/Account/ResetPassword/IPasswordChangeModel';
import { UsersActions } from 'src/app/shared/store/users/users.actions';
import { UsersState } from 'src/app/shared/store/users/users.state';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @Select(UsersState.getEmailForResettingPassword) email$!: Observable<string>;

  resetPasswordForm: FormGroup;
  passwordChangeModel!: IPasswordChangeModel
  email!: string;

  constructor(
    private _store: Store,
    private _formBuilder: FormBuilder
  ) {
    this.resetPasswordForm = this._formBuilder.group({
      newPassword: ["", [Validators.required, Validators.minLength(6)]],
      confirmNewPassword:["", [Validators.required]],

    });
    this.email$.subscribe(data => this.email = data);
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.passwordChangeModel = this.resetPasswordForm.value;
    this.passwordChangeModel.email = this.email;

    this._store.dispatch(new UsersActions.ResetPassword(this.passwordChangeModel));
  }

}
