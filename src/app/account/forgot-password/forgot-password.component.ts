import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { UsersActions } from 'src/app/shared/store/users/users.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,    
    private _store: Store
    ) {
      this.forgotPasswordForm = this._formBuilder.group({
        email: ["", [Validators.required, Validators.email]]
      })

     }

  ngOnInit(): void {
  }

  onSubmit(): void{
    this._store.dispatch(new UsersActions.CheckEmail(this.forgotPasswordForm.value));
  }

}
