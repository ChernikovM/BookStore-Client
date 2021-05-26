import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UsersActions } from 'src/app/shared/store/users/users.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  loading: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store
    ) {
      this.loading = false;

      this.forgotPasswordForm = this._formBuilder.group({
        email: ["", [Validators.required, Validators.email]]
      })

     }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this.loading = true;
    let payload = {EmailAddress: this.forgotPasswordForm.value.email};
    this._store.dispatch(new UsersActions.SendResetPasswordMail(payload));
  }
}
