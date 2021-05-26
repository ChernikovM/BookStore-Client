import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IUserModel } from 'src/app/shared/models/User/IUserModel';
import { UsersActions } from 'src/app/shared/store/users/users.actions';
import { UsersState } from 'src/app/shared/store/users/users.state';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  constructor(private _store: Store, private formBuilder: FormBuilder) { }

  @Select(UsersState.currentUser) userModel$! : Observable<IUserModel>;

  updateForm!: FormGroup;

  isReadonly : boolean = true;

  ngOnInit(): void {
    this._store.dispatch(new UsersActions.GetMyProfile());

    this.updateForm = this.formBuilder.group({
      id:[""],
      firstname: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      lastname: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword:["", [Validators.required]]
    });
  }

  onUpdate(){
    this.userModel$.subscribe(x => this.updateForm.value.id = x.id).unsubscribe();
    console.log(JSON.stringify(this.updateForm.value!));

    this._store.dispatch(new UsersActions.UpdateProfile(this.updateForm.value));
  }

  toggleReadonly(){
    this.isReadonly = !this.isReadonly;
  }

}
