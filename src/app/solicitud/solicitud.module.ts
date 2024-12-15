import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudPageRoutingModule } from './solicitud-routing.module';

import { SolicitudPage } from './solicitud.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudPageRoutingModule,
    SharedModule
  ],
  declarations: [SolicitudPage]
})
export class SolicitudPageModule {}

export interface Solicitud {
  nombre: string;
  destino: string;
  capacidad: number;
  precio: number;
}