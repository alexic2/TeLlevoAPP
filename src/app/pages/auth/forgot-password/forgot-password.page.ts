import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  async submit() {
    if(this.form.valid) {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    this.firebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => {
      this.utilsSvc.routerLink('/main/home');
    }).catch(err => {
      console.error('Error al autenticar usuario:', err);
      this.utilsSvc.presentToast({ 
        message: 'Error al autenticar usuario', 
        duration: 2000,
        color: 'danger',
        position:'middle',
        icon: 'close-circle-outline' 
      });
    }).finally(() => {
      loading.dismiss();
    });
    
  }
}

}
