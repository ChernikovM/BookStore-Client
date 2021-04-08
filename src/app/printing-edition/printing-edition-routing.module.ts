import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PECatalogComponent } from './pecatalog/pecatalog.component';

export const routes: Routes = [
  { path: 'catalog', component: PECatalogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintingEditionRoutingModule { }
