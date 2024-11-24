import { Component, inject, OnInit } from '@angular/core';
import { AddUpdateComponent } from '../shared/components/add-update/add-update.component';
import { UtilsService } from '../services/utils.service';

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
      component: AddUpdateComponent,
      cssClass: 'add-update-modal'
    })

}
}
