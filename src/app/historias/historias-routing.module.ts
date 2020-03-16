import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriasPage } from './historias.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriasPageRoutingModule {}
