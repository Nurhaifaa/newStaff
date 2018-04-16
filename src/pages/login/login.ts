import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  text: string;
  login: FormGroup;
  email: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private formBuilder: FormBuilder) {

      this.login = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  presentAlert(message){ //ni salah satu lagi cara nk show alert, so nampak mcm kemas sikit.
    let alert = this.alertCtrl.create({ // kalau boleh minimize lagi cantik code kita, lagi kemas
      title: 'Wrong information!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  goLogin(form){
    console.log('Form Value', form)
    if(form.email == "" && form.password == "")
    {
      this.presentAlert('Please enter email and password')
    }

    else if(form.email == "")
    {
      this.presentAlert('Please enter a valid email!')
    }

    else if(form.password == "")
    {
      this.presentAlert('Please enter a valid password!')
    }

    else if(form.password.length < 6) //ce adjust yg ni, tak lebih dari 16 char
    {
      this.presentAlert('Password must be at least 6 characters')
    }

    else{

      // if 
      this.navCtrl.setRoot('StaffListPage')
    }
    
  }

}
