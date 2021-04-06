import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/providers/auth.guard';
import { UsersListComponent } from './users-list/users-list.component';

export const routes: Routes = [
  {
    path: 'users', component: UsersListComponent, canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
