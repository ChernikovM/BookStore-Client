import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ILoginModel } from 'src/app/shared/models/Account/Login/ILoginModel';
import { LoginModel } from 'src/app/shared/models/Account/Login/LoginModel';
import { IJwtPairModel } from 'src/app/shared/models/JwtPair/IJwtPairModel';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { LocalStorageService } from 'src/app/shared/services/localStorage/local-storage.service';
import { UsersActions } from 'src/app/shared/store/users/users.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  loginModel: ILoginModel;

  testLogin: string = 'admin';
  testPassword: string = '12_OneTwo';

  constructor(private _store: Store, 
              private _formBuilder: FormBuilder,
              private _route: ActivatedRoute,
              private _localStorageService: LocalStorageService
              ) { 
    this.loginForm = this._formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20), Validators.pattern("[a-zA-z]*")]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      remember: ["true"],

    });
    
    this.loginModel = new LoginModel();
    
  }

  ngOnInit(): void {
    this._localStorageService.clear();
  }

  onSubmit(){
    this.loginModel = this.loginForm.value;

    let returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
    
    this._store.dispatch(new UsersActions.Login(this.loginModel, returnUrl!));
  }

}
