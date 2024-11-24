import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor() { }

  ngOnInit() {
  }
  

  signOut(){
    this.firebaseSvc.signOut();
  }

}
