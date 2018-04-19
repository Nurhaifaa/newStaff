import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public registerForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

      this.registerForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });

  }

  ionViewDidLoad() {
  }

  userRegister(){
    if (!this.registerForm.valid){
      console.log(this.registerForm.value);
    } else {
      this.authData.userRegister(this.registerForm.value.email, this.registerForm.value.password)
        .then ( (user) => {
          firebase.database().ref().child('users/'+user.uid).set({
             email: user.email,
             first_name: '',
             last_name: '',
             image: '',
             ic_no: '',
             position: '',
             contact: '',
             birthday: '',
          }).then(()=> {
            this.navCtrl.setRoot('LoginPage');
          })
        }, (error) => {
          this.loading.dismiss().then ( () => {
            var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
              buttons: [
                {
                  text: "OK",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        this.loading.present();
    }
  }
}
