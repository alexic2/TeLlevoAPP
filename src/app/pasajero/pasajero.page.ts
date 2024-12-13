import { Component, inject, OnInit } from '@angular/core';
import { Viaje } from '../models/viaje.model';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {

  utilsSvc= inject(UtilsService);
  firebaseSvc = inject(FirebaseService)

  viajes: Viaje[] = [];

  ngOnInit() {
  }
  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }
  ionViewWillEnter() {
    this.getViajes();
  }
  
  getViajes(){
    let path = `users/${this.user().uid}/viajes`;
    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.viajes = res; 
        sub.unsubscribe();  
      }
    })

  }
}
