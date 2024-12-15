import { Component, inject, OnInit } from '@angular/core';
import { Viaje } from '../models/viaje.model';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {

  utilsSvc = inject(UtilsService);
  firebaseSvc = inject(FirebaseService);
  alertController = inject(AlertController);
  toastController = inject(ToastController);
  router = inject(Router);

  viajes: Viaje[] = [];

  ngOnInit() {
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getViajes();
  }
  
  getViajes(){
    let path = `users/${this.user().uid}/viajes`;
    let sub = this.firebaseSvc.getCollectionData(path, ref => 
      ref.where('estado', '==', 'pendiente')
    ).subscribe({
      next: (res: any) => {
        this.viajes = res;
        sub.unsubscribe();  
      }
    })
  }

  async reservarViaje(viaje: Viaje) {
    const alert = await this.alertController.create({
      header: 'Confirmar Reserva',
      message: `¿Estás seguro que deseas reservar este viaje a ${viaje.destino}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.confirmarReserva(viaje);
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmarReserva(viaje: Viaje) {
    // Añadir estado pendiente al viaje
    const viajeConEstado: Viaje = {
      ...viaje,
      estado: 'pendiente'
    };

    // Guardar en Firebase
    const path = `users/${this.user().uid}/solicitudes`;
    await this.firebaseSvc.addDocument(path, viajeConEstado);

    const toast = await this.toastController.create({
      message: `¡Viaje reservado exitosamente a ${viaje.destino}!`,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      icon: 'checkmark-circle-outline'
    });

    await toast.present();

    setTimeout(() => {
      this.router.navigate(['/']); 
    }, 2000);
  }
}