import { Component, inject, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';
import { User } from '../models/user.model';
import { Viaje } from '../models/viaje.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.page.html',
  styleUrls: ['./solicitud.page.scss'],
})
export class SolicitudPage implements OnInit {
  alertSrv = inject(AlertController);
  navController = inject(NavController);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  solicitudes: Viaje[] = [];

  constructor() { }

  ngOnInit() {
    this.getSolicitudes();
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  getSolicitudes() {
    let path = `users/${this.user().uid}/solicitudes`;
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log('Datos de solicitudes:', res);
        this.solicitudes = res;
        sub.unsubscribe();
      }
    });
  }

  async aceptarSolicitud(solicitud: Viaje) {
    // Actualizar estado a aceptado
    const solicitudActualizada: Viaje = {
      ...solicitud,
      estado: 'aceptado'
    };

    const path = `users/${this.user().uid}/solicitudes/${solicitud.id}`;
    await this.firebaseSvc.updateDocument(path, solicitudActualizada);
    await this.firebaseSvc.deleteDocument(path);
    const alert = await this.alertSrv.create({
      header: 'Aceptada',
      message: `Solicitud aceptada para el viaje a ${solicitud.destino}.`,
      buttons: ['OK']
    });
    await alert.present();
    this.getSolicitudes();
  }

  async rechazarSolicitud(solicitud: Viaje) {
    const path = `users/${this.user().uid}/solicitudes/${solicitud.id}`;
    await this.firebaseSvc.deleteDocument(path);

    const alert = await this.alertSrv.create({
      header: 'Solicitud rechazada',
      message: `Has rechazado la solicitud para el viaje a ${solicitud.destino}.`,
      buttons: ['OK']
    });
    await alert.present();
    this.getSolicitudes();
  }
  crearSolicitud(viaje: Viaje) {
    const solicitud: Viaje = {
      ...viaje,
      usuarioSolicitante: {
        nombre: this.user().name,
        email: this.user().email,
        uid: this.user().uid
      }
    };
    
  }
  
}