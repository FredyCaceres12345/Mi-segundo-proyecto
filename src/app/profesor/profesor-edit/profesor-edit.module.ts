import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesorEditPageRoutingModule } from './profesor-edit-routing.module';

import { ProfesorEditPage } from './profesor-edit.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesorEditPageRoutingModule
  ],
  declarations: [ProfesorEditPage]
})
export class ProfesorEditPageModule {}
