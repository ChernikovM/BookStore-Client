import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListComponent } from './users-list/users-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserService } from '../shared/services/user/user.service';
import { SortableDirective } from './sortable.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './user-routing.module';
import { NgbDropdownModule, NgbPopoverModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterableDirective } from './filterable.directive';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersManagementComponent } from './users-management/users-management.component';

@NgModule({
  declarations: [UsersListComponent, SortableDirective, FilterableDirective, UserDetailsComponent, UsersManagementComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    UserRoutingModule,
    RouterModule.forChild(routes),
    NgbTypeaheadModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbDropdownModule,
    SharedModule
  ],
  providers:[
    UserService,
  ]
})
export class UserModule { }
