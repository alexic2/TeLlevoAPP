import { Component, inject, OnInit } from '@angular/core';
import { AddUpdateComponent } from '../shared/components/add-update/add-update.component';
import { UtilsService } from '../services/utils.service';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../models/user.model';
import { Viaje } from '../models/viaje.model';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {

  utilsSvc= inject(UtilsService);

  constructor() { }

  ngOnInit() {
  }
  addUpdate(){
    this.utilsSvc.presentModal({
      component: AddUpdateComponent
    })
  }
}
