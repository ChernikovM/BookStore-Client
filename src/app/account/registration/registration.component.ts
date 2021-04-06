import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { IRegistrationModel } from 'src/app/shared/models/Account/Registration/IRegistrationModel';
import { RegistrationModel } from 'src/app/shared/models/Account/Registration/RegistrationModel';
import { UsersActions } from 'src/app/shared/store/users/users.actions';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  password: string = '12_OneTwo'; //TODO: test

  registrationForm: FormGroup;
  registrationModel: IRegistrationModel;

  constructor(
    private _store: Store, 
    private formBuilder: FormBuilder
    ) { 
    this.registrationForm = this.formBuilder.group({
      firstname: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      lastname: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      username: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20), Validators.pattern("[a-zA-z]*")]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword:["", [Validators.required]],

    });
    
    this.registrationModel = new RegistrationModel();
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.registrationModel = this.registrationForm.value;
    
    this._store.dispatch(new UsersActions.Register(this.registrationModel));
  }
}
