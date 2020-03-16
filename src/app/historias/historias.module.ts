import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriasPageRoutingModule } from './historias-routing.module';

import { HistoriasPage } from './historias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriasPageRoutingModule
  ],
  declarations: [HistoriasPage]
})
export class HistoriasPageModule {}
